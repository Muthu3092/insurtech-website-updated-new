import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Shields" },
    { to: "/pricing", label: "Pricing" },
    { to: "/team", label: "Team" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`} data-testid="site-header">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" data-testid="logo-link">
          <div className="w-10 h-10 rounded-2xl bg-ink flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-lime font-display text-2xl font-semibold leading-none">a</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl font-semibold text-ink">afinity<span className="text-lime">.</span></div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-ink/60 -mt-0.5">InsurTech · AI</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 bg-white/40 backdrop-blur-md border border-ink/5 rounded-full px-2 py-1.5">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  isActive ? "bg-ink text-cream" : "text-ink/80 hover:text-ink hover:bg-white"
                }`
              }
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+60123456789"
            data-testid="header-phone"
            className="flex items-center gap-2 text-sm font-medium text-ink/80 hover:text-ink transition"
          >
            <span className="w-9 h-9 rounded-full bg-lime/30 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </span>
            <span>
              <span className="block text-[10px] uppercase tracking-widest text-ink/50">Aura support</span>
              <span className="block">+60 12 345 6789</span>
            </span>
          </a>
          <Link to="/contact" className="btn-covar" data-testid="cta-quote">
            Free Quote
            <span className="btn-icon">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <button
          className="lg:hidden w-11 h-11 rounded-full bg-ink text-cream flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[72px] mx-4 rounded-3xl bg-cream border border-ink/10 overflow-hidden transition-all duration-500 ${
          open ? "max-h-[80vh] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl font-display text-2xl ${
                  isActive ? "bg-ink text-cream" : "text-ink hover:bg-white"
                }`
              }
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-covar mt-4 justify-center">
            Free Quote
            <span className="btn-icon">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
