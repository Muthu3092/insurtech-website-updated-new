import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, User, Tag } from "lucide-react";
import PageHero from "../../components/site/PageHero";
import Marquee from "../../components/site/Marquee";

export default function BlogSingle() {
  return (
    <div data-testid="blog-single-page">
      <PageHero
        eyebrow="Article"
        title="How Afinity.AI settles 73% of travel claims under two minutes"
        italicWords={["two", "minutes"]}
        crumbs={[{ label: "Blog", to: "/blog" }, { label: "Article" }]}
      />

      <section className="py-24 bg-cream">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap items-center gap-5 text-sm text-ink/60 mb-8">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> 12 Jan 2026</span>
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> By Sarah Thompson</span>
            <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> AI</span>
          </div>

          <div className="img-mask aspect-[16/9] rounded-3xl mb-10">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80" alt="" className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-ink/80 leading-relaxed mb-6">
              When we launched Afinity.AI, our in-house AI copilot, we set ourselves a single
              audacious goal: settle most travel claims before the customer reached the
              taxi rank. Two years later, we're settling 73% of them in under 120 seconds.
            </p>
            <p className="text-ink/70 leading-relaxed mb-5">
              The trick isn't just faster software. It's a CRM-first architecture that
              starts collecting context the moment you buy a policy — flight details,
              health profile, payment history — and never asks you for the same data twice.
              When you submit a claim, Afinity.AI already knows you.
            </p>
            <h2 className="font-display text-3xl mt-10 mb-4">Three principles that made it possible</h2>
            <p className="text-ink/70 leading-relaxed mb-5">
              First, transparent risk scoring. Every claim gets a fraud score and a
              severity score, both visible to the human reviewer. Second, document
              auto-extraction — flight delays, medical receipts and police reports are
              parsed by the same model. Third, conservative defaults: when Afinity.AI is unsure,
              it always escalates.
            </p>
            <blockquote className="border-l-4 border-lime pl-6 italic text-ink/80 my-8 font-display text-2xl">
              "Insurance should feel like a friend who's already done the paperwork."
            </blockquote>
            <p className="text-ink/70 leading-relaxed">
              That's the bar. We're not at 100% yet, but every quarter the AI-assisted
              share grows, freeing our human team to focus on the cases that genuinely
              need empathy and judgment.
            </p>
          </div>

          <div className="mt-14 p-8 rounded-3xl bg-ink text-cream flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-display text-2xl">Try Afinity.AI on your next travel claim.</div>
            <Link to="/contact" className="btn-covar">
              Get a quote <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      <Marquee />
    </div>
  );
}
