import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  LogIn,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
} from "lucide-react";
import Logo from "../Components/Logo";
import Footer from "../Components/Footer";
import landingHero from "../assets/landingpage.png";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Opportunities", href: "#audiences" },
  { label: "Features", href: "#features" },
];

const AVATAR_STACK = ["bg-blue-500", "bg-emerald-500", "bg-amber-500"];

const AUDIENCES = [
  {
    icon: GraduationCap,
    title: "Students",
    description: "Find internships, part-time jobs, and freelance gigs that fit around your studies.",
    cta: "Browse as a student",
    to: "/student/home",
  },
  {
    icon: Building2,
    title: "Companies",
    description: "Post internships and projects, and tap into Sri Lanka's largest pool of student talent.",
    cta: "Post a job",
    to: "/register/company",
  },
  {
    icon: Store,
    title: "Retailers",
    description: "Hire reliable students for part-time and flexible shifts at your store.",
    cta: "List your shop",
    to: "/register/retailer",
  },
  {
    icon: Briefcase,
    title: "Freelance Clients",
    description: "Hire student freelancers for design, video editing, typing, and more.",
    cta: "Post a request",
    to: "/student/freelance",
  },
];

const FEATURES = [
  {
    icon: Rocket,
    title: "Internships & Corporate Projects",
    description: "Match with top companies by skill and degree.",
  },
  {
    icon: Sparkles,
    title: "Part-Time & Flexible Jobs",
    description: "Find nearby gigs posted by local retailers.",
  },
  {
    icon: ShieldCheck,
    title: "Freelance Marketplace",
    description: "Earn from design, dev, video editing, and more.",
  },
];

/**
 * LandingPage
 * -----------
 * Public marketing home — hero, audience picker (student/company/retailer/
 * freelance client), feature highlights, footer. Reached at "/"; every CTA
 * routes into the existing login/register/browse flows.
 */
export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* ── Nav + Hero (dark, full-bleed) ── */}
      <div id="top" className="relative overflow-hidden bg-primary">
        <img
          src={landingHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />

        <div className="relative">
          <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
            <Logo iconClassName="h-9 w-9" textClassName="text-lg" variant="light" />

            <nav className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-xs font-semibold uppercase tracking-widest text-white/70 transition hover:text-white"
                >
                  {label}
                </a>
              ))}
            </nav>

            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary transition hover:bg-[#E4C158]"
            >
              <LogIn className="h-3.5 w-3.5" />
              Sign In
            </Link>
          </header>

          <section className="mx-auto max-w-6xl px-6 pb-24 pt-8 sm:pb-32">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              Direct From Colombo · Sri Lanka
            </span>

            <h1
              className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.1] text-white sm:text-6xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Where Ambitious Students
              <br />
              Meet{" "}
              <span className="italic text-[#D4AF37]">Real Opportunities.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60">
              UniLift connects students with companies, retailers, and freelance clients —
              internships, part-time jobs, and freelance gigs, all in one place.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-md bg-[#D4AF37] px-8 py-4 text-xs font-bold uppercase tracking-widest text-primary transition hover:bg-[#E4C158]"
              >
                Get Started Free
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/student/home"
                className="rounded-md border border-white/25 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:border-white hover:bg-white/5"
              >
                Browse Opportunities
              </Link>
            </div>

            <div className="mt-14 flex items-center gap-4">
              <div className="flex">
                {AVATAR_STACK.map((c, i) => (
                  <div
                    key={c}
                    className={`h-9 w-9 rounded-full border-2 border-primary ${c} ${i > 0 ? "-ml-2.5" : ""}`}
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Trusted by 128,000+ Students</p>
                <div className="flex items-center gap-1 text-xs text-white/60">
                  <span className="flex text-[#D4AF37]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </span>
                  4.9 (2,400+ Reviews)
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── Audience picker ── */}
      <section id="audiences" className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-text-main sm:text-3xl">
              Built for everyone in the opportunity economy
            </h2>
            <p className="mt-2 text-sm text-text-sub">
              Whichever side you're on, UniLift has a path for you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map(({ icon: Icon, title, description, cta, to }) => (
              <div
                key={title}
                className="flex flex-col rounded-xl border border-border bg-white p-6 shadow-sm transition hover:border-primary-light hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-primary-mid">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-base font-bold text-text-main">{title}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-text-sub">{description}</p>
                <Link
                  to={to}
                  className="flex items-center gap-1 text-sm font-semibold text-primary-mid transition hover:text-primary"
                >
                  {cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-start">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1.5 text-base font-bold text-text-main">{title}</h3>
              <p className="text-sm leading-relaxed text-text-sub">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-primary to-primary-mid px-8 py-12 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="max-w-md text-sm text-white/70">
            Join UniLift today — it's free, and takes less than a minute.
          </p>
          <Link
            to="/login"
            className="flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-accent-soft"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
