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
      animate={{
        width: clicked ? 180 : 120,   // 👈 explicit morph between sizes
        height: 40                    // keep height locked
      }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} // 👈 smooth stretch
      onClick={clicked ? onReset : onClick}
    >
      <div className={styles.left}>
        {clicked && <span className={styles.logoI}>I</span>}
        {clicked && <span className={styles.separator}></span>}

        {/* Text */}
        <motion.span
          className={`${styles.text} ${!clicked ? styles.state1 : ""}`} 
          animate={{ opacity: 1, scale: 1 }}
          initial={false}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {clicked ? "Homebase" : "Explore"}
        </motion.span>
      </div>

      {/* IconCircle */}
      <motion.span
        className={styles.iconCircle}
        animate={{ rotate: clicked ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
      >
        {clicked ? "×" : "+"}
      </motion.span>
    </motion.div>
  );
}