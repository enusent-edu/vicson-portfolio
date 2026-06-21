"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const stairAnimation = {
  initial: { top: "0%" },
  animate: { top: "100%" },
  exit: { top: "0%" },
};

const reverseIndex = (index: number) => {
  const total = 6;
  return total - index - 1;
};

export default function StairTransition() {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="fixed inset-0 z-50 pointer-events-none flex">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            className="h-full w-full stair-panel relative"
            variants={stairAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: reverseIndex(index) * 0.05,
            }}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
