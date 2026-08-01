import styles from "./PageHeroBanner.module.css";

type PageHeroBannerProps = {
  id?: string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
};

export const PageHeroBanner = ({ id, title, imageSrc, imageAlt = "" }: PageHeroBannerProps) => {
  return (
    <section id={id} className={styles.banner} aria-label={title}>
      <img className={styles.bg} src={imageSrc} alt={imageAlt} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </section>
  );
};
