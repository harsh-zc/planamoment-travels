import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Checkout } from "@/components/checkout";
import { getDestination } from "@/lib/data";
import { isRoomType } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Complete your booking",
  robots: { index: false },
};

const clamp = (value: unknown, min: number, max: number, fallback: number) => {
  const n = Number(value);
  return Number.isInteger(n) ? Math.min(max, Math.max(min, n)) : fallback;
};

export default async function BookingPage(props: PageProps<"/booking/[slug]">) {
  const { slug } = await props.params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const sp = await props.searchParams;
  const date = typeof sp.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(sp.date) ? sp.date : "";

  return (
    <div className="min-h-screen bg-sand pb-24 pt-28">
      <Checkout
        destination={destination}
        initialDate={date}
        adults={clamp(sp.adults, 1, 9, 2)}
        childCount={clamp(sp.children, 0, 6, 0)}
        room={isRoomType(sp.room) ? sp.room : "standard"}
      />
    </div>
  );
}
