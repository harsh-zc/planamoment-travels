import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Compass,
  Headphones,
  Heart,
  Landmark,
  Mountain,
  Building2,
  ShieldCheck,
  Star,
  Sun,
  Wallet,
  Sparkles,
} from "lucide-react";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { SearchWidget } from "@/components/search-widget";
import { DestinationCard } from "@/components/destination-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Newsletter } from "@/components/newsletter";
import { destinations, formatINR, testimonials, unsplash, type Category } from "@/lib/data";

const heroSlides = [
  { src: unsplash("photo-1514282401047-d79a71a590e8"), label: "Maldives" },
  { src: unsplash("photo-1570077188670-e3a8d69ac5ff"), label: "Santorini, Greece" },
  { src: unsplash("photo-1506905925346-21bda4d32df4"), label: "Swiss Alps" },
];

const stats = [
  { value: "50K+", label: "Happy travellers" },
  { value: "120+", label: "Destinations" },
  { value: "4.9★", label: "Average rating" },
  { value: "24×7", label: "Trip support" },
];

const tripTypes: { name: Category; icon: typeof Sun; color: string }[] = [
  { name: "Beach", icon: Sun, color: "from-sky-400 to-cyan-500" },
  { name: "Mountains", icon: Mountain, color: "from-emerald-400 to-teal-600" },
  { name: "Honeymoon", icon: Heart, color: "from-rose-400 to-pink-600" },
  { name: "Culture", icon: Landmark, color: "from-amber-400 to-orange-500" },
  { name: "Adventure", icon: Compass, color: "from-violet-400 to-purple-600" },
  { name: "City", icon: Building2, color: "from-slate-500 to-slate-800" },
];

const features = [
  {
    icon: Wallet,
    title: "Best price guarantee",
    text: "Found it cheaper? We'll match the price and give you ₹1,000 off your next trip.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & secure booking",
    text: "PCI-DSS secured payments, no-cost EMI and free cancellation on select trips.",
  },
  {
    icon: Headphones,
    title: "24×7 trip support",
    text: "A dedicated travel expert on WhatsApp from the moment you book till you're home.",
  },
  {
    icon: Sparkles,
    title: "Handcrafted itineraries",
    text: "Every package is designed by locals and tweaked to match your pace and budget.",
  },
];

