"use client";

import React from "react";
import { CheckCircle2, TrendingUp, Zap, Clock, ShieldCheck } from "lucide-react";

export function BentoKpiGrid() {
  const kpis = [
    {
      title: "Certification Readiness",
      value: "96.4%",
      subtitle: "+4.2% over target threshold",
      trend: "Exam Ready",
      trendPositive: true,
      icon: ShieldCheck,
      color: "var(--color-brand-primary)",
      badge: "Target: 80%+",
    },
    {
      title: "Hands-on Practice Labs",
      value: "14 / 14",
      subtitle: "Messages API, Tools, Caching, MCP",
      trend: "100% Completed",
      trendPositive: true,
      icon: CheckCircle2,
      color: "var(--accent-emerald)",
      badge: "Production Tested",
    },
    {
      title: "Prompt Caching Savings",
      value: "91.4%",
      subtitle: "$0.30/M vs $3.00/M standard input",
      trend: "10x Cheaper",
      trendPositive: true,
      icon: TrendingUp,
      color: "var(--accent-violet)",
      badge: "5-Min Ephemeral TTL",
    },
    {
      title: "Multi-Turn Tool Latency",
      value: "380ms",
      subtitle: "Native tool_runner agent loop",
      trend: "Sub-second",
      trendPositive: true,
      icon: Zap,
      color: "var(--accent-emerald)",
      badge: "SSE Streaming",
    },
    {
      title: "7-Day Execution Pace",
      value: "19.5 Hrs",
      subtitle: "Day 6 Exam • Day 7 Questionnaire",
      trend: "On Schedule",
      trendPositive: true,
      icon: Clock,
      color: "var(--color-brand-primary)",
      badge: "Fixed $700 Milestone",
    },
  ];

  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div
                key={index}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4 shadow-sm hover:border-[var(--color-border-subtle)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] whitespace-nowrap truncate">
                      {kpi.title}
                    </span>
                    <div className="p-1.5 rounded-md bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                    {kpi.value}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between gap-2">
                  <span className="text-xs text-[var(--color-text-muted)] truncate">
                    {kpi.subtitle}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold font-mono bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)] whitespace-nowrap shrink-0">
                    {kpi.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
