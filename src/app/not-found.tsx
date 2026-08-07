import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Cta } from "@/components/ui/Cta";
import styles from "@/styles/components/NotFound.module.scss";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main id="main" className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>This page moved, or never existed.</h1>
          <p className={styles.lede}>
            The case studies live under /work. Start there, or tell me what you
            were looking for.
          </p>
          <div className={styles.actions}>
            <Cta href="/work">See the work</Cta>
            <Cta href="/#contact" variant="outline">
              Get in touch
            </Cta>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
