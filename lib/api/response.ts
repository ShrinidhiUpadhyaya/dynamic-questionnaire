import { NextResponse } from "next/server";

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  [HTTP_STATUS.BAD_REQUEST]: "Bad Request",
  [HTTP_STATUS.UNAUTHORIZED]: "Unauthorized",
  [HTTP_STATUS.FORBIDDEN]: "Forbidden",
  [HTTP_STATUS.NOT_FOUND]: "Not Found",
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: "Internal Server Error",
} as const;

export type ErrorStatus = keyof typeof ERROR_MESSAGES;

interface BaseAPIResponse {
  status: number;
  message?: string;
}

export interface APISuccessResponse<T> extends BaseAPIResponse {
  data: T;
}

export interface APIErrorResponse extends BaseAPIResponse {
  error: string;
}
export const createSuccessResponse = <T>(
  data: T,
  message?: string,
  status = HTTP_STATUS.OK,
): NextResponse<APISuccessResponse<T>> => {
  return NextResponse.json(
    {
      status,
      data,
      ...(message && { message }),
    },
    { status },
  );
};

export const createErrorResponse = (
  message: string,
  status: ErrorStatus = HTTP_STATUS.INTERNAL_SERVER_ERROR,
): NextResponse<APIErrorResponse> => {
  return NextResponse.json(
    {
      status,
      error: message,
      message: ERROR_MESSAGES[status],
    },
    { status },
  );
};
