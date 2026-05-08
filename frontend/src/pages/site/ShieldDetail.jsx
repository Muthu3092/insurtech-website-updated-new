import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  ArrowUpRight, Plane, HeartPulse, Car, Activity, Home as HomeIcon, Shield,
  Check, Plus, Minus, Phone, Headphones, Sparkles, Award,
  ShieldCheck, Clock, FileText, CreditCard, Star,
} from "lucide-react";
import AnimatedHeading from "../../components/site/AnimatedHeading";
import Counter from "../../components/site/Counter";
import Marquee from "../../components/site/Marquee";
import PageHero from "../../components/site/PageHero";
import { endpoints } from "../../lib/apiClient";

/**
 * Covar-style shield-detail/landing page.
 *   /products/motor-easy       → category=motor
 *   /products/pa-easy          → category=pa
 *   /products/health-secure-plus → category=health
 *   /products/home-easy        → category=home
 *   /products/travel/:productId → category=travel (id from URL)
 *
 * "Buy Now" CTA hands off to the existing quote flow in the repo.
 */

const ICON_MAP = {
  travel: Plane, health: HeartPulse, motor: Car, pa: Activity, home: HomeIcon,
};

const HERO_IMG = {
  travel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&q=80",
  health: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80",
  motor:  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=80",
  pa:     "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1400&q=80",
  home:   "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1400&q=80",
};

