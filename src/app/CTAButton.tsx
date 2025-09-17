"use client";

import { motion } from "framer-motion";
import styles from "./CTAButton.module.css";

export default function CTAButton({
  clicked,
  onClick,
  onReset,
}: {
  clicked: boolean;
  onClick: () => void;
  onReset: () => void;
}) {
  return (
    <motion.div
      className={`${styles.cta} ${clicked ? styles.clicked : ""}`}
      layout
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      onClick={clicked ? onReset : onClick}
    >
      <div className={styles.left}>
        {/* 👇 Equalizer replaces the "I" */}
        {clicked && (
          <div className={styles.equalizer}>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.bar}
                animate={{
                  height: ["20%", "100%", "40%", "80%", "30%"],
                }}
                transition={{
                  duration: 2 + Math.random() *2,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />
            ))}
          </div>
        )}

        {clicked && <span className={styles.separator}></span>}

        {/* Single span handles both texts */}
        <motion.span
        className={`${styles.text} ${!clicked ? styles.state1 : ""}`}
          layout="position"
          animate={{ opacity: 1, scale: 1 }}
          initial={false}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {clicked ? "Homebase" : "Explore"}
        </motion.span>
      </div>

      {/* IconCircle on the right */}
        <motion.span
        className={styles.iconCircle}
        animate={{ rotate: clicked ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
        >
        +
        </motion.span>
    </motion.div>
  );
}