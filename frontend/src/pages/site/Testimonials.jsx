import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Quote, Star } from "lucide-react";
import PageHero from "../../components/site/PageHero";
import Marquee from "../../components/site/Marquee";

const T = [
  { tag: "Travel", quote: "Aura settled my flight-delay claim from KLIA in 90 seconds. I had the refund before my Uber arrived. Genuinely magical.", name: "Aishah R.", role: "Frequent Flyer · KL" },
  { tag: "Motor", quote: "After a fender-bender, the FNOL bot gathered photos and witness info instantly. Settlement next morning. Old insurers can't compete.", name: "David Wong", role: "Motor Claim · Penang" },
  { tag: "Health", quote: "Cashless admission was seamless and the dashboard tracked every benefit clearly. Zero paperwork. I'd recommend to any new parent.", name: "Priya M.", role: "New Parent · Subang" },
  { tag: "PA", quote: "Aura recommended a PA add-on I hadn't considered. Six months later, it covered a hiking accident in Sabah. Lifesaver.", name: "Marcus L.", role: "Outdoor Enthusiast" },
  { tag: "Home", quote: "After a flash flood, restoration was arranged within 48 hours. The whole process felt designed for actual humans.", name: "Lina T.", role: "Homeowner · Ipoh" },
  { tag: "Business", quote: "My SME bundle covers cyber, public liability and motor in one dashboard. The CRM features alone justify the price.", name: "Faiz Ismail", role: "F&B Owner" },
];

export default function Testimonials() {
  return (
    <div data-testid="testimonials-page">
      <PageHero
        eyebrow="Testimonials"
        title="What our clients say about their experience"
        italicWords={["their", "experience"]}
        crumbs={[{ label: "Testimonials" }]}
      />

      <section className="py-24 bg-cream">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {T.map((t, i) => (
              <div key={i} className="card-soft p-8" data-testid={`testimonial-${i}`}>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs uppercase tracking-widest font-semibold bg-lime/30 px-3 py-1 rounded-full">{t.tag}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, k) => <Star key={k} className="w-4 h-4 fill-lime text-lime" />)}
                  </div>
                </div>
                <Quote className="w-7 h-7 text-ink/30 mb-4" />
                <p className="text-ink/80 leading-relaxed font-display text-xl mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-ink/10">
                  <div className="w-12 h-12 rounded-full bg-ink text-lime flex items-center justify-center font-display text-xl font-semibold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-ink/55">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />
    </div>
  );
}
