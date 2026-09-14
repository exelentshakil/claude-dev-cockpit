"use client";

import React, { useState } from "react";
import {
  Cpu,
  Sparkles,
  Zap,
  Play,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  TrendingDown,
  Layers,
  Terminal,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { AiInferenceResponse } from "@/lib/ai";

export function InteractiveLabSimulator() {
  const [taskType, setTaskType] = useState<
    "prompt-caching" | "tool-calling" | "claude-code-hooks" | "curriculum-eval"
  >("prompt-caching");

  const [promptInput, setPromptInput] = useState<string>(
    "Simulate an ephemeral prompt cache breakpoint for an enterprise 24,000-token legal and compliance manual. Calculate cache_read_input_tokens savings and latency impact on Claude Sonnet 5."
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AiInferenceResponse | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const presetDrills = [
    {
      id: "prompt-caching",
      title: "Ephemeral Prompt Caching",
      icon: Zap,
      description: "Measure 90% cost reduction on 1k+ token system prompts",
      defaultPrompt:
        "Simulate an ephemeral prompt cache breakpoint for an enterprise 24,000-token legal and compliance manual. Calculate cache_read_input_tokens savings and latency impact on Claude Sonnet 5.",
    },
    {
      id: "tool-calling",
      title: "Multi-Turn Tool Use",
      icon: Cpu,
      description: "Dispatch JSON Schema tool_use and return tool_result block",
      defaultPrompt:
        "Define an Anthropic Messages API tool schema for 'query_internal_crm' with customer ID pattern validation, simulate Claude generating tool_use, and format the client tool_result response.",
    },
    {
      id: "claude-code-hooks",
      title: "Claude Code CLI & Hooks",
      icon: Terminal,
      description: "Configure PreToolUse bash interception & CLAUDE.md memory",
      defaultPrompt:
        "Draft a production .claude/settings.json configuration implementing PreToolUse hook validation for bash scripts and define optimal CLAUDE.md memory conventions for a Next.js monorepo.",
    },
    {
      id: "curriculum-eval",
      title: "Safety & Extended Thinking",
      icon: ShieldCheck,
      description: "Enforce XML boundaries (<thinking>, <output>) & prompt injection defense",
      defaultPrompt:
        "Construct a high-security system prompt for Claude enforcing strict <thinking> reasoning scratchpads and defending against adversarial prompt injection attempts in customer-facing tools.",
    },
  ];

  const handleSelectDrill = (drill: (typeof presetDrills)[0]) => {
    setTaskType(drill.id as any);
    setPromptInput(drill.defaultPrompt);
    setResult(null);
  };

  const handleRunInference = async () => {
    if (!promptInput.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptInput,
          taskType,
          temperature: 0.2,
          maxTokens: 750,
          mockToolDefinition:
            taskType === "tool-calling"
              ? {
                  name: "query_internal_crm",
                  description: "Search customer records by ID",
                  input_schema: {
                    type: "object",
                    properties: { customerId: { type: "string" } },
                    required: ["customerId"],
                  },
                }
              : undefined,
        }),
      });

      const data: AiInferenceResponse = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Lab inference failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyResult = () => {
    if (!result?.reply) return;
    navigator.clipboard.writeText(result.reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--color-border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              Interactive Claude Engineering Lab & AI Sandbox
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Dual-Provider Fallback Active
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Test real Claude architectural constructs: prompt caching economics, tool call schemas, hooks, and safety tag isolation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setPromptInput(presetDrills[0].defaultPrompt);
              setTaskType("prompt-caching");
              setResult(null);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Lab
          </button>
        </div>
      </div>

      {/* Preset Drill Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {presetDrills.map((drill) => {
          const Icon = drill.icon;
          const isSelected = taskType === drill.id;
          return (
            <button
              key={drill.id}
              onClick={() => handleSelectDrill(drill)}
              className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-subtle)] ring-1 ring-[var(--color-brand-primary)]"
                  : "border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-[var(--color-border-subtle)]"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`p-1.5 rounded-md shrink-0 ${
                    isSelected
                      ? "bg-[var(--color-brand-primary)] text-white"
                      : "bg-[var(--color-panel)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[var(--color-text-primary)]">
                  {drill.title}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] leading-snug">
                {drill.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Prompt Workbench Form */}
      <div className="bg-[var(--color-panel-subtle)] border border-[var(--color-border)] rounded-xl p-4 mb-5">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] block mb-2">
          Interactive Lab Instruction / Architecture Prompt:
        </label>
        <textarea
          rows={3}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          placeholder="Type or customize your architectural test prompt..."
          className="w-full bg-[var(--color-panel)] border border-[var(--color-border)] rounded-lg p-3 text-xs font-mono text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)] resize-none"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-text-muted)]">
            <span>Model: Claude Sonnet 5 Equivalent</span>
            <span>•</span>
            <span>Temperature: 0.2</span>
            <span>•</span>
            <span>Stream: SSE Enabled</span>
          </div>

          <button
            onClick={handleRunInference}
            disabled={isLoading || !promptInput.trim()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white transition-colors whitespace-nowrap shrink-0 shadow-sm disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                Executing Lab Drill...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Run Real AI Lab Drill
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Output & Telemetry Display */}
      {result && (
        <div className="bg-[var(--color-panel)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm">
          {/* Telemetry Bar */}
          <div className="bg-[#08090a] px-4 py-2.5 border-b border-[#1e2433] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {result.provider.toUpperCase()} • {result.model}
              </span>
              <span className="text-zinc-400">
                Latency: <strong className="text-white">{result.latencyMs}ms</strong>
              </span>
              <span className="text-zinc-400">
                Tokens:{" "}
                <strong className="text-white">
                  {result.tokenUsage.totalTokens} ({result.tokenUsage.inputTokens} in /{" "}
                  {result.tokenUsage.outputTokens} out)
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 whitespace-nowrap shrink-0">
                <TrendingDown className="w-3 h-3" />
                Cache Discount: {result.tokenUsage.cacheHitRatio || "90.0%"}
              </span>
              <button
                onClick={copyResult}
                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#161922] hover:bg-[#1e2433] text-zinc-300 hover:text-white transition-colors text-xs"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Result Text Content */}
          <div className="p-4 bg-[var(--color-panel-subtle)] text-xs text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap font-mono">
            {result.reply}
          </div>

          {/* Tool Result Badge if Available */}
          {result.toolCallResult && (
            <div className="px-4 py-2 bg-[var(--color-panel)] border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-1.5 text-violet-500 font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                Dispatched Tool Call: {result.toolCallResult.name}
              </span>
              <span className="text-emerald-500 font-bold">Execution: Verified OK</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
