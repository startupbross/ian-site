"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

const texts = [
  { text: "Intelligent Agent Network", duration: 2000 },
  { text: "IAN", duration: 1500 },
  { text: "智能网络", duration: 500 }, // Chinese short
  { text: "ИАН", duration: 500 }, // Russian
  { text: "إيان", duration: 500 }, // Arabic
  { text: "इयान", duration: 500 }, // Hindi
];

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < texts.length) {
      const timer = setTimeout(() => setIndex(index + 1), texts[index].duration);
      return () => clearTimeout(timer);
    } else {
      // after last text, fade out
      const timer = setTimeout(() => onFinish(), 800);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div className={styles.loadingContainer}>
      <motion.div
        key={texts[index]?.text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className={styles.loadingText}
      >
        {texts[index]?.text}
      </motion.div>
    </div>
  );
}