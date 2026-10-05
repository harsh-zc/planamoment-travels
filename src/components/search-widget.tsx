"use client";

import { useId, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BedDouble, CalendarDays, MapPin, Palmtree, Plane, Search, Users } from "lucide-react";
import { destinations, formatINR } from "@/lib/data";
import { todayISO } from "@/lib/utils";

const tabs = [
  { id: "holidays", label: "Holidays", icon: Palmtree },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: BedDouble },
] as const;

type TabId = (typeof tabs)[number]["id"];

function Field({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="group flex flex-1 cursor-text items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-slate-50 focus-within:bg-slate-50">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-focus-within:bg-brand-500 group-focus-within:text-white">
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</span>
        {children}
      </span>
    </label>
  );
}

const inputClass =
  "w-full min-w-0 bg-transparent text-[15px] font-semibold text-ink placeholder:font-medium placeholder:text-slate-400 focus:outline-none";

function DestinationField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const q = value.trim().toLowerCase();
  const matches = q
    ? destinations.filter((d) =>
        [d.name, d.country, d.region].some((field) => field.toLowerCase().includes(q)),
      )
    : destinations;

  const select = (name: string) => {
    onChange(name);
    setOpen(false);
    setActive(-1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      if (matches.length === 0) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + matches.length) % matches.length);
    } else if (e.key === "Enter" && open && active >= 0 && matches[active]) {
      e.preventDefault();
      select(matches[active].name);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative flex-1">
      <Field icon={<MapPin className="size-5" />} label={label}>
        <input
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
          autoComplete="off"
          className={inputClass}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          placeholder="Maldives, Bali, Kerala…"
        />
      </Field>

      {open && (
        <ul
          id={listId}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
          className="absolute left-0 top-full z-30 mt-2 max-h-80 w-full min-w-[20rem] animate-fade-up overflow-y-auto rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black/5 [animation-duration:250ms]"
        >
          {matches.length === 0 ? (
            <li className="px-3 py-4 text-sm text-slate-500">
              No match for &ldquo;{value.trim()}&rdquo; — press Search to explore all trips.
            </li>
          ) : (
            matches.map((d, i) => (
              <li
                key={d.slug}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => select(d.name)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition ${i === active ? "bg-brand-50" : ""}`}
              >
                <Image
                  src={d.image}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 shrink-0 rounded-lg object-cover"
                />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-semibold text-ink">{d.name}</span>
                  <span className="truncate text-xs text-slate-500">
                    {d.name === d.country ? d.region : d.country} · {d.nights}N/{d.nights + 1}D
                  </span>
                </span>
                <span className="shrink-0 text-right text-xs text-slate-400">
                  from
                  <span className="block text-sm font-semibold text-brand-700">{formatINR(d.pricePerPerson)}</span>
                </span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export function SearchWidget() {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>("holidays");
  const [from, setFrom] = useState("New Delhi");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (to.trim()) params.set("q", to.trim());
    router.push(`/destinations${params.size ? `?${params}` : ""}`);
  };

  return (
    <div className="w-full max-w-5xl animate-fade-up [animation-delay:400ms]">
      <div className="mb-3 flex gap-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === id
                ? "bg-white text-ink shadow-lg"
                : "bg-white/15 text-white backdrop-blur-md hover:bg-white/25"
            }`}
          >
            <Icon className="size-4" /> {label}
          </button>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-1 rounded-[1.75rem] bg-white p-2 text-left shadow-2xl shadow-black/30 md:flex-row md:items-center"
      >
        {tab === "flights" && (
          <Field icon={<Plane className="size-5" />} label="From">
            <input className={inputClass} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Departure city" />
          </Field>
        )}

        <DestinationField
          label={tab === "flights" ? "To" : tab === "hotels" ? "City or hotel" : "Where to?"}
          value={to}
          onChange={setTo}
        />

        <div className="hidden h-10 w-px bg-slate-200 md:block" />

        <Field icon={<CalendarDays className="size-5" />} label={tab === "hotels" ? "Check-in" : "Travel date"}>
          <input
            type="date"
            className={inputClass}
            value={date}
            min={todayISO()}
            suppressHydrationWarning
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>

        <div className="hidden h-10 w-px bg-slate-200 md:block" />

        <Field icon={<Users className="size-5" />} label="Travellers">
          <select className={`${inputClass} cursor-pointer`} value={guests} onChange={(e) => setGuests(e.target.value)}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Adult" : "Adults"}
              </option>
            ))}
          </select>
        </Field>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-[1.25rem] bg-gradient-to-r from-sunset-500 to-sunset-600 px-7 py-4 font-semibold text-white shadow-lg shadow-sunset-500/30 transition hover:brightness-110 md:py-5"
        >
          <Search className="size-5" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
