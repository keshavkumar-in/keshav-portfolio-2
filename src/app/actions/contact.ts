"use server";

import { Resend } from "resend";
import type { ContactState } from "@/lib/contact";
import { SITE } from "@/lib/site";

// Constants and types live in @/lib/contact — a "use server" module may only
// export async functions, so everything else has to be imported, not declared
// here.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Hand-rolled rather than pulling in a validation library: this is one form with
 * five fields, and the project has no other use for the dependency.
 */
function validate(fields: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (fields.name.length < 2) {
    errors.name = "Tell me what to call you.";
  }

  if (!EMAIL_PATTERN.test(fields.email)) {
    errors.email = "This address does not look right — I reply to it, so it matters.";
  }

  if (fields.message.length < 20) {
    errors.message = "A sentence or two about the project, so the reply is useful.";
  }

  if (fields.message.length > 5000) {
    errors.message = "That is longer than this form handles. Email it instead.";
  }

  return errors;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const fields = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    projectType: String(formData.get("projectType") ?? "").trim(),
    budget: String(formData.get("budget") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Honeypot: a real person never fills a field they cannot see. Report success
  // so a bot has nothing to learn from the response.
  if (String(formData.get("company") ?? "")) {
    return { status: "success", message: "Thanks — I'll be in touch shortly." };
  }

  const fieldErrors = validate(fields);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      fieldErrors,
      values: fields,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  // A missing key is a deployment problem, not the visitor's problem. Say so
  // plainly and point at the address that always works.
  if (!apiKey || !to) {
    console.error(
      "Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set — falling back to mailto."
    );
    return {
      status: "error",
      message: `The form isn't connected right now. Email ${SITE.email} directly and it will reach me.`,
      values: fields,
    };
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `Portfolio <noreply@${new URL(SITE.url).hostname.replace(/^www\./, "")}>`,
      to,
      replyTo: fields.email,
      subject: `New enquiry — ${fields.name}${fields.projectType ? ` · ${fields.projectType}` : ""}`,
      text: [
        `Name:    ${fields.name}`,
        `Email:   ${fields.email}`,
        `Type:    ${fields.projectType || "—"}`,
        `Budget:  ${fields.budget || "—"}`,
        "",
        fields.message,
      ].join("\n"),
    });

    if (error) throw new Error(error.message);

    return {
      status: "success",
      message: "Thanks — I'll be in touch shortly.",
    };
  } catch (error) {
    console.error("Contact form send failed:", error);
    return {
      status: "error",
      message: `That didn't send. Email ${SITE.email} directly and it will reach me.`,
      values: fields,
    };
  }
}
