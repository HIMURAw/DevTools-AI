import { NextResponse } from "next/server"

import { AppError } from "@/lib/errors/app-error"

export function handleRouteError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: { message: error.message, code: error.code } },
      { status: error.status }
    )
  }

  console.error("Unhandled route error:", error)
  return NextResponse.json(
    {
      error: {
        message: "Something went wrong. Please try again.",
        code: "INTERNAL_ERROR",
      },
    },
    { status: 500 }
  )
}
