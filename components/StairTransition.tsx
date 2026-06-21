"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const stairAnimation = {
  initial: { top: "100%" },
  enter: (i: number) => ({
    top: "0%",
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
      delay: 0.02 * i,
    },
  }),
  exit: (i: number) => ({
    top: "100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
      delay: 0.02 * i,
    },
  }),
};

export default function StairTransition() {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="fixed inset-0 z-50 pointer-events-none flex">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            custom={index}
            className="h-full w-full stair-panel relative"
            variants={stairAnimation}
            initial="initial"
            animate="enter"
            exit="exit"
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
