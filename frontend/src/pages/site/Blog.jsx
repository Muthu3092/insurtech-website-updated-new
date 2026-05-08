import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../../components/site/PageHero";
import Marquee from "../../components/site/Marquee";

const POSTS = [
  { title: "How Afinity.AI settles 73% of travel claims in under two minutes", date: "12 Jan 2026", cat: "AI", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80" },
  { title: "5 health insurance mistakes that cost Malaysians thousands", date: "08 Jan 2026", cat: "Guides", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900&q=80" },
  { title: "Why CRM-first insurtech wins the next decade", date: "02 Jan 2026", cat: "Insights", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80" },
  { title: "Travel cover vs. credit-card cover: what really pays out", date: "28 Dec 2025", cat: "Guides", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80" },
  { title: "Inside Afinity.AI: how we score fraud in 90 milliseconds", date: "20 Dec 2025", cat: "AI", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80" },
  { title: "Personal accident cover for outdoor enthusiasts", date: "14 Dec 2025", cat: "Guides", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=80" },
];

export default function Blog() {
  return (
    <div data-testid="blog-page">
      <PageHero
        eyebrow="Blog"
        title="Latest news, guides and insurance insights"
        italicWords={["insurance", "insights"]}
        crumbs={[{ label: "Blog" }]}
      />

      <section className="py-24 bg-cream">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map((b, i) => (
              <Link key={i} to="/blog/post" className="card-soft overflow-hidden flex flex-col group" data-testid={`blog-${i}`}>
                <div className="img-mask aspect-[4/3] rounded-none">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-7 flex-1 flex flex-col">
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
      </section>

      <Marquee />
    </div>
  );
}
