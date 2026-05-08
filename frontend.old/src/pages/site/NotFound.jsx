import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-cream flex items-center justify-center px-4" data-testid="not-found-page">
      <div className="text-center max-w-xl">
        <div className="font-display text-[10rem] leading-none font-semibold text-ink">404</div>
        <h2 className="font-display text-3xl mt-6 mb-4">This page took an unexpected detour</h2>
        <p className="text-ink/65 mb-8">It might have moved or never existed. Aura is on it.</p>
        <Link to="/" className="btn-covar dark">
          Back home <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
        </Link>
      </div>
    </div>
  );
}
