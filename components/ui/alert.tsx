import * as React from "react";
import { cn } from "@/lib/utils";

const variantClasses: Record<string, string> = {
  default: "bg-secondary border-white/10 text-white",
  destructive: "bg-red-950/40 border-red-500/40 text-red-300",
  success: "bg-accent/10 border-accent/40 text-accent",
};

export function Alert({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "destructive" | "success";
}) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5 className={cn("font-semibold mb-1", className)} {...props} />
  );
}

export function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("opacity-90", className)} {...props} />;
}
