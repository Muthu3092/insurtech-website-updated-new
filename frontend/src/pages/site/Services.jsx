import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, Plane, HeartPulse, Car, Activity, Home as HomeIcon, Shield,
  Sparkles, Headphones, ShieldCheck, Clock, Award, Zap, Lock, Heart,
} from "lucide-react";
import AnimatedHeading from "../../components/site/AnimatedHeading";
import Counter from "../../components/site/Counter";
import Marquee from "../../components/site/Marquee";
import { endpoints } from "../../lib/apiClient";
import { quoteRouteFor } from "../../lib/quoteRoutes";
import { useCurrency } from "../../lib/currency";

const ICON_MAP = {
  travel: Plane,
  health: HeartPulse,
  motor: Car,
  pa: Activity,
  home: HomeIcon,
};

const FALLBACK = [
  { icon: Plane, slug: "travel", title: "Travel Shield", desc: "Global cover with auto-claim triage and 24/7 multilingual support.", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80", price: 49 },
  { icon: HeartPulse, slug: "health", title: "Health Cover", desc: "Cashless hospitalization, critical illness and AI-led wellness.", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80", price: 89 },
  { icon: Car, slug: "motor", title: "Motor Insurance", desc: "Comprehensive car & bike protection with one-tap FNOL.", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=80", price: 119 },
  { icon: Activity, slug: "pa", title: "Personal Accident", desc: "Worldwide PA cover with smart family bundles.", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80", price: 29 },
  { icon: HomeIcon, slug: "home", title: "Home Protection", desc: "All-risk home cover with smart-device discounts and rapid restoration.", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80", price: 69 },
];

const PROCESS = [
  { num: "01", title: "Pick a shield", body: "Five lines of cover, four shields. Pick the one that fits your life right now." },
  { num: "02", title: "Aura quotes you", body: "Aura asks 4–6 questions and computes a personalised premium in 60 seconds." },
  { num: "03", title: "Pay & cover live", body: "Stripe-secured checkout. Digital certificate in your inbox the moment you pay." },
  { num: "04", title: "Claim in two minutes", body: "Aura settles low-risk claims under 2 min. Humans handle the complex cases." },
];

const VALUES = [
  { icon: Zap, title: "Real AI, real fast", body: "Aura cuts claim time by 87%. No call-centre queues, no paperwork delays." },
  { icon: Lock, title: "Secure by design", body: "AES-256 at rest, TLS 1.3 in transit, ISO 27001 controls." },
  { icon: Heart, title: "Customer-first", body: "Every clause and every premium is designed to be fair, not sneaky." },
  { icon: Award, title: "Backed by Tier-1 reinsurers", body: "Underwritten by reinsurance partners regulated by BNM." },
];

export default function Services() {
  const [shields, setShields] = React.useState(FALLBACK);
  const [loading, setLoading] = React.useState(true);
  const { format } = useCurrency();

  React.useEffect(() => {
    endpoints
      .products()
      .then((res) => {
        const list = (res.data || [])
          .filter((p) => p.active !== false)
          .sort((a, b) => (a.display_order || 999) - (b.display_order || 999))
          .map((p) => ({
            icon: ICON_MAP[p.category] || Shield,
            slug: p.category,
            productId: p.id,
            title: p.name,
            desc: p.description,
            img: p.image_url || FALLBACK.find((f) => f.slug === p.category)?.img,
            price: Math.round(p.base_premium || 0),
            currency: p.currency || "RM",
          }));
        if (list.length) setShields(list);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-testid="services-page">
      {/* HERO */}
      <section className="relative pt-10 pb-24 overflow-hidden bg-cream">
        <div className="hero-blob right-[-300px] top-[80px]" />
        <div className="hero-blob left-[-200px] bottom-[-200px] opacity-50" />
        <div className="container relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-7">
              <span className="eyebrow">
                <Sparkles className="w-3.5 h-3.5" /> Our Shields · {shields.length} live products
              </span>
            </div>
            <AnimatedHeading
              as="h1"
              text="Smart protection for every stage of life"
              italicWords={["every", "stage", "of", "life"]}
              className="display-h"
            />
            <p className="mt-7 text-lg text-ink/70 max-w-xl leading-relaxed">
              Five core shields, one Aura AI engine. Travel, Health, Motor, Personal Accident
              and Home — each priced fairly, claimed quickly, designed for modern life.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#shields" className="btn-covar dark">
                Browse Shields <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
              </a>
              <Link to="/contact" className="flex items-center gap-3 text-ink font-medium hover:gap-4 transition-all">
                <span className="w-12 h-12 rounded-full bg-ink/10 flex items-center justify-center">
                  <Headphones className="w-4 h-4" />
                </span>
                Talk to an advisor
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="font-display text-2xl font-semibold text-ink"><Counter to={120} suffix="k+" /></div>
                <div className="text-xs uppercase tracking-widest text-ink/50 mt-1">Protected</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-ink"><Counter to={97} suffix="%" /></div>
                <div className="text-xs uppercase tracking-widest text-ink/50 mt-1">Approval</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-ink">&lt; 2 min</div>
                <div className="text-xs uppercase tracking-widest text-ink/50 mt-1">Claim triage</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
                "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
                "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
                "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
              ].map((src, i) => (
                <div
                  key={i}
                  className={`img-mask aspect-square rounded-3xl ${i === 1 || i === 2 ? "mt-10" : ""}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHIELDS GRID */}
      <section id="shields" className="py-24 md:py-32 bg-creamlight">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow mb-5">Pick Your Shield</span>
              <AnimatedHeading
                as="h2"
                text="Smart protection plans for life"
                italicWords={["for", "life"]}
                className="display-h mt-5"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-ink/70 leading-relaxed">
                Each shield card opens a detailed product page with benefits, pricing tiers and a
                Buy Now button to start your 60-second quote.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-ink/50 py-20">Loading shields…</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shields.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.slug + s.title}
                    to={quoteRouteFor(s.slug, s.productId)}
                    data-testid={`service-${s.slug}`}
                    className="card-soft group overflow-hidden flex flex-col"
                  >
                    <div className="img-mask aspect-[4/3] rounded-none">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-7 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-lime/30 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-ink" />
                        </div>
                        <span className="text-xs uppercase tracking-widest text-ink/50">
                          From {s.currency || "RM"} {s.price}/yr
                        </span>
                      </div>
                      <h3 className="font-display text-2xl mb-2">{s.title}</h3>
                      <p className="text-sm text-ink/65 leading-relaxed mb-6 flex-1 line-clamp-3">{s.desc}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                        See benefits & buy <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 md:py-32 bg-ink text-cream relative overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow light mb-5">How It Works</span>
              <AnimatedHeading
                as="h2"
                text="From browse to bound in four taps"
                italicWords={["four", "taps"]}
                className="display-h mt-5 text-cream"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-cream/70 leading-relaxed">
                Aura runs the whole flow — quote, KYC, payment, certificate — without any human
                handoffs unless you actively want one.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((s) => (
              <div key={s.num} className="border-t border-cream/15 pt-6">
                <div className="font-display text-6xl font-semibold text-lime mb-4">{s.num}</div>
                <h4 className="font-display text-xl mb-2">{s.title}</h4>
                <p className="text-sm text-cream/65 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow mb-5">Why afinity.ai</span>
              <AnimatedHeading
                as="h2"
                text="What makes our shields different"
                italicWords={["our", "shields", "different"]}
                className="display-h mt-5"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-ink/70 leading-relaxed">
                Four engineering choices that combine to make our shields demonstrably faster and
                fairer than legacy insurers.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="card-soft p-7">
                <div className="w-14 h-14 rounded-2xl bg-lime/30 flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-ink" />
                </div>
                <h3 className="font-display text-xl mb-2">{v.title}</h3>
                <p className="text-sm text-ink/65 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-creamlight">
        <div className="container">
          <div className="rounded-[2.5rem] bg-ink text-cream p-10 md:p-16 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <span className="eyebrow light mb-5">Ready to switch?</span>
              <AnimatedHeading
                as="h2"
                text="Move every policy to Aura in one weekend"
                italicWords={["one", "weekend"]}
                className="display-h mt-5 text-cream"
              />
              <p className="mt-5 text-cream/70 max-w-xl">
                Bundle two or more shields and we'll auto-discount 12% on the second policy onwards.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link to="/contact" className="btn-covar">
                Talk to Aura <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee />
    </div>
  );
}
