import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-grey-950 text-grey-50 hover:bg-grey-800 active:scale-[0.98] rounded-lg shadow-sm",
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] rounded-lg shadow-sm",
        secondary:
          "border border-grey-200 text-grey-700 bg-[var(--surface-card)] hover:bg-grey-50 hover:border-grey-300 active:scale-[0.98] rounded-lg",
        ghost:
          "text-grey-600 hover:text-grey-900 hover:bg-grey-100 rounded-lg",
      },
      size: {
        default: "h-10 px-5 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
