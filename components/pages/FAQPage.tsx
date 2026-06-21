"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";

const faqs = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "Full-stack web apps — booking systems, POS, clinic and lease management, business websites — built with Next.js and Supabase, deployed on self-hosted infrastructure for low ongoing cost.",
  },
  {
    question: "Do you handle deployment and hosting too?",
    answer:
      "Yes. Projects are deployed through Docker on a self-managed server, routed through Cloudflare Tunnel — no per-seat hosting bills, full control over the stack.",
  },
  {
    question: "How fast can a project go live?",
    answer:
      "Depends on scope, but demo-grade systems (booking, POS, clinic, etc.) can typically go from build to a working subdomain within days, not weeks.",
  },
  {
    question: "Can you work with an existing Supabase or database setup?",
    answer:
      "Yes — including reviewing RLS policies, schema migrations, and REST API integration to keep things production-safe.",
  },
  {
    question: "How do I get in touch?",
    answer:
      "Use the contact form, or reach out directly via Viber at 0981 366 1984.",
  },
];

export default function FAQPage() {
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
          {t("faq.title")}
        </motion.h2>

        <div className="max-w-2xl mx-auto xl:mx-0">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
