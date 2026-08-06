import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import ContactForm from "@/components/home/ContactForm";
import { SITE } from "@/lib/site";
import styles from "@/styles/components/Contact.module.scss";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.label}>Contact</p>

          <h2 className={styles.title}>
            Tell me what
            <br />
            you&apos;re building.
          </h2>

          <p className={styles.lede}>
            I read every enquiry myself and reply within two working days. If
            the project is not a fit I will say so, and point you somewhere
            better where I can.
          </p>

          <div className={styles.direct}>
            <p className={styles.directLabel}>Or reach me directly</p>

            <a href={`mailto:${SITE.email}`} className={styles.email}>
              {SITE.email}
            </a>

            <div className={styles.socials}>
              <a
                href={SITE.linkedin}
                className={styles.social}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href={SITE.github}
                className={styles.social}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub aria-hidden="true" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className={styles.formWrap}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
