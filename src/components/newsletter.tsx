"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <section className="px-5 py-24 lg:px-8">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-brand-900 px-8 py-14 text-center text-white md:px-16">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-brand-400/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-sunset-500/30 blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-3xl font-semibold md:text-5xl">
            Get secret deals in your <span className="italic text-brand-300">inbox</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/70">
            Join 80,000+ travellers getting exclusive fares, flash sales and travel inspiration every week.
          </p>
          {done ? (
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-medium">
              <CheckCircle2 className="size-5 text-brand-300" /> You&apos;re in! Watch your inbox for the next deal.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-full bg-white/10 px-6 py-4 text-white ring-1 ring-white/20 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-ink transition hover:bg-brand-100"
              >
                Subscribe <Send className="size-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
