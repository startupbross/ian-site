"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./Manifesto.module.css";
import CardStack from "./CardStack"; // 👈 import
import { useGlobalState } from "./GlobalStateProvider"; // 👈 import global state

 

export default function Manifesto({ onFinish }: { onFinish: () => void }) {
const [firstDone, setFirstDone] = useState(false); // 👈 track paragraph 1
const { manifestoDone, setManifestoDone, manifestoAnimated, setManifestoAnimated } = useGlobalState();
const { manifestoPara1Done, setManifestoPara1Done } = useGlobalState();


  // Use \n\n for paragraph breaks
  const text = `
Every AI sees the world differently. One favors speed, another safety, another reason. Alone they are biased. Together they are noise. IAN is the first to unify them into one clear perspective.

IAN powers the workflows of engineers at NASA , researchers from Stanford  and MIT , and creators shaping audiences of millions. Tomorrow’s intelligence won’t be locked in black boxes. It will be verified, transparent, and collective.
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
      initial={manifestoPara1Done ? "visible" : "hidden"} // 👈 skip animation if already done
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.1, when: "beforeChildren" },
        },
      }}
      onAnimationComplete={() => {
        if (!manifestoPara1Done) {
          setManifestoPara1Done(true); // 👈 mark as permanently animated
          setFirstDone(true);          // 👈 still unlock paragraph 2
        }
      }}
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
    {(firstDone || manifestoAnimated) && (<motion.div
        className={styles.paragraph}
        initial={manifestoAnimated ? "visible" : "hidden"} // 👈 skip if already animated
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1, when: "beforeChildren" },
          },
        }}
        onAnimationComplete={() => {
          if (!manifestoAnimated) {
            setManifestoAnimated(true); // 👈 mark paragraph 2 as done
          }
          if (!manifestoDone) {
            setManifestoDone(true);     // 👈 unlock Phase 2 once
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
  </div>   /* 👈 closes the outer container */
)}