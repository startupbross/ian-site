"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./Manifesto.module.css";
import CardStack from "./CardStack"; // 👈 import

export default function Manifesto({ onFinish }: { onFinish: () => void }) {
  const [firstDone, setFirstDone] = useState(false); // 👈 track paragraph 1
  const [hasAnimated, setHasAnimated] = useState(false);

  // Use \n\n for paragraph breaks
  const text = `
In the beginning, there was one model. It was powerful but flawed. Then came more, each contradicting the last. The world drowned in noise and bias. IAN is the first to unify them, compare their visions, and reveal the truth hidden within contradiction.

From San Fransisco to Bangalore, IAN is powering the workflows of engineers at NASA , researchers from Stanford  and MIT , and creators shaping audiences of millions. Tomorrow’s intelligence won’t be locked in black boxes. It will be verified, transparent, and collective.
  `;

  const paragraphs = text.trim().split("\n\n");

  const specialMap: Record<
    string,
    { type: "color" | "card" | "logo"; className?: string; src?: string; alt?: string }
  > = {
    San: { type: "color", className: styles.gradientSF },
    Fransisco: { type: "color", className: styles.gradientSF },
    Bangalore: { type: "color", className: styles.gradientBLR },

    NASA: { type: "card" }, // 👈 CardStack inline
    Stanford: {
      type: "logo",
      src: "/logos/stanfordlogo.svg",
      alt: "Stanford",
      className: styles.stanfordLogo,
    },
    MIT: {
      type: "logo",
      src: "/logos/mitlogo.svg",
      alt: "MIT",
      className: styles.mitLogo,
    },
  };

  return (
    <div className={styles.container}>
      {/* --- Paragraph 1 --- */}
      <motion.div
        className={styles.paragraph}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.1, when: "beforeChildren" },
          },
        }}
        onAnimationComplete={() => setFirstDone(true)} // 👈 trigger para 2
      >
        {paragraphs[0].split(" ").map((word, i) => {
          const cleanWord = word.replace(/[^a-zA-Z]/g, "");
          const special = specialMap[cleanWord];

          if (special?.type === "card") {
            return (
              <motion.span
                key={i}
                className={styles.word}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <CardStack />
              </motion.span>
            );
          }

          if (special?.type === "logo") {
            return (
              <motion.img
                key={i}
                src={special.src}
                alt={special.alt}
                className={`${styles.logo} ${special.className || ""}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              />
            );
          }

          return (
            <motion.span
              key={i}
              className={`${styles.word} ${special?.className || ""}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {word}&nbsp;
            </motion.span>
          );
        })}
      </motion.div>

      {/* --- Paragraph 2 --- */}
      {firstDone && (
        <motion.div
          className={styles.paragraph}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, when: "beforeChildren" },
            },
          }}
          onAnimationComplete={() => {
            if (!hasAnimated) {
              setHasAnimated(true);
              onFinish();
            }
          }}
        >
          {paragraphs[1].split(" ").map((word, i) => {
            const cleanWord = word.replace(/[^a-zA-Z]/g, "");
            const special = specialMap[cleanWord];

            if (special?.type === "card") {
              return (
                <motion.span
                  key={i}
                  className={styles.word}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <CardStack />
                </motion.span>
              );
            }

            if (special?.type === "logo") {
              return (
                <motion.img
                  key={i}
                  src={special.src}
                  alt={special.alt}
                  className={`${styles.logo} ${special.className || ""}`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                />
              );
            }

            return (
              <motion.span
                key={i}
                className={`${styles.word} ${special?.className || ""}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {word}&nbsp;
              </motion.span>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}