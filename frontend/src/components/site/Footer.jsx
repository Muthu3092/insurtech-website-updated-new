import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Marquee from "./Marquee";

export default function Footer() {
  return (
    <footer className="bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-cream relative overflow-hidden" data-testid="site-footer">
      <Marquee variant="dark" />

      <div className="container py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-40 sm:w-48 md:w-56 lg:w-40 h-16 sm:h-20 md:h-24 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
    
    <img
      src="/logo.png"
      alt="Logo"
      className="w-full h-full object-contain"
    />

  </div>
              {/* <div>
                <div className="font-display text-3xl font-semibold">afinity<span className="text-lime">.</span></div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-cream/50">InsurTech · AI</div>
              </div> */}
            </div>
            <p className="text-cream/70 max-w-md leading-relaxed mb-8">
              Premium protection for your peace of mind. One platform, four shields,
              powered by Afinity AI — from quote to claim in minutes, not weeks.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`social-link-${i}`}
                  className="w-11 h-11 rounded-full border border-cream/15 flex items-center justify-center text-cream/70 hover:bg-lime hover:text-ink hover:border-lime transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              {[
                ["About", "/about"],
                ["Shields", "/services"],
                ["Pricing", "/pricing"],
                // ["Team", "/team"],
                // ["Blog", "/blog"],
                ["Contact", "/contact"],
              ].map(([t, h]) => (
                <li key={h}>
                  <Link to={h} className="hover:text-lime transition flex items-center gap-1.5 group">
                    <ArrowUpRight className="w-3.5 h-3.5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition" />
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-lg mb-5">Shields</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              {[
                ["Travel", "/services/travel"],
                ["Health", "/services/health"],
                ["Motor", "/services/motor"],
                ["Personal Accident", "/services/pa"],
                ["Home", "/services/home"],
              ].map(([t, h]) => (
                <li key={h}>
                  <Link to={h} className="hover:text-lime transition">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-lg mb-5">Contact</h4>
            <ul className="space-y-4 text-sm text-cream/70">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-lime shrink-0" />
                <span>A-G-13A & A-01-13A, Block A,
Merchant Square, No.1,
Jalan Tropicana Selatan 1, PJU 3,
47410 Petaling Jaya,
Selangor Darul Ehsan, Malaysia

</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-lime shrink-0" />
                <a href="tel:+6018 377 0888" className="hover:text-lime">+6018 377 0888</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-lime shrink-0" />
                <a href="mailto:hello@afinity.ai" className="hover:text-lime">hello@afinity.ai</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/50">
          <div>© {new Date().getFullYear()} afinity.ai · Afinity AI · All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-lime">Privacy</a>
            <a href="#" className="hover:text-lime">Terms</a>
            <a href="#" className="hover:text-lime">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
