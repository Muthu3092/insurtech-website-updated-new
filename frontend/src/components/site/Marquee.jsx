import React from "react";

const ITEMS = Array.from({ length: 12 });

export default function Marquee({ variant = "light", reverse = false }) {
  const isDark = variant === "dark";

  return (
    <div
      className={`overflow-hidden border-y ${
        isDark
          ? "border-cream/10 bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-cream"
          : "border-ink/10 bg-cream text-ink"
      }`}
      data-testid="marquee"
    >
      <div className={`marquee-track py-6 ${reverse ? "rev" : ""}`}>
        {Array.from({ length: 2 }).map((_, dup) => (
          <div key={dup} className="flex items-center gap-14 pr-14">
            
            {ITEMS.map((_, i) => (
              <div
                key={`${dup}-${i}`}
                className="flex items-center justify-center"
              >
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-40 sm:w-48 md:w-56 h-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}

          </div>
        ))}
      </div>
    </div>
  );
}