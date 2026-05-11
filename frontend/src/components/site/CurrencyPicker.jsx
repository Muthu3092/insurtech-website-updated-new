import React from "react";
import { ChevronDown } from "lucide-react";
import { useCurrency } from "../../lib/currency";

/**
 * Compact currency switcher styled for the Covar-style marketing header.
 * Pure-CSS dropdown — no external popover deps.
 */
export default function CurrencyPicker({ variant = "light" }) {
  const { current, supported, setCurrent } = useCurrency();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (!supported || supported.length < 2) return null;
  const active = supported.find((c) => c.code === current) || supported[0];

  const triggerLight =
    "border border-ink/10 bg-white/60 backdrop-blur-md text-ink hover:bg-white";
  const triggerDark =
    "border border-cream/15 bg-cream/5 backdrop-blur-md text-cream hover:bg-cream/10";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-testid="currency-picker"
        className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition ${
          variant === "dark" ? triggerDark : triggerLight
        }`}
      >
        <span className="font-semibold tracking-wide">{active.code}</span>
        <span className="opacity-60">{active.symbol}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          data-testid="currency-picker-menu"
          className="absolute right-0 top-full mt-2 z-50 w-56 max-h-72 overflow-auto rounded-2xl border border-ink/10 bg-white shadow-xl py-2"
        >
          <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-ink/50 font-semibold">
            Display currency
          </div>
          {supported.map((c) => (
            <button
              key={c.code}
              data-testid={`currency-option-${c.code}`}
              onClick={() => {
                setCurrent(c.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-cream transition ${
                c.code === current ? "bg-cream font-semibold" : ""
              }`}
            >
              <span className="w-10 text-ink">{c.code}</span>
              <span className="w-6 text-ink/60">{c.symbol}</span>
              <span className="flex-1 text-left text-ink/70 text-xs truncate">{c.name}</span>
              {c.code === current && (
                <span className="w-2 h-2 rounded-full bg-lime" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
