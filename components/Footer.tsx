import Link from "next/link";
import Social from "@/components/Social";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-white/50 text-sm">
          &copy; {year} Vicson L. Vidallon. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-sm text-white/50">
          <Link href="/privacy" className="hover:text-accent transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-accent transition-colors">
            Terms
          </Link>
        </div>

        <Social
          containerStyles="flex gap-4"
          iconStyles="w-9 h-9 border border-accent/40 rounded-full flex justify-center items-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
        />
      </div>
    </footer>
  );
}
