import { NextResponse } from "next/server";

export async function GET() {
  const hasOpenai = Boolean(process.env.OPENAI_API_KEY);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const hasSupabase = Boolean(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL);

  return NextResponse.json({
    status: "healthy",
    service: "claude-dev-cockpit",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production",
    certifications: {
      candidate: "Shakil Ahmed",
      role: "AI Automation & Integration Specialist / Systems Architect",
      examTarget: "Claude Developer Certification",
      turnaroundTarget: "7 Calendar Days",
      budgetApproved: "$700.00 Fixed ($350 Upfront / $350 Completion)"
    },
    aiProviders: {
      openai: {
        active: hasOpenai,
        model: "gpt-4o-mini",
        role: "Primary AI Inference & Prompt Analysis"
      },
      gemini: {
        active: hasGemini,
        model: "gemini-2.0-flash",
        role: "Sub-second Fallback Engine"
      },
      claudeSimulator: {
        active: true,
        model: "claude-sonnet-5-ephemeral-cache",
        role: "Deterministic Prompt Caching & Tool Loop Validator"
      }
    },
    database: {
      supabase: hasSupabase,
      storage: "Relational Syllabus & Questionnaire Response Vault"
    }
  });
}
