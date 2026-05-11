import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Phone, Menu, X, ArrowUpRight, LogOut, LayoutDashboard, FileText, Hammer } from "lucide-react";
import { useAuth } from "../../lib/auth";
import CurrencyPicker from "./CurrencyPicker";

export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const userMenuRef = React.useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    const onDoc = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onLogout = () => {
    logout?.();
    setUserMenuOpen(false);
    navigate("/");
  };

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

        <div className="hidden lg:flex items-center gap-3">
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

          <CurrencyPicker variant="light" />

          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                data-testid="user-menu-toggle"
                className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border border-ink/10 bg-white/60 backdrop-blur-md hover:bg-white transition"
              >
                <div className="w-8 h-8 rounded-full bg-ink text-lime flex items-center justify-center text-sm font-semibold">
                  {(user.full_name || user.email || "U")[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-medium text-ink">
                  {user.full_name?.split(" ")[0] || "Account"}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-2xl border border-ink/10 bg-white shadow-xl py-2">
                  <div className="px-4 py-2 border-b border-ink/5">
                    <div className="text-sm font-semibold truncate">{user.full_name}</div>
                    <div className="text-xs text-ink/55 truncate">{user.email}</div>
                  </div>
                  {[
                    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
                    { to: "/policies",  label: "My Policies", icon: FileText },
                    { to: "/claims",    label: "Claims", icon: Hammer },
                  ].map(({ to, label, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-cream transition"
                    >
                      <Icon className="w-4 h-4 text-ink/60" /> {label}
                    </Link>
                  ))}
                  <button
                    onClick={onLogout}
                    data-testid="user-menu-logout"
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition border-t border-ink/5 mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/contact" className="btn-covar" data-testid="cta-quote">
              Free Quote
              <span className="btn-icon">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          )}
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
          <div className="mt-4 px-2"><CurrencyPicker variant="light" /></div>
          {user ? (
            <button
              onClick={onLogout}
              data-testid="mobile-logout"
              className="btn-covar dark mt-2 justify-center"
            >
              Log out <span className="btn-icon"><LogOut className="w-4 h-4" /></span>
            </button>
          ) : (
            <Link to="/contact" className="btn-covar mt-2 justify-center">
              Free Quote
              <span className="btn-icon">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
