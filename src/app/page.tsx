"use client";

import { motion } from "framer-motion";
import GlassI from "./GlassI";
import ChatPanel from "./ChatPanel";
import Manifesto from "./Manifesto";
import LoadingScreen from "./LoadingScreen";
import CTAButton from "./CTAButton";
import CityClock from "./CityClock";
import styles from "./page.module.css";
import { useGlobalState } from "./GlobalStateProvider"; 
import { useState, useEffect } from "react";

export default function Home() {
  const {
    loadingDone,
    setLoadingDone,
    ctaClicked,
    setCtaClicked,
    manifestoDone,
    setManifestoDone,
    manifestoAnimated,
  } = useGlobalState();

  const handleReset = () => {
    setCtaClicked(false);
    setManifestoDone(false);
  };

  // ✅ Always declare hooks at the top level
  const [index, setIndex] = useState(0);
  const paragraphs = [
    "Giving one AI too much power is risky.",
    "We made IAN because intelligence is better together. IAN’s collective intelligence combines and compares multiple AI and human perspectives into one simple answer.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev: number) => (prev + 1) % paragraphs.length);
    }, 12000); // ✅ switch every 12s
    return () => clearInterval(interval);
  }, [paragraphs.length]);

  // --- Phase 0: Loader ---
  if (!loadingDone) {
    return (
      <main className={styles.container}>
        <div className={styles.scene}>
          <GlassI />
        </div>
        <LoadingScreen onFinish={() => setLoadingDone(true)} />
      </main>
    );
  }

  // --- Phase 1: Home (Video + Overlay + Text + CTA) ---
  if (!ctaClicked) {
    return (
      <main className={styles.container}>
        {/* 🔥 Fullscreen video background */}
        <video
          className={styles.videoBackground}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/lenses-bg.mp4" type="video/mp4" />
        </video>

        {/* 🔥 Dark overlay for readability */}
        <div className={styles.videoOverlay}></div>

        {/* 🔥 Centered hero text */}
        <motion.p
          key={index}
          className={styles.heroText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          {paragraphs[index]}
        </motion.p>

        {/* 🔥 CTA fixed at bottom */}
        <div className={styles.ctaFixed}>
          <CTAButton
            clicked={false}
            onClick={() => setCtaClicked(true)}
            onReset={handleReset}
          />
        </div>
      </main>
    );
  }

  // --- Phase 2: Manifesto + Persistent UI ---
  return (
    <main className={styles.container}>
      <div className={styles.blackScreen}>
        {/* <Manifesto onFinish={() => setManifestoDone(true)} /> */}

        {true && (
          <>
            {/* {manifestoAnimated && (use this if you want it back)} */}
            <motion.img
              src="/logos/ianlogo.svg"
              alt="IAN Logo"
              className={styles.ianLogo}
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <CityClock />
            <div className={styles.chatOverlay}>
              <ChatPanel onOpen={() => {}} forceOpen />
            </div>
          </>
        )}
      </div>

      <div className={styles.ctaFixed}>
        <CTAButton
          clicked={ctaClicked}
          onClick={() => setCtaClicked(true)}
          onReset={handleReset}
        />
      </div>
    </main>
  );
}