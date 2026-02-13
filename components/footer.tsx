"use client";

import posthog from "posthog-js";
import { AppLogo } from "./coldiq-logo";
import { CALENDLY_URL } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-grey-200 bg-[var(--surface-card)] py-12" role="contentinfo">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <AppLogo size="sm" />
          <p className="max-w-md text-sm text-grey-500">
            Deliverability best practices from 10,000+ campaigns
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            onClick={() =>
              posthog.capture("cta_clicked", { target: "calendly_footer" })
            }
          >
            Schedule a free consultation
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
