import React from "react";
import { Mail, MapPin, Phone, Send, ArrowUpRight } from "lucide-react";
import PageHero from "../../components/site/PageHero";
import Marquee from "../../components/site/Marquee";

export default function Contact() {
  const [sent, setSent] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    e.target.reset();
  };

  return (
    <div data-testid="contact-page">
      <PageHero
        eyebrow="Contact Us"
        title="Connect with us for reliable insurance support"
        italicWords={["reliable", "support"]}
        crumbs={[{ label: "Contact" }]}
      />

      <section className="py-24 bg-cream">
        <div className="container grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-5">
            {[
              { icon: MapPin, title: "Our Location", text: "Level 12, Menara KL, Jalan Punchak, 50250 Kuala Lumpur, Malaysia" },
              { icon: Phone, title: "Phone", text: "+60 12 345 6789", href: "tel:+60123456789" },
              { icon: Mail, title: "Email", text: "hello@afinity.ai", href: "mailto:hello@afinity.ai" },
            ].map((c) => (
              <div key={c.title} className="card-soft p-7 flex gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-lime/30 flex items-center justify-center">
                  <c.icon className="w-6 h-6 text-ink" />
                </div>
                <div>
                  <h3 className="font-display text-xl mb-1">{c.title}</h3>
                  {c.href ? (
                    <a href={c.href} className="text-ink/70 hover:text-ink">{c.text}</a>
                  ) : (
                    <p className="text-ink/70">{c.text}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="card-soft p-7 bg-ink text-cream">
              <h3 className="font-display text-2xl mb-2">Aura is online 24/7</h3>
              <p className="text-cream/70 text-sm mb-5">Need an answer right now? Aura our AI copilot replies instantly via chat or voice.</p>
              <button className="btn-covar w-full justify-center">
                Chat with Aura <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="card-soft p-8 md:p-10" data-testid="contact-form">
              <h2 className="font-display text-3xl mb-2">Send us a message</h2>
              <p className="text-ink/65 text-sm mb-8">We typically reply within an hour during business hours.</p>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {[
                  { name: "first", label: "First Name *", type: "text" },
                  { name: "last", label: "Last Name *", type: "text" },
                  { name: "phone", label: "Phone Number *", type: "tel" },
                  { name: "email", label: "Email Address *", type: "email" },
                ].map((f) => (
                  <label key={f.name} className="block">
                    <span className="block text-xs uppercase tracking-widest text-ink/60 mb-2">{f.label}</span>
                    <input
                      type={f.type}
                      required
                      data-testid={`form-${f.name}`}
                      className="w-full px-5 py-4 rounded-2xl border border-ink/15 bg-cream/50 focus:border-ink focus:bg-white outline-none transition"
                    />
                  </label>
                ))}
              </div>

              <label className="block mb-6">
                <span className="block text-xs uppercase tracking-widest text-ink/60 mb-2">Message</span>
                <textarea
                  rows={5}
                  data-testid="form-message"
                  className="w-full px-5 py-4 rounded-2xl border border-ink/15 bg-cream/50 focus:border-ink focus:bg-white outline-none transition resize-none"
                  placeholder="Tell us how we can help..."
                />
              </label>

              <button type="submit" className="btn-covar dark" data-testid="form-submit">
                {sent ? "Message Sent ✓" : "Submit Message"}
                <span className="btn-icon"><Send className="w-4 h-4" /></span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Marquee />
    </div>
  );
}
