/**
 * Shared contact-form constants and types.
 *
 * These deliberately live outside src/app/actions/contact.ts: a "use server"
 * module may only export async functions. Anything else exported from it is
 * rewritten into a server-action reference, so an array exported from there
 * arrives on the client as a function and blows up at render.
 */

export interface ContactState {
  status: "idle" | "success" | "error";
  message: string;
  /** Field name → problem, so each input can show its own error. */
  fieldErrors?: Record<string, string>;
  /** Echoed back so a failed submit does not wipe what was typed. */
  values?: Record<string, string>;
}

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};

export const PROJECT_TYPES = [
  "New build",
  "Performance rescue",
  "Payments / platform work",
  "Ongoing development",
  "Something else",
] as const;

export const BUDGET_RANGES = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Not sure yet",
] as const;
