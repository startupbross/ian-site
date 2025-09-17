"use client";

import { motion, Variants } from "framer-motion";
import styles from "./lenses.module.css";

export default function LensesPage() {
  // ✅ Define button variants with proper typing
  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: i * 0.15, // stagger based on index
        ease: "easeOut",
      },
    }),
  };

  return (
    <main className={styles.container}>
      {/* Background video */}
      <video
        className={styles.video}
        src="/videos/lensestest3.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay for readability */}
      <div className={styles.darkOverlay}></div>

      {/* Overlay content */}
      <div className={styles.overlay}>
        {/* Title */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          See through every lens
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Lenses are curated perspectives that help users discover content and
          monetize their unique outlooks
        </motion.p>

        {/* Buttons with staggered animation */}
            <div className={styles.buttonRow}>
            <motion.button
                className={styles.primaryButton}
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                custom={0}
            >
                Sign up
            </motion.button>

            <motion.button
                className={styles.secondaryButton}
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                custom={1}
            >
                Sign in
            </motion.button>
            </div>
      </div>
    </main>
  );
}