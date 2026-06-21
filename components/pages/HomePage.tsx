"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import Social from "@/components/Social";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();
  const { displayText, isComplete } = useTypewriter({
    text: "Vicson L. Vidallon",
    speed: 90,
    delay: 600,
  });

  return (
    <section className="py-12 xl:py-0">
      <div className="container mx-auto px-6">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-8">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-accent font-medium tracking-wide"
            >
              {t("home.greeting")}
            </motion.span>

            <h1 className="h1 text-4xl sm:text-5xl xl:text-6xl font-bold mt-3 leading-tight">
              {displayText}
              {!isComplete && <span className="typewriter-cursor" />}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="text-accent text-lg xl:text-xl font-medium mt-2"
            >
              {t("home.title")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="text-white/60 max-w-[500px] mx-auto xl:mx-0 mt-6 leading-relaxed"
            >
              {t("home.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
              className="flex flex-col sm:flex-row items-center gap-6 mt-8 justify-center xl:justify-start"
            >
              <Link href="/contact">
                <Button size="lg">{t("home.hireMe")}</Button>
              </Link>
              <Link href="/work">
                <Button variant="outline" size="lg">
                  {t("home.myWork")}
                </Button>
              </Link>
              <Social
                containerStyles="flex gap-4"
                iconStyles="w-10 h-10 border border-accent/40 rounded-full flex justify-center items-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="order-1 xl:order-none"
          >
            <Photo />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="mt-16 xl:mt-20"
        >
          <Stats />
        </motion.div>
      </div>
    </section>
  );
}