const COPY = {
  travel: {
    eyebrow: "Travel Shield",
    title: "Worldwide travel cover with Aura instant claims",
    italic: ["instant", "claims"],
    intro: "Single-trip, annual & one-way travel cover with cashless hospitalization, flight-delay reimbursement and 24/7 multilingual assistance — settled by Aura AI in under 2 minutes.",
    highlights: [
      { icon: ShieldCheck, title: "Emergency Medical up to RM 350k", body: "Cashless inpatient care across Malaysia & overseas hospitals." },
      { icon: Clock,       title: "Flight delay payouts in minutes", body: "RM 200 per 6-hour delay — auto-paid the moment your flight is logged late." },
      { icon: FileText,    title: "Trip cancellation cover",         body: "Up to RM 5,000 reimbursed for cancellations from listed events." },
      { icon: Headphones,  title: "24/7 Aura AI + human support",    body: "Voice & chat in EN/BM/ZH/TA. We never close, even on PH." },
      { icon: Star,        title: "Adventure sports add-on",         body: "Diving, trekking, ski — opt in for an extra 15% premium." },
      { icon: CreditCard,  title: "Buy in 60 seconds",               body: "No paperwork upfront, instant digital certificate by email." },
    ],
    plans: [
      { name: "Basic",   price: 49,  popular: false, features: ["Medical RM 100k", "Trip cancellation RM 5k", "24/7 Aura assistance", "Digital cert"] },
      { name: "Premium", price: 89,  popular: true,  features: ["Medical RM 350k", "Cashless hospital admission", "Adventure sports add-on", "Priority claims (under 90s)"] },
      { name: "Annual",  price: 349, popular: false, features: ["Unlimited trips/year", "All Premium benefits", "Family bundle 12% off", "Dedicated advisor"] },
    ],
  },
  health: {
    eyebrow: "Health Cover",
    title: "Cashless health protection backed by Aura AI",
    italic: ["backed", "by", "AI"],
    intro: "Critical illness, hospitalisation and wellness — with 39-condition cover, early-stage payouts and a 15% online discount. Approved policies issue in 3 working days.",
    highlights: [
      { icon: ShieldCheck, title: "39 critical illnesses cover",   body: "From cancer to kidney failure, all covered with early-stage payouts." },
      { icon: Clock,       title: "Cashless admission in minutes", body: "Walk into 300+ panel hospitals — Aura sends the guarantee letter on the way." },
      { icon: FileText,    title: "50% early-stage payout",         body: "Receive half the sum insured at early diagnosis to start treatment fast." },
      { icon: Headphones,  title: "Diabetic care benefit",          body: "Specialised cover for diabetic conditions — built into every plan." },
      { icon: Star,        title: "15% instant online discount",    body: "Buy through afinity.ai and save 15% before SST." },
      { icon: CreditCard,  title: "3-day claims promise",           body: "Most claims approved & paid within 3 working days of submission." },
    ],
    plans: [
      { name: "Top 2",  price: 22,  popular: false, features: ["Heart attack & cancer cover", "Sum insured up to RM 100k", "15% online discount", "Email & chat support"] },
      { name: "Top 5",  price: 39,  popular: true,  features: ["Top 2 + Stroke + Coronary + Kidney", "Sum insured up to RM 200k", "Early-stage 50% payout", "Phone support 24/7"] },
      { name: "39 CI",  price: 55,  popular: false, features: ["All 39 critical illnesses", "Sum insured up to RM 200k", "Maternity rider available", "Dedicated advisor"] },
    ],
  },
  motor: {
    eyebrow: "Motor Insurance",
    title: "Comprehensive motor cover with one-tap FNOL",
    italic: ["one-tap", "FNOL"],
    intro: "Comprehensive own-damage + third-party motor cover with 10% online rebate, agreed-value payouts and 300+ authorised workshops. File a claim in three taps.",
    highlights: [
      { icon: ShieldCheck, title: "Comprehensive own-damage cover", body: "Accident, theft, fire, flood, riot — all included with no hidden exclusions." },
      { icon: Clock,       title: "24h roadside auto-assist",       body: "Towing, jump-start and battery swap — anywhere in Malaysia." },
      { icon: FileText,    title: "Agreed sum or market value",     body: "Choose how you want your car valued at the start of your policy." },
      { icon: Headphones,  title: "300+ panel workshops",           body: "Authorised workshops nationwide with 6-month workmanship guarantee." },
      { icon: Star,        title: "10% instant online rebate",       body: "On top of any NCD you've earned. Stack the savings." },
      { icon: CreditCard,  title: "Windscreen & passenger PA",       body: "Add-ons for cracked windscreens and passenger personal accident." },
    ],
    plans: [
      { name: "Third-Party",   price: 320, popular: false, features: ["TPL + theft + fire", "10% online rebate", "Aura claims support", "Standard NCD"] },
      { name: "Comprehensive", price: 680, popular: true,  features: ["All-risk + own damage", "Agreed value option", "Windscreen + flood add-ons", "Roadside assist 24/7"] },
      { name: "Premium",       price: 990, popular: false, features: ["All Comprehensive", "Inconvenience allowance", "Spray paint cover", "Concierge claims"] },
    ],
  },
  pa: {
    eyebrow: "Personal Accident",
    title: "24/7 worldwide personal accident protection",
    italic: ["worldwide", "protection"],
    intro: "Death & permanent-disablement cover up to RM 10,000 with hospital income, ambulance services and bereavement allowance — affordable PA cover for the whole family.",
    highlights: [
      { icon: ShieldCheck, title: "Death & PD up to RM 10k",        body: "Lump-sum payout for accidental death or permanent disablement." },
      { icon: Clock,       title: "Hospital income RM 50/day",      body: "Up to 30 days of daily income while you recover." },
      { icon: FileText,    title: "Ambulance up to RM 200",         body: "Reimburses your accident-related ambulance costs." },
      { icon: Headphones,  title: "Bereavement / funeral RM 1.5k",  body: "Compassionate cover when families need it most." },
      { icon: Star,        title: "Dental & clinical RM 1k",        body: "Accidental dental and clinic visits covered." },
      { icon: CreditCard,  title: "Family-friendly bundling",        body: "Cover up to 4 family members under one policy." },
    ],
    plans: [
      { name: "Solo",     price: 36, popular: false, features: ["1 person", "Death + PD RM 10k", "Hospital income", "Aura support"] },
      { name: "Family",   price: 99, popular: true,  features: ["Up to 4 members", "All Solo benefits ×4", "Bereavement allowance", "Priority claims"] },
      { name: "Group",    price: 199, popular: false, features: ["Up to 10 members", "Group dashboard", "HR-friendly billing", "Dedicated advisor"] },
    ],
  },
  home: {
    eyebrow: "Home Protection",
    title: "Smart home cover with Aura monitoring",
    italic: ["Aura", "monitoring"],
    intro: "All-risk home cover protecting your building, contents and liability — with smart-device discounts, 24/7 home assistance and a 10% online rebate.",
    highlights: [
      { icon: ShieldCheck, title: "Building + Contents cover",  body: "Full reinstatement after fire, flood, storm and burglary." },
      { icon: Clock,       title: "24h home assistance",        body: "Plumber, electrician, locksmith dispatched any time." },
      { icon: FileText,    title: "Public liability up to RM 1M", body: "Protection if a guest is injured at your property." },
      { icon: Headphones,  title: "Smart-device discount",       body: "Connected smoke/water sensors? Get an extra 5% off." },
      { icon: Star,        title: "Flexible Basic / Enhanced / Premier", body: "Pick the level that suits your home and budget." },
      { icon: CreditCard,  title: "10% online discount",         body: "Buy online through afinity.ai for instant savings." },
    ],
    plans: [
      { name: "Basic",    price: 120, popular: false, features: ["Fire & lightning", "Theft up to RM 5k", "Liability up to RM 100k", "Standard claims"] },
      { name: "Enhanced", price: 188, popular: true,  features: ["All Basic", "Flood & windstorm", "Theft up to RM 20k", "Liability up to RM 500k"] },
      { name: "Premier",  price: 269, popular: false, features: ["All Enhanced", "Accidental damage", "Alt. accommodation", "Liability up to RM 1M"] },
    ],
  },
};

