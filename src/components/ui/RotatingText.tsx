"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  className?: string;
  mainClassName?: string;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
}

const RotatingText = ({
  texts,
  rotationInterval = 2000,
  className = "",
  mainClassName = "",
  initial = { y: "100%", opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: "-100%", opacity: 0 },
  transition = { type: "spring", stiffness: 300, damping: 30 },
}: RotatingTextProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [texts, rotationInterval]);

  return (
    <div className={`h-[2.5rem] sm:h-[3rem] md:h-[3.5rem] ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          className={`inline-block w-full text-center ${className}`}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText;
