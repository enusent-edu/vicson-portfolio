"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { usePathname } from "next/navigation";

const PANEL_COUNT = 6;
const STEP = 0.3;
const STAGGER = 0.02;

export default function StairTransition() {
  const pathname = usePathname();
  const controls = useAnimationControls();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    let cancelled = false;

    const run = async () => {
      // Cover the screen
      await controls.start((i: number) => ({
        top: "0%",
        transition: { duration: STEP, ease: "easeInOut", delay: STAGGER * i },
      }));
      if (cancelled) return;
      // Reveal the new page
      await controls.start((i: number) => ({
        top: "100%",
        transition: { duration: STEP, ease: "easeInOut", delay: STAGGER * i },
      }));
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [pathname, controls]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex">
      {[...Array(PANEL_COUNT)].map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          className="h-full w-full stair-panel relative"
          style={{ position: "absolute", left: `${(index * 100) / PANEL_COUNT}%`, width: `${100 / PANEL_COUNT}%` }}
          initial={{ top: "100%" }}
          animate={controls}
        />
      ))}
    </div>
  );
}
