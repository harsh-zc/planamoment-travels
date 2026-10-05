import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Star } from "lucide-react";
import { formatINR, type Destination } from "@/lib/data";

export function DestinationCard({ destination: d }: { destination: Destination }) {
  const discount = Math.round(((d.originalPrice - d.pricePerPerson) / d.originalPrice) * 100);

  return (
    <Link
      href={`/destinations/${d.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_20px_-6px_rgba(15,23,42,0.12)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-12px_rgba(15,23,42,0.25)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={d.image}
          alt={`${d.name}, ${d.country}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-sunset-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
          {discount}% OFF
        </span>
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          {d.rating}
        </span>
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {d.categories.slice(0, 2).map((c) => (
            <span
              key={c}
              className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <MapPin className="size-3.5 text-brand-500" /> {d.country}
          <span className="mx-1 text-slate-300">•</span>
          <Clock className="size-3.5 text-brand-500" /> {d.nights}N / {d.nights + 1}D
        </div>
        <h3 className="font-display text-2xl font-semibold text-ink">{d.name}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-slate-500">{d.tagline}</p>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <p className="text-xs text-slate-400 line-through">{formatINR(d.originalPrice)}</p>
            <p className="text-xl font-bold text-ink">
              {formatINR(d.pricePerPerson)}
              <span className="text-xs font-medium text-slate-400"> /person</span>
            </p>
          </div>
          <span className="grid size-11 place-items-center rounded-full bg-ink text-white transition duration-500 group-hover:rotate-45 group-hover:bg-brand-500">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
