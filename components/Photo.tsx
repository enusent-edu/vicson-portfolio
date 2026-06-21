"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Photo() {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.6 } }}
        className="relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-10px] rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #00ff99, transparent 30%, transparent 70%, #00ff99)",
            maskImage:
              "radial-gradient(closest-side, transparent calc(100% - 4px), black calc(100% - 3px))",
            WebkitMaskImage:
              "radial-gradient(closest-side, transparent calc(100% - 4px), black calc(100% - 3px))",
          }}
        />
        <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] xl:w-[400px] xl:h-[400px] rounded-full overflow-hidden border-4 border-primary">
          <Image
            src="/assets/photo.svg"
            alt="Vicson L. Vidallon"
            fill
            priority
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
