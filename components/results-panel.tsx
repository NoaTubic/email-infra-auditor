"use client";

import posthog from "posthog-js";
import { ScoreRing } from "./score-ring";
import { BundleBreakdown } from "./bundle-breakdown";
import { ActionItem } from "./action-item";
import { Button } from "./ui/button";
import { CALENDLY_URL } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import type { AuditResults } from "@/lib/scoring";

interface ResultsPanelProps {
  results: AuditResults;
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  return (
    <div className="flex flex-col gap-10">
      {/* Score */}
      <section className="flex flex-col items-center gap-3" aria-label="Overall score">
        <p className="text-sm font-medium text-grey-500">
          Your Deliverability Health Score
        </p>
        <ScoreRing
          score={results.overallScore}
          maxScore={5}
          color={results.tier.color}
          bgColor={results.tier.bgColor}
          tierLabel={results.tier.label}
        />
      </section>

      {/* Top Action Items */}
      {results.actionItems.length > 0 && (
        <section aria-label="Priority action items">
          <h2 className="mb-4 text-base font-semibold text-grey-900">
            Top Priority Fixes
          </h2>
          <div className="flex flex-col gap-3">
            {results.actionItems.map((item, i) => (
              <ActionItem key={item.questionId} item={item} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Bundle Breakdown */}
      <section aria-label="Detailed breakdown by category">
        <h2 className="mb-4 text-base font-semibold text-grey-900">
          Detailed Breakdown
        </h2>
        <BundleBreakdown bundles={results.bundles} />
      </section>

      {/* CTA */}
      <section
        className="rounded-xl border border-grey-200 bg-[var(--surface-card)] p-6 sm:p-8 text-center"
        aria-label="Schedule a consultation"
      >
        <p className="mb-5 text-sm leading-relaxed text-grey-600">
          If you need a deeper analysis of your email infrastructure or your GTM
          motion, schedule a call:
        </p>
        <Button asChild size="lg">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              posthog.capture("cta_clicked", { target: "calendly" })
            }
          >
            Schedule a Free Consultation
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </section>
    </div>
  );
}
