import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/styles/components/About.module.scss";

const EXPERIENCE = [
  {
    role: "Technical Lead",
    org: "Entrans Technologies",
    place: "Remote",
    period: "Jun 2025 — present",
    points: [
      "Built frontend platform standards across four properties with component patterns and design systems.",
      "Led architecture work on Backstage, focusing on scalability and maintainability.",
      "Implemented analytics and experimentation infrastructure (GA4, GTM, GrowthBook) with Product and Marketing.",
      "Code review, technical investigations, and mentoring.",
    ],
  },
  {
    role: "Research Engineer II",
    org: "Bert Labs",
    place: "Bangalore",
    period: "Sep 2024 — Jun 2025",
    points: [
      "Migrated from client-rendered React SPA to Next.js with server-side rendering, driving 40% engagement growth and 25% higher session duration.",
      "Optimized Core Web Vitals: LCP to 0.6s, Lighthouse 95+.",
      "Achieved WCAG 2.1 AA, cut client-side vulnerabilities by 60%.",
      "Maintained 95%+ test coverage with Jest and Dockerised CI/CD.",
    ],
  },
  {
    role: "Full Stack Developer & Team Lead",
    org: "Bihar State Madrasa Education Board",
    place: "Patna",
    period: "Aug 2021 — Aug 2024",
    points: [
      "Led team building education systems for 3,000+ schools across Bihar.",
      "Optimized database queries on million-record tables from 60s to ~1.2s through MySQL indexing.",
      "Improved payment gateway success rate by 30%, reduced transaction failures by 20%.",
    ],
  },
  {
    role: "Full Stack Developer & IT Support",
    org: "Hotel Patliputra Continental",
    place: "Patna",
    period: "Aug 2019 — Jul 2020",
    points: [
      "Built the booking platform in PHP and MySQL, improving booking efficiency by 70%.",
      "Optimized database to support 3× traffic growth.",
      "Integrated CCAvenue payments, increasing successful transactions by 38%.",
    ],
  },
];

const EDUCATION = {
  role: "Integrated BCA & MCA",
  org: "Indira Gandhi National Open University",
  place: "Patna",
  period: "Jan 2016 — Dec 2020",
  points: [
    "Won the CSI State Level Web Development Competition.",
    "Technical Head of the institution's coding club.",
  ],
};

/**
 * The stack, grouped by what each part is for. No percentages: a self-assigned
 * "TypeScript 70%" is unverifiable, and to a client it reads as an admission
 * rather than a claim.
 */
const STACK = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Chakra UI", "Tailwind CSS", "SASS"],
  },
  {
    group: "Backend & data",
    items: ["Node.js", "Express", "MongoDB", "MySQL", "REST", "Contentful"],
  },
  {
    group: "Infrastructure",
    items: ["Docker", "Kubernetes", "Azure", "Vercel", "Terraform", "CI/CD"],
  },
  {
    group: "Practice",
    items: ["Jest", "React Testing Library", "Core Web Vitals", "WCAG 2.1 AA", "Git"],
  },
];

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          label="About"
          title="Six years, three kinds of client"
          lede="A deep-tech company, a government board, and founders. The through-line is systems that had to work while people were using them."
        />

        <div className={styles.intro}>
          <div className={styles.portrait}>
            <Image
              src="/assets/Keshav_new.webp"
              alt="Keshav Kumar"
              width={420}
              height={520}
              className={styles.portraitImage}
            />
          </div>

          <div className={styles.bio}>
            <p>
              I build and architect platforms at scale. I've worked across four
              ticketing properties and previously built education systems for
              3,000+ schools. I focus on technical problems that matter: why
              queries timeout, why pages render slow, what breaks when users
              pile on.
            </p>
            <p>
              Every claim on this site ties to data: before, after, and what
              changed. You can't know if a fix worked without measuring against
              the original state.
            </p>
            <p>
              I take on freelance engagements in new builds, performance
              optimization, and platform architecture.
            </p>
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Experience</h3>
            <ol className={styles.timeline}>
              {EXPERIENCE.map((item) => (
                <li key={item.org} className={styles.entry}>
                  <p className={styles.period}>{item.period}</p>
                  <h4 className={styles.role}>{item.role}</h4>
                  <p className={styles.org}>
                    {item.org} <span aria-hidden="true">·</span> {item.place}
                  </p>
                  <ul className={styles.points}>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}

              <li className={styles.entry}>
                <p className={styles.period}>{EDUCATION.period}</p>
                <h4 className={styles.role}>{EDUCATION.role}</h4>
                <p className={styles.org}>
                  {EDUCATION.org} <span aria-hidden="true">·</span>{" "}
                  {EDUCATION.place}
                </p>
                <ul className={styles.points}>
                  {EDUCATION.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            </ol>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Stack</h3>
            <div className={styles.stack}>
              {STACK.map((group) => (
                <div key={group.group} className={styles.stackGroup}>
                  <p className={styles.stackLabel}>{group.group}</p>
                  <ul className={styles.stackList}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
