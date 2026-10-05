"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, Compass } from "lucide-react";
import { DestinationCard } from "./destination-card";
import {
  categories,
  destinations,
  formatINR,
  regions,
  type Category,
  type Region,
} from "@/lib/data";

const sortOptions = {
  popular: "Most popular",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
} as const;

type SortKey = keyof typeof sortOptions;

const maxAvailablePrice = Math.max(...destinations.map((d) => d.pricePerPerson));
const priceCeiling = Math.ceil(maxAvailablePrice / 10000) * 10000;

export function DestinationsExplorer({
  initialQuery,
  initialCategory,
}: {
  initialQuery: string;
  initialCategory: Category | null;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [region, setRegion] = useState<Region | "All">("All");
  const [category, setCategory] = useState<Category | null>(initialCategory);
  const [maxPrice, setMaxPrice] = useState(priceCeiling);
  const [sort, setSort] = useState<SortKey>("popular");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = destinations.filter((d) => {
      if (region !== "All" && d.region !== region) return false;
      if (category && !d.categories.includes(category)) return false;
      if (d.pricePerPerson > maxPrice) return false;
      if (!q) return true;
      return [d.name, d.country, d.tagline, d.region, ...d.categories].some((field) =>
        field.toLowerCase().includes(q),
      );
    });

    return filtered.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.pricePerPerson - b.pricePerPerson;
        case "price-desc":
          return b.pricePerPerson - a.pricePerPerson;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.reviews - a.reviews;
      }
    });
  }, [query, region, category, maxPrice, sort]);

  const hasFilters = query || region !== "All" || category || maxPrice < priceCeiling;

  const reset = () => {
    setQuery("");
    setRegion("All");
    setCategory(null);
    setMaxPrice(priceCeiling);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <div className="relative z-10 -mt-12 rounded-3xl bg-white p-4 shadow-xl ring-1 ring-black/5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-brand-400">
            <Search className="size-5 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destination, country or experience…"
              className="w-full bg-transparent font-medium text-ink placeholder:text-slate-400 focus:outline-none"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                <X className="size-4 text-slate-400 hover:text-ink" />
              </button>
            )}
          </label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-2.5">
              <SlidersHorizontal className="size-4 text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Budget up to <span className="text-brand-600">{formatINR(maxPrice)}</span>
                </span>
                <input
                  type="range"
                  min={10000}
                  max={priceCeiling}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-44 accent-brand-500"
                />
              </div>
            </label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="cursor-pointer rounded-2xl bg-slate-50 px-4 py-3.5 font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              {Object.entries(sortOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
          {(["All", ...regions] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                region === r ? "bg-ink text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {r}
            </button>
          ))}
          <span className="mx-1 w-px shrink-0 bg-slate-200" />
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(category === c ? null : c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                category === c
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 mt-10 flex items-center justify-between">
        <p className="text-slate-500">
          Showing <span className="font-semibold text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "package" : "packages"}
        </p>
        {hasFilters && (
          <button type="button" onClick={reset} className="text-sm font-semibold text-brand-600 hover:text-brand-800">
            Clear all filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((d, i) => (
            <div key={d.slug} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
              <DestinationCard destination={d} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
          <span className="mb-4 grid size-16 place-items-center rounded-full bg-brand-50 text-brand-600">
            <Compass className="size-8" />
          </span>
          <h3 className="font-display text-2xl font-semibold text-ink">No trips match your filters</h3>
          <p className="mt-2 max-w-sm text-slate-500">
            Try widening your budget or picking a different region — or let our experts build a custom trip for you.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
