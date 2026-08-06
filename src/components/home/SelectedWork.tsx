import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkPanel } from "@/components/work/WorkPanel";
import { getFeaturedProjects } from "@/lib/projects";
import styles from "@/styles/components/SelectedWork.module.scss";

export default async function SelectedWork() {
  const projects = await getFeaturedProjects();

  if (projects.length === 0) return null;

  return (
    <section id="work" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          label="Selected work"
          title="Three problems, measured"
          lede="Each of these started as something that was too slow, too fragile, or too manual to keep running. Full write-ups, not thumbnails."
          aside={
            <Link href="/work" className={styles.all}>
              All work &rarr;
            </Link>
          }
        />

        <div className={styles.panels}>
          {projects.map((project, index) => (
            <WorkPanel
              key={project.id}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
