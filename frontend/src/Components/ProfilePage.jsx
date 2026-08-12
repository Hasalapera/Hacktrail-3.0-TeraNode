import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  Camera,
  Eye,
  ExternalLink,
  LayoutGrid,
  MapPin,
  MessageSquare,
  Pencil,
  PlayCircle,
  Plus,
  Share2,
  Briefcase,
} from "lucide-react";

const CHECKLIST_ICONS = { Briefcase, PlayCircle, Award };

/**
 * ProfilePage
 * -----------
 * Fiverr-style seller/business profile view — avatar, name, description,
 * About/Portfolio/Intro-video cards, and a "Profile Strength" + Quick Links
 * sidebar. Shared by the retail, company, and freelancer profile pages;
 * only the copy and links differ. Read-only mock — edit icons and the
 * portfolio/video buttons are placeholders until a backend exists.
 */
export default function ProfilePage({
  name,
  username,
  avatarGradient,
  location,
  languages,
  about,
  portfolioBlurb,
  introBlurb,
  strength,
  quickLinks,
  backHref,
  showPortfolio = true,
  showIntroVideo = true,
  showStrength = true,
  showQuickLinks = true,
  extraNav,
}) {
  const checklist = [
    { icon: "Briefcase", label: "Showcase portfolio" },
    { icon: "PlayCircle", label: "Create an intro video" },
    { icon: "Award", label: "List experience" },
  ];

  const hasSidebar = showStrength || showQuickLinks;

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Link
        to={backHref}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-text-sub transition hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {extraNav}

      <div className={`grid grid-cols-1 gap-6 ${hasSidebar ? "lg:grid-cols-[1fr_320px]" : ""}`}>
        <div className="flex flex-col gap-6">
          {/* ── Identity row ── */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="relative shrink-0">
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white ${avatarGradient}`}
                >
                  {name.charAt(0)}
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-white text-text-sub">
                  <Camera className="h-3.5 w-3.5" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-text-main">{name}</h1>
                  <Pencil className="h-4 w-4 text-text-muted" />
                </div>
                <p className="text-sm text-text-muted">@{username}</p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm font-semibold text-text-main">Description</span>
                  <Pencil className="h-3.5 w-3.5 text-text-muted" />
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-text-sub">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-text-muted" />
                    {location}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-text-muted" />
                    <span className="underline decoration-border underline-offset-2">{languages}</span>
                    <Pencil className="h-3.5 w-3.5 text-text-muted" />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-sub transition hover:bg-surface"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-sub transition hover:bg-surface"
              >
                <Eye className="h-4 w-4" />
                Preview
              </button>
            </div>
          </div>

          {/* ── About ── */}
          <section className="rounded-xl border border-border p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-text-main">About</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-text-sub">{about}</p>
          </section>

          {/* ── Portfolio ── */}
          {showPortfolio && (
            <section className="flex items-center justify-between gap-6 rounded-xl border border-border p-6 shadow-sm">
              <div>
                <h2 className="mb-1 text-lg font-bold text-text-main">Portfolio of past projects</h2>
                <p className="mb-4 text-sm text-text-sub">{portfolioBlurb}</p>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-sub transition hover:bg-surface"
                >
                  <ExternalLink className="h-4 w-4" />
                  Start portfolio
                </button>
              </div>
              <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-surface sm:flex">
                <LayoutGrid className="h-8 w-8 text-text-muted" />
              </div>
            </section>
          )}

          {/* ── Intro video ── */}
          {showIntroVideo && (
            <section className="flex items-center justify-between gap-6 rounded-xl border border-border p-6 shadow-sm">
              <div>
                <h2 className="mb-1 text-lg font-bold text-text-main">Intro video</h2>
                <p className="mb-4 text-sm text-text-sub">{introBlurb}</p>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-sub transition hover:bg-surface"
                >
                  <Plus className="h-4 w-4" />
                  Add intro video
                </button>
              </div>
              <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-surface sm:flex">
                <PlayCircle className="h-8 w-8 text-text-muted" />
              </div>
            </section>
          )}
        </div>

        {/* ── Sidebar ── */}
        {hasSidebar && (
          <aside className="flex flex-col gap-6">
            {showStrength && (
              <section className="rounded-xl border border-border p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-text-main">Profile Strength</h2>
                  <span className="text-lg font-bold text-text-main">
                    {strength}
                    <span className="text-sm font-normal text-text-muted">/12</span>
                  </span>
                </div>
                <p className="mt-2 text-xs text-text-sub">
                  A strong profile helps you stand out and attract better opportunities.
                </p>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(strength / 12) * 100}%` }}
                  />
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  {checklist.map(({ icon, label }) => {
                    const Icon = CHECKLIST_ICONS[icon];
                    return (
                      <button
                        key={label}
                        type="button"
                        className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-left text-sm font-medium text-text-main transition hover:bg-surface"
                      >
                        <Icon className="h-4 w-4 text-text-sub" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {showQuickLinks && (
              <section className="rounded-xl border border-border p-5 shadow-sm">
                <h2 className="mb-3 text-base font-bold text-text-main">Quick Links</h2>
                <div className="flex flex-col gap-1">
                  {quickLinks.map(({ icon: Icon, label, to }) => (
                    <Link
                      key={label}
                      to={to}
                      className="flex items-center gap-2.5 rounded-lg px-1 py-1.5 text-sm font-medium text-text-main transition hover:text-primary"
                    >
                      <Icon className="h-4 w-4 text-text-sub" />
                      {label}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
