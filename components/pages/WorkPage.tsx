"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

interface Project {
  num: string;
  category: string;
  title: string;
  description: string;
  stack: string[];
  live: string;
  status: "live" | "in-progress";
}

const projects: Project[] = [
  {
    num: "01",
    category: "Mother Project",
    title: "Powerlife",
    description:
      "Main revenue project and business platform — the core of the agency's production infrastructure.",
    stack: ["Next.js", "Supabase", "Cloudflare"],
    live: "https://powerlife-shop.com",
    status: "live",
  },
  {
    num: "02",
    category: "Real Client",
    title: "Carleigh's Lodge",
    description:
      "Lodge website for a real client, deployed on Cloudflare Pages with a clean booking-friendly layout.",
    stack: ["Next.js", "Cloudflare Pages"],
    live: "https://carleigh-s-lodge.pages.dev",
    status: "live",
  },
  {
    num: "03",
    category: "Demo / Healthcare",
    title: "Zenyx Clinic",
    description:
      "Clinic management demo — patient records, scheduling, and staff workflows on a self-hosted stack.",
    stack: ["Next.js", "Supabase", "Docker"],
    live: "https://clinic.powerlife-shop.com",
    status: "live",
  },
  {
    num: "04",
    category: "Demo / Booking",
    title: "Bookify",
    description:
      "Generic booking system demo built to be reusable across multiple service-based business types.",
    stack: ["Next.js", "Supabase", "REST API"],
    live: "https://booking.powerlife-shop.com",
    status: "live",
  },
  {
    num: "05",
    category: "Demo / Property",
    title: "TenantPro",
    description:
      "Lease management demo for property operators — tenants, units, and payment tracking.",
    stack: ["Next.js", "Supabase", "Docker"],
    live: "https://tenant.powerlife-shop.com",
    status: "live",
  },
  {
    num: "06",
    category: "Demo / Retail",
    title: "POS System",
    description:
      "Point-of-sale demo for small retail operations, running on the self-hosted Contabo + Cloudflare Tunnel stack.",
    stack: ["Next.js", "Supabase", "Docker"],
    live: "https://pos.powerlife-shop.com",
    status: "live",
  },
  {
    num: "07",
    category: "Demo / Coffee Shop",
    title: "Coffee Shop 1",
    description:
      "Next.js coffee shop landing page with menu and ambiance showcase.",
    stack: ["Next.js", "Cloudflare"],
    live: "https://coffeeshop1.powerlife-shop.com",
    status: "live",
  },
  {
    num: "08",
    category: "Demo / Coffee Shop",
    title: "Coffee Shop 2",
    description:
      "Alternate coffee shop landing page design with testimonials and gallery.",
    stack: ["Next.js", "Cloudflare"],
    live: "https://coffeeshop2.powerlife-shop.com",
    status: "live",
  },
  {
    num: "09",
    category: "Demo / Hospitality",
    title: "Hotel Booking",
    description:
      "React-based hotel booking landing page demo.",
    stack: ["React", "Cloudflare"],
    live: "https://hotel.powerlife-shop.com",
    status: "live",
  },
  {
    num: "10",
    category: "Demo / Food & Beverage",
    title: "Restaurant",
    description:
      "Next.js restaurant landing page demo with menu presentation.",
    stack: ["Next.js", "Cloudflare"],
    live: "https://restaurant.powerlife-shop.com",
    status: "live",
  },
  {
    num: "11",
    category: "Demo / Healthcare",
    title: "HealthCare",
    description:
      "Vanilla JS healthcare landing page fundamentals demo.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    live: "https://healthcare.powerlife-shop.com",
    status: "live",
  },
  {
    num: "12",
    category: "Demo / Retail",
    title: "PharmaPOS",
    description:
      "Pharmacy point-of-sale demo with inventory and prescription tracking.",
    stack: ["Next.js", "Supabase", "Docker"],
    live: "https://pos.powerlife-shop.com",
    status: "in-progress",
  },
  {
    num: "13",
    category: "Demo / Education",
    title: "School LMS",
    description:
      "Learning management system demo \u2014 currently on hold for improvements.",
    stack: ["Next.js", "Supabase", "Docker"],
    live: "https://lms.powerlife-shop.com",
    status: "in-progress",
  },
];

export default function WorkPage() {
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
          <h2 className="text-3xl xl:text-4xl font-bold">{t("work.title")}</h2>
          <p className="text-white/50 mt-3 max-w-[560px] mx-auto xl:mx-0">
            {t("work.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="bg-secondary rounded-2xl p-6 border border-white/5 hover:border-accent/40 transition-all duration-300 group flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {project.category}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                  {project.status === "live" ? "Live" : "In Progress"}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full bg-primary text-white/50 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-accent transition-colors duration-300"
              >
                Visit site <FiExternalLink />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
