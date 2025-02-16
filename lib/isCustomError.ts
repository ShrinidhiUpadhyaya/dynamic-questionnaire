import { CustomError } from "@/types/common";

export function isCustomError(error: unknown): error is CustomError {
  return error instanceof Error && "status" in error;
}
