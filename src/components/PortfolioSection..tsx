// components/PortfolioSection.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/PortfolioSection.module.scss";
import ProjectModal from "./ProjectModal";

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  categories: string[];
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const PortfolioSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number>(6);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null
  );

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "Document manager application",
      image: "/assets/2-1.jpg",
      categories: ["Web", "Coding"],
      description:
        "A comprehensive document management system built with modern web technologies. Features include document organization, search, and sharing capabilities.",
      techStack: ["React", "Node.js", "MongoDB", "AWS S3"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/repo",
    },
    {
      id: 2,
      title: "Dynamic mobile app development",
      image: "/assets/1-1.jpg",
      categories: ["Software", "Mobile"],
      description: "A dynamic mobile application for various platforms.",
      techStack: ["Flutter", "Firebase"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: 3,
      title: "Printable professional brochure templates",
      image: "/assets/2-1.jpg",
      categories: ["Brochure", "Design"],
      description: "Professional brochure templates for printing.",
      techStack: ["Adobe Illustrator", "Photoshop"],
    },
    {
      id: 4,
      title: "Create stunning product flexible mockups",
      image: "/assets/1-1.jpg",
      categories: ["Brand", "Mockup"],
      description: "Flexible mockups for showcasing products.",
      techStack: ["Sketch", "Figma"],
    },
    {
      id: 5,
      title: "Making smart software smartphones",
      image: "/assets/2-1.jpg",
      categories: ["Tech", "Mobile"],
      description: "Smart software solutions for smartphones.",
      techStack: ["Java", "Kotlin"],
    },
    {
      id: 6,
      title: "Decor design vectors illustrations",
      image: "/assets/1-1.jpg",
      categories: ["Design", "Art"],
      description: "Vector illustrations for decor design.",
      techStack: ["Adobe Illustrator", "CorelDRAW"],
    },
    {
      id: 7,
      title: "E-commerce website redesign",
      image: "/assets/2-1.jpg",
      categories: ["Web", "UI/UX"],
      description: "Redesign of an e-commerce website.",
      techStack: ["React", "Redux", "Node.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: 8,
      title: "Logo collection for tech startups",
      image: "/assets/1-1.jpg",
      categories: ["Brand", "Design"],
      description: "A collection of logos for tech startups.",
      techStack: ["Adobe Illustrator", "Photoshop"],
    },
    {
      id: 9,
      title: "Custom WordPress theme development",
      image: "/assets/2-1.jpg",
      categories: ["Web", "Coding"],
      description: "Development of custom WordPress themes.",
      techStack: ["WordPress", "PHP", "JavaScript"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
  ];

  const loadMoreItems = () => {
    setVisibleItems((prevValue) =>
      prevValue + 3 > portfolioItems.length
        ? portfolioItems.length
        : prevValue + 3
    );
  };

  return (
    <section className={styles.portfolioSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tag}>PORTFOLIO</div>
          <h2>My Recent Work</h2>
        </div>

        <div className={styles.portfolioGrid}>
          {portfolioItems.slice(0, visibleItems).map((item) => (
            <div key={item.id} className={styles.portfolioItem}>
              <div className={styles.imageContainer}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className={styles.portfolioImage}
                />
              </div>
              <div className={styles.portfolioContent}>
                <div className={styles.categories}>
                  {item.categories.map((category) => (
                    <span
                      key={`${item.id}-${category}`}
                      className={styles.category}
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h3>{item.title}</h3>
                <div
                  className={styles.viewButton}
                  onClick={() => setSelectedProject(item)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleItems < portfolioItems.length && (
          <div className={styles.loadMoreContainer}>
            <p>Are you interested to show more portfolios?</p>
            <button onClick={loadMoreItems} className={styles.loadMoreButton}>
              Load More
            </button>
          </div>
        )}
      </div>
      <ProjectModal
        project={selectedProject!}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default PortfolioSection;