export default function Home() {
  const bento = destinations.filter((d) => d.featured).slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center bg-ink">
        <HeroSlideshow slides={heroSlides} />
        <div className="relative z-30 mx-auto flex w-full max-w-7xl flex-col items-center px-5 pb-28 pt-32 text-center lg:px-8">
          <span className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
            <BadgePercent className="size-4 text-sunset-400" />
            Festive sale — up to 30% off on international trips
          </span>
          <h1 className="max-w-4xl animate-fade-up font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white [animation-delay:150ms] sm:text-6xl lg:text-8xl">
            Plan the moment.
            <br />
            <span className="italic text-brand-300">Live</span> the journey.
          </h1>
          <p className="mt-6 max-w-2xl animate-fade-up text-lg text-white/80 [animation-delay:250ms] sm:text-xl">
            Handpicked holiday packages, flights and stays — curated by travel
            experts and booked in under two minutes.
          </p>
          <div className="mt-10 flex w-full justify-center">
            <SearchWidget />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-20 -mt-14 px-5 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-slate-200/70 shadow-xl ring-1 ring-black/5 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-7 text-center">
              <p className="font-display text-3xl font-semibold text-ink md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bento destinations */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Trending now"
            title={
              <>
                Popular destinations <span className="italic text-brand-600">this season</span>
              </>
            }
            subtitle="From turquoise lagoons to snow-capped peaks — the places our travellers can't stop talking about."
            action={
              <Link
                href="/destinations"
                className="group inline-flex items-center gap-2 self-start rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink hover:bg-ink hover:text-white md:self-auto"
              >
                View all destinations
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </Link>
            }
          />
        </Reveal>

        <div className="grid auto-rows-[260px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bento.map((d, i) => (
            <Reveal
              key={d.slug}
              delay={i * 80}
              className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
            >
              <Link
                href={`/destinations/${d.slug}`}
                className="group relative block h-full overflow-hidden rounded-3xl"
              >
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                  className="object-cover transition duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-white/70">{d.country}</p>
                    <h3 className={`font-display font-semibold text-white ${i === 0 ? "text-4xl md:text-5xl" : "text-2xl"}`}>
                      {d.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/80">
                      from <span className="font-semibold text-white">{formatINR(d.pricePerPerson)}</span>
                    </p>
                  </div>
                  <span className="grid size-11 translate-y-3 place-items-center rounded-full bg-white text-ink opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight className="size-5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trip types */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Your travel style"
              title={
                <>
                  What kind of trip are you <span className="italic text-brand-600">dreaming of?</span>
                </>
              }
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {tripTypes.map((t, i) => {
              const count = destinations.filter((d) => d.categories.includes(t.name)).length;
              return (
                <Reveal key={t.name} delay={i * 60}>
                  <Link
                    href={`/destinations?category=${t.name}`}
                    className="group flex flex-col items-center rounded-3xl border border-slate-100 bg-sand p-6 text-center transition duration-500 hover:-translate-y-1 hover:border-transparent hover:bg-white hover:shadow-xl"
                  >
                    <span
                      className={`mb-4 grid size-16 place-items-center rounded-2xl bg-gradient-to-br ${t.color} text-white shadow-lg transition duration-500 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      <t.icon className="size-7" />
                    </span>
                    <span className="font-semibold text-ink">{t.name}</span>
                    <span className="text-xs text-slate-500">{count} packages</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Holiday packages"
            title={
              <>
                Handcrafted trips, <span className="italic text-brand-600">all-inclusive</span>
              </>
            }
            subtitle="Flights, stays, transfers and experiences — bundled at prices you won't find anywhere else."
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 6).map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 100}>
              <DestinationCard destination={d} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Explore all {destinations.length} packages <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section id="why-us" className="scroll-mt-24 overflow-hidden bg-ink py-24 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal className="relative">
            <div className="relative grid grid-cols-2 gap-4">
              <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-3xl">
                <Image src={unsplash("photo-1488646953014-85cb44e25828")} alt="Planning a trip" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image src={unsplash("photo-1476514525535-07fb3b4ae5f1")} alt="Traveller at a lake" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 animate-float items-center gap-3 rounded-2xl bg-white p-4 text-ink shadow-2xl">
              <div className="flex -space-x-3">
                {testimonials.slice(0, 3).map((t) => (
                  <Image key={t.name} src={t.avatar} alt={t.name} width={40} height={40} className="size-10 rounded-full object-cover ring-2 ring-white" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-sm font-bold">
                  4.9 <Star className="size-4 fill-amber-400 text-amber-400" />
                </div>
                <p className="text-xs text-slate-500">12,000+ verified reviews</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-300">
                <span className="size-1.5 rounded-full bg-brand-400" /> Why travel with us
              </span>
              <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
                We sweat the details, <span className="italic text-brand-300">you make the memories.</span>
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 100}>
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand-400/40 hover:bg-white/[0.06]">
                    <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-brand-500/15 text-brand-300">
                      <f.icon className="size-6" />
                    </span>
                    <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{f.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offer banner */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sunset-500 via-rose-500 to-fuchsia-600 p-10 text-white md:p-16">
            <Image
              src={unsplash("photo-1507525428034-b723cf961d3e")}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-20 mix-blend-overlay"
            />
            <div className="absolute -right-20 -top-20 size-80 rounded-full bg-white/10 blur-2xl" />
            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/80">Limited time offer</p>
                <h2 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
                  Honeymoon specials — <span className="italic">flat 20% off</span>
                </h2>
                <p className="mt-4 max-w-xl text-lg text-white/85">
                  Maldives, Bali, Santorini & more. Free candle-light dinner and room upgrade on every honeymoon booking.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <div className="rounded-2xl border-2 border-dashed border-white/60 px-6 py-3 font-mono text-2xl font-bold tracking-widest">
                  LOVE20
                </div>
                <Link
                  href="/destinations?category=Honeymoon"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-ink shadow-xl transition hover:-translate-y-0.5"
                >
                  Grab the deal <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="scroll-mt-24 overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Traveller stories"
              title={
                <>
                  Loved by <span className="italic text-brand-600">50,000+</span> travellers
                </>
              }
            />
          </Reveal>
        </div>
        <div className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <figure
                key={i}
                aria-hidden={i >= testimonials.length}
                className="w-[360px] shrink-0 rounded-3xl border border-slate-100 bg-sand p-7"
              >
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-[15px] leading-relaxed text-slate-700">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={48} height={48} className="size-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.trip}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
