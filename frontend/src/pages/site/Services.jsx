import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plane, HeartPulse, Car, Activity, Home as HomeIcon, Shield } from "lucide-react";
import PageHero from "../../components/site/PageHero";
import Marquee from "../../components/site/Marquee";

const SHIELDS = [
  { icon: Plane, slug: "travel", title: "Travel Shield", desc: "Global cover with auto-claim triage and 24/7 multilingual support.", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80", price: 49 },
  { icon: HeartPulse, slug: "health", title: "Health Cover", desc: "Cashless hospitalization, critical illness and AI-led wellness.", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80", price: 89 },
  { icon: Car, slug: "motor", title: "Motor Insurance", desc: "Comprehensive car & bike protection with one-tap FNOL.", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&q=80", price: 119 },
  { icon: Activity, slug: "pa", title: "Personal Accident", desc: "Worldwide PA cover with smart family bundles.", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80", price: 29 },
  { icon: HomeIcon, slug: "home", title: "Home Protection", desc: "All-risk home cover with smart-device discounts and rapid restoration.", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80", price: 69 },
  { icon: Shield, slug: "business", title: "Business Cover", desc: "SME packages tailored by industry, with API-first claims.", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80", price: 199 },
];

export default function Services() {
  return (
    <div data-testid="services-page">
      <PageHero
        eyebrow="Our Shields"
        title="Smart protection plans for every stage of life"
        italicWords={["every", "stage", "of", "life"]}
        crumbs={[{ label: "Shields" }]}
      />

      <section className="py-24 bg-cream">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHIELDS.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                data-testid={`service-${s.slug}`}
                className="card-soft group overflow-hidden flex flex-col"
              >
                <div className="img-mask aspect-[4/3] rounded-none">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-lime/30 flex items-center justify-center">
                      <s.icon className="w-6 h-6 text-ink" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-ink/50">From RM {s.price}/mo</span>
                  </div>
                  <h3 className="font-display text-2xl mb-2">{s.title}</h3>
                  <p className="text-sm text-ink/65 leading-relaxed mb-6 flex-1">{s.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                    Learn more <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Marquee />
    </div>
  );
}
