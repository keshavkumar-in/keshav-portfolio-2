"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "@/app/actions/contact";
import {
  BUDGET_RANGES,
  PROJECT_TYPES,
  initialContactState,
} from "@/lib/contact";
import styles from "@/styles/components/ContactForm.module.scss";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={styles.submit} disabled={pending}>
      {pending ? "Sending" : "Send enquiry"}
      <span className={styles.arrow} aria-hidden="true">
        &rarr;
      </span>
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialContactState);

  if (state.status === "success") {
    return (
      <div className={styles.done} role="status">
        <p className={styles.doneTitle}>Message sent</p>
        <p className={styles.doneBody}>{state.message}</p>
      </div>
    );
  }

  const values = state.values ?? {};
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className={styles.form} noValidate>
      {/* Honeypot — hidden from people, not from bots. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={styles.input}
          />
          {errors.name ? (
            <p id="name-error" className={styles.error}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={styles.input}
          />
          {errors.email ? (
            <p id="email-error" className={styles.error}>
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="projectType" className={styles.label}>
            What kind of work
          </label>
          <select
            id="projectType"
            name="projectType"
            defaultValue={values.projectType}
            className={styles.select}
          >
            <option value="">Choose one</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="budget" className={styles.label}>
            Budget range
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue={values.budget}
            className={styles.select}
          >
            <option value="">Choose one</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          The project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={values.message}
          placeholder="What are you building, what is going wrong, or what needs to be faster."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={styles.textarea}
        />
        {errors.message ? (
          <p id="message-error" className={styles.error}>
            {errors.message}
          </p>
        ) : null}
      </div>

      {state.status === "error" && !state.fieldErrors ? (
        <p className={styles.formError} role="alert">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
