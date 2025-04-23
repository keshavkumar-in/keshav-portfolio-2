import React from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
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
            src={project.projectImage}
            alt={project.projectName}
            fill
            className={styles.projectImage}
          />
        </div>

        <div className={styles.projectInfo}>
          <div className={styles.techStack}>
            <div className={styles.techList}>
              {project.techUsed.map((tech) => (
                <span key={tech} className={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <h2 className={styles.title}>{project.projectName}</h2>
          <div className={styles.description}>
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </div>

          <div className={styles.links}>
            {project.sourceCode && (
              <a
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <FaGithub /> View Code
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
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
