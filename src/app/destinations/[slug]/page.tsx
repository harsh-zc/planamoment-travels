import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarRange,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { BookingCard } from "@/components/booking-card";
import { DestinationCard } from "@/components/destination-card";
import { Reveal } from "@/components/reveal";
import { destinations, getDestination } from "@/lib/data";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const d = getDestination(slug);
  if (!d) return {};
  return {
    title: `${d.name} — ${d.nights}N/${d.nights + 1}D holiday package`,
    description: d.description,
    openGraph: { images: [d.image] },
  };
}

export default async function DestinationPage(props: PageProps<"/destinations/[slug]">) {
  const { slug } = await props.params;
  const d = getDestination(slug);
  if (!d) notFound();

  const similar = destinations
    .filter((x) => x.slug !== d.slug && x.categories.some((c) => d.categories.includes(c)))
    .slice(0, 3);

  const facts = [
    { icon: Clock, label: "Duration", value: `${d.nights}N / ${d.nights + 1}D` },
    { icon: CalendarRange, label: "Best time", value: d.bestTime },
    { icon: Users, label: "Group size", value: "1 – 15" },
    { icon: Star, label: "Rating", value: `${d.rating} (${d.reviews.toLocaleString("en-IN")})` },
  ];

  return (
    <>
      <section className="relative flex h-[75svh] min-h-[520px] items-end overflow-hidden bg-ink">
        <Image src={d.image} alt={d.name} fill priority sizes="100vw" className="animate-ken-burns object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 lg:px-8">
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="size-4" />
            <Link href="/destinations" className="hover:text-white">Destinations</Link>
            <ChevronRight className="size-4" />
            <span className="text-white">{d.name}</span>
          </nav>
          <div className="flex animate-fade-up flex-wrap gap-2">
            {d.categories.map((c) => (
              <span key={c} className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                {c}
              </span>
            ))}
          </div>
          <h1 className="mt-4 animate-fade-up font-display text-5xl font-semibold text-white [animation-delay:100ms] md:text-7xl">
            {d.name}
          </h1>
          <p className="mt-3 flex animate-fade-up flex-wrap items-center gap-x-4 gap-y-2 text-lg text-white/85 [animation-delay:200ms]">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-5 text-brand-300" /> {d.country}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="size-5 fill-amber-400 text-amber-400" /> {d.rating} · {d.reviews.toLocaleString("en-IN")} reviews
            </span>
            <span className="italic text-white/70">{d.tagline}</span>
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_400px] lg:px-8">
        <div className="min-w-0 space-y-14">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                <f.icon className="mb-2 size-5 text-brand-500" />
                <p className="text-xs text-slate-500">{f.label}</p>
                <p className="font-semibold text-ink">{f.value}</p>
              </div>
            ))}
          </div>

          <Reveal>
            <h2 className="mb-4 font-display text-3xl font-semibold text-ink">Overview</h2>
            <p className="text-lg leading-relaxed text-slate-600">{d.description}</p>
          </Reveal>

          <Reveal>
            <div className="grid h-[420px] grid-cols-4 grid-rows-2 gap-3">
              {d.gallery.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className={`group relative overflow-hidden rounded-3xl ${
                    i === 0
                      ? "col-span-4 sm:col-span-2 sm:row-span-2"
                      : i === 1
                        ? "col-span-2"
                        : i === 2
                          ? "col-span-2 sm:col-span-1"
                          : "hidden sm:block"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${d.name} photo ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="mb-5 font-display text-3xl font-semibold text-ink">Trip highlights</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {d.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-500">
                    <Sparkles className="size-4" />
                  </span>
                  <span className="pt-1 font-medium text-slate-700">{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="mb-5 font-display text-3xl font-semibold text-ink">Day-by-day itinerary</h2>
            <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[23px] before:top-6 before:w-px before:bg-brand-200">
              {d.itinerary.map((day, i) => (
                <li key={day.title} className="relative">
                  <details open={i === 0} className="group rounded-2xl bg-white ring-1 ring-black/5 open:shadow-md">
                    <summary className="flex cursor-pointer list-none items-center gap-4 p-3 pr-5 [&::-webkit-details-marker]:hidden">
                      <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-xl bg-brand-500 text-sm font-bold text-white">
                        D{i + 1}
                      </span>
                      <span className="flex-1 font-semibold text-ink">{day.title}</span>
                      <ChevronDown className="size-5 text-slate-400 transition group-open:rotate-180" />
                    </summary>
                    <p className="px-5 pb-5 pl-[76px] leading-relaxed text-slate-600">{day.description}</p>
                  </details>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <h2 className="mb-5 font-display text-3xl font-semibold text-ink">What&apos;s included</h2>
            <div className="flex flex-wrap gap-3">
              {d.inclusions.map((inc) => (
                <span key={inc} className="flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 font-medium text-brand-800">
                  <Check className="size-4" /> {inc}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BookingCard destination={d} />
        </aside>
      </section>

      {similar.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="mb-8 font-display text-4xl font-semibold text-ink">
              You might <span className="italic text-brand-600">also love</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => (
                <DestinationCard key={s.slug} destination={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
