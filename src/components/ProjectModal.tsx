import React from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/components/ProjectModal.module.scss";
import { PortfolioItem } from "@/types/portfolio";

interface ProjectModalProps {
  project: PortfolioItem;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>

        <div className={styles.imageContainer}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={styles.projectImage}
          />
        </div>

        <div className={styles.projectInfo}>
          <div className={styles.categories}>
            {project.categories.map((category) => (
              <span key={category} className={styles.category}>
                {category}
              </span>
            ))}
          </div>

          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.description}>{project.description}</p>

          <div className={styles.techStack}>
            <h3>Technologies Used:</h3>
            <div className={styles.techList}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.links}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <FaGithub /> View Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
