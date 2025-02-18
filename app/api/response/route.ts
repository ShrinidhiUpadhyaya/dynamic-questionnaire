import { redis } from "@/lib/redis";
import type { Response } from "@/types/common";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

let responses: Response[] = [];

const findResponse = (id: string): Response | undefined => {
  return responses.find((item) => item.id === id);
};

const upsertResponse = (id: string, response: string): void => {
  const existingIndex = responses.findIndex((item) => item.id === id);

  if (existingIndex !== -1) {
    responses[existingIndex] = { ...responses[existingIndex], response };
  } else {
    responses = [...responses, { id, response }];
  }
};

const getRedisAllResponses = async () => {
  if (!redis) {
    return null;
  }
  try {
    const keys = await redis.keys("responses:*");
    if (!keys.length) return [];

    const allResponses = await Promise.all(
      keys.map(async (key) => {
        const response = await redis?.hget(key, "response");
        return {
          id: key.replace("responses:", ""),
          response,
        };
      }),
    );
    return allResponses;
  } catch (error) {
    console.error("Error fetching all responses from Redis:", error);
    return null;
  }
};

const getRedisResponse = async (id: string): Promise<Response | null> => {
  if (!redis) {
    return null;
  }
  try {
    const response = await redis.hget(`responses:${id}`, "response");
    return { id, response };
  } catch (error) {
    console.error(`Error fetching response from Redis: ${id}`, error);
    return null;
  }
};

const deleteRedisResponses = async () => {
  if (!redis) {
    return null;
  }
  try {
    const keys = await redis.keys("responses:*");
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting responses from Redis`, error);
    return false;
  }
};

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const { response: userResponse } = await request.json();

    if (!id || !userResponse) {
      return NextResponse.json({ error: "Question ID and response are required" }, { status: 400 });
    }

    if (redis) {
      await redis.hset(`responses:${id}`, "response", userResponse);
    } else {
      upsertResponse(id, userResponse);
    }

    return NextResponse.json(
      { message: "Response saved successfully", status: "success" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving response:", error);
    return NextResponse.json({ error: "Failed to save response" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Question ID is required" }, { status: 400 });
    }

    if (id === "all") {
      const allResponses = redis ? await getRedisAllResponses() : responses;

      return NextResponse.json({
        responses: allResponses,
        total: allResponses?.length,
        status: "success",
      });
    }

    const response = redis ? await getRedisResponse(id) : findResponse(id);

    return NextResponse.json({
      response: response ? response?.response : null,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching responses:", error);
    return NextResponse.json({ error: "Failed to fetch responses" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    if (redis) {
      await deleteRedisResponses();
    } else {
      responses = [];
    }

    return NextResponse.json(
      { message: "All responses cleared successfully", status: "success" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error clearing responses:", error);
    return NextResponse.json({ error: "Failed to clear responses" }, { status: 500 });
  }
}
