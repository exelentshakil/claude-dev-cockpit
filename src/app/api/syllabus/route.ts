import { NextResponse } from "next/server";
import { SYLLABUS_DOMAINS, MOCK_EXAM_QUESTIONS } from "@/lib/syllabusData";

export async function GET() {
  return NextResponse.json({
    success: true,
    domains: SYLLABUS_DOMAINS,
    mockQuestions: MOCK_EXAM_QUESTIONS,
    totalDomains: SYLLABUS_DOMAINS.length,
    overallReadiness: 96,
  });
}
