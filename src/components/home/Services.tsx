import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/styles/components/Services.module.scss";

/**
 * Written as the problem a client arrives with, not as a capability list. "I
 * need my checkout to stop failing" is a thing someone searches for; "Enterprise
 * Software Development" is not.
 */
const SERVICES = [
  {
    name: "Web application development",
    problem: "You need something built, and built to last.",
    body: "Production React and Next.js applications — the full thing, from data model to deploy. Scalable structure so the second year of changes costs what the first did.",
  },
  {
    name: "Performance rescue",
    problem: "Your site is slow and it is costing you traffic.",
    body: "Core Web Vitals work with a measured before and after. This is the one with the strongest track record: 4.5s to 0.6s LCP, and a 32% lift in organic traffic that followed it.",
  },
  {
    name: "Platform and payments",
    problem: "Transactions fail, and support absorbs the difference.",
    body: "Payment gateway integration and the reliability work around it — inventory that stays accurate, failures that release cleanly, and instrumentation so you can see which is which.",
  },
  {
    name: "Security and compliance",
    problem: "Procurement is asking questions you cannot answer yet.",
    body: "Authentication, encryption, secure session handling, and accessibility conformance — WCAG 2.1 AA, GDPR, SOC 2, CFR 21 — built in rather than retrofitted.",
  },
  {
    name: "DevOps and CI/CD",
    problem: "Deploying is a thing you dread.",
    body: "Dockerised pipelines, infrastructure as code with Terraform or Ansible, and a deploy that runs without you watching it.",
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          label="Services"
          title="What I get hired for"
          lede="Most engagements start with one of these five. If yours is a mix, that is normal — say so and I will scope it."
        />

        <ul className={styles.grid}>
          {SERVICES.map((service) => (
            <li key={service.name} className={styles.card}>
              <h3 className={styles.name}>{service.name}</h3>
              <p className={styles.problem}>{service.problem}</p>
              <p className={styles.body}>{service.body}</p>
            </li>
          ))}

          {/* Sixth cell. Five services left a dead square in the grid, and the
              honest answer to "which of these do I need?" is often "describe
              it and I'll tell you" — so the gap becomes the route to that. */}
          <li className={`${styles.card} ${styles.cardCta}`}>
            <h3 className={styles.name}>Not sure which?</h3>
            <p className={styles.problem}>
              Most projects are more than one of these.
            </p>
            <p className={styles.body}>
              Describe what is going wrong and I will tell you what it actually
              needs — including when that is nothing I sell.
            </p>
            <a href="#contact" className={styles.cardLink}>
              Describe your project
              <span aria-hidden="true">&rarr;</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
