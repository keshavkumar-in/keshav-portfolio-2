import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Cta } from "@/components/ui/Cta";
import { WorkPanel } from "@/components/work/WorkPanel";
import { getProjects } from "@/lib/projects";
import styles from "@/styles/components/WorkIndex.module.scss";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Client work by Keshav Kumar — performance rescues, government-scale platforms, payment integrations, and product builds, each with measured results.",
  alternates: { canonical: "/work" },
};

export default async function WorkIndexPage() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />

      <main id="main" className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <p className={styles.eyebrow}>Work</p>
            <h1 className={styles.title}>Client work</h1>
            <p className={styles.lede}>
              {projects.length} projects for companies, a government board, and
              independent clients. The ones with a write-up lead with a measured
              before and after.
            </p>
          </div>
        </header>

        <div className={styles.panels}>
          {projects.map((project, index) => (
            <WorkPanel
              key={project.id}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>

        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Want yours on this page?</h2>
            <Cta href="/#contact">Start a project</Cta>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
