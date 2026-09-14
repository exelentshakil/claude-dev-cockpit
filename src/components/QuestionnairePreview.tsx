"use client";

import React, { useState } from "react";
import {
  FileQuestion,
  Star,
  CheckCircle2,
  Send,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  RotateCcw,
} from "lucide-react";

export function QuestionnairePreview() {
  const [candidateName, setCandidateName] = useState("Shakil Ahmed");
  const [ratingApiErgonomics, setRatingApiErgonomics] = useState(5);
  const [ratingPromptCaching, setRatingPromptCaching] = useState(5);
  const [ratingToolUse, setRatingToolUse] = useState(5);
  const [ratingClaudeCode, setRatingClaudeCode] = useState(5);

  const [feedbackApi, setFeedbackApi] = useState(
    "The Anthropic Messages API v1 streaming protocol with SSE is exceptionally clean. Sub-second TTFT when paired with ephemeral prompt caching makes multi-turn agent loops feel near-instantaneous. Error classification (e.g. rate_limit_error vs overloaded_error) is deterministic and easy to handle with exponential backoff."
  );

  const [feedbackCaching, setFeedbackCaching] = useState(
    "Ephemeral prompt caching with a 5-minute rolling window and a 1,024 token minimum for Sonnet delivers an immediate 90% cost drop on large system manuals. Adding telemetry headers directly to response bodies (cache_read_input_tokens) enables transparent client-side billing auditing."
  );

  const [feedbackToolUse, setFeedbackToolUse] = useState(
    "Model Context Protocol (MCP) simplifies standardizing tool definitions across both local stdio processes and remote SSE endpoints. Strict JSON Schema parameter enforcement eliminates hallucinated tool arguments."
  );

  const [recommendations, setRecommendations] = useState(
    "1. Introduce visual breakpoint debuggers for prompt caching TTL inspection in the developer console.\n2. Expand official SDK types for subagent tool pipelines in headless Claude Code runs."
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName,
          ratingApiErgonomics,
          ratingPromptCaching,
          ratingToolUse,
          ratingClaudeCode,
          feedbackApi,
          feedbackCaching,
          feedbackToolUse,
          recommendations: recommendations.split("\n"),
        }),
      });

      const data = await res.json();
      setSubmissionResult(data);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--color-border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              Technical Architecture & Developer Experience Evaluation
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-500 border border-violet-500/20 whitespace-nowrap shrink-0">
              Architecture Audit Module
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Developer experience (DX) and architecture evaluation workbench collecting actionable diagnostic insights across Anthropic Messages API v1, Prompt Caching, and CLI tooling.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[var(--color-text-muted)]">
            Evaluation Standard: <strong className="text-emerald-500">Anthropic Production Readiness</strong>
          </span>
        </div>
      </div>

      {submissionResult ? (
        <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1">
            Questionnaire Successfully Recorded!
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] max-w-md mx-auto mb-4 font-mono">
            Submission ID: {submissionResult.submissionId} • Status: {submissionResult.summary.certificationStatus}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] mb-4">
            <span>Evaluated 5 Domains • 4 Ratings: 5/5 • Actionable Insights Packaged</span>
          </div>
          <div>
            <button
              onClick={() => setSubmissionResult(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-panel)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Edit or Retest Submission
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate & Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
                Candidate Name:
              </label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full bg-[var(--color-panel)] border border-[var(--color-border)] rounded px-3 py-1.5 text-xs font-mono text-[var(--color-text-primary)]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">
                Certification Status Verified:
              </label>
              <div className="px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                PASSED (Official Score: 96.4%)
              </div>
            </div>
          </div>

          {/* Rating Matrix */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)] pb-2">
              Domain Ratings & Developer Experience Evaluation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[var(--color-text-primary)]">Anthropic Messages API Ergonomics</div>
                  <div className="text-xs text-[var(--color-text-muted)]">REST schema, SSE streaming, error codes</div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRatingApiErgonomics(star)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= ratingApiErgonomics ? "fill-amber-400 text-amber-400" : "text-zinc-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[var(--color-text-primary)]">Ephemeral Prompt Caching Efficacy</div>
                  <div className="text-xs text-[var(--color-text-muted)]">5-min TTL, 90% cost drop, TTFT latency</div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRatingPromptCaching(star)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= ratingPromptCaching ? "fill-amber-400 text-amber-400" : "text-zinc-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[var(--color-text-primary)]">Tool Use & Model Context Protocol (MCP)</div>
                  <div className="text-xs text-[var(--color-text-muted)]">JSON schema, multi-turn loops, transports</div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRatingToolUse(star)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= ratingToolUse ? "fill-amber-400 text-amber-400" : "text-zinc-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[var(--color-text-primary)]">Claude Code CLI & Agent SDK DX</div>
                  <div className="text-xs text-[var(--color-text-muted)]">Headless commands, CLAUDE.md, hooks</div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRatingClaudeCode(star)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= ratingClaudeCode ? "fill-amber-400 text-amber-400" : "text-zinc-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Qualitative Text Areas */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] border-b border-[var(--color-border-subtle)] pb-2">
              Detailed Architectural Feedback & Production Observations
            </h3>

            <div>
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] block mb-1">
                1. Messages API & Streaming Observations:
              </label>
              <textarea
                rows={2}
                value={feedbackApi}
                onChange={(e) => setFeedbackApi(e.target.value)}
                className="w-full bg-[var(--color-panel-subtle)] border border-[var(--color-border)] rounded-lg p-2.5 text-xs font-mono text-[var(--color-text-primary)]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] block mb-1">
                2. Ephemeral Prompt Caching Production Performance:
              </label>
              <textarea
                rows={2}
                value={feedbackCaching}
                onChange={(e) => setFeedbackCaching(e.target.value)}
                className="w-full bg-[var(--color-panel-subtle)] border border-[var(--color-border)] rounded-lg p-2.5 text-xs font-mono text-[var(--color-text-primary)]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] block mb-1">
                3. Tool Use, Function Calling & MCP Transports:
              </label>
              <textarea
                rows={2}
                value={feedbackToolUse}
                onChange={(e) => setFeedbackToolUse(e.target.value)}
                className="w-full bg-[var(--color-panel-subtle)] border border-[var(--color-border)] rounded-lg p-2.5 text-xs font-mono text-[var(--color-text-primary)]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] block mb-1">
                4. Actionable Platform & Developer Relations Recommendations:
              </label>
              <textarea
                rows={2}
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
                className="w-full bg-[var(--color-panel-subtle)] border border-[var(--color-border)] rounded-lg p-2.5 text-xs font-mono text-[var(--color-text-primary)]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-[var(--color-border-subtle)]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  Submitting Evaluation...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Submit Official Post-Cert Questionnaire
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
