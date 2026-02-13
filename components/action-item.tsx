import { Badge } from "./ui/badge";
import type { ActionItem as ActionItemType } from "@/lib/scoring";
import { AlertTriangle, CircleAlert, ArrowRight } from "lucide-react";

interface ActionItemProps {
  item: ActionItemType;
  index: number;
}

export function ActionItem({ item, index }: ActionItemProps) {
  const isCritical = item.tag === "critical";

  return (
    <div
      className="animate-fade-up rounded-xl border border-grey-200 bg-[var(--surface-card)] p-5 transition-shadow hover:shadow-sm"
      style={{ animationDelay: `${(index + 1) * 100}ms`, opacity: 0 }}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-grey-950 text-xs font-bold text-grey-50">
          {index + 1}
        </span>
        <Badge variant={isCritical ? "critical" : "warning"}>
          {isCritical ? (
            <>
              <CircleAlert className="h-3 w-3" />
              Critical
            </>
          ) : (
            <>
              <AlertTriangle className="h-3 w-3" />
              Needs Fix
            </>
          )}
        </Badge>
        <span className="text-xs text-grey-400">{item.bundleTitle}</span>
      </div>
      <p className="mb-2 text-sm font-semibold text-grey-900">
        {item.questionText}
      </p>
      <div className="flex items-start gap-2 rounded-lg bg-grey-50 p-3">
        <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
        <p className="text-sm leading-relaxed text-grey-600">
          {item.note}
        </p>
      </div>
    </div>
  );
}
