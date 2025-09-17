"use client";

import styles from "./lenses.module.css";
import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaGlobe } from "react-icons/fa"; // ✅ social icons

export default function LensesPage() {
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
          Revolicon
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Beautifully crafted open source icons.
        </motion.p>

        {/* Social Row */}
        <div className={styles.socialRow}>
          <button className={styles.followButton}>Follow us</button>
          <FaTwitter className={styles.icon} />
          <FaGithub className={styles.icon} />
          <FaGlobe className={styles.icon} />
        </div>

        {/* Waitlist Box */}
        <div className={styles.waitlistBox}>
          <h3 className={styles.waitlistTitle}>Join the waitlist</h3>
          <p className={styles.waitlistSubtitle}>
            Sign up to be one of the first to use Revolicon.
          </p>
          <div className={styles.inputRow}>
            <input
              type="email"
              placeholder="Email address"
              className={styles.input}
            />
            <button className={styles.arrowButton}>→</button>
          </div>
        </div>

        {/* Footer credits */}
        <div className={styles.footer}>
          Designer <span>Emirhan Ugurlu</span> + Developer{" "}
          <span>Berk Altıok</span>
        </div>
      </div>
    </main>
  );
}