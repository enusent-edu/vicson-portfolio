"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FaChevronDown } from "react-icons/fa";

interface AccordionContextValue {
  openValue: string | null;
  toggle: (v: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null
);

const ItemValueContext = React.createContext<string>("");

export function Accordion({
  type = "single",
  collapsible = true,
  className,
  children,
}: {
  type?: "single";
  collapsible?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [openValue, setOpenValue] = React.useState<string | null>(null);

  const toggle = (v: string) => {
    setOpenValue((prev) => (prev === v ? (collapsible ? null : v) : v));
  };

  return (
    <AccordionContext.Provider value={{ openValue, toggle }}>
      <div className={cn("flex flex-col gap-3", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ItemValueContext.Provider value={value}>
      <div
        className={cn(
          "border border-white/10 rounded-xl overflow-hidden bg-secondary",
          className
        )}
      >
        {children}
      </div>
    </ItemValueContext.Provider>
  );
}

export function AccordionTrigger({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(AccordionContext);
  const value = React.useContext(ItemValueContext);
  if (!ctx) return null;
  const isOpen = ctx.openValue === value;

  return (
    <button
      type="button"
      onClick={() => ctx.toggle(value)}
      className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-white hover:text-accent transition-colors duration-300"
    >
      <span>{children}</span>
      <FaChevronDown
        className={cn(
          "transition-transform duration-300 text-accent shrink-0 ml-3",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

export function AccordionContent({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(AccordionContext);
  const value = React.useContext(ItemValueContext);
  if (!ctx || ctx.openValue !== value) return null;
  return (
    <div className="px-5 pb-4 text-white/60 text-sm leading-relaxed animate-fade-in">
      {children}
    </div>
  );
}
