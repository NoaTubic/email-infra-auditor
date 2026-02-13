export type Tag = "pass" | "needs_fix" | "critical";

export interface Option {
  label: string;
  value: string;
  score: number;
  tag: Tag;
  note?: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Bundle {
  id: string;
  title: string;
  questions: Question[];
}

export const BUNDLES: Bundle[] = [
  {
    id: "domain",
    title: "Domain Strategy & Setup",
    questions: [
      {
        id: "secondary-domains",
        text: "Are you using secondary (alternate) domains for outbound?",
        options: [
          {
            label: "Yes",
            value: "yes",
            score: 1,
            tag: "pass",
          },
          {
            label: "No",
            value: "no",
            score: -2,
            tag: "critical",
            note: "Never send cold email from your primary domain. Register 2-3 secondary domains (e.g., tryacme.com, getacme.com) so your main domain reputation stays protected if deliverability issues arise.",
          },
          {
            label: "Not sure",
            value: "unsure",
            score: 0.5,
            tag: "needs_fix",
            note: "Check your sending platform settings. If you're sending from your main website domain, you need secondary domains immediately. This is the most important step in cold email infrastructure.",
          },
        ],
      },
      {
        id: "mailboxes-per-domain",
        text: "How many mailboxes are you using per sending domain?",
        options: [
          {
            label: "1-2 mailboxes",
            value: "1-2",
            score: 1,
            tag: "pass",
          },
          {
            label: "3 mailboxes",
            value: "3",
            score: 0.5,
            tag: "needs_fix",
            note: "3 mailboxes per domain is borderline. For best deliverability, keep it to 2 per domain. Spread the rest across additional domains to reduce risk per domain.",
          },
          {
            label: "4+ mailboxes",
            value: "4+",
            score: -2,
            tag: "critical",
            note: "Too many mailboxes per domain dramatically increases the chance of triggering spam filters. Limit to 2 mailboxes per domain and add more domains instead.",
          },
          {
            label: "Not sure",
            value: "unsure",
            score: 0.5,
            tag: "needs_fix",
            note: "Log into your email provider (Google Workspace, Outlook) and count the sending accounts per domain. Aim for no more than 2 per domain.",
          },
        ],
      },
      {
        id: "daily-volume",
        text: "What is your daily sending volume per mailbox?",
        options: [
          {
            label: "Under 30 emails/day",
            value: "under-30",
            score: 1,
            tag: "pass",
          },
          {
            label: "30-50 emails/day",
            value: "30-50",
            score: 0.5,
            tag: "needs_fix",
            note: "30-50 per mailbox is high. Providers like Google recommend staying under 30 for cold outbound. Lower the volume per mailbox and spread across more accounts to maintain good deliverability.",
          },
          {
            label: "50+ emails/day",
            value: "50+",
            score: -2,
            tag: "critical",
            note: "Sending 50+ cold emails per mailbox per day will almost certainly trigger rate limits and spam filters. Drop to under 30 immediately. Add more mailboxes across additional domains to maintain total volume.",
          },
        ],
      },
      {
        id: "domain-redirect",
        text: "Do your secondary domains have a 301 redirect to your primary site?",
        options: [
          {
            label: "Yes",
            value: "yes",
            score: 1,
            tag: "pass",
          },
          {
            label: "No",
            value: "no",
            score: 0.5,
            tag: "needs_fix",
            note: "Set up a 301 redirect from your secondary domains to your main website. This adds legitimacy — if a recipient checks the domain, they'll land on your real site instead of a blank page.",
          },
          {
            label: "N/A",
            value: "na",
            score: 0.5,
            tag: "needs_fix",
            note: "If you're using secondary domains, set up 301 redirects. If you're not using secondary domains, that's a separate critical issue — see domain strategy.",
          },
        ],
      },
    ],
  },
  {
    id: "tenants",
    title: "Tenants & Locations",
    questions: [
      {
        id: "tenants-per-domain",
        text: "How many Google Workspace / Microsoft 365 tenants per domain?",
        options: [
          {
            label: "1 tenant per domain",
            value: "one",
            score: 1,
            tag: "pass",
          },
          {
            label: "Multiple domains on 1 tenant",
            value: "multiple",
            score: 0.5,
            tag: "needs_fix",
            note: "Multiple sending domains on one tenant creates a shared reputation risk. If one domain gets flagged, it can drag down all others on the same tenant. Separate them for isolation.",
          },
          {
            label: "Not sure",
            value: "unsure",
            score: 0.5,
            tag: "needs_fix",
            note: "Check your Google Workspace or Microsoft 365 admin panel. Each sending domain should ideally have its own separate tenant for full isolation.",
          },
        ],
      },
      {
        id: "domain-locations",
        text: "Are you buying domains from the same registrar/location or varied sources?",
        options: [
          {
            label: "Varied registrars/IPs",
            value: "varied",
            score: 1,
            tag: "pass",
          },
          {
            label: "Same registrar for all",
            value: "same",
            score: 0.5,
            tag: "needs_fix",
            note: "Using the same registrar for all domains creates a fingerprint that providers can detect. Diversify across GoDaddy, Namecheap, Cloudflare, Google Domains, etc.",
          },
          {
            label: "Not sure",
            value: "unsure",
            score: 0.5,
            tag: "needs_fix",
            note: "Check where each of your domains is registered. Spreading across 2-3 registrars reduces the pattern footprint and improves deliverability resilience.",
          },
        ],
      },
      {
        id: "admin-roles",
        text: "Are admin roles separated across tenants (not the same admin everywhere)?",
        options: [
          {
            label: "Yes, separate admins",
            value: "yes",
            score: 1,
            tag: "pass",
          },
          {
            label: "No, same admin on all",
            value: "no",
            score: -2,
            tag: "critical",
            note: "Using the same admin account across all tenants creates a clear connection between them. If one tenant gets flagged, it can cascade. Use unique admin accounts per tenant.",
          },
          {
            label: "Not sure",
            value: "unsure",
            score: 0.5,
            tag: "needs_fix",
            note: "Check your workspace admin settings. Each tenant should have a different primary admin email to avoid cross-tenant association.",
          },
        ],
      },
    ],
  },
  {
    id: "warmup",
    title: "Warm-Up Process",
    questions: [
      {
        id: "warmup-done",
        text: "Did you run a warm-up on your mailboxes before sending?",
        options: [
          {
            label: "Yes, full warm-up",
            value: "yes",
            score: 1,
            tag: "pass",
          },
          {
            label: "Partial warm-up",
            value: "partial",
            score: 0.5,
            tag: "needs_fix",
            note: "A partial warm-up leaves your mailbox reputation incomplete. Resume warm-up for at least 2 more weeks before scaling volume. Use a dedicated warm-up tool like Instantly or Warmbox.",
          },
          {
            label: "No warm-up",
            value: "no",
            score: -2,
            tag: "critical",
            note: "Sending cold emails without warm-up is the #1 cause of immediate spam placement. Stop sending, set up warm-up using a tool like Instantly, Warmbox, or Lemwarm, and warm for 3+ weeks.",
          },
        ],
      },
      {
        id: "warmup-duration",
        text: "How long did your warm-up last?",
        options: [
          {
            label: "3+ weeks",
            value: "3-plus",
            score: 1,
            tag: "pass",
          },
          {
            label: "About 2 weeks",
            value: "2-weeks",
            score: 0.5,
            tag: "needs_fix",
            note: "2 weeks is the minimum. For best results, continue warm-up for 3-4 weeks and keep warm-up running in the background even after you start sending to maintain reputation.",
          },
          {
            label: "Under 2 weeks",
            value: "under-2",
            score: -2,
            tag: "critical",
            note: "Under 2 weeks is insufficient. Your mailboxes likely don't have enough positive engagement signals yet. Pause campaigns and extend warm-up to at least 3 weeks.",
          },
          {
            label: "Didn't warm up",
            value: "none",
            score: -2,
            tag: "critical",
            note: "No warm-up means your mailboxes have zero reputation. Providers will treat your emails as suspicious immediately. Set up warm-up before any outbound sending.",
          },
        ],
      },
      {
        id: "ramp-volume",
        text: "How did you ramp up sending volume after warm-up?",
        options: [
          {
            label: "Gradual ramp (5 → 10 → 20 → 30/day)",
            value: "gradual",
            score: 1,
            tag: "pass",
          },
          {
            label: "Moderate ramp (jumped some steps)",
            value: "moderate",
            score: 0.5,
            tag: "needs_fix",
            note: "Skipping ramp stages can trigger volume spike alerts. Always increase by 5-10 emails per day, waiting 2-3 days between each increase. Patience here pays off in sustained deliverability.",
          },
          {
            label: "Full volume immediately",
            value: "full",
            score: -2,
            tag: "critical",
            note: "Jumping to full volume immediately after warm-up (or without it) is a major red flag to providers. This can burn a domain in days. Ramp gradually over 2-3 weeks.",
          },
        ],
      },
      {
        id: "stagger-sending",
        text: "Are you staggering sends throughout the day or sending in bursts?",
        options: [
          {
            label: "Staggered (spread across hours)",
            value: "staggered",
            score: 1,
            tag: "pass",
          },
          {
            label: "Mostly staggered with some peaks",
            value: "mostly",
            score: 0.5,
            tag: "needs_fix",
            note: "Even occasional bursts can look suspicious to providers. Ensure your sending tool distributes emails evenly across your sending window (e.g., 8am-5pm) with randomized intervals.",
          },
          {
            label: "Burst sending (all at once)",
            value: "burst",
            score: -2,
            tag: "critical",
            note: "Sending emails in bulk bursts is one of the strongest spam signals. Configure your platform to spread sends across at least 6-8 hours with random delays between each email.",
          },
        ],
      },
    ],
  },
  {
    id: "tracking",
    title: "Tracking & Monitoring",
    questions: [
      {
        id: "tracking-enabled",
        text: "What tracking do you have enabled on outbound emails?",
        options: [
          {
            label: "No tracking (recommended)",
            value: "none",
            score: 1,
            tag: "pass",
          },
          {
            label: "Open tracking only",
            value: "opens",
            score: 0.5,
            tag: "needs_fix",
            note: "Open tracking uses an invisible pixel that spam filters can detect. It adds extra HTML and tracking domains to your email. Disable it — reply rate is a much more reliable engagement metric.",
          },
          {
            label: "Both opens and clicks",
            value: "both",
            score: -2,
            tag: "critical",
            note: "Open + click tracking adds significant HTML, tracking pixels, and link redirects to your emails. This dramatically increases spam score. Turn off both immediately and rely on reply rates.",
          },
          {
            label: "Click tracking only",
            value: "clicks",
            score: -2,
            tag: "critical",
            note: "Click tracking rewrites your links through a redirect domain, which is a major spam signal. Disable it and use UTM parameters on your landing page instead if you need analytics.",
          },
        ],
      },
      {
        id: "custom-tracking-domain",
        text: "If tracking is on, do you have a custom tracking domain (CNAME)?",
        options: [
          {
            label: "Yes, custom domain set up",
            value: "yes",
            score: 1,
            tag: "pass",
          },
          {
            label: "No, using default tracking domain",
            value: "no",
            score: -2,
            tag: "critical",
            note: "Default tracking domains (e.g., track.instantly.ai) are shared across thousands of senders and are widely blacklisted. If you must track, set up a custom CNAME. Better yet, turn tracking off entirely.",
          },
          {
            label: "N/A (tracking is off)",
            value: "na",
            score: 1,
            tag: "pass",
          },
        ],
      },
    ],
  },
  {
    id: "sending",
    title: "Sending Best Practices",
    questions: [
      {
        id: "spammy-words",
        text: "Do you check your copy for spammy words and phrases before sending?",
        options: [
          {
            label: "Yes, always review",
            value: "yes",
            score: 1,
            tag: "pass",
          },
          {
            label: "Sometimes",
            value: "sometimes",
            score: 0.5,
            tag: "needs_fix",
            note: "Inconsistent review means spam triggers slip through. Use a tool like mail-tester.com or Mailreach to scan every campaign. Avoid words like 'free', 'guaranteed', 'limited time', 'act now', etc.",
          },
          {
            label: "No, I don't check",
            value: "no",
            score: 0.5,
            tag: "needs_fix",
            note: "Spam filters scan for trigger words and phrases. Build a checklist or use automated tools to scan every email before sending. Common triggers: urgency words, ALL CAPS, excessive exclamation marks, and salesy phrases.",
          },
        ],
      },
      {
        id: "plain-text",
        text: "Are your cold emails plain text (no HTML templates)?",
        options: [
          {
            label: "Yes, plain text only",
            value: "yes",
            score: 1,
            tag: "pass",
          },
          {
            label: "Mostly plain with minor formatting",
            value: "mostly",
            score: 0.5,
            tag: "needs_fix",
            note: "Even minor HTML formatting (bold, colors, styled signatures) increases the HTML-to-text ratio and can trigger filters. Stick to completely plain text for cold outbound — it looks more personal anyway.",
          },
          {
            label: "HTML templates with design",
            value: "html",
            score: -2,
            tag: "critical",
            note: "HTML-heavy emails are the hallmark of marketing/promotional email. Spam filters treat them very differently from plain text. Switch to plain text immediately for cold outbound. Save HTML for warm nurture sequences.",
          },
        ],
      },
      {
        id: "links-images",
        text: "Do your cold emails contain images, multiple links, or attachments?",
        options: [
          {
            label: "No images, max 1 link",
            value: "clean",
            score: 1,
            tag: "pass",
          },
          {
            label: "1-2 links, no images",
            value: "some-links",
            score: 0.5,
            tag: "needs_fix",
            note: "More than 1 link increases your spam score. Keep it to a single CTA link maximum. If you need to share more, save it for follow-up emails after a reply.",
          },
          {
            label: "Images, 3+ links, or attachments",
            value: "heavy",
            score: -2,
            tag: "critical",
            note: "Images, multiple links, and attachments are major spam triggers in cold email. Remove all images, reduce to 1 link max, and never attach files. Use a link to a Google Drive or Loom instead if needed.",
          },
        ],
      },
    ],
  },
];

export const TOTAL_QUESTIONS = BUNDLES.reduce(
  (sum, b) => sum + b.questions.length,
  0
);
