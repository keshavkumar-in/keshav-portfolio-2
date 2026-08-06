/**
 * Site-wide constants. Anything that appears in more than one place — the
 * canonical URL, contact details, social links — lives here so it is changed
 * once.
 */
export const SITE = {
  name: "Keshav Kumar",
  url: "https://www.keshavkumar.in",
  role: "Full Stack Developer",
  location: "India · Remote",

  // TODO(keshav): confirm this address before deploying. It uses the domain you
  // already own rather than a personal Gmail, which reads better to clients —
  // but it needs to actually receive mail. It is also the mailto fallback shown
  // when the contact form cannot reach Resend.
  email: "hello@keshavkumar.in",

  linkedin: "https://www.linkedin.com/in/keshavkumar-in",
  github: "https://github.com/keshavkumar-in",
  devto: "keshav_kumar",

  /** Shown in the nav and hero availability pill. */
  available: true,
} as const;

export const NAV_ITEMS = [
  { name: "Work", target: "work", type: "anchor" },
  { name: "Services", target: "services", type: "anchor" },
  { name: "About", target: "about", type: "anchor" },
  { name: "Writing", target: "writing", type: "anchor" },
  { name: "Contact", target: "contact", type: "anchor" },
] as const satisfies readonly {
  name: string;
  target: string;
  type: "anchor" | "route";
}[];
