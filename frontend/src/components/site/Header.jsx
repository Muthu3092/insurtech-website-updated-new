import React from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "@/lib/auth";

import {
  Phone,
  Menu,
  X,
  ArrowUpRight,
  LayoutDashboard,
  FileText,
  Hammer,
  LogOut,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const location = useLocation();
  const nav = useNavigate();

  const { user, logout } = useAuth();

  React.useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > 30);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Shields" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`site-header ${
        scrolled ? "scrolled" : ""
      }`}
      data-testid="site-header"
    >
      <div className="container flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-testid="logo-link"
        >
          <div className="w-40 sm:w-48 md:w-56 lg:w-40 h-16 sm:h-20 md:h-24 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">

            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />

          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/40 backdrop-blur-md border border-ink/5 rounded-full px-2 py-1.5">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  isActive
                    ? "bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-[#D6BC7E] text-cream"
                    : "text-ink/80 hover:text-ink hover:bg-white"
                }`
              }
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-4">

          {/* PHONE */}
          <a
            href="tel:++6018 377 0888"
            data-testid="header-phone"
            className="flex items-center gap-2 text-sm font-medium text-ink/80 hover:text-ink transition"
          >
            <span className="w-9 h-9 rounded-full bg-lime/30 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </span>

            <span>
              <span className="block text-[10px] uppercase tracking-widest text-ink/50">
                Afinity AI support
              </span>

              <span className="block">
                +60 18 377 0888
              </span>
            </span>
          </a>

          {/* AUTH */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="hidden sm:block"
              >
                <button className="btn-covar">
                  Login

                  <span className="btn-icon">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </Link>
            </>
          ) : (
            <div className="hidden sm:block">
              <DropdownMenu>

                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 border rounded-full px-3 py-2 bg-white">

                    <div className="w-8 h-8 bg-[#DEB25E] text-black rounded-full flex items-center justify-center text-sm font-semibold">
                      {user.full_name?.[0] || "U"}
                    </div>

                    <span className="text-sm font-medium">
                      {user.full_name?.split(" ")[0]}
                    </span>

                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">

                  <DropdownMenuItem
                    onClick={() => nav("/dashboard")}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => nav("/policies")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Policies
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => nav("/claims")}
                  >
                    <Hammer className="w-4 h-4 mr-2" />
                    Claims
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      nav("/");
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>

                </DropdownMenuContent>

              </DropdownMenu>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden w-11 h-11 rounded-full bg-ink text-cream flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {/* MOBILE DRAWER */}
<div
  className={`lg:hidden fixed inset-x-0 top-[72px] mx-4 rounded-3xl bg-cream border border-ink/10 overflow-hidden transition-all duration-500 ${
    open
      ? "max-h-[95vh] opacity-100 mt-2 overflow-y-auto"
      : "max-h-0 opacity-0"
  }`}
>
  <div className="p-6 pb-24 flex flex-col gap-1">

    {/* NAV LINKS */}
    {links.map((l) => (
      <NavLink
        key={l.to}
        to={l.to}
        className={({ isActive }) =>
          `px-4 py-3 rounded-xl font-display text-2xl ${
            isActive
              ? "bg-[linear-gradient(145deg,#444444,#3D3C3C_40%,#383838)] text-[#D6BC7E]"
              : "text-ink hover:bg-white"
          }`
        }
        end={l.to === "/"}
      >
        {l.label}
      </NavLink>
    ))}

    {/* MOBILE AUTH */}
    {!user ? (

      <div className="mt-4">
        <Link
          to="/login"
          className="btn-covar justify-center w-full flex"
        >
          Login

          <span className="btn-icon">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

    ) : (

      <div className="mt-6 border-t border-gray-200 pt-5">

        {/* USER INFO */}
        <div className="flex items-center gap-3 px-2 mb-4">

          <div className="w-11 h-11 bg-[#DEB25E] text-black rounded-full flex items-center justify-center text-lg font-semibold">
            {user.full_name?.[0] || "U"}
          </div>

          <div>
            <div className="text-sm text-gray-500">
              Logged in as
            </div>

            <div className="font-semibold text-black">
              {user.full_name}
            </div>
          </div>

        </div>

        {/* MENU ITEMS */}
        <div className="flex flex-col gap-2">

          <button
            onClick={() => {
              setOpen(false);
              nav("/dashboard");
            }}
            className="text-left px-4 py-3 rounded-xl hover:bg-white transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => {
              setOpen(false);
              nav("/policies");
            }}
            className="text-left px-4 py-3 rounded-xl hover:bg-white transition"
          >
            Policies
          </button>

          <button
            onClick={() => {
              setOpen(false);
              nav("/claims");
            }}
            className="text-left px-4 py-3 rounded-xl hover:bg-white transition"
          >
            Claims
          </button>

          {/* LOGOUT BUTTON */}
          <button
            onClick={() => {
              logout();
              nav("/");
            }}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white rounded-2xl py-3 font-medium transition"
          >
            Logout
          </button>

        </div>
      </div>

    )}

  </div>
</div>
    </header>
  );
}