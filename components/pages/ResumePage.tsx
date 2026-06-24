"use client";

import { motion } from "framer-motion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiDocker,
  SiCloudflare,
  SiPostgresql,
  SiGit,
  SiReact,
  SiNodedotjs,
  SiLinux,
} from "react-icons/si";
import { FaNetworkWired, FaServer } from "react-icons/fa";

const aboutInfo = [
  { field: "Name", value: "Vicson L. Vidallon" },
  { field: "Role", value: "Full-Stack Developer" },
  { field: "Location", value: "Indang, Cavite, Philippines" },
  { field: "Viber", value: "0981 366 1984" },
  { field: "Focus", value: "Production-ready, low-cost web systems" },
];

const experience = [
  {
    company: "Independent / Agency (Solo Founder)",
    position: "Full-Stack Developer",
    duration: "Present",
    description:
      "Designing and shipping production web systems end to end — frontend, backend, database, and self-hosted infrastructure — for real client and demo projects.",
  },
  {
    company: "Self-Hosted Infrastructure Projects",
    position: "Systems & Deployment",
    duration: "Ongoing",
    description:
      "Built and maintain a multi-server setup: Contabo VPS, local HP server with Docker workloads, GCP failover monitor, and Cloudflare Tunnel routing — all run at minimal cost.",
  },
];

const education = [
  {
    school: "Self-Directed / Continuous Learning",
    degree: "Web Development & Cloud Systems",
    duration: "Ongoing",
    description:
      "Hands-on learning across Next.js, Supabase, Docker, and self-hosted networking — applied directly to live, production systems.",
  },
];

const skills = [
  { icon: <SiNextdotjs />, name: "Next.js" },
  { icon: <SiReact />, name: "React" },
  { icon: <SiTypescript />, name: "TypeScript" },
  { icon: <SiTailwindcss />, name: "TailwindCSS" },
  { icon: <SiNodedotjs />, name: "Node.js" },
  { icon: <SiSupabase />, name: "Supabase" },
  { icon: <SiPostgresql />, name: "PostgreSQL" },
  { icon: <SiDocker />, name: "Docker" },
  { icon: <SiCloudflare />, name: "Cloudflare" },
  { icon: <SiLinux />, name: "Linux VPS" },
  { icon: <SiGit />, name: "Git" },
  { icon: <FaServer />, name: "Home Lab" },
  { icon: <FaNetworkWired />, name: "MikroTik" },
];

export default function ResumePage() {
  const { t } = useLanguage();

  return (
    <section className="py-16 xl:py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl xl:text-4xl font-bold mb-10 text-center xl:text-left"
        >
          {t("resume.title")}
        </motion.h2>

        <Tabs defaultValue="about">
          <TabsList className="mb-10 justify-center xl:justify-start">
            <TabsTrigger value="about">{t("resume.tabs.about")}</TabsTrigger>
            <TabsTrigger value="experience">
              {t("resume.tabs.experience")}
            </TabsTrigger>
            <TabsTrigger value="skills">{t("resume.tabs.skills")}</TabsTrigger>
            <TabsTrigger value="education">
              {t("resume.tabs.education")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {aboutInfo.map((item) => (
                <div
                  key={item.field}
                  className="bg-secondary rounded-lg p-4 border border-white/5"
                >
                  <p className="text-white/40 text-xs uppercase tracking-wide">
                    {item.field}
                  </p>
                  <p className="text-white font-medium mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experience">
            <div className="flex flex-col gap-6 max-w-2xl">
              {experience.map((item, index) => (
                <div
                  key={index}
                  className="bg-secondary rounded-xl p-6 border border-white/5"
                >
                  <span className="text-accent text-xs font-semibold uppercase tracking-wide">
                    {item.duration}
                  </span>
                  <h3 className="text-lg font-bold mt-1">{item.position}</h3>
                  <p className="text-white/50 text-sm mb-2">{item.company}</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-3xl">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-2 bg-secondary rounded-xl p-4 border border-white/5 hover:border-accent/40 transition-colors duration-300"
                >
                  <span className="text-3xl text-accent">{skill.icon}</span>
                  <span className="text-xs text-white/60 text-center">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education">
            <div className="flex flex-col gap-6 max-w-2xl">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="bg-secondary rounded-xl p-6 border border-white/5"
                >
                  <span className="text-accent text-xs font-semibold uppercase tracking-wide">
                    {item.duration}
                  </span>
                  <h3 className="text-lg font-bold mt-1">{item.degree}</h3>
                  <p className="text-white/50 text-sm mb-2">{item.school}</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
