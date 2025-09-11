"use client";

import { useState, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import styles from "./CityClock.module.css";

const cities = [
  { name: "San Francisco", tz: "America/Los_Angeles" },
  { name: "New York", tz: "America/New_York" },
  { name: "London", tz: "Europe/London" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "Dubai", tz: "Asia/Dubai" },
  { name: "São Paulo", tz: "America/Sao_Paulo" },
  { name: "Paris", tz: "Europe/Paris" },
  { name: "Johannesburg", tz: "Africa/Johannesburg" },
  { name: "Beijing", tz: "Asia/Shanghai" },
  { name: "Sydney", tz: "Australia/Sydney" },
  { name: "Cairo", tz: "Africa/Cairo" },
  { name: "Vladivostok", tz: "Australia/Sydney" },
];

export default function CityClock() {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState("");
  const [scope, animate] = useAnimate();

  // cycle through cities every 5s
  useEffect(() => {
    const interval = setInterval(async () => {
      await animate(scope.current, { opacity: 0, y: -10 }, { duration: 0.3 });
      setIndex((prev) => (prev + 1) % cities.length);
      await animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.3 });
    }, 5000);

    return () => clearInterval(interval);
  }, [animate]);

  // update live time every second
  useEffect(() => {
    const update = () => {
      const city = cities[index];
      const formatter = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: city.tz,
      });
      setTime(formatter.format(new Date()));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <motion.div
      className={styles.clock}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div ref={scope} className={styles.city}>
        {cities[index].name} — {time}
      </motion.div>
    </motion.div>
  );
}