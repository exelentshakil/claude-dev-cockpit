"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Award,
  FileText,
  Terminal,
  KeyRound,
  Wrench,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface MilestoneDay {
  day: number;
  dateLabel: string;
  title: string;
  hours: number;
  objective: string;
  deliverables: string[];
  status: "completed" | "in_progress" | "scheduled";
  icon: any;
}

export function StudyPlanRoadmap() {
  const initialSchedule: MilestoneDay[] = [
    {
      day: 1,
      dateLabel: "Day 1 (Immediate)",
      title: "Account Provisioning & Messages API Core",
      hours: 2.5,
      objective: "Gain access to study account, review official exam blueprint, and establish local development test harness.",
      deliverables: [
        "Study environment & API keys verified",
        "Curriculum mapped against 5 certification domains",
        "Base TypeScript harness running Messages API requests"
      ],
      status: "completed",
      icon: KeyRound,
    },
    {
      day: 2,
      dateLabel: "Day 2",
      title: "Prompt Caching & Streaming Architecture",
      hours: 3.0,
      objective: "Master ephemeral prompt caching (cache_control), 5-minute rolling TTLs, SSE streaming, and cost reduction modeling.",
      deliverables: [
        "Ephemeral prompt caching benchmarks on 20k+ token system prompts",
        "SSE streaming event handler with chunk-level backpressure control",
        "Calculated 90% cache discount and TTFT latency drop measurements"
      ],
      status: "completed",
      icon: BookOpen,
    },
    {
      day: 3,
      dateLabel: "Day 3",
      title: "Tool Use, Multi-Turn Loops & MCP Servers",
      hours: 3.5,
      objective: "Build multi-turn agentic loops, strict JSON Schema tool validation, and Model Context Protocol (MCP) server transports.",
      deliverables: [
        "Complete multi-turn tool execution state machine",
        "tool_choice modes (auto, any, specific tool) validated",
        "MCP stdio and SSE transport client integration tested"
      ],
      status: "completed",
      icon: Wrench,
    },
    {
      day: 4,
      dateLabel: "Day 4",
      title: "Claude Code CLI, Hooks & Agent SDK",
      hours: 3.5,
      objective: "Implement headless CLI automation (claude -p), custom settings.json lifecycle hooks, and project memory via CLAUDE.md.",
      deliverables: [
        "CLAUDE.md memory hierarchy and project guidelines configured",
        "PreToolUse and SessionStart hooks for sandboxed execution",
        "Subagent dispatching and token-efficient workflow scripts"
      ],
      status: "completed",
      icon: Terminal,
    },
    {
      day: 5,
      dateLabel: "Day 5",
      title: "Production System Design & Practice Exams",
      hours: 3.0,
      objective: "Execute official practice diagnostic assessments, verify edge-case failure modes, and review XML tag boundaries.",
      deliverables: [
        "Completed practice diagnostic assessment scoring 96%+",
        "Prompt injection defense and XML <thinking> tag separation verified",
        "Zod schema runtime validation on structured JSON outputs"
      ],
      status: "completed",
      icon: Sparkles,
    },
    {
      day: 6,
      dateLabel: "Day 6",
      title: "Official Proctored Certification Exam",
      hours: 2.0,
      objective: "Take the official Claude Developer Certification assessment legitimately under candidate's verified name (Shakil Ahmed).",
      deliverables: [
        "Proctored certification exam completed and passed",
        "Official verification confirmation & digital badge secured",
        "Milestone confirmation sent to client"
      ],
      status: "in_progress",
      icon: Award,
    },
    {
      day: 7,
      dateLabel: "Day 7 (Final)",
      title: "Comprehensive Questionnaire & Project Sign-Off",
      hours: 2.0,
      objective: "Complete in-depth follow-up questionnaire providing actionable evaluation data on Claude developer experience.",
      deliverables: [
        "Detailed feedback on API ergonomics, caching, and documentation",
        "Developer experience analysis across Claude Code CLI and SDK",
        "Final project milestone submission for $700 escrow release"
      ],
      status: "scheduled",
      icon: FileText,
    },
  ];

  const [schedule, setSchedule] = useState<MilestoneDay[]>(initialSchedule);

  const toggleDayStatus = (dayNum: number) => {
    setSchedule((prev) =>
      prev.map((item) => {
        if (item.day !== dayNum) return item;
        const nextStatus =
          item.status === "completed"
            ? "in_progress"
            : item.status === "in_progress"
            ? "scheduled"
            : "completed";
        return { ...item, status: nextStatus };
      })
    );
  };

  const totalHours = schedule.reduce((sum, item) => sum + item.hours, 0);
  const completedDays = schedule.filter((item) => item.status === "completed").length;
  const progressPercent = Math.round((completedDays / schedule.length) * 100);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--color-border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              7-Day Dedicated Study Plan & Certification Roadmap
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 whitespace-nowrap shrink-0">
              19.5 Hours Allocated
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Rigorous day-by-day progression designed to guarantee deep architectural comprehension, official exam pass, and actionable questionnaire data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs font-mono">
            <span className="text-[var(--color-text-muted)]">Progress: </span>
            <span className="font-bold text-emerald-500">{progressPercent}% ({completedDays}/7 Days)</span>
          </div>
          <div className="w-24 h-2 bg-[var(--color-panel-subtle)] rounded-full overflow-hidden border border-[var(--color-border)]">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3.5 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] flex items-center gap-3">
          <div className="p-2 rounded-md bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)]">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono text-[var(--color-text-muted)]">Total Study Hours</div>
            <div className="text-base font-bold font-mono text-[var(--color-text-primary)]">
              {totalHours.toFixed(1)} Dedicated Hours
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] flex items-center gap-3">
          <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-500">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono text-[var(--color-text-muted)]">Timeline SLA</div>
            <div className="text-base font-bold font-mono text-[var(--color-text-primary)]">
              7 Calendar Days (Strict)
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] flex items-center gap-3">
          <div className="p-2 rounded-md bg-violet-500/10 text-violet-500">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono text-[var(--color-text-muted)]">Escrow Milestones</div>
            <div className="text-base font-bold font-mono text-[var(--color-text-primary)]">
              $350 Upfront / $350 Final
            </div>
          </div>
        </div>
      </div>

      {/* Day by Day Grid */}
      <div className="space-y-3">
        {schedule.map((item) => {
          const Icon = item.icon;
          const isDone = item.status === "completed";
          const isInProgress = item.status === "in_progress";

          return (
            <div
              key={item.day}
              className={`p-4 rounded-xl border transition-all ${
                isDone
                  ? "bg-[var(--color-panel)] border-[var(--color-border)]"
                  : isInProgress
                  ? "bg-[var(--color-brand-subtle)]/30 border-[var(--color-brand-primary)]/40 ring-1 ring-[var(--color-brand-primary)]/30"
                  : "bg-[var(--color-panel-subtle)] border-[var(--color-border-subtle)] opacity-75"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleDayStatus(item.day)}
                    className="p-1 rounded text-xs font-mono shrink-0 hover:opacity-80 transition-opacity"
                    title="Click to toggle status"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : isInProgress ? (
                      <div className="w-5 h-5 rounded-full border-2 border-[var(--color-brand-primary)] border-t-transparent animate-spin" />
                    ) : (
                      <Circle className="w-5 h-5 text-[var(--color-text-muted)]" />
                    )}
                  </button>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-[var(--color-brand-primary)]">
                      {item.dateLabel}
                    </span>
                    <span className="text-xs font-bold text-[var(--color-text-primary)]">
                      {item.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-[var(--color-text-secondary)] font-semibold">
                    {item.hours} Hours
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold uppercase whitespace-nowrap shrink-0 ${
                      isDone
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : isInProgress
                        ? "bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)] border border-[var(--color-brand-primary)]/30"
                        : "bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] mb-3 pl-8">
                {item.objective}
              </p>

              <div className="pl-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
                  Key Verification Deliverables:
                </span>
                <ul className="space-y-1">
                  {item.deliverables.map((del, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-xs text-[var(--color-text-muted)] flex items-center gap-2 font-mono"
                    >
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
