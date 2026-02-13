import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function OptionButton({
  label,
  selected,
  onSelect,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 cursor-pointer",
        selected
          ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600/20"
          : "border-grey-200 bg-[var(--surface-card)] hover:border-grey-300 hover:shadow-sm"
      )}
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-200",
          selected
            ? "bg-blue-600 text-white"
            : "border-2 border-grey-300 group-hover:border-grey-400"
        )}
      >
        {selected && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span
        className={cn(
          "font-medium transition-colors",
          selected ? "text-grey-900" : "text-grey-600"
        )}
      >
        {label}
      </span>
    </button>
  );
}
