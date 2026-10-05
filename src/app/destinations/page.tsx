import type { Metadata } from "next";
import { DestinationsExplorer } from "@/components/destinations-explorer";
import { categories, type Category } from "@/lib/data";

export const metadata: Metadata = {
  title: "Explore destinations",
  description: "Browse handcrafted holiday packages across India, Asia, Europe and the islands.",
};

export default async function DestinationsPage(props: PageProps<"/destinations">) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const rawCategory = typeof searchParams.category === "string" ? searchParams.category : "";
  const category = (categories as string[]).includes(rawCategory) ? (rawCategory as Category) : null;

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-24 pt-36 text-white">
        <div className="pointer-events-none absolute -left-32 top-0 size-[30rem] rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-[30rem] rounded-full bg-sunset-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-300">Explore</p>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-tight md:text-6xl">
            Find your next <span className="italic text-brand-300">great escape</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            Filter by region, travel style and budget. Every package includes stays, transfers and handpicked experiences.
          </p>
        </div>
      </section>
      <DestinationsExplorer key={`${q}|${category}`} initialQuery={q} initialCategory={category} />
    </>
  );
}
