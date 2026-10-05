"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  CreditCard,
  Download,
  Lock,
  Smartphone,
  Tag,
  Users,
  BedDouble,
} from "lucide-react";
import { formatINR, type Destination } from "@/lib/data";
import { calculatePrice, coupons, roomTypes, type RoomType } from "@/lib/pricing";
import { addDays, formatDate, todayISO } from "@/lib/utils";

type Step = 0 | 1 | 2;
const steps = ["Traveller details", "Payment", "Confirmation"];

type PaymentMethod = "upi" | "card" | "netbanking";

const paymentMethods: { id: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "netbanking", label: "Net banking", icon: Building2 },
];

const banks = ["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank"];

const focusFirstError = () =>
  requestAnimationFrame(() => {
    const el = document.querySelector<HTMLInputElement>('[aria-invalid="true"]');
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
  });

function Input({
  label,
  error,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input
        {...props}
        aria-invalid={error ? true : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-ink transition placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
          error ? "border-rose-400 focus:ring-rose-200" : "border-slate-200 focus:border-brand-500 focus:ring-brand-100"
        }`}
      />
      {error && <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span>}
    </label>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
      <h2 className="mb-6 font-display text-2xl font-semibold text-ink">{title}</h2>
      {children}
    </div>
  );
}

export function Checkout({
  destination: d,
  initialDate,
  adults,
  childCount,
  room,
}: {
  destination: Destination;
  initialDate: string;
  adults: number;
  childCount: number;
  room: RoomType;
}) {
  const [step, setStep] = useState<Step>(0);
  const [date, setDate] = useState(initialDate);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", requests: "" });
  const [coTravellers, setCoTravellers] = useState<string[]>(() =>
    Array.from({ length: adults - 1 + childCount }, () => ""),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [payment, setPayment] = useState({ upi: "", cardNumber: "", expiry: "", cvv: "", cardName: "", bank: banks[0] });
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const price = calculatePrice({
    pricePerPerson: d.pricePerPerson,
    adults,
    children: childCount,
    room,
    discountRate: coupon ? coupons[coupon].rate : 0,
  });

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (coupons[code]) {
      setCoupon(code);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const submitDetails = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!date) next.date = "Pick a travel date";
    if (contact.name.trim().length < 2) next.name = "Enter the lead traveller's full name";
    if (!/^\S+@\S+\.\S+$/.test(contact.email)) next.email = "Enter a valid email";
    if (!/^[6-9]\d{9}$/.test(contact.phone.replace(/\D/g, "").slice(-10))) next.phone = "Enter a valid 10-digit mobile number";
    coTravellers.forEach((n, i) => {
      if (n.trim().length < 2) next[`co-${i}`] = "Required";
    });
    setErrors(next);
    if (Object.keys(next).length > 0) {
      focusFirstError();
      return;
    }
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitPayment = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (method === "upi" && !/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(payment.upi)) next.upi = "Enter a valid UPI ID (e.g. name@okhdfc)";
    if (method === "card") {
      if (payment.cardNumber.replace(/\s/g, "").length !== 16) next.cardNumber = "Card number must be 16 digits";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry)) next.expiry = "Use MM/YY";
      if (!/^\d{3}$/.test(payment.cvv)) next.cvv = "3 digits";
      if (payment.cardName.trim().length < 2) next.cardName = "Enter name on card";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      focusFirstError();
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setBookingId(`PAM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
      setProcessing(false);
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1800);
  };

  const travellersLabel = `${adults} ${adults === 1 ? "Adult" : "Adults"}${childCount ? `, ${childCount} ${childCount === 1 ? "Child" : "Children"}` : ""}`;
  const endDate = date ? addDays(date, d.nights) : null;

  return (
    <div className="mx-auto max-w-6xl px-5 lg:px-8">
      {step < 2 && (
        <Link
          href={`/destinations/${d.slug}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-ink"
        >
          <ArrowLeft className="size-4" /> Back to {d.name}
        </Link>
      )}

      <ol className="mb-10 flex items-center gap-2 sm:gap-4">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-4">
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold transition ${
                i < step ? "bg-brand-500 text-white" : i === step ? "bg-ink text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {i < step ? <Check className="size-4" /> : i + 1}
            </span>
            <span className={`hidden text-sm font-semibold sm:block ${i <= step ? "text-ink" : "text-slate-400"}`}>{label}</span>
            {i < steps.length - 1 && (
              <span className={`h-0.5 flex-1 rounded-full ${i < step ? "bg-brand-500" : "bg-slate-200"}`} />
            )}
          </li>
        ))}
      </ol>

      {step === 2 ? (
        <div className="mx-auto max-w-2xl animate-fade-up text-center">
          <div className="relative mx-auto mb-6 grid size-24 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-400/30" />
            <span className="relative grid size-24 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-xl shadow-brand-500/40">
              <BadgeCheck className="size-12" />
            </span>
          </div>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">Pack your bags, {contact.name.split(" ")[0]}!</h1>
          <p className="mt-3 text-lg text-slate-500">
            Your trip to <span className="font-semibold text-ink">{d.name}</span> is confirmed. We&apos;ve sent the details to{" "}
            <span className="font-semibold text-ink">{contact.email}</span>.
          </p>

          <div className="mt-10 overflow-hidden rounded-3xl bg-white text-left shadow-xl ring-1 ring-black/5">
            <div className="relative h-40">
              <Image src={d.image} alt={d.name} fill sizes="672px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-6 text-white">
                <p className="text-sm text-white/80">Booking ID</p>
                <p className="font-mono text-2xl font-bold tracking-wider">{bookingId}</p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-6 p-6 text-sm">
              <div>
                <dt className="text-slate-500">Check-in</dt>
                <dd className="font-semibold text-ink">{formatDate(date)}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Check-out</dt>
                <dd className="font-semibold text-ink">{endDate && formatDate(endDate)}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Travellers</dt>
                <dd className="font-semibold text-ink">{travellersLabel}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Amount paid</dt>
                <dd className="font-semibold text-brand-700">{formatINR(price.total)}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 font-semibold text-ink transition hover:border-ink"
            >
              <Download className="size-4" /> Download voucher
            </button>
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              Explore more trips
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            {step === 0 ? (
              <form onSubmit={submitDetails} noValidate className="space-y-6 animate-fade-up">
                <Card title="Trip date">
                  <Input
                    label="Travel start date"
                    type="date"
                    value={date}
                    min={todayISO()}
                    suppressHydrationWarning
                    onChange={(e) => setDate(e.target.value)}
                    error={errors.date}
                  />
                </Card>

                <Card title="Lead traveller">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Full name"
                      placeholder="As on passport / ID"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      error={errors.name}
                      className="sm:col-span-2"
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      error={errors.email}
                    />
                    <Input
                      label="Mobile number"
                      type="tel"
                      placeholder="98765 43210"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      error={errors.phone}
                    />
                    <label className="block sm:col-span-2">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">Special requests (optional)</span>
                      <textarea
                        rows={3}
                        value={contact.requests}
                        onChange={(e) => setContact({ ...contact, requests: e.target.value })}
                        placeholder="Anniversary surprise, dietary needs, early check-in…"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-ink placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                      />
                    </label>
                  </div>
                </Card>

                {coTravellers.length > 0 && (
                  <Card title="Co-travellers">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {coTravellers.map((name, i) => {
                        const isChild = i >= adults - 1;
                        const n = isChild ? i - (adults - 1) + 1 : i + 2;
                        return (
                          <Input
                            key={i}
                            label={isChild ? `Child ${n}` : `Adult ${n}`}
                            placeholder="Full name"
                            value={name}
                            onChange={(e) =>
                              setCoTravellers((prev) => prev.map((p, j) => (j === i ? e.target.value : p)))
                            }
                            error={errors[`co-${i}`]}
                          />
                        );
                      })}
                    </div>
                  </Card>
                )}

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-sunset-500 to-sunset-600 py-4 text-base font-semibold text-white shadow-lg shadow-sunset-500/30 transition hover:-translate-y-0.5"
                >
                  Continue to payment
                </button>
              </form>
            ) : (
              <form onSubmit={submitPayment} noValidate className="space-y-6 animate-fade-up">
                <Card title="Choose payment method">
                  <div className="mb-6 grid grid-cols-3 gap-3">
                    {paymentMethods.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setMethod(id);
                          setErrors({});
                        }}
                        className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-sm font-semibold transition ${
                          method === id ? "border-brand-500 bg-brand-50 text-brand-800 ring-1 ring-brand-500" : "border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <Icon className="size-6" />
                        {label}
                      </button>
                    ))}
                  </div>

                  {method === "upi" && (
                    <Input
                      label="UPI ID"
                      placeholder="yourname@okhdfc"
                      value={payment.upi}
                      onChange={(e) => setPayment({ ...payment, upi: e.target.value })}
                      error={errors.upi}
                    />
                  )}

                  {method === "card" && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Card number"
                        inputMode="numeric"
                        placeholder="4242 4242 4242 4242"
                        value={payment.cardNumber}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
                          setPayment({ ...payment, cardNumber: digits.replace(/(\d{4})(?=\d)/g, "$1 ") });
                        }}
                        error={errors.cardNumber}
                        className="sm:col-span-2"
                      />
                      <Input
                        label="Expiry"
                        placeholder="MM/YY"
                        inputMode="numeric"
                        value={payment.expiry}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
                          setPayment({ ...payment, expiry: digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits });
                        }}
                        error={errors.expiry}
                      />
                      <Input
                        label="CVV"
                        type="password"
                        placeholder="•••"
                        inputMode="numeric"
                        maxLength={3}
                        value={payment.cvv}
                        onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, "") })}
                        error={errors.cvv}
                      />
                      <Input
                        label="Name on card"
                        placeholder="Full name"
                        value={payment.cardName}
                        onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                        error={errors.cardName}
                        className="sm:col-span-2"
                      />
                    </div>
                  )}

                  {method === "netbanking" && (
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-slate-700">Select your bank</span>
                      <select
                        value={payment.bank}
                        onChange={(e) => setPayment({ ...payment, bank: e.target.value })}
                        className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                      >
                        {banks.map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                    </label>
                  )}

                  <p className="mt-6 flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                    <Lock className="size-4 text-brand-500" /> Demo checkout — no real payment is processed.
                  </p>
                </Card>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="rounded-2xl border border-slate-300 px-6 py-4 font-semibold text-ink transition hover:border-ink"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sunset-500 to-sunset-600 py-4 text-base font-semibold text-white shadow-lg shadow-sunset-500/30 transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-80"
                  >
                    {processing ? (
                      <>
                        <span className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Processing payment…
                      </>
                    ) : (
                      <>
                        <Lock className="size-4" /> Pay {formatINR(price.total)}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
              <div className="relative h-36">
                <Image src={d.image} alt={d.name} fill sizes="380px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-5 text-white">
                  <p className="font-display text-2xl font-semibold">{d.name}</p>
                  <p className="text-sm text-white/80">
                    {d.nights}N / {d.nights + 1}D · {d.country}
                  </p>
                </div>
              </div>
              <div className="space-y-3 border-b border-slate-100 p-5 text-sm">
                <p className="flex items-center gap-3 text-slate-600">
                  <CalendarDays className="size-4 text-brand-500" />
                  {date && endDate ? `${formatDate(date)} → ${formatDate(endDate)}` : "Date not selected"}
                </p>
                <p className="flex items-center gap-3 text-slate-600">
                  <Users className="size-4 text-brand-500" /> {travellersLabel}
                </p>
                <p className="flex items-center gap-3 text-slate-600">
                  <BedDouble className="size-4 text-brand-500" /> {roomTypes[room].label} · {roomTypes[room].description}
                </p>
              </div>

              <div className="border-b border-slate-100 p-5">
                {coupon ? (
                  <div className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3 text-sm">
                    <span className="flex items-center gap-2 font-semibold text-brand-800">
                      <Tag className="size-4" /> {coupon} applied
                    </span>
                    <button type="button" onClick={() => setCoupon(null)} className="text-xs font-semibold text-slate-500 hover:text-ink">
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponError("");
                        }}
                        placeholder="Coupon code"
                        className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm uppercase placeholder:normal-case focus:border-brand-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="rounded-xl bg-ink px-4 text-sm font-semibold text-white transition hover:bg-brand-700"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError ? (
                      <p className="mt-2 text-xs font-medium text-rose-600">{couponError}</p>
                    ) : (
                      <p className="mt-2 text-xs text-slate-500">Try LOVE20 or FIRSTTRIP</p>
                    )}
                  </>
                )}
              </div>

              <dl className="space-y-2 p-5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <dt>Package ({travellersLabel.toLowerCase()})</dt>
                  <dd>{formatINR(price.base)}</dd>
                </div>
                {price.discount > 0 && (
                  <div className="flex justify-between font-medium text-brand-700">
                    <dt>Coupon discount</dt>
                    <dd>− {formatINR(price.discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <dt>GST (5%)</dt>
                  <dd>{formatINR(price.taxes)}</dd>
                </div>
                <div className="flex justify-between border-t border-dashed border-slate-200 pt-3 text-lg font-bold text-ink">
                  <dt>Total payable</dt>
                  <dd>{formatINR(price.total)}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
