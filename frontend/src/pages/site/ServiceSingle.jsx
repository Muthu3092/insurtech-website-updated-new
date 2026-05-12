import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Check, Plane, HeartPulse, Car, Activity, Home as HomeIcon, Shield, Phone } from "lucide-react";
import PageHero from "../../components/site/PageHero";
import Marquee from "../../components/site/Marquee";

const DATA = {
  travel: { icon: Plane, title: "Travel Shield", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80" },
  health: { icon: HeartPulse, title: "Health Cover", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80" },
  motor: { icon: Car, title: "Motor Insurance", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80" },
  pa: { icon: Activity, title: "Personal Accident", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80" },
  home: { icon: HomeIcon, title: "Home Protection", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80" },
  business: { icon: Shield, title: "Business Cover", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80" },
};

export default function ServiceSingle() {
  const { slug } = useParams();
  const s = DATA[slug] || DATA.travel;
  const Icon = s.icon;

  return (
    <div data-testid={`service-single-${slug}`}>
      <PageHero
        eyebrow="Shield"
        title={s.title + " coverage with Afinity.AI"}
        // italicWords={["Afinity.AI"]}
        crumbs={[{ label: "Shields", to: "/services" }, { label: s.title }]}
      />

      <section className="py-24 bg-cream">
        <div className="container grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="img-mask aspect-[16/9] rounded-3xl mb-10">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
            </div>
            <h2 className="font-display text-4xl mb-5">Coverage that adapts to your life</h2>
            <p className="text-ink/70 leading-relaxed mb-5">
              Our {s.title} plan combines comprehensive protection with the speed of Afinity.AI.
              From quote to settlement, every step is designed for clarity, transparency and
              instant action.
            </p>
            <p className="text-ink/70 leading-relaxed mb-10">
              Afinity.AI analyzes thousands of risk signals to give you a fair, personalized premium
              — and to settle low-risk claims automatically in under 2 minutes.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                "Auto-approval for low-risk claims",
                "Fraud score on every submission",
                "24/7 voice & chat with Afinity.AI",
                "Smart bundle recommendations",
                "30-day free look guarantee",
                "Cashless or fast reimbursement",
              ].map((b) => (
                <div key={b} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-ink/5">
                  <span className="w-7 h-7 rounded-full bg-lime flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-ink" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-ink/80">{b}</span>
                </div>
              ))}
            </div>

            <Link to="/contact" className="btn-covar dark">
              Get Quote in 60 Seconds <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
            </Link>
          </div>

          <aside className="lg:col-span-4 space-y-5">
            <div className="card-soft p-7">
              <div className="w-14 h-14 rounded-2xl bg-lime flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-ink" />
              </div>
              <h3 className="font-display text-2xl mb-2">{s.title}</h3>
              <p className="text-sm text-ink/65 mb-6">Personalized cover, transparent pricing, AI-powered claims.</p>
              <div className="border-t border-ink/10 pt-5 space-y-3 text-sm">
                {[["Issued", "Instantly"], ["Claim triage", "< 2 min"], ["Free look", "30 days"], ["Support", "24/7 Afinity.AI"]].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between">
                    <span className="text-ink/55">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-soft p-7 bg-ink text-cream">
              <Phone className="w-7 h-7 text-lime mb-4" />
              <h3 className="font-display text-2xl mb-2">Talk to a human</h3>
              <p className="text-sm text-cream/70 mb-5">Prefer a real person? Our customer Afinity.AI team is one tap away.</p>
              <a href="tel:+60123456789" className="btn-covar w-full justify-center">
                +60 18 377 0888 <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      <Marquee />
    </div>
  );
}
