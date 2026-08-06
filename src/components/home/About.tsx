import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/styles/components/About.module.scss";

const EXPERIENCE = [
  {
    role: "Research Engineer II",
    org: "Bert Labs",
    place: "Bangalore",
    period: "Sep 2024 — Jun 2025",
    points: [
      "Built the frontend platform on Next.js 15 and Chakra UI; engagement rose 40% and session duration 25%.",
      "Took Largest Contentful Paint to 0.6s and Lighthouse above 95.",
      "Cut client-side vulnerabilities by 60% and reached WCAG 2.1 AA.",
      "Held test coverage above 95% with Jest, deployed through Dockerised CI/CD.",
    ],
  },
  {
    role: "Full Stack Developer & Team Lead",
    org: "Bihar State Madrasa Education Board",
    place: "Patna",
    period: "Aug 2021 — Aug 2024",
    points: [
      "Led the team building web systems for 3,000+ schools.",
      "Reduced query time on 1M+ record tables from 60 seconds to 1.2.",
      "Integrated payment gateways: 30% higher success rate, 20% fewer failures.",
    ],
  },
  {
    role: "Full Stack Developer & IT Support",
    org: "Hotel Patliputra Continental",
    place: "Patna",
    period: "Aug 2019 — Jul 2020",
    points: [
      "Built the booking platform in PHP and MySQL; booking efficiency up 70%.",
      "Improved database performance 35%, absorbing 3× the traffic.",
      "Integrated CCAvenue payments; successful transactions up 38%.",
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
              I am a full stack developer working mostly in React, Next.js, and
              Node. What I am actually good at is the part after the build:
              finding why a page takes four seconds to render, why a query that
              was fine last year now times out, why a payment flow drops one
              transaction in five.
            </p>
            <p>
              That work is measurable, so I measure it and publish the numbers.
              Every case study on this site leads with a before and after, and
              says where the figure came from.
            </p>
            <p>
              I take on freelance engagements — new builds, performance rescues,
              and the platform work in between.
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
