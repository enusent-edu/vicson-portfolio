"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowDownRight } from "react-icons/bs";
import { useLanguage } from "@/context/LanguageContext";

interface Service {
  num: string;
  title: string;
  description: string;
  stack: string[];
  href: string;
}

const services: Service[] = [
  {
    num: "01",
    title: "Full-Stack Web Apps",
    description:
      "Production-ready apps built with Next.js, TypeScript, and Tailwind — server-rendered, SEO-friendly, and fast.",
    stack: ["Next.js", "TypeScript", "TailwindCSS"],
    href: "/contact",
  },
  {
    num: "02",
    title: "Database & Backend",
    description:
      "Supabase-backed systems with proper RLS policies, REST API integration, and migration-safe schema changes.",
    stack: ["Supabase", "PostgreSQL", "REST API"],
    href: "/contact",
  },
  {
    num: "03",
    title: "Self-Hosted Deployment",
    description:
      "Dockerized apps deployed on owned infrastructure with Cloudflare Tunnel — no hyperscaler bills, full control.",
    stack: ["Docker", "Cloudflare Tunnel", "Linux VPS", "Home Lab", "MikroTik"],
    href: "/contact",
  },
  {
    num: "04",
    title: "Business Systems",
    description:
      "Booking platforms, POS, lease management, and clinic systems — built solo, end to end, for real operations.",
    stack: ["Booking", "POS", "Multi-tenant"],
    href: "/contact",
  },
];

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <section className="py-16 xl:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center xl:text-left"
        >
          <h2 className="text-3xl xl:text-4xl font-bold">
            {t("services.title")}
          </h2>
          <p className="text-white/50 mt-3 max-w-[560px] mx-auto xl:mx-0">
            {t("services.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-primary p-8 flex flex-col gap-5 group"
            >
              <div className="flex justify-between items-start">
                <span className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                  {service.num}
                </span>
                <Link
                  href={service.href}
                  aria-label={`Inquire about ${service.title}`}
                  className="w-12 h-12 rounded-full bg-secondary group-hover:bg-accent transition-all duration-300 flex justify-center items-center group-hover:-rotate-45"
                >
                  <BsArrowDownRight className="text-white group-hover:text-primary text-xl" />
                </Link>
              </div>

              <h3 className="text-xl font-bold group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {service.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full bg-secondary text-white/60 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
