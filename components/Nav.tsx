"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "resume", path: "/resume" },
  { name: "work", path: "/work" },
  { name: "faq", path: "/faq" },
  { name: "contact", path: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={cn(
            "capitalize font-medium text-sm tracking-wide transition-colors duration-300 relative",
            pathname === link.path
              ? "text-accent"
              : "text-white/70 hover:text-white"
          )}
        >
          {link.name}
          {pathname === link.path && (
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent" />
          )}
        </Link>
      ))}
    </nav>
  );
}
