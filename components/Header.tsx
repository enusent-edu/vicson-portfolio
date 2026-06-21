import Link from "next/link";
import Nav from "@/components/Nav";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-primary/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto flex items-center justify-between py-5 px-6">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight">
            Vicson<span className="text-accent">.</span>
          </h1>
        </Link>

        <div className="hidden xl:flex items-center gap-10">
          <Nav />
          <Link href="/contact">
            <Button>Hire Me</Button>
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
