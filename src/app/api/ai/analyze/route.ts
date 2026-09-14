import { NextResponse } from "next/server";
import { runClaudeLabInference, AiInferenceRequest } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body: AiInferenceRequest = await req.json();

    if (!body.prompt || !body.taskType) {
      return NextResponse.json(
        { error: "Missing required fields: prompt and taskType" },
        { status: 400 }
      );
    }

    const result = await runClaudeLabInference(body);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("AI Analysis route error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Internal server error during AI inference",
      },
      { status: 500 }
    );
  }
}
