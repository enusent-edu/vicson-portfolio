import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full h-12 px-4 rounded-lg bg-secondary border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
