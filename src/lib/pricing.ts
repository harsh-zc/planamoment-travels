export const roomTypes = {
  standard: { label: "Standard", multiplier: 1, description: "Comfortable 4★ stays" },
  deluxe: { label: "Deluxe", multiplier: 1.15, description: "Premium rooms, better views" },
  luxury: { label: "Luxury", multiplier: 1.35, description: "5★ suites & villas" },
} as const;

export type RoomType = keyof typeof roomTypes;

export const isRoomType = (value: unknown): value is RoomType =>
  typeof value === "string" && value in roomTypes;

export const CHILD_FACTOR = 0.5;
export const GST_RATE = 0.05;

export function calculatePrice({
  pricePerPerson,
  adults,
  children,
  room,
  discountRate = 0,
}: {
  pricePerPerson: number;
  adults: number;
  children: number;
  room: RoomType;
  discountRate?: number;
}) {
  const perAdult = Math.round(pricePerPerson * roomTypes[room].multiplier);
  const perChild = Math.round(perAdult * CHILD_FACTOR);
  const base = perAdult * adults + perChild * children;
  const discount = Math.round(base * discountRate);
  const taxes = Math.round((base - discount) * GST_RATE);
  return {
    perAdult,
    perChild,
    base,
    discount,
    taxes,
    total: base - discount + taxes,
  };
}

export const coupons: Record<string, { rate: number; label: string }> = {
  LOVE20: { rate: 0.2, label: "Honeymoon special – 20% off" },
  FIRSTTRIP: { rate: 0.1, label: "First trip – 10% off" },
};
