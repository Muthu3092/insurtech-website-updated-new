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
import HomeCoverageCalculator from "../HomeCoverageCalculator";
import HealthCoverageCalculator from "../HealthCoverageCalculator";

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
  home:   "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
};

const COPY = {
  travel: {
    eyebrow: "Travel Insurance",
    title: "Travel boldly. Worry less.",
    italic: ["Worry", "less."],
    intro: "Travel Shield Global gives you single-trip and annual cover with cashless hospitalization, flight-delay reimbursement and 24/7 multilingual assistance — settled by Afinity.AI in under 2 minutes.",
    highlights: [
      { icon: ShieldCheck, title: "Emergency Medical up to RM 350k", body: "Cashless inpatient care across Malaysia & overseas hospitals." },
      { icon: Clock,       title: "Flight delay payouts in minutes", body: "RM 200 per 6-hour delay — auto-paid the moment your flight is logged late." },
      { icon: FileText,    title: "Trip cancellation cover",         body: "Up to RM 5,000 reimbursed for cancellations from listed events." },
      { icon: Headphones,  title: "24/7 Afinity.AI + human support",    body: "Voice & chat in EN/BM/ZH/TA. We never close, even on PH." },
      { icon: Star,        title: "Adventure sports add-on",         body: "Diving, trekking, ski — opt in for an extra 15% premium." },
      { icon: CreditCard,  title: "Buy in 60 seconds",               body: "No paperwork upfront, instant digital certificate by email." },
    ],
    plans: [
      { name: "Basic",   price: 49,  popular: false, features: ["Medical RM 100k", "Trip cancellation RM 5k", "24/7 Afinity.AI assistance", "Digital cert"] },
      { name: "Premium", price: 89,  popular: true,  features: ["Medical RM 350k", "Cashless hospital admission", "Adventure sports add-on", "Priority claims (under 90s)"] },
      { name: "Annual",  price: 349, popular: false, features: ["Unlimited trips/year", "All Premium benefits", "Family bundle 12% off", "Dedicated advisor"] },
    ],
    sectionHeadings: {
      highlights:  { eyebrow: "Key benefits", title: "Why Travel Shield Global.", italic: ["Travel", "Shield", "Global."] },
      plans:       { eyebrow: "Plans",        title: "Basic · Premium · Annual.", italic: ["Annual."] },
      plansIntro:  "Three trip-types covered — pick the cadence that matches how you travel.",
      faq:         { eyebrow: "FAQ",          title: "Your travel questions, answered.", italic: ["answered."] },
      cta:         { eyebrow: "Ready when you are", title: "Instant travel cover. Under 60 seconds.", italic: ["Under", "60", "seconds."] },
      ctaSubtitle: "Single-trip or annual · from RM 49 · Secure Stripe checkout",
    },
    faqs: [
      { q: "What does Travel Shield Global cover?", a: "Travel Shield Global covers emergency medical (up to RM 350,000), trip cancellation/curtailment, flight delay & cancellation, baggage delay/loss, personal liability, and 24/7 worldwide assistance. The exact limits depend on whether you pick Basic, Premium or Annual." },
      { q: "Who is eligible to buy?", a: "Open to Malaysian citizens, PRs and holders of a valid work permit / employment pass aged 18 to 70. Children under 18 can be added under the same trip when accompanied by an adult." },
      { q: "How fast does Afinity.AI settle a flight-delay claim?", a: "If your flight is logged as delayed by the airline, Afinity.AI auto-files the FNOL and credits the RM 200/6h benefit to your bank — typically within 90 seconds. Other claims settle within 2 minutes for low-risk cases." },
      { q: "Can I add adventure sports cover?", a: "Yes — opt-in for an additional 15% premium and you'll be covered for diving (recreational, up to 30m), trekking up to 5,000m, scuba and snowboarding." },
      { q: "Can I cancel my policy?", a: "Single-trip policies are non-refundable once travel has commenced. Annual plans include a 30-day free-look period and pro-rata refund afterwards subject to a minimum retained premium." },
    ],
  },
  health: {
    eyebrow: "Critical Illness",
    title: "Big coverage. Small cost.",
    italic: ["Small", "cost."],
    intro: "Critical Safe+ gives you a lump-sum pay-out if you're diagnosed with critical illnesses such as cancer, heart attack or stroke — from as low as RM 22 / year.",
    highlights: [
      { icon: HeartPulse,  title: "Diabetic Care",        body: "Covers Diabetic Care Disease with a separate sum insured that does not reduce your main cover." },
      { icon: Star,        title: "Three Easy Options",    body: "Pick Top 2, Top 5 or all 39 Critical Illnesses — match cover to your budget and family history." },
      { icon: ShieldCheck, title: "Early-Stage Cover",     body: "50% lump-sum pay-out at early-stage diagnosis, so you can focus on treatment, not bills." },
      { icon: CreditCard,  title: "15% Online Discount",   body: "Instant online discount applied to your quote — no codes, no paperwork." },
      { icon: Clock,       title: "Fast Claims",           body: "Claims paid out within 3 working days of approval. Response on queries in 3 hours." },
      { icon: FileText,    title: "3 / 3 / 3 Promise",     body: "3 minutes to purchase · 3 hours to respond · 3 days to pay claims. Every time." },
    ],
    plans: [
      { name: "Top 2",  price: 22, popular: false, features: ["Heart Attack — specified severity", "Cancer — specified severity", "15% online discount", "Sum insured up to RM 200,000"] },
      { name: "Top 5",  price: 39, popular: true,  features: ["All Top 2 illnesses", "Stroke", "Serious Coronary Artery Disease", "Kidney Failure"] },
      { name: "39 CI",  price: 55, popular: false, features: ["All Top 5 illnesses", "Coronary Artery By-Pass Surgery", "Major Organ Transplant", "+ 30 more conditions"] },
    ],
    sectionHeadings: {
      highlights:  { eyebrow: "Key benefits",        title: "Why Critical Safe+.",            italic: ["Critical", "Safe+."] },
      plans:       { eyebrow: "Coverage options",    title: "Choose your level.",             italic: ["Choose", "your", "level."] },
      plansIntro:  "Three mandatory coverage options × five plans with sum insured between RM 20,000 and RM 200,000.",
      faq:         { eyebrow: "FAQ",                 title: "Your questions, answered.",      italic: ["answered."] },
      cta:         { eyebrow: "Ready when you are",  title: "Instant protection. Under 3 minutes.", italic: ["Under", "3", "minutes."] },
      ctaSubtitle: "12 months cover · from RM 22/year · Secure Stripe checkout",
    },
    faqs: [
      { q: "What is Critical Safe+?", a: "Critical Safe+ is critical illness cover with 3 options and 5 plans. A lump-sum pay-out is made for any of the covered critical illnesses diagnosed at the early or advanced stage shown in your Schedule of Benefits." },
      { q: "Who is eligible to purchase?", a: "Open to Malaysian citizens, Malaysian PRs, and holders of a valid work permit / employment pass legally residing in Malaysia. Age between 15 days and 60 years old, renewable up to 70." },
      { q: "What are the pay-outs for Advanced vs Early Stage?", a: "Advanced Stage — 100% of the sum insured paid provided the insured survives 7 days after diagnosis. The policy then terminates. Early Stage — 50% of the sum insured paid, reducing the remaining cover accordingly." },
      { q: "Is there a discount for buying online?", a: "Yes — a 15% instant online discount is applied to the basic premium when you buy Critical Safe+ through this site." },
      { q: "Can I cancel?", a: "Yes. You may cancel in writing any time; provided no claim has been made you'll receive a short-period refund subject to a minimum retained premium." },
    ],
  },
  motor: {
    eyebrow: "Motor Easy",
    title: "Move seamlessly. Protect deeply.",
    italic: ["Protect", "deeply."],
    intro: "Get the best value for money with our comprehensive car insurance. Receive instant savings when you buy online, plus custom add-ons at super affordable rates.",
    highlights: [
      { icon: CreditCard,  title: "10% Instant Rebate",         body: "Get a 10% instant rebate on top of your No Claim Discount (NCD) when you buy or renew online." },
      { icon: ShieldCheck, title: "Agreed Sum or Market Value", body: "We pay out as per the agreed sum insured on your policy — no surprises at claim time." },
      { icon: Clock,       title: "24-hour Emergency Auto-assist", body: "Roadside assistance around the clock for accidental and non-accidental breakdowns." },
      { icon: FileText,    title: "300+ Authorised Workshops",  body: "Fast, easy repairs at our nationwide panel of authorised car workshops." },
      { icon: Star,        title: "Workmanship Guarantee",      body: "Free 6-month guarantee on workmanship and replacement parts from our panel workshops." },
      { icon: Headphones,  title: "Motor Bundle add-on",        body: "All-Driver, side-mirror, key replacement, roadside, PA + more for RM 0.24/day." },
    ],
    plans: [
      { name: "Third-Party",   price: 320, popular: false, features: ["TPL + theft + fire", "10% online rebate", "Afinity.AI claims support", "Standard NCD"] },
      { name: "Comprehensive", price: 680, popular: true,  features: ["All-risk + own damage", "Agreed value option", "Windscreen + flood add-ons", "Roadside assist 24/7"] },
      { name: "Premium",       price: 990, popular: false, features: ["All Comprehensive benefits", "Inconvenience Allowance", "Spray Paint", "Concierge claims"] },
    ],
    sectionHeadings: {
      highlights:  { eyebrow: "Benefits",            title: "Everything you need. Nothing you don't.", italic: ["Nothing", "you", "don't."] },
      plans:       { eyebrow: "Optional Add-ons",    title: "Customise your shield.",          italic: ["your", "shield."] },
      plansIntro:  "Pick the cover type that fits, then bolt on Windscreen, Inconvenience Allowance, Spray Paint, Strike/Riot, Passenger PA or Legal Liability — at super-affordable daily rates.",
      faq:         { eyebrow: "FAQ",                 title: "Frequently asked questions",      italic: ["asked", "questions"] },
      cta:         { eyebrow: "Ready to move?",      title: "Your car. Protected in 3 minutes.", italic: ["Protected", "in", "3", "minutes."] },
      ctaSubtitle: "Instant 10% online rebate · No paperwork · Claim in-app",
    },
    faqs: [
      { q: "Who can apply for Motor Easy?",       a: "Motor Easy is open to private-car owners aged 21 – 75 with a valid Malaysian driving licence. Cars must be registered in Malaysia. Modified or commercial vehicles are quoted separately." },
      { q: "What is Motor Easy insurance?",       a: "Motor Easy is a comprehensive private-car insurance plan that covers loss or damage to your own vehicle, plus third-party liabilities. You can enhance it with optional add-ons such as windscreen cover, flood cover, and passenger PA." },
      { q: "How is my premium calculated?",       a: "Your premium depends on the cover type (Comprehensive or Third Party), your car's market value (sum insured), your No Claim Discount (NCD), and any add-ons you pick. Online customers receive a 10% instant rebate on top of their NCD." },
      { q: "How fast can I buy online?",          a: "Most customers finish checkout in under 3 minutes. Fill in your vehicle registration, personal details, and payment — we do the rest." },
      { q: "Can I cancel my policy after purchasing?", a: "Yes. You can cancel in writing at any time. Provided no claim has been made, you'll receive a refund based on short-period rates (a minimum retained premium applies)." },
      { q: "How do I get help in an emergency?",  a: "Call our 24/7 Auto-Assist hotline. For accidents, make a police report within 24 hours and photograph the damage for your claim." },
    ],
  },
  pa: {
    eyebrow: "Personal Accident",
    title: "Life is unpredictable. Your cover shouldn't be.",
    italic: ["Your", "cover", "shouldn't", "be."],
    intro: "You'll never know when an accident could happen. Protect yourself and your loved ones from financial strain with PA Easy — premium personal accident protection, from RM 29.16 / year.",
    highlights: [
      { icon: ShieldCheck, title: "Death & Permanent Disablement", body: "Up to RM 10,000 by accidental cause resulting in death or permanent disability." },
      { icon: Clock,       title: "Hospital Income",                body: "Up to RM 50/day for up to 30 days per accident while hospitalised." },
      { icon: FileText,    title: "Ambulance Services",             body: "Up to RM 200 reimbursement for emergency ambulance transport." },
      { icon: Headphones,  title: "Bereavement / Funeral",          body: "Up to RM 1,500 for accidental death only — eases the burden on loved ones." },
      { icon: Star,        title: "Dental & Clinical Treatment",     body: "Up to RM 1,000 reimbursement for accidental dental and clinical care." },
      { icon: CreditCard,  title: "Fuel Station Accident Benefit",  body: "Up to RM 10,000 dedicated additional cover for accidents at fuel stations." },
    ],
    plans: [
      { name: "Solo",   price: 29,  popular: false, features: ["1 person", "Death + PD RM 10,000", "All core benefits", "25% online discount"] },
      { name: "Family", price: 99,  popular: true,  features: ["Up to 6 persons per policy", "All Solo benefits per member", "Bereavement allowance", "Priority claims"] },
      { name: "Group",  price: 199, popular: false, features: ["Up to 10 members", "Group dashboard", "HR-friendly billing", "Dedicated advisor"] },
    ],
    sectionHeadings: {
      highlights:  { eyebrow: "Insurance Coverage",  title: "What PA Easy covers.",         italic: ["PA", "Easy", "covers."] },
      plans:       { eyebrow: "Why PA Easy",         title: "Peace of mind, priced right.", italic: ["priced", "right."] },
      plansIntro:  "Personal accident cover that's easy to understand, easy to buy, and backed by a nationwide member-protection scheme. Set it up in under 3 minutes.",
      faq:         { eyebrow: "FAQ",                 title: "Your questions, answered.",    italic: ["answered."] },
      cta:         { eyebrow: "Ready when you are",  title: "Instant protection. Under 3 minutes.", italic: ["Under", "3", "minutes."] },
      ctaSubtitle: "12 months cover · RM 29.16/year · Secure Stripe checkout",
    },
    faqs: [
      { q: "How much does PA Easy cost?",                 a: "PA Easy starts from RM 29.16/year after the 25% online discount (RM 36.00 before discount), for 12 months of cover. Add up to 6 family members for additional protection." },
      { q: "What is Afinity.ai PA Easy?",                 a: "PA Easy is a personal accident insurance product designed to protect you in the event of bodily injury arising from an accident — covering accidental death, permanent disablement, medical expenses, hospital income, bereavement allowance and more." },
      { q: "Who can apply for this policy?",              a: "Anyone aged 18 – 70 who is a resident or has a permanent residential address, with a valid ID. You can only hold one PA Easy policy as the Insured Person at any one time." },
      { q: "When does my insurance coverage start?",      a: "Your coverage starts from the date of successful payment and runs for 12 calendar months." },
      { q: "Is there a discount for online purchase?",    a: "Yes — a 25% discount is applied to the basic premium when you buy PA Easy online through this site." },
      { q: "Can I cancel my policy?",                     a: "Yes. You can cancel at any time by giving written notice. Upon cancellation, you are entitled to a short-period premium refund subject to a minimum premium." },
      { q: "How and where do I update my beneficiary information?", a: "During the quote flow you nominate a primary beneficiary. To change it later, contact customer support — we'll send you the nomination form." },
    ],
  },
  home: {
    eyebrow: "Home Insurance",
    title: "Sleep easy. Home protected.",
    italic: ["Home", "protected."],
    intro: "Home Easy covers your building, contents and liability against fire, flood, storm and theft — from RM 120 / year.",
    highlights: [
      { icon: ShieldCheck, title: "Fire & Lightning",     body: "Core protection against fire, lightning, and explosions — fully reinstated after a valid claim." },
      { icon: Clock,       title: "Flood & Storm",        body: "Enhanced plans cover flood, windstorm and water damage, critical for Malaysian monsoon seasons." },
      { icon: FileText,    title: "Theft & Burglary",     body: "Cover against burglary, theft, vandalism and malicious acts up to your plan limit." },
      { icon: Star,        title: "10% Online Discount",  body: "Instant online discount applied to your quote. SST 8% clearly itemised — no surprises." },
      { icon: Headphones,  title: "24/7 Home Assistance", body: "Emergency plumber, electrician and locksmith dispatched at any time. Add-on available." },
      { icon: CreditCard,  title: "Instant digital policy",body: "Receive your digital policy card by email the moment you pay — Stripe-secured checkout." },
    ],
    plans: [
      { name: "Basic",    price: 120, popular: false, features: ["Fire & Lightning", "Theft up to RM 5,000", "Public liability up to RM 100,000", "Standard claims handling"] },
      { name: "Enhanced", price: 188, popular: true,  features: ["All Basic benefits", "Flood & Windstorm", "Theft up to RM 20,000", "Liability up to RM 500,000"] },
      { name: "Premier",  price: 269, popular: false, features: ["All Enhanced benefits", "Accidental Damage", "Alternative Accommodation", "Liability up to RM 1,000,000"] },
    ],
    sectionHeadings: {
      highlights:    { eyebrow: "Key benefits",                title: "Why Home Easy.",                       italic: ["Home", "Easy."] },
      plans:         { eyebrow: "Plans",                       title: "Basic · Enhanced · Premier.",          italic: ["Premier."] },
      plansIntro:    "Three tiers of protection — pick what matches your peace of mind.",
      faq:           { eyebrow: "FAQ",                         title: "Your questions, answered.",            italic: ["answered."] },
      cta:           { eyebrow: "Ready when you are",          title: "Instant home protection. Under 3 minutes.", italic: ["Under", "3", "minutes."] },
      ctaSubtitle:   "12 months cover · from RM 120/year · Secure Stripe checkout",
    },
    faqs: [
      { q: "What does Home Easy cover?",          a: "Home Easy covers Building (structure, roof, walls, built-in fittings) and Contents (furniture, electronics, personal items) against fire, flood, storm, burglary, and public liability. The exact perils depend on your chosen plan — Basic, Enhanced, or Premier." },
      { q: "Who is eligible to buy Home Easy?",   a: "Open to Malaysian citizens, Permanent Residents, and legal residents. Covers Landed houses, Apartments/Condos, Terrace houses, and Commercial properties across Malaysia." },
      { q: "How is my premium calculated?",       a: "We combine your Building sum insured (per RM 100,000) × plan loading × property-type loading, plus Contents sum insured × plan loading. An instant 10% online discount applies, then SST 8% on the net premium." },
      { q: "Is there a discount for buying online?", a: "Yes — a 10% online discount is applied automatically when you purchase through this site." },
      { q: "Can I cancel or change my policy?",   a: "Yes. You may cancel in writing any time; provided no claim has been made you'll receive a short-period refund subject to a minimum retained premium. Mid-term adjustments are supported." },
    ],
  },
};

