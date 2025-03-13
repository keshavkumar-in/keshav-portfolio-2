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
      title: 'Lead Developer',
      organization: 'Blockdots',
      location: 'London',
      period: '2022 - Present',
      description: 'The education should be very interactual. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante, sectors of the economy or areas of culture sed mauris hendrerit, laoreet smart software.'
    },
    {
      title: 'Full Stack Web Developer',
      organization: 'Parsons',
      location: 'The New School',
      period: '2021 - 2022',
      description: 'The education should be very interactual. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante, sectors of the economy or areas of culture sed mauris hendrerit, laoreet smart software.'
    },
    {
      title: 'UI Designer',
      organization: 'House of Life',
      location: 'Leeds',
      period: '2018 - 2023',
      description: 'The education should be very interactual. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante, sectors of the economy or areas of culture sed mauris hendrerit, laoreet smart software.'
    }
  ];

  const educationItems: TimelineItem[] = [
    {
      title: 'Programming Course',
      organization: 'Harvard University',
      location: '',
      period: '2006 - 2014',
      description: 'The education should be very interactual. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante, sectors of the economy or areas of culture sed mauris hendrerit, laoreet smart software.'
    },
    {
      title: 'Graphic Design Course',
      organization: 'Blockdots',
      location: 'London',
      period: '2016 - 2020',
      description: 'The education should be very interactual. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante, sectors of the economy or areas of culture sed mauris hendrerit, laoreet smart software.'
    },
    {
      title: 'Web design course',
      organization: 'University of California',
      location: '',
      period: '2012 - 2015',
      description: 'The education should be very interactual. Ut tincidunt est ac dolor aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in, lobortis mauris hendrerit ante, sectors of the economy or areas of culture sed mauris hendrerit, laoreet smart software.'
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
              <p className={styles.description}>{item.description}</p>
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
