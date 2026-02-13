export const BRAND = {
  blue: "#0b7bfa",
  blueHover: "#0e5bc7",
  blueSoft: "#eef9ff",
  green: "#00c950",
  yellow: "#fe9a00",
  red: "#fb2c36",
} as const;

export interface HealthTier {
  label: string;
  color: string;
  bgColor: string;
  min: number;
  max: number;
}

export const HEALTH_TIERS: HealthTier[] = [
  {
    label: "Excellent",
    color: "var(--color-success-600)",
    bgColor: "var(--color-success-50)",
    min: 4.5,
    max: 5.0,
  },
  {
    label: "Good",
    color: "var(--color-blue-600)",
    bgColor: "var(--color-blue-50)",
    min: 3.5,
    max: 4.49,
  },
  {
    label: "Risky",
    color: "var(--color-warning-600)",
    bgColor: "var(--color-warning-50)",
    min: 2.5,
    max: 3.49,
  },
  {
    label: "Do Not Send",
    color: "var(--color-error-600)",
    bgColor: "var(--color-error-50)",
    min: 0,
    max: 2.49,
  },
];

export const CALENDLY_URL = "https://calendly.com/";

export const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_PLACEHOLDER";