const CLAIM_STEPS = [
  { num: "01", title: "File via app or chat", body: "Tap 'File Claim' or message Afinity.AI — share the incident in plain English." },
  { num: "02", title: "Afinity.AI reads your evidence", body: "Photos, receipts and reports are auto-extracted in under 30 seconds." },
  { num: "03", title: "AI-assisted decision", body: "Low-risk claims auto-approved; complex cases routed to a human advocate." },
  { num: "04", title: "Payout to your bank", body: "Approved amount lands in your bank in 1-3 working days." },
];

const FAQS = [
  { q: "Q1. How fast does Afinity.AI settle a claim?", a: "Afinity.AI auto-approves low-risk claims in under 2 minutes. High-risk claims are routed instantly to a human advocate with a fraud-score and document checklist already prepared." },
  { q: "Q2. What documents do I need?", a: "Most claims need a copy of your IC/passport, a brief description of the incident, and any receipts or police reports relevant to your specific cover. Afinity.AI extracts the rest from your existing profile." },
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

  // Optional per-category overrides
  const sh = copy.sectionHeadings || {};
  const faqsList = copy.faqs || FAQS;

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
              // italicWords={copy.italic}
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
                    Afinity.AI
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
                      <textPath href={`#circle-${cat}`}>Motor   .   Health   .   Travel   .   Home    .    PA    .</textPath>
                    </text>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center z-10">
    <img
      src="/icon.png"
      alt="Family protected"
      className="w-full h-full object-cover"
    />
  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {cat === "home" && (
  <HomeCoverageCalculator
    product={product}
    quoteHref={buyHref}
  />
)}

{cat === "health" && (
  <HealthCoverageCalculator
    product={product}
    quoteHref={buyHref}
  />
)}
      {/* HIGHLIGHTS */}
      <section id="highlights" className="py-24 md:py-32 bg-creamlight">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow mb-5">{sh.highlights?.eyebrow || "Product Highlights"}</span>
              <AnimatedHeading
                as="h2"
                text={sh.highlights?.title || "Everything you'd expect, faster than ever"}
                // italicWords={sh.highlights?.italic || ["faster", "than", "ever"]}
                className="display-h mt-5"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-ink/70 leading-relaxed">
                {sh.highlights?.intro ||
                  "Six core benefits that combine real coverage, transparent pricing and Afinity.AI's always-on AI engine."}
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
              <span className="eyebrow mb-5">{sh.plans?.eyebrow || "Premium Pricing"}</span>
              <AnimatedHeading
                as="h2"
                text={sh.plans?.title || `Pick the ${copy.eyebrow.toLowerCase()} plan that fits`}
                // italicWords={sh.plans?.italic || ["that", "fits"]}
                className="display-h mt-5"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-ink/70 leading-relaxed">
                {sh.plansIntro ||
                  "All plans include the core protection. Step up for richer benefits, family bundling and concierge claims."}
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
                text="Four taps to settlement, powered by Afinity.AI"
                // italicWords={["powered", "by", "Aura"]}
                className="display-h mt-5 text-cream"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-cream/70 leading-relaxed">
                Most claims are settled before your kettle boils. Here's exactly how Afinity.AI
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
            <span className="eyebrow mb-5">{sh.faq?.eyebrow || "Frequently Asked"}</span>
            <AnimatedHeading
              as="h2"
              text={sh.faq?.title || "Answers to your shield questions"}
              // italicWords={sh.faq?.italic || ["shield", "questions"]}
              className="display-h mt-5"
            />
            <p className="mt-6 text-ink/70 leading-relaxed">
              {sh.faq?.intro ||
                "Quick answers about coverage, claims, and Afinity.AI. Still curious? Chat with Afinity.AI at the bottom right of any page."}
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
            {faqsList.map((f, i) => (
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
              <span className="eyebrow light mb-5">{sh.cta?.eyebrow || "Ready when you are"}</span>
              <AnimatedHeading
                as="h2"
                text={sh.cta?.title || `Get your ${copy.eyebrow.toLowerCase()} quote in 60 seconds`}
                // italicWords={sh.cta?.italic || ["60", "seconds"]}
                className="display-h mt-5 text-cream"
              />
              <p className="mt-5 text-cream/70 max-w-xl">
                {sh.ctaSubtitle ||
                  "No paperwork upfront. Afinity.AI handles the underwriting in real time and emails your policy the moment you pay."}
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
