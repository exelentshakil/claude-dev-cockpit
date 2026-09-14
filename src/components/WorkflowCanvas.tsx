"use client";

import React, { useState, useEffect } from "react";
import {
  KeyRound,
  BookOpen,
  Wrench,
  Award,
  FileCheck,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Activity,
  ArrowRight,
} from "lucide-react";

interface NodeState {
  id: number;
  label: string;
  sublabel: string;
  tag: string;
  icon: any;
  status: "idle" | "running" | "completed";
  duration: string;
  telemetry: string;
}

export function WorkflowCanvas() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [packetProgress, setPacketProgress] = useState(0);

  const initialNodes: NodeState[] = [
    {
      id: 1,
      label: "Account & Syllabus Ingestion",
      sublabel: "Provision study credentials & map 5-domain blueprint",
      tag: "Day 1 (2.5h)",
      icon: KeyRound,
      status: "completed",
      duration: "150m",
      telemetry: "200 OK • Sandbox Credentials Armed",
    },
    {
      id: 2,
      label: "Messages API & Prompt Caching",
      sublabel: "SSE streaming & ephemeral cache benchmarks",
      tag: "Day 2-3 (6.5h)",
      icon: BookOpen,
      status: "completed",
      duration: "390m",
      telemetry: "Cache Hit: 91.4% • TTFT 340ms",
    },
    {
      id: 3,
      label: "Tool Use, Loops & MCP",
      sublabel: "JSON Schema tools, agent runner & subagent workflows",
      tag: "Day 4 (3.5h)",
      icon: Wrench,
      status: "completed",
      duration: "210m",
      telemetry: "Tool Loop Roundtrip: 380ms",
    },
    {
      id: 4,
      label: "Official Certification Exam",
      sublabel: "Proctored test taken under Shakil Ahmed's verified name",
      tag: "Day 6 (2.0h)",
      icon: Award,
      status: "completed",
      duration: "120m",
      telemetry: "Score: 96% • Verified Digital Badge",
    },
    {
      id: 5,
      label: "Follow-Up Questionnaire",
      sublabel: "Comprehensive DX feedback & completion sign-off",
      tag: "Day 7 (2.0h)",
      icon: FileCheck,
      status: "completed",
      duration: "120m",
      telemetry: "Feedback Dispatched • $700 Milestone Finalized",
    },
  ];

  const [nodes, setNodes] = useState<NodeState[]>(initialNodes);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1);
    setPacketProgress(0);

    // Reset nodes to running sequence
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        status: n.id === 1 ? "running" : "idle",
      }))
    );

    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      if (current <= 5) {
        setActiveStep(current);
        setNodes((prev) =>
          prev.map((n) => {
            if (n.id < current) return { ...n, status: "completed" };
            if (n.id === current) return { ...n, status: "running" };
            return { ...n, status: "idle" };
          })
        );
      } else {
        clearInterval(interval);
        setActiveStep(null);
        setIsRunning(false);
        setNodes((prev) => prev.map((n) => ({ ...n, status: "completed" })));
      }
    }, 1200);
  };

  const resetPipeline = () => {
    setIsRunning(false);
    setActiveStep(null);
    setNodes(initialNodes);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
      {/* Canvas Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--color-border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              Interactive 7-Day Certification & Production Pipeline
            </h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)] border border-[var(--color-brand-primary)]/20 whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] animate-ping"></span>
              Live Event Mesh
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Visualizing deterministic progression from study credentials to proctored credential pass and post-exam evaluation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetPipeline}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-panel-subtle)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] border border-[var(--color-border)] transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white transition-colors whitespace-nowrap shrink-0 shadow-sm disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : ""}`} />
            {isRunning ? "Simulating Pipeline..." : "Simulate Full 7-Day Cycle"}
          </button>
        </div>
      </div>

      {/* Visual Pipeline Nodes */}
      <div className="relative overflow-x-auto pb-4 pt-2">
        <div className="min-w-[840px] flex items-center justify-between gap-2 relative">
          {/* Animated Connecting SVG Wire Behind Nodes */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-[var(--color-border-subtle)] z-0 pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-brand-primary)] via-emerald-500 to-violet-500 transition-all duration-700"
              style={{
                width: isRunning && activeStep ? `${((activeStep - 1) / 4) * 100}%` : "100%",
              }}
            ></div>
          </div>

          {nodes.map((node) => {
            const Icon = node.icon;
            const isStepActive = activeStep === node.id;
            const isCompleted = node.status === "completed";

            return (
              <div
                key={node.id}
                className="relative z-10 flex-1 max-w-[200px] flex flex-col items-center text-center group"
              >
                {/* Node Pill / Circle */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
                    isStepActive
                      ? "bg-[var(--color-brand-primary)] text-white ring-4 ring-[var(--color-brand-primary)]/30 scale-110"
                      : isCompleted
                      ? "bg-emerald-500/10 text-emerald-500 border-2 border-emerald-500"
                      : "bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Status Badge */}
                <div className="mt-2.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-semibold whitespace-nowrap shrink-0 ${
                      isStepActive
                        ? "bg-[var(--color-brand-subtle)] text-[var(--color-brand-primary)] border border-[var(--color-brand-primary)]/30"
                        : isCompleted
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : "bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                    }`}
                  >
                    {isStepActive ? "EXECUTING..." : isCompleted ? "VERIFIED" : "ARMED"}
                  </span>
                </div>

                {/* Node Text Content */}
                <div className="mt-2 w-full px-1">
                  <h3 className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                    {node.label}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 mt-0.5">
                    {node.sublabel}
                  </p>
                </div>

                {/* Telemetry Micro-Card */}
                <div className="mt-2.5 w-full bg-[var(--color-panel-subtle)] border border-[var(--color-border-subtle)] rounded p-1.5 text-left">
                  <div className="text-xs font-mono text-[var(--color-text-muted)] flex justify-between">
                    <span>{node.tag}</span>
                    <span className="font-semibold text-[var(--color-text-secondary)]">{node.duration}</span>
                  </div>
                  <div className="text-xs font-mono text-[var(--color-text-primary)] truncate mt-0.5 font-medium">
                    {node.telemetry}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Pipeline Telemetry Ribbon */}
      <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[var(--color-text-muted)] font-mono">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[var(--color-brand-primary)]" />
          <span>Execution Engine: Event-driven Inngest Step Functions • Zero Flaky Polling</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Failover: Sub-500ms</span>
          <span className="text-emerald-500">Security: SOC2 Compliant Sandbox</span>
        </div>
      </div>
    </div>
  );
}
