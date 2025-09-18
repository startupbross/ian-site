"use client";

import { motion } from "framer-motion";
import CTAButton from "./CTAButton";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // ✅ router + path

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Track CTA clicked state
  const [ctaClicked, setCtaClicked] = useState(false);

  // ✅ Track if it's the very first run
  const [firstTime, setFirstTime] = useState(true);

  // ✅ Paragraph cycling state
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (index === 0 && firstTime) {
      // First time showing paragraph 0 → 6s
      timer = setTimeout(() => {
        setIndex(1);
        setFirstTime(false);
      }, 6000);
    } else {
      // After first time → alternate 15s for both
      timer = setTimeout(() => {
        setIndex((prev) => (prev === 0 ? 1 : 0));
      }, 15000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [index, firstTime]);

  // ✅ Handle CTA click
  const handleCTA = () => {
    if (pathname === "/") {
      // Go to lenses page
      setCtaClicked(true);
      router.push("/lenses");
    } else {
      // Go back home
      setCtaClicked(false);
      router.push("/");
    }
  };

  return (
    <main className={styles.container}>
      {/* ✅ Only show video/paragraphs if on home page */}
      {pathname === "/" && (
        <>
          <video
            className={styles.videoBackground}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/lenses-bg.mp4" type="video/mp4" />
          </video>

          <div className={styles.videoOverlay}></div>

          <div className={styles.heroTextBox}>
            <motion.p
              key={index}
              className={styles.heroText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              {index === 0 ? (
                <>
                  Trusting one perspective is{" "}
                  <span className={styles.heroTextRed}>dangerous</span>.
                </>
              ) : (
                <>
                  We made IAN because{" "}
                  <span className={styles.heroTextGreen}>
                    intelligence is better together
                  </span>
                  . IAN’s collective intelligence combines and compares multiple
                  AI and human perspectives into one simple answer.
                </>
              )}
            </motion.p>
          </div>
        </>
      )}

      {/* ✅ CTA fixed at bottom (works for both states) */}
      <div className={styles.ctaFixed}>
        <CTAButton
          clicked={ctaClicked}
          onClick={handleCTA}
          onReset={() => {
            setCtaClicked(false);
            router.push("/");
          }}
        />
      </div>
    </main>
  );
}