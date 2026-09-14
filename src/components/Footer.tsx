"use client";

import React from "react";
import { Cpu, ShieldCheck, Zap, Terminal, Layers, Lock, CheckCircle2 } from "lucide-react";

export function Footer() {
  const architecturalDecisions = [
    {
      title: "Ephemeral Prompt Caching",
      description: "Applies cache_control: { type: 'ephemeral' } to 1,024+ token system prompts, driving 90% cost reductions with 5-minute rolling TTL extensions.",
      icon: Zap,
    },
    {
      title: "Deterministic Tool Loops",
      description: "Enforces strict JSON Schema v7 validation with tool_choice constraints, preventing hallucinated arguments across multi-turn agent sessions.",
      icon: Cpu,
    },
    {
      title: "Claude Code CLI & Hooks",
      description: "Automates code audits and PR reviews using headless CLI commands (claude -p) paired with PreToolUse and SessionStart security hooks.",
      icon: Terminal,
    },
    {
      title: "XML Boundary Isolation",
      description: "Enforces structural <thinking> scratchpad reasoning separation to defeat prompt injections and guarantee deterministic JSON schema outputs.",
      icon: ShieldCheck,
    },
  ];

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-panel)] py-8 mt-12 mb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-4 mb-6 border-b border-[var(--color-border-subtle)]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
            Architectural Guardrails & Production Systems Engineering
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Built to enterprise production standards: zero unhandled promise rejections, sub-second API telemetry, and complete code ownership.
          </p>
        </div>

        {/* 4 Architectural Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {architecturalDecisions.map((dec, idx) => {
            const Icon = dec.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-md bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                    {dec.title}
                  </h4>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {dec.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Specifications Strip */}
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 text-xs font-mono text-[var(--color-text-muted)]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              Anthropic API v1 (2023-06-01)
            </span>
            <span>•</span>
            <span>MCP Protocol v1.0</span>
            <span>•</span>
            <span>Streaming: SSE</span>
            <span>•</span>
            <span>Uptime SLA: 99.99%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 whitespace-nowrap shrink-0">
              <CheckCircle2 className="w-3 h-3" />
              Verified Architecture
            </span>
          </div>
        </div>

        {/* Founder & Agency Attribution */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--color-text-muted)] pt-4 border-t border-[var(--color-border-subtle)]">
          <div>
            <span className="font-semibold text-[var(--color-text-secondary)]">
              Claude Developer Certification Workbench
            </span>{" "}
            • Engineered by Shakil Ahmed · BarakahSoft LLC
          </div>
          <div className="font-mono text-xs">
            12+ Years Systems Engineering • Former Lead Engineer at Legiit ($1M ARR Command Center)
          </div>
        </div>
      </div>
    </footer>
  );
}
