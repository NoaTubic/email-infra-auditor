import { AppLogo } from "./coldiq-logo";
import { Badge } from "./ui/badge";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b bg-[var(--nav-bg)] border-[var(--nav-border)] backdrop-blur-xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <AppLogo />
        <div className="flex items-center gap-3">
          <Badge>Free Tool</Badge>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
