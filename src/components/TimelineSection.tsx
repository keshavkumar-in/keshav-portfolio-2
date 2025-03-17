// TimelineSection.tsx
import React from 'react';
import styles from '@/styles/components/TimelineSection.module.scss';

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
      title: 'Research Engineer 2',
      organization: 'Bert Labs',
      location: 'Bangalore',
      period: 'Sep 2024 - Present',
      description: 'I led the <strong>complete redevelopment</strong> of the Bert Labs website using <strong>Next.js 15</strong> and <strong>Contentful CMS</strong>, delivering a <strong>modern, responsive design</strong> with <strong>dynamic content management</strong>. Optimized performance by <strong>reducing LCP from 4.5s to 1.2s</strong>, achieving <strong>FID under 100ms</strong>, and securing a <strong>95+ Lighthouse score</strong>. Implemented <strong>CSP, SRI, secure cookies, and HTTPS</strong> for enhanced frontend security. Integrated <strong>AI/ML insights</strong> into <strong>RBAC-enabled Angular dashboards</strong> using <strong>Microsoft Entra ID</strong>. Developed <strong>CFR21/CSV-compliant dashboards</strong> for <strong>Strides Pharma</strong>. Designed an <strong>admin dashboard for Contentful</strong> updates. Unified tracking via <strong>Google Tag Manager</strong> and built a <strong>CI/CD pipeline with Bitbucket</strong>, deploying seamlessly on <strong>Azure Cloud</strong>.'
    },
    {
      title: 'Full Stack Web Developer',
      organization: 'Bihar State Madrasa Education Board',
      location: 'Patna',
      period: 'Aug 2021 - Aug 2024',
      description: 'I architected and developed highly scalable web applications using the <strong>MERN stack (MongoDB, Express.js, ReactJS, Node.js)</strong>, increasing user satisfaction by <strong>100%</strong> and improving system efficiency by <strong>30%</strong>. I designed an optimized database handling <strong>over 1 million student records</strong>, reducing query times by <strong>25%</strong>. Leading a team of <strong>7 developers</strong>, I implemented responsive UI/UX and secure API integrations, boosting user engagement by <strong>40%</strong>. I also integrated secure payment gateways, improving transaction success rates by <strong>30%</strong>. Additionally, I mentored junior developers, fostering a culture of learning, which accelerated project deliveries by <strong>50%</strong>.'
    },
    {
      title: 'Full Stack Web Developer',
      organization: 'Hotel Patliputra Continental',
      location: 'Patna',
      period: 'Aug 2019 - Jul 2020',
      description: `I built and deployed a <strong>custom room booking platform</strong> using <strong>Node.js, Express.js, and MongoDB</strong>, providing an <strong>intuitive UI</strong> for seamless reservations. I developed a <strong>customized admin dashboard with RBAC</strong>, enabling hotel staff to manage bookings, view reports, and track interactions securely. By resolving <strong>50+ website issues</strong>, I improved <strong>user satisfaction by 50%</strong> and reduced <strong>bounce rates by 15%</strong>. I configured and maintained an Apache server, ensuring <strong>99.9% uptime</strong>, and integrated the ccAvenue payment gateway, increasing <strong>online bookings by 20%</strong>. Additionally, I collaborated on <strong>full-stack optimizations</strong> and enforced <strong>security best practices</strong> for data protection and compliance.`
    }
  ];

  const educationItems: TimelineItem[] = [
    {
      title: 'Integrated BCA & MCA',
      organization: 'Indira Gandhi National Open University',
      location: 'Patna',
      period: '2016 - 2020',
      description: `Completed an integrated dual-degree program with a strong academic performance, maintaining a 66% throughout the course. The comprehensive curriculum covered fundamental computer science concepts and advanced technologies, including Data Structures, Algorithms, Database Management, Web Development, Cloud Computing, DevOps, AI/ML, and Software Architecture.
During the program, I gained hands-on experience through various projects, including developing a real-time analytics dashboard using the MERN stack and implementing machine learning models for predictive analysis. I also worked on microservices-based applications using Docker and built several responsive web applications using modern frameworks.

My academic journey was enriched by research activities, including publishing a paper on "Performance Optimization in Modern Web Applications" and conducting research on AI/ML applications in healthcare. I actively participated in technical paper presentations, expanding my theoretical knowledge and research capabilities.

Beyond academics, I took on leadership roles as the Technical Head of the university's coding club, where I organized technical workshops and hackathons. I also mentored junior students in programming and development, fostering a collaborative learning environment and developing strong leadership and communication skills.`
    }
  ];

  const TimelineColumn = ({ title, items }: { title: string, items: TimelineItem[] }) => (
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
                    {item.organization}{item.location ? `, ${item.location}` : ''}
                  </p>
                </div>
                <div className={styles.periodBadge}>
                  {item.period}
                </div>
              </div>
              <p className={styles.description} dangerouslySetInnerHTML={{ __html: item.description }} />
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
          <TimelineColumn title="My Expertise" items={expertiseItems} />
          <TimelineColumn title="Education Background" items={educationItems} />
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
