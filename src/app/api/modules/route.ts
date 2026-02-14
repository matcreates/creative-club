import { NextResponse } from "next/server";
import { modules } from "@/data/modules";

// GET: return the canonical module content for all days
export async function GET() {
  return NextResponse.json({ modules });
}
