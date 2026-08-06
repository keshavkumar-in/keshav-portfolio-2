import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "@/styles/components/Proof.module.scss";

/**
 * Static grid. These previously auto-advanced every three seconds, which is
 * faster than most people read a sentence — the strongest asset on the site was
 * the one thing a visitor could not finish.
 */
const TESTIMONIALS = [
  {
    name: "Dr. Ramesh Potnuri",
    role: "Lead Research Scientist, Bert Labs",
    image: "/assets/Ramesh.webp",
    quote:
      "Keshav is a smart, dependable, and technically strong professional with sharp troubleshooting skills and up-to-date development knowledge. He's a fast learner who consistently delivers precise, solution-oriented results.",
  },
  {
    name: "Nipun Krishnan",
    role: "UI/UX Designer, Bert Labs",
    image: "/assets/Nipun.webp",
    quote:
      "Working with Keshav has been an inspiring experience — his deep technical knowledge and design sensitivity consistently elevate our UI/UX outcomes. He brings clarity, speed, and innovation to every collaboration.",
  },
  {
    name: "Dr. Md. Noor Islam",
    role: "Controller of Examinations, Bihar State Madrasa Education Board",
    image: "/assets/avatar.webp",
    quote:
      "Keshav was instrumental in building our IT infrastructure and developing our web systems from scratch. His technical expertise and dedication greatly enhanced our digital capabilities.",
  },
  {
    name: "Kirs",
    role: "Co-founder, Homifii",
    image: "/assets/Kirs.webp",
    quote:
      "I was impressed by how quickly he understood our business needs and translated them into an intuitive web application. The custom features he developed have significantly streamlined our home automation system.",
  },
];

export default function Proof() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          label="References"
          title="People who hired me"
          lede="Four clients and colleagues, named, with the roles they held when we worked together."
        />

        <ul className={styles.grid}>
          {TESTIMONIALS.map((item) => (
            <li key={item.name} className={styles.card}>
              <blockquote className={styles.quote}>{item.quote}</blockquote>

              <div className={styles.person}>
                <Image
                  src={item.image}
                  alt=""
                  width={44}
                  height={44}
                  className={styles.avatar}
                />
                <span>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.role}>{item.role}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
