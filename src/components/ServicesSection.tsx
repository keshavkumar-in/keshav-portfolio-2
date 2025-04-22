// ServicesSection.tsx
import React from 'react';
import Image from 'next/image';
import styles from '@/styles/components/ServicesSection.module.scss';

interface ServiceCardProps {
  title: string;
  icon: string;
  desc: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, desc, index }) => {
  return (
    <div className={`${styles.serviceCard} ${index === 2 ? styles.highlighted : ''}`}>
      <div className={styles.iconContainer}>
        <Image src={`/assets/${icon}.png`} alt={title} width={70} height={70} />
      </div>
      <h3>{title}</h3>
      <p>
        {desc}
      </p>
      {/* <div className={styles.readMore}>
        <span>Read More</span>
        <div className={styles.arrow}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L21 12L13.5 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div> */}
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    { title: 'Web Application Development', icon: 'icone', desc: "Building scalable and high-performance web applications using ReactJS, Next.js, and modern JavaScript frameworks." },
    { title: 'Enterprise Software Development', icon: 'icontwo', desc: "Building business applications with role-based access, compliance, and scalability in mind." },
    { title: 'DevOps & CI/CD Automation', icon: 'iconthree', desc: "Automating deployments, managing CI/CD pipelines, and implementing Infrastructure as Code (IaC) using Terraform or Ansible." },
    { title: 'Security & Compliance', icon: 'iconfour', desc: "Implementing security best practices such as JWT authentication, OAuth, secure cookies, encryption, and compliance (CFR21, GDPR, SOC2)." },
  ];

  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.header}>
        <div className={styles.tag}>SERVICES</div>
        <h2>My Quality Services</h2>
      </div>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            icon={service.icon}
            desc={service.desc}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
