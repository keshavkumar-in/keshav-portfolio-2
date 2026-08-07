import styles from "@/styles/components/SectionHeading.module.scss";

interface SectionHeadingProps {
  /** Mono eyebrow — names the section. */
  label: string;
  title: string;
  /** Optional supporting line, kept to one sentence. */
  lede?: string;
  /** Rendered at the far end of the heading row, e.g. a "view all" link. */
  aside?: React.ReactNode;
}

export function SectionHeading({
  label,
  title,
  lede,
  aside,
}: SectionHeadingProps) {
  return (
    <header className={styles.heading}>
      <div className={styles.row}>
        <p className={styles.label}>{label}</p>
        {aside ? <div className={styles.aside}>{aside}</div> : null}
      </div>
      <h2 className={styles.title}>{title}</h2>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
    </header>
  );
}
