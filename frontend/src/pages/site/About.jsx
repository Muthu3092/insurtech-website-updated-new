import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Award, ShieldCheck, Sparkles, Users, FileText, Target, Lightbulb, Heart, Zap } from "lucide-react";
import PageHero from "../../components/site/PageHero";
import AnimatedHeading from "../../components/site/AnimatedHeading";
import Counter from "../../components/site/Counter";
import Marquee from "../../components/site/Marquee";

export default function About() {
  return (
    <div data-testid="about-page">
      <PageHero
        eyebrow="About Us"
        title="A modern insurance company built around real AI"
        // italicWords={["modern", "real", "AI"]}
        crumbs={[{ label: "About" }]}
      />

      <section className="py-24 bg-cream">
        <div className="container grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-5">
              <div className="img-mask aspect-[3/4] rounded-3xl">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="img-mask aspect-[3/4] rounded-3xl mt-12">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <span className="eyebrow mb-5">Our Story</span>
            <AnimatedHeading
              as="h2"
              text="Building insurance that actually feels human"
              // italicWords={["actually", "feels", "human"]}
              className="display-h mt-5"
            />
            <p className="mt-6 text-ink/70 leading-relaxed">
              afinity.ai was founded in Kuala Lumpur with one belief: insurance should be
              effortless. Quotes in seconds, claims in minutes, advice that's genuinely useful.
              We combined a CRM-first architecture with Afinity.AI — our in-house AI copilot — to
              deliver coverage that fits modern life.
            </p>
            <p className="mt-4 text-ink/70 leading-relaxed">
              Today we protect over 120,000 customers across four core shields, with a 4.9 / 5
              App Store rating and an average claim triage time of under 2 minutes.
            </p>
            <Link to="/services" className="btn-covar dark mt-8">
              Explore Shields <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-creamlight">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              { icon: Target, title: "Our Mission", text: "Provide reliable, affordable, AI-augmented insurance that pays out in minutes — for everyone." },
              { icon: Lightbulb, title: "Our Vision", text: "A world where everyone is fairly protected, with humans and AI working seamlessly together." },
            ].map((c, i) => (
              <div key={i} className="card-soft p-10">
                <div className="w-16 h-16 rounded-2xl bg-lime flex items-center justify-center mb-6">
                  <c.icon className="w-7 h-7 text-ink" />
                </div>
                <h3 className="font-display text-3xl mb-3">{c.title}</h3>
                <p className="text-ink/70 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: 10, suf: "K+", label: "Protected" },
              { num: 25, suf: "K+", label: "Policies" },
              { num: 80, suf: "+", label: "Awards" },
              { num: 50, suf: "+", label: "AI Experts" },
            ].map((s) => (
              <div key={s.label} className="bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-cream rounded-3xl p-8">
                <div className="font-display text-5xl font-semibold mb-2">
                  <Counter to={s.num} suffix={s.suf} />
                </div>
                <div className="text-xs uppercase tracking-widest text-cream/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow mb-5">Our Values</span>
            <AnimatedHeading
              as="h2"
              text="What guides everything we build"
              // italicWords={["everything", "we", "build"]}
              className="display-h mt-5"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Customer-first", text: "Every line of code, every policy clause, every claim decision starts with you." },
              { icon: Zap, title: "Real AI, real results", text: "No marketing fluff. Afinity.AI measurably reduces claim time by 87%." },
              { icon: ShieldCheck, title: "Transparent always", text: "See every benefit, exclusion, and premium component before you pay." },
              { icon: Award, title: "Built to last", text: "Backed by leading reinsurers and ISO 27001 certified security." },
            ].map((v, i) => (
              <div key={i} className="card-soft p-7">
                <div className="w-14 h-14 rounded-2xl bg-lime/30 flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-ink" />
                </div>
                <h3 className="font-display text-xl mb-2">{v.title}</h3>
                <p className="text-sm text-ink/65 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />
    </div>
  );
}
