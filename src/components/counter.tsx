import { Minus, Plus } from "lucide-react";

export function Counter({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const btn =
    "grid size-9 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-200";
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-semibold text-ink">{label}</p>
        <p className="text-xs text-slate-500">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className={btn} disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`Decrease ${label}`}>
          <Minus className="size-4" />
        </button>
        <span className="w-5 text-center font-semibold tabular-nums">{value}</span>
        <button type="button" className={btn} disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={`Increase ${label}`}>
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