const CLAIM_STEPS = [
  { num: "01", title: "File via app or chat", body: "Tap 'File Claim' or message Aura — share the incident in plain English." },
  { num: "02", title: "Aura reads your evidence", body: "Photos, receipts and reports are auto-extracted in under 30 seconds." },
  { num: "03", title: "AI-assisted decision", body: "Low-risk claims auto-approved; complex cases routed to a human advocate." },
  { num: "04", title: "Payout to your bank", body: "Approved amount lands in your bank in 1-3 working days." },
];

const FAQS = [
  { q: "Q1. How fast does Aura settle a claim?", a: "Aura auto-approves low-risk claims in under 2 minutes. High-risk claims are routed instantly to a human advocate with a fraud-score and document checklist already prepared." },
  { q: "Q2. What documents do I need?", a: "Most claims need a copy of your IC/passport, a brief description of the incident, and any receipts or police reports relevant to your specific cover. Aura extracts the rest from your existing profile." },
  { q: "Q3. Can I cancel any time?", a: "Yes — every plan includes a 30-day free-look period and pro-rata refund. Cancel from your dashboard with one tap." },
  { q: "Q4. Are my data and payments secure?", a: "AES-256 at rest, TLS 1.3 in transit, ISO 27001 controls. Payments are PCI-DSS L1 via our Stripe integration." },
  { q: "Q5. Who underwrites these policies?", a: "Policies are underwritten by Tier-1 reinsurers under Bank Negara Malaysia (BNM) supervision. Member of PIDM where applicable." },
];

function quoteHrefFor(category, productId) {
  switch (category) {
    case "travel": return productId ? `/travel-quote/${productId}` : "/products/travel";
    case "motor":  return productId ? `/motor-quote/${productId}` : "/motor-quote";
    case "pa":     return productId ? `/pa-quote/${productId}` : "/pa-quote";
    case "health": return productId ? `/health-quote/${productId}` : "/products";
    case "home":   return productId ? `/home-quote/${productId}` : "/products";
    default:       return "/products";
  }
}

