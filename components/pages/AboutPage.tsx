"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <section className="py-16 xl:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl xl:text-4xl font-bold mb-8"
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/60 leading-relaxed space-y-4"
        >
          <p>
            I&apos;m Vicson L. Vidallon, a solo full-stack developer building
            production-ready web systems from the ground up — frontend,
            backend, database, and the server infrastructure that keeps it
            all running.
          </p>
          <p>
            My focus is on shipping real, working systems at low cost:
            self-hosted deployments routed through Cloudflare Tunnel,
            Supabase-backed databases with proper security policies, and
            Next.js apps engineered for production from day one.
          </p>
          <p>
            Based in Indang, Cavite, Philippines — working solo as an agency,
            handling every layer of the stack myself.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
