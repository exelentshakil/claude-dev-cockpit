"use client";

import React, { useState } from "react";
import {
  SYLLABUS_DOMAINS,
  SyllabusDomain,
  SyllabusTopic,
  MOCK_EXAM_QUESTIONS,
  MockQuestion,
} from "@/lib/syllabusData";
import {
  Cpu,
  Wrench,
  Terminal,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Code2,
  FileQuestion,
  ChevronRight,
  BookOpen,
  Copy,
  Check,
} from "lucide-react";

export function CertSyllabusMatrix() {
  const [selectedDomainId, setSelectedDomainId] = useState<string>(SYLLABUS_DOMAINS[0].id);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [activeQuizAnswer, setActiveQuizAnswer] = useState<Record<string, string>>({});
  const [showQuizExplanation, setShowQuizExplanation] = useState<Record<string, boolean>>({});

  const currentDomain =
    SYLLABUS_DOMAINS.find((d) => d.id === selectedDomainId) || SYLLABUS_DOMAINS[0];

  const domainIcons: Record<string, any> = {
    "domain-1-messages-api": Cpu,
    "domain-2-tool-use": Wrench,
    "domain-3-claude-code-cli": Terminal,
    "domain-4-models-context": Layers,
    "domain-5-safety-evals": ShieldCheck,
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleSelectAnswer = (qId: string, label: string) => {
    setActiveQuizAnswer((prev) => ({ ...prev, [qId]: label }));
    setShowQuizExplanation((prev) => ({ ...prev, [qId]: true }));
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--color-border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              Official Claude Developer Certification Syllabus & Readiness Matrix
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 whitespace-nowrap shrink-0">
              100% Curriculum Mapped
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Exhaustive 5-domain mastery framework: Anthropic Messages API, Ephemeral Prompt Caching, Tool Calling, Claude Code CLI, and Extended Thinking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-md bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs font-mono">
            <span className="text-[var(--color-text-muted)]">Target Score:</span>{" "}
            <span className="font-bold text-emerald-500">80%+ (Readiness: 96.4%)</span>
          </div>
        </div>
      </div>

      {/* Domain Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-6">
        {SYLLABUS_DOMAINS.map((domain) => {
          const Icon = domainIcons[domain.id] || BookOpen;
          const isSelected = selectedDomainId === domain.id;
          return (
            <button
              key={domain.id}
              onClick={() => setSelectedDomainId(domain.id)}
              className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-subtle)] ring-1 ring-[var(--color-brand-primary)]"
                  : "border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-[var(--color-border-subtle)]"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-mono font-bold text-[var(--color-brand-primary)]">
                  Domain 0{domain.domainNumber}
                </span>
                <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded bg-[var(--color-panel)] border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap shrink-0">
                  {domain.weight}% Weight
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`p-1.5 rounded-md shrink-0 ${
                    isSelected
                      ? "bg-[var(--color-brand-primary)] text-white"
                      : "bg-[var(--color-panel)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[var(--color-text-primary)] line-clamp-2 leading-snug">
                  {domain.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Domain Detailed View */}
      <div className="bg-[var(--color-panel-subtle)] border border-[var(--color-border)] rounded-xl p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--color-border-subtle)]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                Domain 0{currentDomain.domainNumber}: {currentDomain.title}
              </h3>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-[var(--color-panel)] border border-[var(--color-border)] text-[var(--color-text-secondary)] whitespace-nowrap shrink-0">
                Exam Weight: {currentDomain.weight}%
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              {currentDomain.description}
            </p>
          </div>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {currentDomain.topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-[var(--color-panel)] border border-[var(--color-border)] rounded-lg p-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--color-text-primary)]">
                    {topic.title}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 whitespace-nowrap shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    Readiness: {topic.readinessScore}%
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)]">
                  <span>Weight: {topic.examWeight}</span>
                  <span>•</span>
                  <span>Lab: {topic.durationMinutes} mins</span>
                </div>
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] mb-3">
                {topic.summary}
              </p>

              {/* Key Competencies Chips */}
              <div className="mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1.5">
                  Assessed Production Competencies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {topic.keySkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)] whitespace-nowrap shrink-0"
                    >
                      <Check className="w-3 h-3 text-emerald-500" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Code Snippet */}
              {topic.codeSnippet && (
                <div className="mt-3">
                  <div className="flex items-center justify-between bg-[#08090a] px-3 py-1.5 rounded-t-md border-t border-x border-[#1e2433]">
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[var(--color-brand-primary)]" />
                      Production TypeScript Implementation
                    </span>
                    <button
                      onClick={() => handleCopyCode(topic.id, topic.codeSnippet!)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedCodeId === topic.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-[#0b0d13] text-zinc-200 p-3 rounded-b-md text-xs font-mono overflow-x-auto border border-[#1e2433] leading-relaxed">
                    <code>{topic.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Mock Exam Question Diagnostic */}
      <div className="border border-[var(--color-border)] bg-[var(--color-panel-subtle)] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <FileQuestion className="w-4 h-4 text-[var(--color-brand-primary)]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
            Certification Knowledge Diagnostic Drill
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_EXAM_QUESTIONS.map((q) => {
            const selected = activeQuizAnswer[q.id];
            const isAnswered = Boolean(selected);
            const isCorrect = selected === q.correctAnswer;

            return (
              <div
                key={q.id}
                className="bg-[var(--color-panel)] border border-[var(--color-border)] rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--color-brand-primary)] block mb-1">
                    Sample Question • {q.domainId}
                  </span>
                  <p className="text-xs font-medium text-[var(--color-text-primary)] mb-3">
                    {q.question}
                  </p>

                  <div className="space-y-1.5 mb-3">
                    {q.options.map((opt) => {
                      const isOptionSelected = selected === opt.label;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => handleSelectAnswer(q.id, opt.label)}
                          className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-mono flex items-center justify-between border transition-all ${
                            isOptionSelected
                              ? isCorrect
                                ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold"
                                : "bg-red-500/10 border-red-500 text-red-500"
                              : "bg-[var(--color-panel-subtle)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-subtle)]"
                          }`}
                        >
                          <span>
                            <strong>{opt.label}.</strong> {opt.text}
                          </span>
                          {isOptionSelected && (
                            <span>{isCorrect ? "✓" : "✗"}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {showQuizExplanation[q.id] && (
                  <div className="p-2.5 rounded bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] mt-2">
                    <span className="font-bold text-emerald-500 block mb-0.5">
                      Correct Answer: {q.correctAnswer}
                    </span>
                    <p className="leading-snug">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
