export const todayISO = () => new Date().toISOString().slice(0, 10);

export function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d;
}

export const formatDate = (date: Date | string) =>
  new Date(typeof date === "string" ? `${date}T00:00:00` : date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
