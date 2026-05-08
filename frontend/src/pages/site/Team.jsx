import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../../components/site/PageHero";
import Marquee from "../../components/site/Marquee";

const TEAM = [
  { name: "Sarah Thompson", role: "Head of Customer Afinity.AI", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80" },
  { name: "Michael Anderson", role: "Senior Insurance Advisor", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" },
  { name: "David Martinez", role: "AI Risk Architect", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
  { name: "Aishah Rahim", role: "Underwriting Lead", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" },
  { name: "Wei Liang Tan", role: "Claims Operations", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80" },
  { name: "Priya Nair", role: "Afinity.AI ML Engineer", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80" },
];

export default function Team() {
  return (
    <div data-testid="team-page">
      <PageHero
        eyebrow="Our Team"
        title="The people behind your peace of mind"
        italicWords={["peace", "of", "mind"]}
        crumbs={[{ label: "Team" }]}
      />

      <section className="py-24 bg-cream">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((t) => (
              <Link key={t.name} to="/contact" className="group" data-testid={`team-card-${t.name.split(" ")[0].toLowerCase()}`}>
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
      </section>

      <Marquee />
    </div>
  );
}
