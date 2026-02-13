import posthog from "posthog-js";
import { POSTHOG_KEY } from "./constants";

export function initPostHog() {
  if (
    typeof window !== "undefined" &&
    POSTHOG_KEY !== "phc_PLACEHOLDER" &&
    !posthog.__loaded
  ) {
    posthog.init(POSTHOG_KEY, {
      api_host: "https://us.i.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") {
          ph.opt_out_capturing();
        }
      },
    });
  }
  return posthog;
}
