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
    { name: "ReactJS", percentage: 80, icon: "/assets/icons8-react-js-48.png" },
    { name: "JavaScript", percentage: 90, icon: "/assets/icons8-javascript-48.png" },
    { name: "TypeScript", percentage: 70, icon: "/assets/icons8-typescript-48.png" },
    { name: "TailwindCSS", percentage: 80, icon: "/assets/icons8-tailwindcss-48.png" },
    { name: "Git", percentage: 80, icon: "/assets/icons8-git-48.png" },
    { name: "SASS", percentage: 60, icon: "/assets/icons8-sass-48.png" },
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
                  width={48}
                  height={48}
                  className={styles.icon}
                />
              </div>
              <div>
                <div className={styles.percentage}>{skill.percentage}%</div>
                <div className={styles.skillName}>{skill.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