export default function ShieldDetail({ category }) {
  const params = useParams();
  const loc = useLocation();
  const [product, setProduct] = React.useState(null);
  const [openFaq, setOpenFaq] = React.useState(0);

  // Derive category if not passed (App.js passes it; for /products/travel/:productId path it comes from props)
  const cat = (category || params.category || "travel").toLowerCase();
  const copy = COPY[cat] || COPY.travel;
  const Icon = ICON_MAP[cat] || Shield;

  React.useEffect(() => {
    endpoints
      .products()
      .then((res) => {
        const list = res.data || [];
        const match =
          (params.productId && list.find((p) => p.id === params.productId)) ||
          list.find((p) => (p.category || "").toLowerCase() === cat);
        if (match) setProduct(match);
      })
      .catch(() => {});
  }, [cat, params.productId, loc.pathname]);

  const productId = product?.id || params.productId;
  const buyHref = quoteHrefFor(cat, productId);
  const fromPrice =
    product?.base_premium != null
      ? Math.round(product.base_premium)
      : copy.plans[0]?.price;
  const productName = product?.name || copy.eyebrow;

  return (
    <div data-testid={`shield-detail-${cat}`}>
      {/* HERO */}
      <section className="relative pt-10 pb-24 overflow-hidden bg-cream">
        <div className="hero-blob right-[-300px] top-[80px]" />
        <div className="hero-blob left-[-200px] bottom-[-200px] opacity-50" />
        <div className="container relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-7">
              <span className="eyebrow">
                <Icon className="w-3.5 h-3.5" /> {copy.eyebrow}
              </span>
              <span className="text-xs uppercase tracking-widest text-ink/50">From RM {fromPrice}/yr</span>
            </div>

            <AnimatedHeading
              as="h1"
              text={copy.title}
              italicWords={copy.italic}
              className="display-h"
            />
            <p className="mt-7 text-lg text-ink/70 max-w-xl leading-relaxed">{copy.intro}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to={buyHref} className="btn-covar dark" data-testid={`buy-now-${cat}`}>
                Buy Now <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
              </Link>
              <a href="#highlights" className="flex items-center gap-3 text-ink font-medium hover:gap-4 transition-all">
                <span className="w-12 h-12 rounded-full bg-ink/10 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </span>
                See benefits
              </a>
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
                <div className="text-xs uppercase tracking-widest text-ink/50 mt-1">Triage</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-clay shadow-[0_40px_80px_-30px_rgba(14,14,12,0.35)]">
              <img src={HERO_IMG[cat]} alt={productName} className="w-full h-full object-cover" />
              <div className="absolute left-5 bottom-5 right-5 bg-cream/90 backdrop-blur-xl rounded-2xl p-4 border border-white/60 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-lime/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-ink" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-ink/50">{copy.eyebrow}</div>
                    <div className="font-semibold text-sm">{productName}</div>
                  </div>
                  <span className="ml-auto bg-ink text-lime text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                    Aura AI
                  </span>
                </div>
              </div>
              <div className="absolute right-5 top-5 w-24 h-24 rounded-full bg-ink/90 backdrop-blur-xl flex items-center justify-center">
                <div className="absolute inset-0 animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path id={`circle-${cat}`} d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                    </defs>
                    <text fill="#deb25e" fontSize="9" letterSpacing="2">
                      <textPath href={`#circle-${cat}`}>BUY NOW · INSTANT COVER · </textPath>
                    </text>
                  </svg>
                </div>
                <ShieldCheck className="w-6 h-6 text-lime" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section id="highlights" className="py-24 md:py-32 bg-creamlight">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow mb-5">Product Highlights</span>
              <AnimatedHeading
                as="h2"
                text="Everything you'd expect, faster than ever"
                italicWords={["faster", "than", "ever"]}
                className="display-h mt-5"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-ink/70 leading-relaxed">
                Six core benefits that combine real coverage, transparent pricing and Aura's
                always-on AI engine.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {copy.highlights.map((h, i) => (
              <div key={i} className="card-soft p-7">
                <div className="w-14 h-14 rounded-2xl bg-lime/30 flex items-center justify-center mb-5">
                  <h.icon className="w-6 h-6 text-ink" />
                </div>
                <h3 className="font-display text-xl mb-2">{h.title}</h3>
                <p className="text-sm text-ink/65 leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING / PLANS */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow mb-5">Premium Pricing</span>
              <AnimatedHeading
                as="h2"
                text={`Pick the ${copy.eyebrow.toLowerCase()} plan that fits`}
                italicWords={["that", "fits"]}
                className="display-h mt-5"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-ink/70 leading-relaxed">
                All plans include the core protection. Step up for richer benefits, family bundling
                and concierge claims.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {copy.plans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl p-8 border ${
                  p.popular ? "bg-lime border-lime" : "bg-white border-ink/10"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-8 bg-ink text-lime text-[11px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full">
                    Recommended
                  </span>
                )}
                <div className="w-16 h-16 rounded-2xl bg-ink flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-lime" />
                </div>
                <h3 className="font-display text-3xl font-semibold mb-2">{p.name} Plan</h3>
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
                <Link to={buyHref} className={`btn-covar w-full justify-center ${p.popular ? "dark" : ""}`}>
                  Buy Now <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLAIM PROCESS */}
      <section className="py-24 md:py-32 bg-ink text-cream relative overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow light mb-5">How to Claim</span>
              <AnimatedHeading
                as="h2"
                text="Four taps to settlement, powered by Aura"
                italicWords={["powered", "by", "Aura"]}
                className="display-h mt-5 text-cream"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-cream/70 leading-relaxed">
                Most claims are settled before your kettle boils. Here's exactly how Aura
                handles every submission.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLAIM_STEPS.map((s) => (
              <div key={s.num} className="border-t border-cream/15 pt-6">
                <div className="font-display text-6xl font-semibold text-lime mb-4">{s.num}</div>
                <h4 className="font-display text-xl mb-2">{s.title}</h4>
                <p className="text-sm text-cream/65 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-creamlight">
        <div className="container grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="eyebrow mb-5">Frequently Asked</span>
            <AnimatedHeading
              as="h2"
              text="Answers to your shield questions"
              italicWords={["shield", "questions"]}
              className="display-h mt-5"
            />
            <p className="mt-6 text-ink/70 leading-relaxed">
              Quick answers about coverage, claims, and Aura AI. Still curious? Chat with Aura at the
              bottom right of any page.
            </p>
            <div className="mt-8 p-6 rounded-3xl bg-white border border-ink/10 flex items-center gap-4 max-w-md">
              <div className="w-12 h-12 rounded-full bg-lime/30 flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-ink/50">Phone Number</div>
                <a href="tel:+60123456789" className="font-display text-xl">+60 12 345 6789</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className={`acc-item rounded-2xl px-6 py-5 transition ${
                  openFaq === i ? "bg-ink text-cream" : "bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                  data-testid={`shield-faq-${i}`}
                >
                  <span className="font-display text-xl">{f.q}</span>
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      openFaq === i ? "bg-lime text-ink" : "bg-ink/5 text-ink"
                    }`}
                  >
                    {openFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <div className={`grid transition-all duration-500 ${openFaq === i ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className={`text-sm leading-relaxed ${openFaq === i ? "text-cream/75" : "text-ink/65"}`}>{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="rounded-[2.5rem] bg-ink text-cream p-10 md:p-16 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <span className="eyebrow light mb-5">Ready when you are</span>
              <AnimatedHeading
                as="h2"
                text={`Get your ${copy.eyebrow.toLowerCase()} quote in 60 seconds`}
                italicWords={["60", "seconds"]}
                className="display-h mt-5 text-cream"
              />
              <p className="mt-5 text-cream/70 max-w-xl">
                No paperwork upfront. Aura handles the underwriting in real time and emails your
                policy the moment you pay.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link to={buyHref} className="btn-covar" data-testid={`final-buy-${cat}`}>
                Buy Now <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee />
    </div>
  );
}
