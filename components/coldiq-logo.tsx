import { MailCheck } from "lucide-react";

interface AppLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { text: "text-base", icon: "h-4 w-4" },
  md: { text: "text-lg", icon: "h-5 w-5" },
  lg: { text: "text-xl", icon: "h-5 w-5" },
} as const;

export function AppLogo({ className, size = "md" }: AppLogoProps) {
  const s = sizes[size];
  return (
    <span
      className={`flex items-center gap-1.5 ${s.text} font-bold tracking-tight ${className ?? ""}`}
      aria-label="SendScore"
    >
      <MailCheck className={`${s.icon} text-blue-600`} />
      <span className="text-grey-900">Send</span>
      <span className="-ml-1 text-blue-600">Score</span>
    </span>
  );
}

/** @deprecated Use AppLogo instead */
export const ColdIQLogo = AppLogo;
