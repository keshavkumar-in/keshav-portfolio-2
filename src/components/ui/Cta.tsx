import Link from "next/link";
import styles from "@/styles/components/Cta.module.scss";

interface CtaProps {
  href: string;
  children: React.ReactNode;
  /** `solid` is the accent block; use one per viewport. */
  variant?: "solid" | "outline";
  external?: boolean;
}

export function Cta({
  href,
  children,
  variant = "solid",
  external = false,
}: CtaProps) {
  const className = `${styles.cta} ${styles[variant]}`;
  const label = (
    <>
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        &rarr;
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
