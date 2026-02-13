"use client";

import { useEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { initPostHog } from "@/lib/posthog";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <>
      {children}
      <Analytics />
    </>
  );
}
