"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60 animate-fade-in"
        onClick={() => onOpenChange(false)}
      />
      {children}
    </div>
  );
}

export function SheetContent({
  className,
  onClose,
  children,
}: {
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute right-0 top-0 h-full w-[75%] max-w-sm bg-secondary border-l border-white/10 p-8 flex flex-col gap-8 animate-fade-in",
        className
      )}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="self-end text-2xl text-white/70 hover:text-accent transition-colors"
      >
        <IoClose />
      </button>
      {children}
    </div>
  );
}
