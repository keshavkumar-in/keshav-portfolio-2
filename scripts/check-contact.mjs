/**
 * Checks the contact form's email setup and tells you exactly what is wrong.
 *
 *   node --env-file=.env.local scripts/check-contact.mjs          # config only
 *   node --env-file=.env.local scripts/check-contact.mjs --send   # also sends
 *
 * Without --send this only inspects configuration and asks Resend which
 * domains are verified. Nothing leaves the account. With --send it delivers one
 * real test email to CONTACT_TO_EMAIL.
 *
 * Exists because a failed enquiry shows the visitor a deliberately vague
 * message, so the real reason — usually an unverified sending domain — is only
 * visible in the server log. This surfaces it directly.
 */
import { Resend } from "resend";

const send = process.argv.includes("--send");

const apiKey = process.env.RESEND_API_KEY;
const to = process.env.CONTACT_TO_EMAIL;
const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

const ok = (m) => console.log(`  ok    ${m}`);
const bad = (m) => console.log(`  FAIL  ${m}`);
const note = (m) => console.log(`        ${m}`);

console.log("\nContact form setup\n");

let fatal = false;

if (!apiKey) {
  bad("RESEND_API_KEY is not set");
  note("Create one at https://resend.com/api-keys and add it to .env.local");
  fatal = true;
} else if (!apiKey.startsWith("re_")) {
  bad("RESEND_API_KEY does not look like a Resend key (expected re_…)");
  fatal = true;
} else {
  ok(`RESEND_API_KEY present (${apiKey.slice(0, 6)}…)`);
}

if (!to) {
  bad("CONTACT_TO_EMAIL is not set — enquiries have nowhere to go");
  fatal = true;
} else {
  ok(`CONTACT_TO_EMAIL = ${to}`);
}

const address = from.match(/<(.+)>/)?.[1] ?? from;
const domain = address.split("@")[1];
const usingShared = domain === "resend.dev";

ok(`CONTACT_FROM_EMAIL = ${from}`);
if (usingShared) {
  note("Using Resend's shared sender. No DNS needed, but it can only deliver");
  note("to the address your Resend account is registered with.");
}

if (fatal) {
  console.log("\nFix the above, then run this again.\n");
  process.exit(1);
}

const resend = new Resend(apiKey);

// Verify the key actually works, and that the sending domain is usable.
try {
  const { data, error } = await resend.domains.list();

  // A sending-only key cannot read /domains. That is the recommended key type
  // for production, so it is a pass, not a failure — we just cannot inspect
  // domain status with it and skip that part of the check.
  if (error?.name === "restricted_api_key") {
    ok("key valid — sending-only (the right kind for production)");
    note("Domain status cannot be read with a send-only key, so it is skipped.");
    if (!usingShared) {
      note(`Cannot confirm ${domain} is verified. If sending fails, that is the`);
      note(`first thing to check at https://resend.com/domains`);
    }
    throw { skipDomainChecks: true };
  }

  if (error) {
    bad(`Resend rejected the key — ${error.name}: ${error.message}`);
    process.exit(1);
  }

  const domains = data?.data ?? [];
  ok(`key valid — ${domains.length} domain(s) on the account`);

  for (const d of domains) {
    note(`${d.status === "verified" ? "verified " : d.status.padEnd(9)} ${d.name}`);
  }

  if (!usingShared) {
    const match = domains.find((d) => d.name === domain);
    if (!match) {
      bad(`${domain} is not added to this Resend account`);
      note(`Add it at https://resend.com/domains, or unset CONTACT_FROM_EMAIL`);
      note(`to fall back to the shared sender.`);
      process.exit(1);
    }
    if (match.status !== "verified") {
      bad(`${domain} is added but not verified (status: ${match.status})`);
      note("Sends will be rejected until its DNS records are in place.");
      process.exit(1);
    }
    ok(`${domain} is verified — sending from your own domain`);
  }
} catch (error) {
  // Thrown above to jump past the domain inspection, not an actual failure.
  if (!error?.skipDomainChecks) {
    bad(`Could not reach Resend — ${String(error)}`);
    process.exit(1);
  }
}

// The shared sender only delivers to the address the Resend account itself is
// registered with. If CONTACT_TO_EMAIL is any other inbox the send is rejected,
// and that is the most common reason a correctly-configured form still fails.
if (usingShared) {
  console.log("");
  note(`Confirm ${to} is the address your Resend account is registered with.`);
  note("The shared sender refuses to deliver anywhere else.");
}

if (!send) {
  console.log("\nConfig looks good. Re-run with --send to deliver a test email.\n");
  process.exit(0);
}

console.log("\nSending a test email…");

const { data, error } = await resend.emails.send({
  from,
  to,
  replyTo: to,
  subject: "Portfolio contact form — test",
  text: "If you are reading this, the contact form is wired up correctly.",
});

if (error) {
  bad(`${error.name}: ${error.message}`);
  process.exit(1);
}

ok(`sent — id ${data?.id}`);
console.log(`\nCheck ${to}.\n`);
