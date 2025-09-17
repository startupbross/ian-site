"use client";

import styles from "./lenses.module.css";

export default function LensesPage() {
  return (
    <main className={styles.container}>
      {/* Background video */}
      <video
        className={styles.video}
        src="/videos/homescreentest1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay content */}
      <div className={styles.overlay}>
        <h1 className={styles.title}>IAN lenses are curated perspectives that help users discover content and monetize their unique outlooks</h1>
        <p className={styles.subtitle}>
          These perspectives can be trained by social media data and automatically leveraged as a piece of IAN's collective intelligence, offering the value of human perspective alongside powerful AI insights for safer and simpler AI operations.
        </p>
      </div>
    </main>
  );
}
