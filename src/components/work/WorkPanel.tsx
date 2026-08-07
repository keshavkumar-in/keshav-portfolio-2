import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/portfolio";
import styles from "@/styles/components/WorkPanel.module.scss";

function year(developedOn: string): string {
  const parsed = new Date(developedOn);
  return Number.isNaN(parsed.getTime()) ? "—" : String(parsed.getFullYear());
}

/**
 * Contentful descriptions are written as markdown bullet lists, so used raw
 * they render as one long paragraph studded with stray hyphens. For a panel we
 * want a single sentence: take the first bullet, drop its marker, and trim.
 */
function summarise(description: string): string {
  const first = description
    .split(/\n|(?:^|\s)-\s+/)
    .map((part) => part.trim())
    .find((part) => part.length > 0);

  if (!first) return "";

  const sentence = first.split(/(?<=\.)\s/)[0];
  return sentence.length > 160 ? `${sentence.slice(0, 157).trimEnd()}…` : sentence;
}

/**
 * One project as a full-width row. Used on both the landing page and /work.
 *
 * The marker is the year rather than an index: a client reading a portfolio
 * wants to know how recent the work is, and a decorative 01/02/03 would encode
 * nothing — these projects are not a sequence.
 */
export function WorkPanel({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const { caseStudy } = project;
  const headline = caseStudy?.headline ?? summarise(project.description);
  // project.role is empty across all Contentful entries; the case study is the
  // real source, and the year marker carries the meta line when neither exists.
  const eyebrow = caseStudy?.eyebrow || project.role;

  return (
    <Link href={`/work/${project.slug}`} className={styles.panel}>
      <div className={styles.text}>
        <div className={styles.meta}>
          <span className={styles.year}>{year(project.developedOn)}</span>
          <span className={styles.eyebrow}>{eyebrow}</span>
        </div>

        <h3 className={styles.name}>{project.projectName}</h3>
        <p className={styles.headline}>{headline}</p>

        {caseStudy?.delta ? (
          <p className={styles.delta}>
            {caseStudy.delta.from ? (
              <>
                <span className={styles.deltaFrom}>{caseStudy.delta.from}</span>
                <span className={styles.deltaArrow} aria-hidden="true">
                  &rarr;
                </span>
              </>
            ) : null}
            <span className={styles.deltaTo}>{caseStudy.delta.to}</span>
            <span className={styles.deltaLabel}>{caseStudy.delta.label}</span>
          </p>
        ) : null}

        <ul className={styles.tech}>
          {project.techUsed.slice(0, 4).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <span className={styles.action}>
          {caseStudy ? "Read the case study" : "View project"}
          <span className={styles.actionArrow} aria-hidden="true">
            &rarr;
          </span>
        </span>
      </div>

      <div className={styles.media}>
        {project.projectImage ? (
          <Image
            src={project.projectImage}
            alt={`${project.projectName} interface`}
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
            className={styles.image}
            priority={priority}
          />
        ) : null}
      </div>
    </Link>
  );
}
