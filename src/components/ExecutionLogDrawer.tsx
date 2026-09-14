"use client";

import React, { useState } from "react";
import { Terminal, ChevronUp, ChevronDown, Copy, Check, ShieldCheck, Activity } from "lucide-react";

export function ExecutionLogDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleLogs = [
    {
      timestamp: "09:14:02.108",
      event: "STUDY_ACCOUNT_AUTH",
      detail: "Anthropic organization session token verified • Scope: developer_eval",
      level: "INFO",
    },
    {
      timestamp: "09:14:03.421",
      event: "PROMPT_CACHE_HIT",
      detail: "Ephemeral cache breakpoint hit • 18,420 cached input tokens • Cost $0.0055 (-90%)",
      level: "CACHE",
    },
    {
      timestamp: "09:14:04.180",
      event: "TOOL_USE_INVOKE",
      detail: "Dispatched tool_use [query_internal_crm] • Schema validated with Zod",
      level: "AGENT",
    },
    {
      timestamp: "09:14:04.560",
      event: "TOOL_RESULT_RETURN",
      detail: "tool_result appended to message history • 380ms roundtrip latency",
      level: "SUCCESS",
    },
    {
      timestamp: "09:14:05.890",
      event: "EXAM_DIAGNOSTIC_PASS",
      detail: "All 5 domains verified • Overall Readiness: 96.4% • Ready for official proctored exam",
      level: "VERIFIED",
    },
  ];

  const curlSnippet = `curl -X POST https://api.anthropic.com/v1/messages \\
  -H "x-api-key: $ANTHROPIC_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "content-type: application/json" \\
  -d '{
    "model": "claude-sonnet-5",
    "max_tokens": 1024,
    "system": [
      {
        "type": "text",
        "text": "Enterprise Claude Certification Sandbox",
        "cache_control": { "type": "ephemeral" }
      }
    ],
    "messages": [{ "role": "user", "content": "Verify system health" }]
  }'`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[var(--color-panel)] border-t border-[var(--color-border)] text-[var(--color-text-primary)] shadow-2xl transition-colors">
      {/* Drawer Toggle Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-[var(--color-panel-subtle)] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[var(--color-brand-primary)]" />
          <span className="text-xs font-mono font-bold text-[var(--color-text-primary)]">
            Live Telemetry & Execution Event Stream
          </span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap shrink-0">
            <Activity className="w-2.5 h-2.5 animate-pulse" />
            Active
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[var(--color-text-muted)] hidden sm:inline">
            5 Events Logged • 0 Errors • 91.4% Cache Efficiency
          </span>
          <button className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Drawer Content */}
      {isOpen && (
        <div className="p-4 border-t border-[var(--color-border)] max-h-64 overflow-y-auto font-mono text-xs space-y-3 bg-[var(--color-panel-subtle)]">
          <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border-subtle)]">
            <span className="text-[var(--color-text-secondary)] font-semibold">cURL Verification Probe:</span>
            <button
              onClick={handleCopyCurl}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--color-panel)] hover:bg-[var(--color-border)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied cURL" : "Copy cURL"}</span>
            </button>
          </div>

          <pre className="p-2.5 bg-[#0b0d13] rounded-lg border border-[#1e2433] text-zinc-300 text-xs overflow-x-auto shadow-inner leading-relaxed">
            <code>{curlSnippet}</code>
          </pre>

          <div className="pt-1">
            <span className="text-[var(--color-text-secondary)] font-semibold block mb-1.5">
              Structured Telemetry Stream:
            </span>
            <div className="space-y-1 bg-[var(--color-panel)] border border-[var(--color-border)] rounded-lg p-2.5">
              {sampleLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2 py-0.5 text-xs">
                  <span className="text-[var(--color-text-muted)] shrink-0 font-mono">[{log.timestamp}]</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[12px] font-bold shrink-0 ${
                      log.level === "CACHE"
                        ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20"
                        : log.level === "VERIFIED"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {log.event}
                  </span>
                  <span className="text-[var(--color-text-secondary)] truncate font-mono">{log.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
