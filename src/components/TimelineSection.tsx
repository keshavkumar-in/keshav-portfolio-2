// TimelineSection.tsx
import React from "react";
import styles from "@/styles/components/TimelineSection.module.scss";

interface TimelineItem {
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
}

const TimelineSection: React.FC = () => {
  const expertiseItems: TimelineItem[] = [
    {
      title: "Research Engineer II",
      organization: "Bert Labs",
      location: "Bangalore",
      period: "Sep 2024 - Present",
      description: `
        <ul>
          <li>Built responsive frontend platform with <strong>Next.js 15</strong> and <strong>Chakra UI</strong>. Improved user engagement by <strong>40%</strong></li>
          <li>Enhanced UI interactions using <strong>React Hooks</strong>. Increased session duration by <strong>25%</strong></li>
          <li>Optimized Core Web Vitals: <strong>LCP to 0.6s</strong>, achieved <strong>95+ Lighthouse score</strong></li>
          <li>Implemented security measures reducing vulnerabilities by <strong>60%</strong></li>
          <li>Maintained <strong>95%+ test coverage</strong> using <strong>Jest</strong>. Set up CI/CD with <strong>Docker</strong></li>
        </ul>
      `,
    },
    {
      title: "Full Stack Web Developer & Team Lead",
      organization: "Bihar State Madrasa Education Board",
      location: "Patna",
      period: "Aug 2021 - Aug 2024",
      description: `
        <ul>
          <li>Developed web applications for <strong>3,000+ schools</strong> using <strong>MERN stack</strong></li>
          <li>Optimized database queries: reduced load time from <strong>60s to 1.2s</strong> for <strong>1M+ records</strong></li>
          <li>Integrated payment gateways with <strong>30%</strong> higher success rate and <strong>20%</strong> fewer failures</li>
        </ul>
      `,
    },
    {
      title: "Full Stack Web Developer & IT Support",
      organization: "Hotel Patliputra Continental",
      location: "Patna",
      period: "Aug 2019 - Jul 2020",
      description: `
        <ul>
          <li>Built hotel booking platform with <strong>PHP</strong> and <strong>MySQL</strong>. Improved efficiency by <strong>70%</strong></li>
          <li>Optimized database performance by <strong>35%</strong>. Handled <strong>3× more traffic</strong></li>
          <li>Integrated <strong>CCAvenue</strong> payments. Increased successful transactions by <strong>38%</strong></li>
        </ul>
      `,
    },
  ];

  const educationItems: TimelineItem[] = [
    {
      title: "Integrated BCA & MCA",
      organization: "Indira Gandhi National Open University",
      location: "Patna",
      period: "Jan 2016 - Dec 2020",
      description: `
        <ul>
          <li>Maintained <strong>66% academic performance</strong> throughout the integrated dual-degree program</li>
          <li>Won <strong>State Level Web Development Competition</strong> organized by CSI</li>
          <li>Core subjects: Data Structures, Algorithms, Database Management, Web Development, Software Architecture</li>
          <li>Projects:
            <ul>
              <li>Home Service Provider platform using <strong>JSP</strong> and <strong>Oracle 11c</strong></li>
              <li>Farm Equipment E-commerce using <strong>PHP</strong> and <strong>MySQL</strong></li>
              <li>Furniture E-commerce platform using <strong>PHP</strong> and <strong>MySQL</strong></li>
            </ul>
          </li>
          <li>Leadership:
            <ul>
              <li>Technical Head of Institution coding club</li>
              <li>Organized technical workshops</li>
              <li>Mentored junior students in programming</li>
            </ul>
          </li>
        </ul>
      `,
    },
  ];

  const TimelineColumn = ({
    title,
    items,
  }: {
    title: string;
    items: TimelineItem[];
  }) => (
    <div className={styles.column}>
      <h2 className={styles.columnTitle}>{title}</h2>
      <div className={styles.timeline}>
        {items.map((item, index) => (
          <div key={index} className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineCard}>
              <div className={styles.cardHeader}>
                <div className={styles.titleInfo}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.organization}>
                    {item.organization}
                    {item.location ? `, ${item.location}` : ""}
                  </p>
                </div>
                <div className={styles.periodBadge}>{item.period}</div>
              </div>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={styles.timelineSection} id="resume">
      <div className={styles.container}>
        <div className={styles.columns}>
          <TimelineColumn
            title="Professional Experience"
            items={expertiseItems}
          />
          <TimelineColumn title="Education Background" items={educationItems} />
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
