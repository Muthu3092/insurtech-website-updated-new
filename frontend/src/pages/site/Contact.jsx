import React from "react";
import { Mail, MapPin, Phone, Send, ArrowUpRight, AlertCircle, CheckCircle2 } from "lucide-react";
import PageHero from "../../components/site/PageHero";
import Marquee from "../../components/site/Marquee";
import { endpoints, auth } from "../../lib/apiClient";

export default function Contact() {
  const [status, setStatus] = React.useState({ state: "idle", message: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    const fd = new FormData(e.target);
    const first = fd.get("first")?.toString().trim() || "";
    const last = fd.get("last")?.toString().trim() || "";
    const phone = fd.get("phone")?.toString().trim() || "";
    const email = fd.get("email")?.toString().trim() || "";
    const message = fd.get("message")?.toString().trim() || "";

    // Use signup endpoint to capture lead in CRM. Auto-generate a temp password
    // so the visitor becomes a customer in the backend's lead pipeline.
    const tempPassword =
      "Aura" + Math.random().toString(36).slice(-8) + "!" + Date.now().toString().slice(-3);

    try {
      const res = await endpoints.signup({
        email,
        phone,
        full_name: `${first} ${last}`.trim() || email,
        password: tempPassword,
        role: "customer",
      });
      auth.setSession(res.data.token, res.data.user);
      setStatus({
        state: "success",
        message:
          message
            ? "Thanks — we received your message. Aura will follow up by email shortly."
            : "Thanks — your account is ready. Aura will be in touch shortly.",
      });
      e.target.reset();
    } catch (err) {
      const detail = err?.response?.data?.detail;
      const msg =
        typeof detail === "string"
          ? detail
          : err?.message?.includes("Network")
          ? "Couldn't reach the server. Please check your connection and try again."
          : "We couldn't send your message. Please try again or call us.";
      setStatus({ state: "error", message: msg });
    }
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
              <button
                className="btn-covar w-full justify-center"
                onClick={() => window.dispatchEvent(new Event("aura:open"))}
                data-testid="open-aura-chat"
              >
                Chat with Aura <span className="btn-icon"><ArrowUpRight className="w-4 h-4" /></span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={onSubmit} className="card-soft p-8 md:p-10" data-testid="contact-form">
              <h2 className="font-display text-3xl mb-2">Send us a message</h2>
              <p className="text-ink/65 text-sm mb-8">
                We'll create your free Aura profile and one of our advisors will follow up within an hour.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {[
                  { name: "first", label: "First Name *", type: "text", required: true },
                  { name: "last", label: "Last Name *", type: "text", required: true },
                  { name: "phone", label: "Phone Number *", type: "tel", required: true },
                  { name: "email", label: "Email Address *", type: "email", required: true },
                ].map((f) => (
                  <label key={f.name} className="block">
                    <span className="block text-xs uppercase tracking-widest text-ink/60 mb-2">{f.label}</span>
                    <input
                      type={f.type}
                      name={f.name}
                      required={f.required}
                      data-testid={`form-${f.name}`}
                      className="w-full px-5 py-4 rounded-2xl border border-ink/15 bg-cream/50 focus:border-ink focus:bg-white outline-none transition"
                    />
                  </label>
                ))}
              </div>

              <label className="block mb-6">
                <span className="block text-xs uppercase tracking-widest text-ink/60 mb-2">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  data-testid="form-message"
                  className="w-full px-5 py-4 rounded-2xl border border-ink/15 bg-cream/50 focus:border-ink focus:bg-white outline-none transition resize-none"
                  placeholder="Tell us how we can help..."
                />
              </label>

              {status.state === "success" && (
                <div className="mb-5 flex items-start gap-3 p-4 rounded-2xl bg-lime/30 border border-lime" data-testid="form-success">
                  <CheckCircle2 className="w-5 h-5 text-ink shrink-0 mt-0.5" />
                  <p className="text-sm text-ink/85">{status.message}</p>
                </div>
              )}
              {status.state === "error" && (
                <div className="mb-5 flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200" data-testid="form-error">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{status.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status.state === "loading"}
                className="btn-covar dark disabled:opacity-60"
                data-testid="form-submit"
              >
                {status.state === "loading" ? "Sending…" : "Submit Message"}
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
