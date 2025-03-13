// ServicesSection.tsx
import React from 'react';
import Image from 'next/image';
import styles from '@/styles/components/ServicesSection.module.scss';

interface ServiceCardProps {
  title: string;
  icon: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, index }) => {
  return (
    <div className={`${styles.serviceCard} ${index === 2 ? styles.highlighted : ''}`}>
      <div className={styles.iconContainer}>
        <Image src={`/icons/${icon}.svg`} alt={title} width={40} height={40} />
      </div>
      <h3>{title}</h3>
      <p>
        Continue indulged speaking the was horrible for domestic
        position. Seeing get rather.
      </p>
      <div className={styles.readMore}>
        <span>Read More</span>
        <div className={styles.arrow}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L21 12L13.5 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    { title: 'Branding Design', icon: 'branding' },
    { title: 'App Development', icon: 'app' },
    { title: 'UI/UX Design', icon: 'uiux' },
    { title: 'Web Design', icon: 'web' }
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
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
