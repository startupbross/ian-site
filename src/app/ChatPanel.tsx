"use client";

import { useState, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import styles from "./ChatPanel.module.css";
import Link from "next/link";

export default function ChatPanel({
  onOpen,
  forceOpen = false,
}: {
  onOpen: () => void;
  forceOpen?: boolean;
}) {
  // 👇 Start in open state if forceOpen is true
  const [open, setOpen] = useState(forceOpen);
  const [value, setValue] = useState("");

  // Placeholder languages
  const placeholders = [
    "Is the media biased about climate change?",
    "Escribe tu pregunta...",
    "बॉलीवुड प्रेस स्टार किड्स के पक्ष में है?",
    "Which country’s news is most biased about Israel–Palestine?",
    "Is TikTok safer than Instagram?",
    "人工智能在选举中的风险是什么",
    "Explain quantum computing like I’m 12",
    "输入你的问题...",
    "Which countries are the safest for women in 2025?",
    "هل التغطية الغربية للشرق الأوسط متحيزة؟",
    "Bitcoin regulations 2025",
    "Comparar modelos de IA de Apple vs Meta por sesgo",
    "Best country to move for remote work?",
    "Российское ТВ слишком поддерживает власть?",
    "Who will win the World Cup 2026?",
    "من سيكون الرئيس القادم للولايات المتحدة",
    "La mejor serie de Netflix ahora",
    "Should I trust ChatGPT, Claude, or IAN?",
    "क्या सिलिकॉन वैली बैंगलोर से ज्यादा एआई को हाइप करती है?",
    "Is U.S. media biased against China?",
    "هل التغطية الغربية للشرق الأوسط متحيزة؟",
    "Explain this article...",
    "How to travel to Dubai for cheap"
  ];

  const [index, setIndex] = useState(0);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (open && value === "") {
      const interval = setInterval(async () => {
        await animate(scope.current, { opacity: 0, y: -10 }, { duration: 0.3 });
        setIndex((prev) => (prev + 1) % placeholders.length);
        await animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.3 });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [open, value, animate, scope, placeholders.length]);

  const handleClick = () => {
    setOpen(true);
    onOpen();
  };

  return (
    <div className={styles.wrapper}>
      {/* Tagline ABOVE chatbox */}
      {open && (
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          
      


        </motion.h2>
      )}

      {/* Chatbox */}
        <motion.div
        className={`${styles.glassBase} ${open ? styles.chatBar : styles.glassButton}`}
        initial={{ height: 25, borderRadius: "6px" }}
        animate={
            open
            ? { width: "700px", height: 85, borderRadius: "12px" }
            : { height: 25, borderRadius: "6px" }
        }
        transition={{
            width: { type: "spring", stiffness: 120, damping: 18 },
            height: { type: "spring", stiffness: 120, damping: 18 },
            borderRadius: { duration: 0.5, ease: "easeInOut" },
        }}
        onClick={!open ? handleClick : undefined}
        >
        {open && (
            <motion.div
            className={styles.inputWrapper}
            initial={{ opacity: 0, y: 20, rotateX: 30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
            <motion.input
                ref={scope}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholders[index]}
                className={styles.input}
                onKeyDown={(e) => {
                if (e.key === "Enter" && value.trim()) {
                    window.open(
                    `https://ian.directory`,
                    "_blank"
                    );
                }
                }}
            />
            <div className={styles.sendWrapper}>
                <motion.button
                className={`${styles.sendButton} ${value ? styles.active : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                onClick={() => {
                if (value.trim()) {
                    window.open(
                    `https://ian.directory`,

                    // message?text=${encodeURIComponent(value)} -> this is to link the message that was captured in the chat to ian directory

                    "_blank"
                    );
                }
                }}
                >
                ↑
                </motion.button>
            </div>
            </motion.div>
        )}



        </motion.div>
      {/* Chips BELOW chatbox */}
        {open && (
        <motion.div
            className={styles.chips}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
        >
            {[
            { label: "Learn about IAN", href: "" },
            { label: "Search with IAN", href: "https://ian.directory" },
            { label: "News", href: "https://ian.directory/discover" },
            { label: "Research", href: "" },
            { label: "Lenses", href: "/lenses", internal: true }, // 👈 internal route
            ].map((chip, i) =>
              chip.internal ? (
                <Link
                  key={i}
                  href={chip.href}
                  className={`${styles.chip} ${chip.label === "Lenses" ? styles.lensesChip : ""}`}
                >
                  {chip.label}
                </Link>
              ) : (
                <a
                  key={i}
                  href={chip.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.chip} ${chip.label === "Lenses" ? styles.lensesChip : ""}`}
                >
                  {chip.label}
                </a>
            ))}
        </motion.div>
        )}
    </div>
  );
}