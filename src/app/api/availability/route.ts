import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json(
    {
      error: "not_configured",
      message:
        "No calendar provider is connected. Please use the /book form to send a request.",
    },
    { status: 501 },
  );
}
