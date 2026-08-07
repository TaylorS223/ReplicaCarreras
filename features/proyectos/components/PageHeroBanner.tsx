import Image from "next/image";
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
      {imageSrc ? (
        <Image
          className={styles.bg}
          src={imageSrc}
          alt={imageAlt}
          aria-hidden="true"
          fill
          priority
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
      ) : null}
      <div className={styles.overlay} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </section>
  );
};
