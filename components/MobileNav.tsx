"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgMenuRight } from "react-icons/cg";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "resume", path: "/resume" },
  { name: "work", path: "/work" },
  { name: "faq", path: "/faq" },
  { name: "contact", path: "/contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="text-3xl text-accent"
      >
        <CgMenuRight />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent onClose={() => setOpen(false)}>
          <h2 className="text-2xl font-semibold">
            Vicson<span className="text-accent">.</span>
          </h2>
          <nav className="flex flex-col gap-6 mt-4">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "capitalize text-lg font-medium transition-colors duration-300",
                  pathname === link.path
                    ? "text-accent"
                    : "text-white/70 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
