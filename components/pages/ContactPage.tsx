"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/context/LanguageContext";
import { FaViber } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";

interface FormData {
  fullname: string;
  email: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }

      setStatus("success");
      setFormData({ fullname: "", email: "", message: "" });

      fetch("/api/send-auto-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => {});
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  return (
    <section className="py-16 xl:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center xl:text-left"
        >
          <h2 className="text-3xl xl:text-4xl font-bold">{t("contact.title")}</h2>
          <p className="text-white/50 mt-3 max-w-[560px] mx-auto xl:mx-0">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.4fr] gap-12">
          <div className="flex flex-col gap-6 order-2 xl:order-1">
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-accent text-lg shrink-0">
                <FaViber />
              </span>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide">
                  Viber
                </p>
                <p className="font-medium">0981 366 1984</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-accent text-lg shrink-0">
                <HiOutlineLocationMarker />
              </span>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide">
                  Location
                </p>
                <p className="font-medium">
                  115 Agus-os, Indang, Cavite 4122
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-accent text-lg shrink-0">
                <HiOutlineMail />
              </span>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide">
                  GitHub
                </p>
                <p className="font-medium">enusent-edu</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-secondary rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col gap-5 order-1 xl:order-2"
          >
            <Input
              name="fullname"
              placeholder={t("contact.form.name")}
              value={formData.fullname}
              onChange={handleChange}
              required
              maxLength={100}
            />
            <Input
              type="email"
              name="email"
              placeholder={t("contact.form.email")}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder={t("contact.form.message")}
              value={formData.message}
              onChange={handleChange}
              required
              maxLength={5000}
              className="h-[160px]"
            />

            {status === "success" && (
              <Alert variant="success">
                <AlertTitle>Message sent</AlertTitle>
                <AlertDescription>
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </AlertDescription>
              </Alert>
            )}

            {status === "error" && (
              <Alert variant="destructive">
                <AlertTitle>Couldn&apos;t send message</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={status === "loading"}
              className="self-start"
            >
              {status === "loading" ? "Sending..." : t("contact.form.send")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
