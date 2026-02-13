"use client";

import posthog from "posthog-js";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { Badge } from "./ui/badge";
import { BUNDLE_ICONS } from "./bundle-nav";
import { ArrowRight } from "lucide-react";
import type { BundleResult } from "@/lib/scoring";

interface BundleBreakdownProps {
  bundles: BundleResult[];
}

function formatScore(n: number): string {
  return n.toFixed(1);
}

function getScoreColor(normalized: number): string {
  if (normalized >= 4.5) return "text-success-600";
  if (normalized >= 3.5) return "text-blue-600";
  if (normalized >= 2.5) return "text-warning-600";
  return "text-error-600";
}

export function BundleBreakdown({ bundles }: BundleBreakdownProps) {
  return (
    <div className="rounded-xl border border-grey-200 bg-[var(--surface-card)]">
      <Accordion
        type="multiple"
        onValueChange={(values) => {
          for (const v of values) {
            posthog.capture("bundle_expanded", { bundle: v });
          }
        }}
      >
        {bundles.map((bundle) => (
          <AccordionItem key={bundle.bundleId} value={bundle.bundleId}>
            <AccordionTrigger className="px-5">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = BUNDLE_ICONS[bundle.bundleId];
                  return Icon ? <Icon className="h-4 w-4 text-grey-500 shrink-0" /> : null;
                })()}
                <span className="font-medium text-grey-900">{bundle.bundleTitle}</span>
                <span className={`font-mono text-xs font-semibold ${getScoreColor(bundle.normalized)}`}>
                  {formatScore(bundle.normalized)}/5.0
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5">
              <div className="flex flex-col gap-3">
                {bundle.questionResults.map((qr) => {
                  const badgeVariant =
                    qr.tag === "pass"
                      ? "pass"
                      : qr.tag === "critical"
                        ? "critical"
                        : "warning";

                  return (
                    <div
                      key={qr.questionId}
                      className="rounded-lg border border-grey-100 bg-grey-50 p-4"
                    >
                      <div className="mb-1 flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-grey-800">
                          {qr.questionText}
                        </p>
                        <Badge variant={badgeVariant} className="shrink-0">
                          {qr.selectedLabel}
                        </Badge>
                      </div>
                      {qr.note && (
                        <div className="mt-3 flex items-start gap-2">
                          <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-blue-600" />
                          <p className="text-xs leading-relaxed text-grey-500">
                            {qr.note}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
