"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./CardStack.module.css";

const cards = [
  { src: "/logos/nasacard.svg", alt: "NASA" },
  { src: "/logos/metacard.svg", alt: "Meta" },
  { src: "/logos/nvidiacard.svg", alt: "Nvidia" },
  { src: "/logos/teslacard.svg", alt: "Tesla" },
  { src: "/logos/applecard.svg", alt: "Apple" },
];

export default function CardStack() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouseX(e.clientX - rect.left); // mouse position relative to container
  };

  const handleMouseLeave = () => {
    setMouseX(null); // reset when leaving
  };

return (
  <span className={styles.cardStack}>
    <div
      ref={containerRef}
      className={styles.dock}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {cards.map((card, i) => {
        let scale = 1;
        let yOffset = 0;

        if (mouseX !== null && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const cardCenter =
            (i + 0.5) * (rect.width / cards.length);
          const distance = Math.abs(mouseX - cardCenter);

          scale = 1 + Math.exp(-(distance * distance) / 2000) * 0.5;
          yOffset = -Math.exp(-(distance * distance) / 2000) * 20;
        }

        return (
          <motion.img
            key={i}
            src={card.src}
            alt={card.alt}
            className={styles.card}
            animate={{ scale, y: yOffset }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        );
      })}
    </div>
  </span>
);
}