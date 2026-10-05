"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, ShieldCheck, Zap } from "lucide-react";
import { Counter } from "./counter";
import { formatINR, type Destination } from "@/lib/data";
import { calculatePrice, roomTypes, type RoomType } from "@/lib/pricing";
import { todayISO } from "@/lib/utils";

export function BookingCard({ destination: d }: { destination: Destination }) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState<RoomType>("standard");
  const [error, setError] = useState("");

  const price = calculatePrice({ pricePerPerson: d.pricePerPerson, adults, children, room });

  const onReserve = () => {
    if (!date) {
      setError("Please pick a travel date to continue.");
      return;
    }
    const params = new URLSearchParams({
      date,
      adults: String(adults),
      children: String(children),
      room,
    });
    router.push(`/booking/${d.slug}?${params}`);
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)] ring-1 ring-black/5">
      <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white">
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/70 line-through">{formatINR(d.originalPrice)}</p>
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold">
            <Zap className="size-3.5 fill-amber-300 text-amber-300" /> Selling fast
          </span>
        </div>
        <p className="mt-1 text-3xl font-bold">
          {formatINR(d.pricePerPerson)}
          <span className="text-sm font-medium text-white/70"> / person</span>
        </p>
        <p className="mt-1 text-sm text-white/70">
          {d.nights} nights · {d.nights + 1} days · taxes extra
        </p>
      </div>

      <div className="space-y-5 p-6">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Travel date</span>
          <span
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition focus-within:border-brand-500 ${error ? "border-rose-400 bg-rose-50" : "border-slate-200"}`}
          >
            <CalendarDays className="size-5 text-brand-500" />
            <input
              type="date"
              value={date}
              min={todayISO()}
              suppressHydrationWarning
              onChange={(e) => {
                setDate(e.target.value);
                setError("");
              }}
              className="w-full bg-transparent font-semibold text-ink focus:outline-none"
            />
          </span>
          {error && <span className="mt-1.5 block text-xs font-medium text-rose-600">{error}</span>}
        </label>

        <div className="space-y-4 rounded-2xl border border-slate-200 p-4">
          <Counter label="Adults" hint="Age 12+" value={adults} min={1} max={9} onChange={setAdults} />
          <div className="h-px bg-slate-100" />
          <Counter label="Children" hint="Age 2–11 · 50% off" value={children} min={0} max={6} onChange={setChildren} />
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Stay category</span>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(roomTypes) as RoomType[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setRoom(key)}
                className={`rounded-2xl border px-2 py-3 text-center transition ${
                  room === key
                    ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="block text-sm font-semibold text-ink">{roomTypes[key].label}</span>
                <span className="block text-[11px] text-slate-500">
                  {roomTypes[key].multiplier === 1 ? "Included" : `+${Math.round((roomTypes[key].multiplier - 1) * 100)}%`}
                </span>
              </button>
            ))}
          </div>
        </div>

        <dl className="space-y-2 border-t border-dashed border-slate-200 pt-4 text-sm">
          <div className="flex justify-between text-slate-600">
            <dt>
              {formatINR(price.perAdult)} × {adults} {adults === 1 ? "adult" : "adults"}
            </dt>
            <dd>{formatINR(price.perAdult * adults)}</dd>
          </div>
          {children > 0 && (
            <div className="flex justify-between text-slate-600">
              <dt>
                {formatINR(price.perChild)} × {children} {children === 1 ? "child" : "children"}
              </dt>
              <dd>{formatINR(price.perChild * children)}</dd>
            </div>
          )}
          <div className="flex justify-between text-slate-600">
            <dt>GST (5%)</dt>
            <dd>{formatINR(price.taxes)}</dd>
          </div>
          <div className="flex justify-between pt-2 text-lg font-bold text-ink">
            <dt>Total</dt>
            <dd>{formatINR(price.total)}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={onReserve}
          className="w-full rounded-2xl bg-gradient-to-r from-sunset-500 to-sunset-600 py-4 text-base font-semibold text-white shadow-lg shadow-sunset-500/30 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Reserve now
        </button>
        <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="size-4 text-brand-500" /> Free cancellation up to 15 days before travel
        </p>
      </div>
    </div>
  );
}
