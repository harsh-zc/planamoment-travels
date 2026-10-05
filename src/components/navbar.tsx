"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/#packages", label: "Packages" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/#reviews", label: "Reviews" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Home and destination detail pages start with a full-bleed dark hero.
  const overHero = pathname === "/" || pathname.startsWith("/destinations/");
  const solid = scrolled || !overHero || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? `border-b border-black/5 py-3 shadow-sm backdrop-blur-xl ${open ? "bg-white" : "bg-white/80"}`
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo light={!solid} />

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href) && !link.href.includes("#");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    solid
                      ? active
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-600 hover:text-ink"
                      : active
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+919876543210"
            className={`flex items-center gap-2 text-sm font-medium ${solid ? "text-slate-600" : "text-white/90"}`}
          >
            <Phone className="size-4" /> +91 98765 43210
          </a>
          <Link
            href="/destinations"
            className="rounded-full bg-gradient-to-r from-sunset-500 to-sunset-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sunset-500/30 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Book a trip
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`grid size-10 place-items-center rounded-full lg:hidden ${solid ? "text-ink hover:bg-black/5" : "text-white hover:bg-white/10"}`}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <div
        className={`grid overflow-hidden transition-all duration-500 lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0">
          <ul className="space-y-1 px-5 pb-6 pt-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/destinations"
                onClick={() => setOpen(false)}
                className="block rounded-2xl bg-gradient-to-r from-sunset-500 to-sunset-600 px-4 py-3 text-center font-semibold text-white"
              >
                Book a trip
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
