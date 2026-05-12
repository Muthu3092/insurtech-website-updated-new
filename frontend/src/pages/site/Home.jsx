import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  ArrowUpRight,
  Phone,
  Plane,
  HeartPulse,
  Car,
  Activity,
  Home as HomeIcon,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Check,
  Play,
  Plus,
  Minus,
  Quote,
  Headphones,
  Award,
  Users,
  FileText,
} from "lucide-react";
import AnimatedHeading from "../../components/site/AnimatedHeading";
import Counter from "../../components/site/Counter";
import Marquee from "../../components/site/Marquee";
import { endpoints } from "../../lib/apiClient";
import { quoteRouteFor } from "../../lib/quoteRoutes";

const CATEGORY_META = {
  travel: { icon: Plane, fallbackImg: "https://images.unsplash.com/photo-1488646953014-85c" },
  health: { icon: HeartPulse, fallbackImg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" },
  motor: { icon: Car, fallbackImg: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80" },
  pa: { icon: Activity, fallbackImg: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80" },
  home: { icon: HomeIcon, fallbackImg: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80" },
};

const FALLBACK_SHIELDS = [
  { icon: Plane, slug: "travel", title: "Travel Shield", desc: "Worldwide cover with auto-claim triage in under 2 minutes.", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", tag: "Travel" },
  { icon: HeartPulse, slug: "health", title: "Health Cover", desc: "Cashless hospitalization, critical illness, AI-led wellness.", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80", tag: "Health" },
  { icon: Car, slug: "motor", title: "Motor Insurance", desc: "Comprehensive car & bike protection with instant FNOL.", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80", tag: "Motor" },
  { icon: Activity, slug: "pa", title: "Personal Accident", desc: "24/7 worldwide PA cover with smart family add-ons.", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80", tag: "PA" },
];

const FAQS = [
  { q: "Q1. How fast can Afinity settle a claim?", a: "Afinity, our AI copilot, can auto-approve low-risk claims in under 2 minutes. High-risk claims are routed to human reviewers instantly with a fraud score and document checklist." },
  { q: "Q2. What lines of cover do you offer?", a: "We offer four core shields — Travel, Health, Motor and Personal Accident — plus Home Protection. Bundle any two for an automatic 12% discount." },
  { q: "Q3. How do I get a quote?", a: "Tap any 'Get Quote' button. Afinity asks 4 to 6 questions and returns a personalized premium in roughly 60 seconds. No paperwork upfront." },
  { q: "Q4. Are my documents secure?", a: "Yes. We use AES-256 at rest, TLS 1.3 in transit, and ISO 27001 controls. Afinity never shares your data with third parties." },
  { q: "Q5. Can I cancel any time?", a: "Absolutely. All plans include a 30-day free look and pro-rata refund. Cancel from your dashboard with one tap." },
];

const TESTIMONIALS = [
  { tag: "Travel Insurance", quote: "Afinity settled my flight-delay claim from KLIA in 90 seconds. I had the refund before my Uber arrived. Genuinely magical.", name: "Aishah R.", role: "Frequent Flyer · KL" },
  { tag: "Claims Support", quote: "After a fender-bender, the FNOL bot gathered photos and witness info instantly. Settlement next morning. Old insurers can't compete.", name: "David Wong", role: "Motor Claim · Penang" },
  { tag: "Health Cover", quote: "I picked Health Premium during my pregnancy. Cashless admission was seamless and the dashboard tracked every benefit clearly.", name: "Priya M.", role: "New Parent · Subang" },
  { tag: "Policy Guidance", quote: "Afinity recommended a PA add-on I hadn't considered. Six months later, it covered a hiking accident in Sabah. Lifesaver.", name: "Marcus L.", role: "Outdoor Enthusiast" },
];

const TEAM = [
  { name: "Sarah Thompson", role: "Head of Customer Afinity", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80" },
  { name: "Michael Anderson", role: "Senior Insurance Advisor", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" },
  { name: "David Martinez", role: "AI Risk Architect", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
];

const BLOGS = [
  { title: "How Afinity settles 73% of travel claims in under two minutes", date: "12 Jan 2026", cat: "AI", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" },
  { title: "5 health insurance mistakes that cost Malaysians thousands", date: "08 Jan 2026", cat: "Guides", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80" },
  { title: "Why CRM-first insurtech wins the next decade", date: "02 Jan 2026", cat: "Insights", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
];

export default function Home() {
  const [openFaq, setOpenFaq] = React.useState(0);
  const [shields, setShields] = React.useState(FALLBACK_SHIELDS);

  React.useEffect(() => {
    endpoints
      .products()
      .then((res) => {
        const list = (res.data || [])
          .filter((p) => p.active !== false)
          .sort((a, b) => (a.display_order || 999) - (b.display_order || 999))
          .slice(0, 4)
          .map((p) => {
            const meta = CATEGORY_META[p.category] || CATEGORY_META.travel;
            return {
              icon: meta.icon,
              slug: p.category,
              productId: p.id,
              title: p.name,
              desc: p.description,
              img: p.image_url || meta.fallbackImg,
              tag: p.category.charAt(0).toUpperCase() + p.category.slice(1),
            };
          });
        if (list.length) setShields(list);
      })
      .catch(() => {
        // keep fallback on error
      });
  }, []);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative pt-10 pb-24 overflow-hidden">
        <div className="hero-blob right-[-300px] top-[100px]" />
        <div className="hero-blob left-[-200px] bottom-[-200px] opacity-50" />

        <div className="container relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative z-10">
            <div className="flex items-center gap-3 mb-7">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
                ].map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full ring-2 ring-cream overflow-hidden">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="eyebrow">
                <Sparkles className="w-3.5 h-3.5" /> AI-powered · Insurance
              </span>
            </div>

            <AnimatedHeading
              as="h1"
              text="Reliable Insurance for Every Stage of Life"
              // italicWords={["peace", "of", "mind"]}
              className="display-h"
            />

            <p className="mt-7 text-lg text-ink/70 max-w-xl leading-relaxed">
              One platform. Four shields. Powered by Afinity — real AI from quote to claim
              in minutes, not weeks. Built for modern life across Malaysia & beyond.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/services" className="btn-covar" data-testid="hero-cta-explore">
                Explore Shields
                <span className="btn-icon">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
              <Link to="/contact" className="flex items-center gap-3 text-ink font-medium hover:gap-4 transition-all">
                <span className="w-12 h-12 rounded-full bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-cream flex items-center justify-center">
                  <Play className="w-4 h-4 ml-0.5" />
                </span>
                Get free quote
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="font-display text-2xl font-semibold text-ink"><Counter to={10} suffix="k+" /></div>
                <div className="text-xs uppercase tracking-widest text-ink/50 mt-1">Protected</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-ink flex items-center gap-1">
                  4.9 <Star className="w-4 h-4 fill-lime text-lime" />
                </div>
                <div className="text-xs uppercase tracking-widest text-ink/50 mt-1">App Store</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-ink">&lt; 2 min</div>
                <div className="text-xs uppercase tracking-widest text-ink/50 mt-1">Claim triage</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-clay shadow-[0_40px_80px_-30px_rgba(14,14,12,0.35)]">
              <img
                src="/family.png"
                alt="Family protected"
                className="w-full h-full object-cover"
              />
              {/* Floating cover card */}
              <div className="absolute left-5 bottom-5 right-5 bg-cream/90 backdrop-blur-xl rounded-2xl p-4 border border-white/60 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-lime/30 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-ink" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-ink/50">Active cover</div>
                    <div className="font-semibold text-sm">Travel Shield Global · RM 100,000</div>
                  </div>
                  <span className="ml-auto bg-ink text-lime text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
              {/* Top spinning badge */}
              <div className="absolute right-5 top-5 w-24 h-24 rounded-full bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] backdrop-blur-xl flex items-center justify-center">
                <div className="absolute inset-0 animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                    </defs>
                    <text fill="#deb25e" fontSize="9" letterSpacing="2">
                      <textPath href="#circle">Motor   .   Health   .   Travel   .   Home    .    PA    .</textPath>
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

      {/* CONTACT BANNER */}
      <section className="bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-cream">
        <div className="container py-8 grid md:grid-cols-3 gap-6 items-center">
          <div className="font-display text-3xl">Need help? Contact us today!</div>
          <div className="flex items-center gap-4 md:justify-end md:col-span-2">
            <div className="w-14 h-14 rounded-full bg-lime/20 flex items-center justify-center">
              <Phone className="w-5 h-5 text-lime" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-cream/50">Phone Number</div>
              <a href="tel:+6018 377 0888" className="font-display text-2xl hover:text-lime transition">
                Call: +6018 377 0888
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-5 relative">
              <div className="img-mask aspect-[3/4] rounded-3xl">
                <img src="/woman-programmer-is-browsing-internet-smart-phone-protect-cyber-security-from-hacker-attacks-save-clients-confidential-data-padlock-hologram-icons-typing-hands-formal-wear.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="img-mask aspect-[3/4] rounded-3xl mt-12">
                <img src="/woman-white-robe-is-looking-phone-with-lock-lock-middle.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <Link to="/contact" className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-cream flex items-center justify-center shadow-2xl group">
                <div className="absolute inset-0 animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path id="circle2" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                    </defs>
                    <text fill="#f5f1e8" fontSize="9" letterSpacing="2">
                      <textPath href="#circle2">Motor   .   Health   .   Travel   .   Home    .    PA    .</textPath>
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
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <span className="eyebrow mb-5">About Our Company</span>
            <AnimatedHeading
              as="h2"
              text="Expert insurance guidance you can always trust"
              // italicWords={["always", "trust"]}
              className="display-h mt-5"
            />
            <p className="mt-6 text-ink/70 leading-relaxed max-w-lg">
              We are committed to providing clear advice, dependable support, and customized
              coverage solutions you can trust at every step. Built CRM-first so every
              policy is personal, every claim is fast.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {[
                { icon: Award, title: "Our Mission", text: "Provide reliable, affordable, AI-augmented insurance that pays out in minutes." },
                { icon: ShieldCheck, title: "Our Vision", text: "A world where everyone is fairly protected — by humans and AI working together." },
              ].map((c, i) => (
                <div key={i} className="card-soft p-7">
                  <div className="w-14 h-14 rounded-2xl bg-lime/30 flex items-center justify-center mb-5">
                    <c.icon className="w-6 h-6 text-ink" />
                  </div>
                  <h3 className="font-display text-2xl mb-2">{c.title}</h3>
                  <p className="text-sm text-ink/65 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-6">
              <Link to="/about" className="btn-covar dark">
                More About Us
                <span className="btn-icon">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
              <div className="flex items-center gap-2 text-ink/70 text-sm">
                <span className="w-10 h-px bg-ink/30" />
                Smart, scalable, AI-first insurance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 md:py-32 bg-creamlight relative overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow mb-5">Our Shields</span>
              <AnimatedHeading
                as="h2"
                text="Smart protection plans for life"
                // italicWords={["for", "life"]}
                className="display-h mt-5"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-ink/70 leading-relaxed">
                Flexible coverage, transparent premiums and Afinity AI guidance. Safeguard your
                future at every stage — from first job to forever home.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shields.map((s) => (
              <Link
                key={s.slug}
                to={quoteRouteFor(s.slug, s.productId)}
                data-testid={`shield-${s.slug}`}
                className="card-soft group p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-7">
                  <div className="w-14 h-14 rounded-2xl bg-lime/30 flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-ink" />
                  </div>
                  <span className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-lime transition">
                    <ArrowUpRight className="w-4 h-4 text-ink group-hover:rotate-45 transition" />
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-ink/65 leading-relaxed mb-6">{s.desc}</p>
                <div className="img-mask aspect-[4/3] rounded-2xl mt-auto">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <div className="mt-4 inline-flex">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-lime">
                    {s.tag}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-cream">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80" alt="" className="w-14 h-14 rounded-full object-cover" />
              <div className="font-display text-2xl">Expert insurance solutions protecting what matters most.</div>
            </div>
            <Link to="/services" className="btn-covar">
              View All Shields
              <span className="btn-icon">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="eyebrow mb-5">Why Choose Us</span>
            <AnimatedHeading
              as="h2"
              text="Smart insurance solutions backed by experience"
              // italicWords={["by", "experience"]}
              className="display-h mt-5"
            />
            <p className="mt-6 text-ink/70 leading-relaxed max-w-xl">
              Reliable coverage, personalized guidance, flexible plans — and Afinity AI working
              behind every policy to give you faster decisions and fewer surprises.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { title: "Personalized Insurance", text: "Afinity learns your goals & risk profile so every quote is tailored." },
                { title: "Real-time Claims", text: "Auto-approval for low-risk claims, fraud-score on every submission." },
                { title: "Transparent Pricing", text: "No hidden fees. See every benefit and exclusion before you pay." },
              ].map((b, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-lime/30 flex items-center justify-center">
                    <Check className="w-5 h-5 text-ink" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl mb-1">{b.title}</h4>
                    <p className="text-sm text-ink/65 leading-relaxed">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-3xl border border-ink/10 bg-white max-w-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-ink/70">Customer Satisfaction</span>
                <span className="font-display text-2xl font-semibold">92%</span>
              </div>
              <div className="h-2 rounded-full bg-ink/10 overflow-hidden">
                <div className="h-full bg-lime" style={{ width: "92%" }} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-5">
              <div className="img-mask aspect-square rounded-3xl">
                <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-3xl bg-lime p-7 flex flex-col justify-between aspect-square">
                <Award className="w-10 h-10 text-ink" />
                <div>
                  <div className="font-display text-6xl font-semibold leading-none"><Counter to={80} suffix="+" /></div>
                  <div className="text-sm font-medium mt-3">Industry Awards & Recognitions</div>
                </div>
              </div>
              <div className="rounded-3xl bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-cream p-7 flex flex-col justify-between aspect-square">
                <Users className="w-10 h-10 text-lime" />
                <div>
                  <div className="font-display text-6xl font-semibold leading-none"><Counter to={4} suffix="K+" /></div>
                  <div className="text-sm font-medium mt-3 text-cream/70">Trusted Partners Worldwide</div>
                </div>
              </div>
              <div className="img-mask aspect-square rounded-3xl">
                <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO VIDEO + COUNTERS */}
      <section className="py-24 md:py-32 bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-cream relative overflow-hidden">
        <div className="container relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow light mb-5">Watch Our Story</span>
              <AnimatedHeading
                as="h2"
                text="Discover the journey behind our trusted AI insurance"
                // italicWords={["AI", "insurance"]}
                className="display-h mt-5 text-cream"
              />
              <p className="mt-6 text-cream/70 max-w-lg leading-relaxed">
                From a small Kuala Lumpur lab to protecting hundreds of thousands across
                Asia — see how we built insurance that understands you.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mt-12">
                {[
                  { icon: Users, num: 50, suffix: "K+", title: "Happy Clients", text: "Trusted by households across SEA." },
                  { icon: FileText, num: 25, suffix: "K+", title: "Policies Issued", text: "Comprehensive cover, every line." },
                  { icon: ShieldCheck, num: 50, suffix: "+", title: "AI Experts", text: "Engineers and underwriters in one team." },
                ].map((c, i) => (
                  <div key={i} className="border-t border-cream/15 pt-6">
                    <c.icon className="w-8 h-8 text-lime mb-4" />
                    <div className="font-display text-5xl font-semibold mb-2">
                      <Counter to={c.num} suffix={c.suffix} />
                    </div>
                    <div className="font-medium mb-1">{c.title}</div>
                    <div className="text-xs text-cream/55 leading-relaxed">{c.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <video
  className="w-full h-full object-cover"
  autoPlay
  loop
  muted
  playsInline
>
  <source
    src="/0_Network_Digital_2160x3840.mov"
    type="video/mp4"
  />
</video>
                <div className="absolute inset-0 bg-ink/20" />
                {/* <a
                  href="https://www.youtube.com/watch?v=Y-x0efG1seA"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <span className="w-24 h-24 rounded-full bg-lime flex items-center justify-center group-hover:scale-110 transition">
                    <Play className="w-7 h-7 text-ink ml-1" />
                  </span>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 md:py-32 bg-cream" data-testid="pricing-section">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow mb-5">Our Pricing Plans</span>
              <AnimatedHeading
                as="h2"
                text="Affordable coverage that fits"
                // italicWords={["that", "fits"]}
                className="display-h mt-5"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-ink/70 leading-relaxed">
                Easy-to-understand plans, no hidden fees. Pick the right protection without
                overpaying — Afinity AI makes recommendations based on your real life.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Travel Shield Global", price: 49, popular: false },
              { name: "Pa Easy", price: 148, popular: true },
              { name: "Health Shield Plus", price: 449, popular: false },
            ].map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl p-8 border ${
                  p.popular ? "bg-lime border-lime" : "bg-white border-ink/10"
                }`}
                data-testid={`pricing-card-${p.name.toLowerCase().replace(" ", "-")}`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-8 bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-lime text-[11px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="w-16 h-16 rounded-2xl bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-lime" />
                </div>
                <h3 className="font-display text-3xl font-semibold mb-2">{p.name}</h3>
                <p className="text-sm text-ink/65 mb-6">
                  Essential cover with Afinity AI guidance and 24/7 claims support.
                </p>
                <div className="font-display text-5xl font-semibold mb-1">RM {p.price}<span className="text-base text-ink/60 font-body font-normal">/mo</span></div>
                <div className="border-t border-ink/15 my-7" />
                <div className="text-xs uppercase tracking-widest font-semibold mb-4">What's Included</div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Afinity AI claims handling",
                    "Extended life & health cover",
                    "Vehicle or property add-on",
                    "30-day free look",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-ink text-lime flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/services" className={`btn-covar w-full justify-center ${p.popular ? "dark" : ""}`}>
                  Get Started
                  <span className="btn-icon">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-ink/70">
            {["Get 30 day free trial", "No hidden fees", "Cancel anytime"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-ink bg-lime rounded-full p-0.5" strokeWidth={3} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GET QUOTE / CONTACT INFO */}
      <section className="py-24 md:py-32 bg-creamlight">
        <div className="container grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="eyebrow mb-5">Get Free Quote</span>
            <AnimatedHeading
              as="h2"
              text="Right insurance plan for you"
              // italicWords={["for", "you"]}
              className="display-h mt-5"
            />
            <p className="mt-6 text-ink/70 leading-relaxed max-w-lg">
              Our experts (and Afinity AI) guide you through flexible coverage options, helping
              you choose protection that gives confidence and peace of mind.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {[
                { icon: Headphones, title: "Contact Us Today", text: "Speak to a real human or chat with Afinity AI — both 24/7." },
                { icon: Phone, title: "+60 18 377 0888", text: "Call our customer Afinity AI desk anytime." },
              ].map((c, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white border border-ink/10">
                  <c.icon className="w-7 h-7 text-ink mb-4" />
                  <h4 className="font-display text-xl mb-1">{c.title}</h4>
                  <p className="text-sm text-ink/65 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] relative">
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" alt="" className="w-full h-full object-cover" />
              <div className="absolute left-6 top-6 right-6 flex items-center gap-3 bg-cream/90 backdrop-blur-xl rounded-2xl p-4 border border-white/60">
                <div className="w-12 h-12 rounded-xl bg-lime flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-ink" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-ink/50">Afinity AI</div>
                  <div className="font-semibold text-sm">Quote in 60 seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      {/* <section className="py-24 md:py-32 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow mb-5">Our Expert Team</span>
              <AnimatedHeading
                as="h2"
                text="Our skilled insurance experts"
                italicWords={["insurance", "experts"]}
                className="display-h mt-5"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-ink/70 leading-relaxed">
                Underwriters, ML engineers and claims advocates working as one. Client-first,
                always.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((t) => (
              <Link key={t.name} to="/team" className="group" data-testid={`team-${t.name.split(" ")[0].toLowerCase()}`}>
                <div className="img-mask aspect-[3/4] rounded-3xl mb-5">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
                    <p className="text-sm text-ink/60 mt-1">{t.role}</p>
                  </div>
                  <span className="w-11 h-11 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-lime transition">
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-creamlight">
        <div className="container grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="eyebrow mb-5">Frequently Asked</span>
            <AnimatedHeading
              as="h2"
              text="Answers to your insurance questions"
              // italicWords={["insurance", "questions"]}
              className="display-h mt-5"
            />
            <p className="mt-6 text-ink/70 leading-relaxed">
              Clear answers to the most common questions about coverage, claims and Afinity AI.
            </p>
            <div className="mt-8 p-6 rounded-3xl bg-white border border-ink/10 flex items-center gap-4 max-w-md">
              <div className="w-12 h-12 rounded-full bg-lime/30 flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-ink/50">Phone Number</div>
                <a href="tel:+60183770888" className="font-display text-xl">+60 18 377 0888</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-3">
              {FAQS.map((f, i) => (
                <div
                  key={i}
                  className={`acc-item rounded-2xl px-6 py-5 transition ${
                    openFaq === i ? "bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-cream" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 text-left"
                    data-testid={`faq-toggle-${i}`}
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
                  <div
                    className={`grid transition-all duration-500 ${
                      openFaq === i ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className={`text-sm leading-relaxed ${openFaq === i ? "text-cream/75" : "text-ink/65"}`}>
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-cream">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow light mb-5">Our Testimonials</span>
              <AnimatedHeading
                as="h2"
                text="What our clients say about their experience"
                // italicWords={["their", "experience"]}
                className="display-h mt-5 text-cream"
              />
            </div>
            <div className="lg:col-span-5 flex md:justify-end">
              <Link to="/testimonials" className="btn-covar">
                View Reviews
                <span className="btn-icon">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="!pb-14"
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-cream/5 border border-cream/10 rounded-3xl p-8 h-full">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime" />
                    <span className="text-xs uppercase tracking-widest text-cream/60">{t.tag}</span>
                  </div>
                  <Quote className="w-8 h-8 text-lime mb-5" />
                  <p className="text-cream/85 leading-relaxed text-lg font-display mb-8">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-cream/10">
                    <div className="w-12 h-12 rounded-full bg-lime/30 flex items-center justify-center font-display text-xl font-semibold">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-xs text-cream/50">{t.role}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-wrap justify-center gap-8 mt-6 text-sm text-cream/60">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-lime" /> Trusted by 40,000+ users</div>
            <div className="flex items-center gap-2"><Star className="w-4 h-4 fill-lime text-lime" /> 4.9 / 5 average rating</div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      {/* <section className="py-24 md:py-32 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow mb-5">Latest Blogs</span>
              <AnimatedHeading
                as="h2"
                text="Latest news, guides & updates"
                italicWords={["&", "updates"]}
                className="display-h mt-5"
              />
            </div>
            <div className="lg:col-span-5 flex md:justify-end">
              <Link to="/blog" className="btn-covar dark">
                All Articles
                <span className="btn-icon">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BLOGS.map((b, i) => (
              <Link key={i} to="/blog" className="card-soft overflow-hidden flex flex-col group" data-testid={`blog-card-${i}`}>
                <div className="img-mask aspect-[4/3]">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-ink/60 mb-3">
                    <span className="bg-lime/30 text-ink font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">{b.cat}</span>
                    <span>{b.date}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold leading-tight mb-4 flex-1">{b.title}</h3>
                  <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                    Read more <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      <Marquee />
    </div>
  );
}
