// SkillsSection.tsx
import React from "react";
import Image from "next/image";
import styles from "@/styles/components/SkillsSection.module.scss";

interface Skill {
  name: string;
  percentage: number;
  icon: string;
}

const SkillsSection: React.FC = () => {
  const skills: Skill[] = [
    { name: "Adobe XD", percentage: 80, icon: "/assets/diamon.png" },
    { name: "Figma", percentage: 90, icon: "/assets/figma.png" },
    { name: "WordPress", percentage: 70, icon: "/assets/diamon.png" },
    { name: "Photoshop", percentage: 80, icon: "/assets/figma.png" },
    { name: "Sketch", percentage: 60, icon: "/assets/diamon.png" },
    { name: "Illustrator", percentage: 90, icon: "/assets/figma.png" },
  ];

  return (
    <section className={styles.skillsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tag}>TOP SKILLS</div>
          <h2 className={styles.title}>See my expertise</h2>
        </div>

        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <div
              key={index}
              className={styles.skillCard}
              style={{ height: `${skill.percentage}%` }}
            >
              <div className={styles.iconWrapper}>
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={40}
                  height={40}
                  className={styles.icon}
                />
              </div>
              <div className={styles.percentage}>{skill.percentage}%</div>
              <div className={styles.skillName}>{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
