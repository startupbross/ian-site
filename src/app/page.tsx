"use client";

import { motion } from "framer-motion";
import GlassI from "./GlassI";
import ChatPanel from "./ChatPanel";
import Manifesto from "./Manifesto";
import LoadingScreen from "./LoadingScreen";
import CTAButton from "./CTAButton";
import CityClock from "./CityClock";
import styles from "./page.module.css";
import { useGlobalState } from "./GlobalStateProvider"; // 👈 import

export default function Home() {
  const {
    loadingDone,
    setLoadingDone,
    ctaClicked,
    setCtaClicked,
    manifestoDone,
    setManifestoDone,
    manifestoAnimated, // 👈 new
  } = useGlobalState();

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

 // --- Phase 1: Home (3D "I" + CTA) ---
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
            <source src="/videos/homescreentest1.mp4" type="video/mp4" />          </video>

          <div className={styles.scene}>
            {/* <GlassI /> */}
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

  // --- Phase 2: Manifesto + Persistent UI ---
  return (
    <main className={styles.container}>
      <div className={styles.blackScreen}>
        <Manifesto onFinish={() => setManifestoDone(true)} />

        {manifestoAnimated && ( // 👈 use manifestoAnimated instead of manifestoDone
          <>
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