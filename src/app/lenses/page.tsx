"use client";

import styles from "./lenses.module.css";

export default function LensesPage() {
  return (
    <main className={styles.container}>
      {/* Background video */}
      <video
        className={styles.video}
        src="/videos/homescreentest.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay content */}
      <div className={styles.overlay}>
        <h1 className={styles.title}>Lenses</h1>
        <p className={styles.subtitle}>
          A new way to see intelligence.
        </p>
      </div>
    </main>
  );
}