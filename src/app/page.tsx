"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassI from "./GlassI";
import ChatPanel from "./ChatPanel";
import Manifesto from "./Manifesto";
import LoadingScreen from "./LoadingScreen";
import CTAButton from "./CTAButton";
import CityClock from "./CityClock";   
import styles from "./page.module.css";

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [ctaClicked, setCtaClicked] = useState(false);
  const [manifestoDone, setManifestoDone] = useState(false);

  const handleReset = () => {
    setCtaClicked(false);
    setManifestoDone(false);
  };

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

  // --- Phase 1: Home (3D "I", Rain, CTA) ---
    if (!ctaClicked) {
      return (
        <main className={styles.container}>
          <div className={styles.scene}>
            <GlassI />
          </div>

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

  // --- Phase 2: Manifesto + Chat + CTA persistent ---
  return (
    <main className={styles.container}>
      <div className={styles.blackScreen}>
        <Manifesto onFinish={() => setManifestoDone(true)} />

        {manifestoDone && (
          <>
            {/* IAN logo top-left */}
            <motion.img
              src="/logos/ianlogo.svg"
              alt="IAN Logo"
              className={styles.ianLogo}
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* 24h City Clock top-right */}
            <CityClock />

            {/* ChatPanel */}
            <div className={styles.chatOverlay}>
              <ChatPanel onOpen={() => {}} forceOpen />
            </div>
          </>
        )}
      </div>

      {/* CTA persists across states */}
      <div className={styles.ctaFixed}>
        <CTAButton
          clicked={ctaClicked}
          onClick={() => setCtaClicked(true)}
          onReset={() => {
            setCtaClicked(false);
            setManifestoDone(false);
          }}
        />
      </div>
    </main>
  );
}