"use client";

import { BUNDLES } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { Check, Globe, Building2, Flame, BarChart3, Send, type LucideIcon } from "lucide-react";
import type { Answers } from "@/lib/scoring";

interface BundleNavProps {
  activeBundle: number;
  answers: Answers;
  onBundleClick: (index: number) => void;
}

export const BUNDLE_ICONS: Record<string, LucideIcon> = {
  domain: Globe,
  tenants: Building2,
  warmup: Flame,
  tracking: BarChart3,
  sending: Send,
};

const bundleIcons = [Globe, Building2, Flame, BarChart3, Send];

const bundleShortTitles: Record<string, string> = {
  domain: "Domain",
  tenants: "Tenants",
  warmup: "Warm-Up",
  tracking: "Tracking",
  sending: "Sending",
};

function getBundleProgress(bundleIndex: number, answers: Answers): "empty" | "partial" | "complete" {
  const bundle = BUNDLES[bundleIndex];
  const answered = bundle.questions.filter((q) => answers[q.id] !== undefined).length;
  if (answered === 0) return "empty";
  if (answered === bundle.questions.length) return "complete";
  return "partial";
}

export function BundleNav({ activeBundle, answers, onBundleClick }: BundleNavProps) {
  return (
    <div className="w-full" role="tablist" aria-label="Audit categories">
      {/* Desktop: horizontal tabs */}
      <div className="hidden sm:flex gap-1 rounded-xl bg-grey-100 p-1">
        {BUNDLES.map((bundle, index) => {
          const isActive = index === activeBundle;
          const progress = getBundleProgress(index, answers);
          const Icon = BUNDLE_ICONS[bundle.id] ?? bundleIcons[index];

          return (
            <button
              key={bundle.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${bundle.id}`}
              aria-label={bundle.title}
              onClick={() => onBundleClick(index)}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-[var(--surface-tab)] text-grey-900 shadow-sm"
                  : "text-grey-500 hover:text-grey-700 hover:bg-grey-50"
              )}
            >
              {progress === "complete" ? (
                <Check className="h-3.5 w-3.5 text-success-500 shrink-0" />
              ) : (
                <Icon className="h-3.5 w-3.5 shrink-0" />
              )}
              <span className="truncate">{bundleShortTitles[bundle.id] ?? bundle.title}</span>
              {progress === "partial" && (
                <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile: scrollable pills */}
      <div className="flex sm:hidden gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
        {BUNDLES.map((bundle, index) => {
          const isActive = index === activeBundle;
          const progress = getBundleProgress(index, answers);
          const Icon = BUNDLE_ICONS[bundle.id] ?? bundleIcons[index];

          return (
            <button
              key={bundle.id}
              role="tab"
              aria-selected={isActive}
              aria-label={bundle.title}
              onClick={() => onBundleClick(index)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-grey-950 text-grey-50"
                  : "bg-grey-100 text-grey-600 hover:bg-grey-200"
              )}
            >
              {progress === "complete" ? (
                <Check className="h-3.5 w-3.5 text-success-400 shrink-0" />
              ) : (
                <Icon className="h-3.5 w-3.5 shrink-0" />
              )}
              {bundleShortTitles[bundle.id] ?? bundle.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
