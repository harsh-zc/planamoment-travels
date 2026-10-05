"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function HeroSlideshow({ slides }: { slides: { src: string; label: string }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${i === active ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.src}
              alt={slide.label}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${i === active ? "animate-ken-burns" : ""}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      <div className="absolute bottom-24 left-8 z-40 hidden items-center gap-3 lg:flex">
        <div className="flex gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show ${slide.label}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-white/80">{slides[active].label}</span>
      </div>
    </>
  );
}
