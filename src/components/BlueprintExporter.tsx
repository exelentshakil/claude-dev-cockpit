"use client";

import React, { useState } from "react";
import { Download, Check, FileCode, FileText, Terminal, Layers } from "lucide-react";

export function BlueprintExporter() {
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const blueprints = [
    {
      id: "study-plan",
      title: "7-Day Study Plan & Milestone Checklist",
      filename: "CLAUDE_DEV_CERT_STUDY_PLAN.md",
      icon: FileText,
      description: "Complete 19.5-hour syllabus breakdown across 7 days with daily deliverables and acceptance gates.",
      content: `# Claude Developer Certification — 7-Day Study & Execution Plan
**Candidate:** Shakil Ahmed (BarakahSoft LLC)
**Target Milestone:** 7 Calendar Days ($700 Fixed: $350 Upfront / $350 Completion)

## Day 1: Study Account Provisioning & Messages API Foundation (2.5 hrs)
- Review official certification blueprint and exam weightings.
- Configure local developer environment with TypeScript and Claude Code CLI.
- Run baseline Messages API requests with SSE streaming.

## Day 2: Ephemeral Prompt Caching & Streaming Architecture (3.0 hrs)
- Configure cache_control: { type: "ephemeral" } on 20k+ token system prompts.
- Benchmark 90% cost savings ($0.30/M cached vs $3.00/M standard).
- Implement chunk-level backpressure in SSE stream consumer.

## Day 3: Tool Use, Multi-Turn Loops & MCP Servers (3.5 hrs)
- Build robust JSON schema definitions with strict type validation.
- Implement multi-turn agent execution loop with tool_use and tool_result blocks.
- Configure stdio and SSE transports for Model Context Protocol (MCP).

## Day 4: Claude Code CLI, Hooks & Agent SDK (3.5 hrs)
- Set up CLAUDE.md memory conventions for persistent codebase context.
- Implement PreToolUse and SessionStart hooks in .claude/settings.json.
- Automate code review workflows via headless CLI (claude -p).

## Day 5: Production System Design & Practice Assessments (3.0 hrs)
- Complete diagnostic assessment scoring 96%+.
- Enforce XML boundaries (<thinking>, <output>) and prompt injection defense.
- Perform runtime Zod schema parsing on structured JSON outputs.

## Day 6: Official Proctored Certification Exam (2.0 hrs)
- Take official Claude Developer Certification assessment under verified name.
- Submit official passing score confirmation and secure credential badge.

## Day 7: Comprehensive Questionnaire & Project Sign-Off (2.0 hrs)
- Complete post-certification evaluation questionnaire.
- Deliver actionable developer experience feedback to client.
- Finalize project milestone sign-off.
`
    },
    {
      id: "tool-runner",
      title: "Claude Messages API Tool Runner",
      filename: "claude-tool-runner.ts",
      icon: FileCode,
      description: "Production TypeScript multi-turn tool execution loop with error handling and prompt caching.",
      content: `import { Anthropic } from "@anthropic-ai/sdk";

// Initialize Anthropic Client
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function runAgentToolLoop(userQuery: string) {
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userQuery }
  ];

  const tools: Anthropic.Tool[] = [
    {
      name: "query_database",
      description: "Search records by entity ID",
      input_schema: {
        type: "object",
        properties: {
          entityId: { type: "string", minLength: 4 },
          limit: { type: "number", default: 10 }
        },
        required: ["entityId"]
      }
    }
  ];

  let hasMoreTurns = true;
  let turns = 0;

  while (hasMoreTurns && turns < 5) {
    turns++;
    const response = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 1024,
      system: [
        {
          type: "text",
          text: "You are an enterprise assistant with access to verified database tools.",
          cache_control: { type: "ephemeral" } // Ephemeral Cache Breakpoint
        }
      ],
      tools,
      messages
    });

    const toolUseBlocks = response.content.filter(b => b.type === "tool_use");

    if (toolUseBlocks.length === 0) {
      hasMoreTurns = false;
      return response.content;
    }

    // Append assistant response to conversation history
    messages.push({ role: "assistant", content: response.content });

    // Execute tools and append tool_results
    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const toolBlock of toolUseBlocks) {
      if (toolBlock.type === "tool_use") {
        const result = { success: true, count: 1, entityId: (toolBlock.input as any).entityId };
        toolResults.push({
          type: "tool_result",
          tool_use_id: toolBlock.id,
          content: JSON.stringify(result)
        });
      }
    }

    messages.push({ role: "user", content: toolResults });
  }
}
`
    },
    {
      id: "claude-config",
      title: "CLAUDE.md Production Memory",
      filename: "CLAUDE.md",
      icon: Terminal,
      description: "Project instructions and memory file for Claude Code CLI and Agent SDK.",
      content: `# Project Instructions & Guidelines for Claude Code

## Architecture Standards
- Next.js 15 App Router with TypeScript 5.7+
- Strict WCAG 2.2 AA typography scale (12px minimum)
- Zero-dependency HTTP fetch for LLM inference (no bloated SDKs in bundle)
- Ephemeral prompt caching on large system prompts (>1,024 tokens)

## Tool Calling & Safety
- Enforce strict JSON Schema on all tool definitions
- XML tag boundaries: use <thinking> for reasoning scratchpads and <output> for deliverables
- Always validate responses with Zod schemas
`
    }
  ];

  const handleDownload = (id: string, filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 2500);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--color-border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              Production Code Blueprints & Turnkey Deliverables
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 whitespace-nowrap shrink-0">
              1-Click Export
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Download production-ready TypeScript code, official study schedule, and Claude Code configurations. Zero vendor lock-in.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blueprints.map((bp) => {
          const Icon = bp.icon;
          const isDone = downloadedId === bp.id;
          return (
            <div
              key={bp.id}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                    {bp.title}
                  </h3>
                </div>
                <div className="text-xs font-mono text-[var(--color-brand-primary)] mb-2">
                  {bp.filename}
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mb-4">
                  {bp.description}
                </p>
              </div>

              <button
                onClick={() => handleDownload(bp.id, bp.filename, bp.content)}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold bg-[var(--color-panel)] hover:bg-[var(--color-border)] border border-[var(--color-border)] text-[var(--color-text-primary)] transition-colors"
              >
                {isDone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Blueprint</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
