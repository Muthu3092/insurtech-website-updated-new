import React from "react";

const ITEMS = [
  "Travel Shield",
  "Health Cover",
  "Motor Insurance",
  "Personal Accident",
  "Home Protection",
  "Afinity.AI Claims",
  "Fast-track Quotes",
  "Transparent Pricing",
];

export default function Marquee({ variant = "light", reverse = false }) {
  const isDark = variant === "dark";
  return (
    <div
      className={`overflow-hidden border-y ${
        isDark ? "border-cream/10 bg-ink text-cream" : "border-ink/10 bg-cream text-ink"
      }`}
      data-testid="marquee"
    >
      <div className={`marquee-track py-7 ${reverse ? "rev" : ""}`}>
        {Array.from({ length: 2 }).map((_, dup) => (
          <div key={dup} className="flex items-center gap-12 pr-12">
            {ITEMS.map((t, i) => (
              <div key={`${dup}-${i}`} className="flex items-center gap-12">
                <span className="font-display text-3xl md:text-5xl tracking-tight whitespace-nowrap">
                  {t}
                </span>
                <span className="asterisk" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
