import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    service: "goodstash-platform",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
