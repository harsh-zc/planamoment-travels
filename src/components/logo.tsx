import Link from "next/link";
import { Plane } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-lg shadow-brand-600/30 transition-transform duration-500 group-hover:rotate-12">
        <Plane className="size-5 -rotate-45" />
      </span>
      <span
        className={`font-display text-xl font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}
      >
        PlanA<span className="italic text-brand-500">Moment</span>
      </span>
    </Link>
  );
}
