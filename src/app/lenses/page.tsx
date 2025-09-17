"use client";

import styles from "./lenses.module.css";

export default function LensesPage() {
  return (
    <main className={styles.container}>
      {/* Background video */}
        <video
        className={styles.video}
        src="/videos/camerahead.mp4"
        autoPlay
        loop
        muted
        playsInline
        />

        /* Dark overlay (sits above video, behind text) */
        <div className={styles.darkOverlay}></div>

      {/* Overlay content */}
      <div className={styles.overlay}>
        <h1 className={styles.title}>See through every lens</h1>
        <p className={styles.subtitle}>
          Lenses are curated perspectives that help users discover content and monetize their unique outlooks
        </p>
      </div>
    </main>
  );
}
