"use client";

import styles from "./lenses.module.css";
import { motion } from "framer-motion";
import CTAButton from "../CTAButton"; 
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LensesPage() {
  const router = useRouter();
  const [ctaClicked, setCtaClicked] = useState(true); // start as clicked since we’re already on lenses

  const handleCTA = () => {
    setCtaClicked(false);
    router.push("/"); // go back to homepage
  };

  return (
    <main className={styles.container}>
      {/* Background video */}
      <video
        className={styles.video}
        src="/videos/lenseshome.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className={styles.darkOverlay}></div>

      {/* Content */}
      <div className={styles.overlay}>
        {/* Logo */}
        <motion.img
          src="/logos/ianlogo.svg"
          alt="IAN Logo"
          className={styles.logo}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Title */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Each person sees the world uniquely
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          IAN Lenses are human-curated perspectives in IAN’s collective
          intelligence network that help users discover social content and
          monetize their uniquely human outlooks.
        </motion.p>

        {/* Waitlist Box */}
        <motion.form
          action="https://formspree.io/f/mwpndydk" // ✅ your real Formspree ID
          method="POST"
          className={styles.waitlistBox}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className={styles.waitlistTitle}>Join the waitlist</h3>
          <p className={styles.waitlistSubtitle}>
            Post your lens via a lens-in-bio link and start getting paid for your
            perspective.
          </p>
          <div className={styles.inputRow}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className={styles.input}
              aria-label="Email address"
              required
            />
            <button 
              type="submit" 
              className={styles.arrowButton} 
              aria-label="Submit email to waitlist"
            >
              →
            </button>
          </div>
        </motion.form>
      </div>

      {/* CTA fixed at bottom */}
      <div className={styles.ctaFixed}>
        <CTAButton
          clicked={ctaClicked}
          onClick={handleCTA}
          onReset={handleCTA}
        />
      </div>
    </main>
  );
}