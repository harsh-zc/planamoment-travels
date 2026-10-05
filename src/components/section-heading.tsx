import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div
      className={`mb-12 flex flex-col gap-6 ${centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div className={centered ? "max-w-2xl" : "max-w-xl"}>
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-700">
          <span className="size-1.5 rounded-full bg-brand-500" />
          {eyebrow}
        </span>
        <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
        {subtitle && <p className="mt-4 text-lg text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
