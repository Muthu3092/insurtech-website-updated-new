import React from "react";
import { Link } from "react-router-dom";
import AnimatedHeading from "./AnimatedHeading";
import { ArrowUpRight, Home as HomeIcon } from "lucide-react";

export default function PageHero({ eyebrow, title, italicWords = [], crumbs = [] }) {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-cream overflow-hidden border-b border-ink/10">
      <div className="hero-blob right-[-200px] top-[-200px]" />
      <div className="hero-blob left-[-200px] bottom-[-200px]" />
      <div className="container relative">
        <div className="flex justify-center mb-6">
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <AnimatedHeading
          as="h1"
          text={title}
          italicWords={italicWords}
          className="display-h text-center max-w-5xl mx-auto"
        />
        <div className="flex justify-center items-center gap-3 mt-8 text-sm text-ink/60">
          <Link to="/" className="flex items-center gap-1 hover:text-ink">
            <HomeIcon className="w-3.5 h-3.5" /> Home
          </Link>
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              <ArrowUpRight className="w-3.5 h-3.5 text-lime" />
              {c.to ? (
                <Link to={c.to} className="hover:text-ink">{c.label}</Link>
              ) : (
                <span className="text-ink">{c.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
