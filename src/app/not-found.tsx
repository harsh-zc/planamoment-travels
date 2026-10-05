import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-5 pt-24 text-center">
      <span className="mb-6 grid size-20 animate-float place-items-center rounded-full bg-brand-50 text-brand-600">
        <Compass className="size-10" />
      </span>
      <p className="font-display text-8xl font-semibold text-ink">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Looks like you&apos;re off the map</h1>
      <p className="mt-3 max-w-md text-slate-500">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-brand-700">
          Go home
        </Link>
        <Link href="/destinations" className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-ink transition hover:border-ink">
          Browse trips
        </Link>
      </div>
    </section>
  );
}
