export type AppErrorCode =
  | "VALIDATION_ERROR"
  | "TOOL_NOT_FOUND"
  | "MODEL_NOT_ALLOWED"
  | "MISSING_API_KEY"
  | "UPSTREAM_ERROR"
  | "RATE_LIMITED"

export class AppError extends Error {
  readonly code: AppErrorCode
  readonly status: number

  constructor(code: AppErrorCode, message: string, status = 400) {
    super(message)
    this.name = "AppError"
    this.code = code
    this.status = status
  }
}
