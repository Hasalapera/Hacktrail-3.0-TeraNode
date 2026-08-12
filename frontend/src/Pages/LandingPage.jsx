import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
} from "lucide-react";
import Logo from "../Components/Logo";
import Footer from "../Components/Footer";
import Reveal from "../Components/Reveal";
import landingHero from "../assets/landingpage.png";

// Applied alongside animate-fade-up so content stays visible (rather than
// stuck invisible) for users who've asked the OS to reduce motion.
const FADE_UP = "animate-fade-up motion-reduce:animate-none motion-reduce:opacity-100";

// Same-page anchors. "Home" isn't here — it's a real Link to "/" below, so
// it always returns to a clean URL instead of leaving a "#section" hash
// that can strand a returning visitor mid-page instead of on the hero.
const NAV_LINKS = [
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
      {/* ── Top nav ── */}
      <header id="top" className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
        <Link to="/">
          <Logo iconClassName="h-9 w-9" textClassName="text-lg" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-text-sub transition hover:text-primary"
          >
            Home
          </Link>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-text-sub transition hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-text-sub transition hover:text-primary"
          >
            Sign in
          </Link>
          <Link
            to="/login"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-mid"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 overflow-hidden px-6 py-12 lg:grid-cols-2 lg:py-20">
        <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 animate-float rounded-full bg-accent/15 blur-3xl motion-reduce:animate-none" />
        <div
          className="pointer-events-none absolute -bottom-24 left-1/3 -z-10 h-72 w-72 animate-float rounded-full bg-primary/5 blur-3xl [animation-delay:1.5s] motion-reduce:animate-none"
        />

        <div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-soft/80 px-3 py-1 text-xs font-semibold text-primary-mid ${FADE_UP}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Built for Sri Lankan university students
          </span>

          <h1
            className={`mt-5 text-4xl font-extrabold leading-tight tracking-tight text-text-main sm:text-5xl ${FADE_UP} [animation-delay:100ms]`}
          >
            Where ambitious students meet{" "}
            <span className="text-primary-mid">real opportunities.</span>
          </h1>

          <p
            className={`mt-5 max-w-lg text-base leading-relaxed text-text-sub ${FADE_UP} [animation-delay:200ms]`}
          >
            UniLift connects students with companies, retailers, and freelance clients —
            internships, part-time jobs, and freelance gigs, all in one place.
          </p>

          <div className={`mt-8 flex flex-wrap items-center gap-3 ${FADE_UP} [animation-delay:300ms]`}>
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-mid"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/student/home"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text-main transition hover:border-primary hover:text-primary"
            >
              Browse Opportunities
            </Link>
          </div>

          <div className={`mt-10 flex items-center gap-4 ${FADE_UP} [animation-delay:400ms]`}>
            <div className="flex">
              {AVATAR_STACK.map((c, i) => (
                <div
                  key={c}
                  className={`h-9 w-9 rounded-full border-2 border-white ${c} ${i > 0 ? "-ml-2.5" : ""}`}
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-main">Trusted by 128,000+ Students</p>
              <div className="flex items-center gap-1 text-xs text-text-sub">
                <span className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </span>
                4.9 (2,400+ Reviews)
              </div>
            </div>
          </div>
        </div>

        <div className={`relative ${FADE_UP} [animation-delay:150ms]`}>
          <div className="pointer-events-none absolute -inset-x-8 -inset-y-12 -z-10 rounded-[40%] bg-gradient-to-br from-accent/30 via-accent-soft/60 to-transparent blur-3xl" />
          <img
            src={landingHero}
            alt="A company team reviewing analytics on screen, blending into a student in a graduation cap and gown"
            className="w-full rounded-2xl object-cover shadow-[0_25px_70px_-15px_rgba(15,23,42,0.35)]"
          />
        </div>
      </section>

      {/* ── Audience picker ── */}
      <section id="audiences" className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-text-main sm:text-3xl">
              Built for everyone in the opportunity economy
            </h2>
            <p className="mt-2 text-sm text-text-sub">
              Whichever side you're on, UniLift has a path for you.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map(({ icon: Icon, title, description, cta, to }, index) => (
              <Reveal key={title} delay={index * 80}>
                <div className="flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-sm transition hover:border-primary-light hover:shadow-[0_12px_30px_-10px_rgba(11,77,46,0.25)]">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-accent-border bg-accent-soft text-primary-mid">
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 100}>
              <div className="flex flex-col items-start">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-base font-bold text-text-main">{title}</h3>
                <p className="text-sm leading-relaxed text-text-sub">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <Reveal>
          <div className="relative flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-border bg-surface px-8 py-12 text-center shadow-sm">
            <div className="pointer-events-none absolute -right-16 -top-16 z-0 h-56 w-56 animate-float rounded-full bg-accent/15 blur-3xl motion-reduce:animate-none" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 z-0 h-56 w-56 animate-float rounded-full bg-primary/10 blur-3xl [animation-delay:2s] motion-reduce:animate-none" />
            <h2 className="relative z-10 text-2xl font-extrabold tracking-tight text-text-main sm:text-3xl">
              Ready to get started?
            </h2>
            <p className="relative z-10 max-w-md text-sm text-text-sub">
              Join UniLift today — it's free, and takes less than a minute.
            </p>
            <Link
              to="/login"
              className="relative z-10 flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-mid"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
