import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Shield, Check } from "lucide-react";
import PageHero from "../../components/site/PageHero";
import Marquee from "../../components/site/Marquee";

const PLANS = [
  { name: "Basic", price: 49, popular: false, desc: "Essential cover for individuals.", features: [" <Af></Af> claims", "Travel + PA add-on", "30-day free look", "Email & chat support"] },
  { name: "Standard", price: 148, popular: true, desc: "Best for families & professionals.", features: ["Everything in Basic", "Health + Motor cover", "Priority claims handling", "Phone support 24/7"] },
  { name: "Premium", price: 449, popular: false, desc: "Complete protection bundle.", features: ["Everything in Standard", "Home + Business cover", "Dedicated advisor", "Concierge claims"] },
];

export default function Pricing() {
  return (
    <div data-testid="pricing-page">
      <PageHero
        eyebrow="Pricing"
        title="Affordable coverage that fits"
        italicWords={["that", "fits"]}
        crumbs={[{ label: "Pricing" }]}
      />

      <section className="py-24 bg-cream">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl p-8 border ${p.popular ? "bg-lime border-lime" : "bg-white border-ink/10"}`}
                data-testid={`pricing-${p.name.toLowerCase()}`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-8 bg-ink text-lime text-[11px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="w-16 h-16 rounded-2xl bg-ink flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-lime" />
                </div>
                <h3 className="font-display text-3xl font-semibold mb-2">{p.name} Plan</h3>
                <p className="text-sm text-ink/65 mb-6">{p.desc}</p>
                <div className="font-display text-5xl font-semibold mb-7">
                  RM {p.price}<span className="text-base text-ink/60 font-body font-normal">/mo</span>
                </div>
                <ul className="space-y-3 mb-8 border-t border-ink/15 pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-ink text-lime flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`btn-covar w-full justify-center ${p.popular ? "dark" : ""}`}>
                  Get Started <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />
    </div>
  );
}
