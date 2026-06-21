"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface StatItem {
  num: number;
  textKey: string;
  startFrom?: number;
  suffix?: string;
}

const stats: StatItem[] = [
  { num: 3, textKey: "home.stats.experience", suffix: "+" },
  { num: 6, textKey: "home.stats.projects", suffix: "+" },
  { num: 5, textKey: "home.stats.clients", suffix: "+" },
  { num: 15, textKey: "home.stats.tech", suffix: "+" },
];

function Counter({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const startTime = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value}</span>;
}

export default function Stats() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-1 text-center"
        >
          <span className="text-3xl xl:text-4xl font-bold text-accent">
            <Counter target={stat.num} />
            {stat.suffix}
          </span>
          <span className="text-white/50 text-xs xl:text-sm capitalize">
            {t(stat.textKey)}
          </span>
        </div>
      ))}
    </div>
  );
}
