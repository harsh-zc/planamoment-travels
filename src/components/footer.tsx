import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { destinations } from "@/lib/data";

const socials = ["Instagram", "Facebook", "YouTube", "X"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-slate-400">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-5">
          <Logo light />
          <p className="text-sm leading-relaxed">
            Handcrafted holidays for curious travellers. We plan the moments —
            you just live them.
          </p>
          <div className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s}
                href="#"
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-brand-400 hover:text-white"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Top destinations</h4>
          <ul className="space-y-2.5 text-sm">
            {destinations.slice(0, 6).map((d) => (
              <li key={d.slug}>
                <Link href={`/destinations/${d.slug}`} className="transition hover:text-brand-300">
                  {d.name === d.country ? d.name : `${d.name}, ${d.country}`}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {["About us", "Careers", "Travel blog", "Gift cards", "Privacy policy", "Terms & conditions"].map((l) => (
              <li key={l}>
                <a href="#" className="transition hover:text-brand-300">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Get in touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" />
              4th Floor, Cyber Hub, Gurugram, Haryana 122002
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-400" />
              +91 98765 43210
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-400" />
              hello@planamoment.travel
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} PlanAMoment Travels Pvt. Ltd. All rights reserved.</p>
          <p>Made with ♥ for wanderers</p>
        </div>
      </div>
    </footer>
  );
}
