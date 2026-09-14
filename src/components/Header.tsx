"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  Cpu,
  Activity,
  Calendar,
  FileQuestion,
  Calculator,
  Download,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenTestLab: () => void;
}

export function Header({ activeTab, setActiveTab, onOpenTestLab }: HeaderProps) {
  const tabs = [
    { id: "syllabus", label: "Certification Syllabus", icon: Layers },
    { id: "lab", label: "Live Lab Simulator", icon: Cpu, isLive: true },
    { id: "pipeline", label: "Workflow Pipeline", icon: Activity },
    { id: "study-plan", label: "7-Day Study Plan", icon: Calendar },
    { id: "questionnaire", label: "Technical Evaluation", icon: FileQuestion },
    { id: "roi", label: "Prompt Caching ROI", icon: Calculator },
    { id: "blueprints", label: "Export Blueprints", icon: Download },
  ];

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-panel)] py-4 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Status Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-[var(--color-brand-primary)] text-white flex items-center justify-center font-mono font-bold text-sm shadow-md shadow-[var(--color-brand-subtle)]">
              CC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-[var(--color-text-primary)]">
                  Claude Developer Certification Workbench
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Ready to Deploy
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">
                Principal Architect: Shakil Ahmed • Enterprise Messages API v1 • Ref #BS-2026-CLAUDE-001
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap shrink-0">
              <span className="text-[var(--color-brand-primary)]">SLA:</span> 7 Calendar Days
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap shrink-0">
              <span className="text-emerald-600 dark:text-emerald-400">Readiness:</span> 96.4%
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap shrink-0">
              <span className="text-violet-600 dark:text-violet-400">Architecture:</span> Messages API v1
            </div>
            <button
              onClick={onOpenTestLab}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test Live AI Lab</span>
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pt-3 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.isLive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
