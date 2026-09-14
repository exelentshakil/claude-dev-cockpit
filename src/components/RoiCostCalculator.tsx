"use client";

import React, { useState } from "react";
import { Calculator, TrendingDown, DollarSign, Zap, Clock, ShieldCheck } from "lucide-react";

export function RoiCostCalculator() {
  const [monthlyTokensMillions, setMonthlyTokensMillions] = useState(25); // 25M tokens/mo
  const [cacheHitRate, setCacheHitRate] = useState(85); // 85% cache hits
  const [developerHoursSavedPerWeek, setDeveloperHoursSavedPerWeek] = useState(12); // 12 hrs/wk
  const [blendedDevHourlyRate, setBlendedDevHourlyRate] = useState(75); // $75/hr

  // Calculations:
  // Standard Claude Sonnet 5 input rate: $3.00 per million tokens
  // Cached input rate (90% discount): $0.30 per million tokens
  const totalInputTokens = monthlyTokensMillions * 1000000;
  const cachedTokens = totalInputTokens * (cacheHitRate / 100);
  const uncachedTokens = totalInputTokens - cachedTokens;

  const standardMonthlyCost = (totalInputTokens / 1000000) * 3.0;
  const optimizedMonthlyCost =
    (uncachedTokens / 1000000) * 3.0 + (cachedTokens / 1000000) * 0.3;
  const monthlyApiSavings = standardMonthlyCost - optimizedMonthlyCost;
  const annualApiSavings = monthlyApiSavings * 12;

  const monthlyLaborSavings = developerHoursSavedPerWeek * 4 * blendedDevHourlyRate;
  const annualLaborSavings = monthlyLaborSavings * 12;

  const totalAnnualSavings = annualApiSavings + annualLaborSavings;
  const netRoiRatio = Math.round((totalAnnualSavings / 700) * 100);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-6 border-b border-[var(--color-border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              Claude Ephemeral Prompt Caching & Operational ROI Engine
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 whitespace-nowrap shrink-0">
              90% Input Cost Reduction
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Quantifying architectural efficiency: comparing raw API execution vs. ephemeral cache breakpoints across large system context prompts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[var(--color-text-muted)]">
            Anthropic Standard: <strong className="text-emerald-500">$0.30/M cached vs $3.00/M standard</strong>
          </span>
        </div>
      </div>

      {/* Interactive Controls & Live Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-7 space-y-5 bg-[var(--color-panel-subtle)] border border-[var(--color-border)] rounded-xl p-5">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-[var(--color-text-secondary)]">Monthly Input Volume (Million Tokens):</span>
              <span className="font-mono text-[var(--color-brand-primary)] text-sm">
                {monthlyTokensMillions}M Tokens / mo
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={monthlyTokensMillions}
              onChange={(e) => setMonthlyTokensMillions(Number(e.target.value))}
              className="w-full accent-[var(--color-brand-primary)] cursor-pointer"
            />
            <div className="flex justify-between text-xs font-mono text-[var(--color-text-muted)] mt-1">
              <span>5M</span>
              <span>50M</span>
              <span>100M Tokens</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-[var(--color-text-secondary)]">
                Ephemeral Prompt Cache Hit Rate (%):
              </span>
              <span className="font-mono text-emerald-500 text-sm">{cacheHitRate}% Cache Hits</span>
            </div>
            <input
              type="range"
              min="40"
              max="98"
              step="1"
              value={cacheHitRate}
              onChange={(e) => setCacheHitRate(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-xs font-mono text-[var(--color-text-muted)] mt-1">
              <span>40%</span>
              <span>75%</span>
              <span>98% Max</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-[var(--color-text-secondary)]">
                Engineering Hours Saved per Week (Claude Code):
              </span>
              <span className="font-mono text-violet-500 text-sm">
                {developerHoursSavedPerWeek} Hours / wk
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="30"
              step="2"
              value={developerHoursSavedPerWeek}
              onChange={(e) => setDeveloperHoursSavedPerWeek(Number(e.target.value))}
              className="w-full accent-violet-500 cursor-pointer"
            />
            <div className="flex justify-between text-xs font-mono text-[var(--color-text-muted)] mt-1">
              <span>4 hrs</span>
              <span>16 hrs</span>
              <span>30 hrs / wk</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-[var(--color-text-secondary)]">
                Blended Senior Engineering Rate ($/hr):
              </span>
              <span className="font-mono text-[var(--color-text-primary)] text-sm">
                ${blendedDevHourlyRate}.00 / hr
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="150"
              step="5"
              value={blendedDevHourlyRate}
              onChange={(e) => setBlendedDevHourlyRate(Number(e.target.value))}
              className="w-full accent-[var(--color-brand-primary)] cursor-pointer"
            />
          </div>
        </div>

        {/* Right Column: Calculated ROI Bento Display */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-4">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] mb-1">
              <span>Standard API Burn (No Cache)</span>
              <span>Claude Sonnet 5</span>
            </div>
            <div className="text-xl font-bold font-mono text-red-400 line-through">
              ${standardMonthlyCost.toLocaleString("en-US", { minimumFractionDigits: 2 })} / mo
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-[var(--color-text-muted)]">
                  Optimized Ephemeral Cost:
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-500">
                  ${optimizedMonthlyCost.toLocaleString("en-US", { minimumFractionDigits: 2 })} / mo
                </div>
              </div>
              <div className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-500 whitespace-nowrap shrink-0">
                -90% Cache Disc.
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Total Annual Operational Value Saved
            </div>
            <div className="text-3xl font-extrabold font-mono text-[var(--color-text-primary)] tracking-tight">
              ${totalAnnualSavings.toLocaleString("en-US", { minimumFractionDigits: 0 })} / yr
            </div>
            <div className="text-xs text-[var(--color-text-muted)] font-mono mt-1">
              API Savings: ${annualApiSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })} • Labor Value: ${annualLaborSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--color-text-secondary)]">7-Day Engagement Net ROI:</span>
            <span className="text-emerald-500 font-bold text-sm">+{netRoiRatio.toLocaleString()}% ROI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
