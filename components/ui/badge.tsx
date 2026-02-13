import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium rounded-full px-2.5 py-0.5 text-xs transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-blue-50 text-blue-700 border border-blue-200",
        pass: "bg-success-50 text-success-700 border border-success-100",
        warning:
          "bg-warning-50 text-warning-600 border border-warning-100",
        critical:
          "bg-error-50 text-error-600 border border-error-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
