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
}) {
  const checklist = [
    { icon: "Briefcase", label: "Showcase portfolio" },
    { icon: "PlayCircle", label: "Create an intro video" },
    { icon: "Award", label: "List experience" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Link
        to={backHref}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
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
                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500">
                  <Camera className="h-3.5 w-3.5" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                  <Pencil className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400">@{username}</p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">Description</span>
                  <Pencil className="h-3.5 w-3.5 text-gray-400" />
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {location}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <span className="underline decoration-gray-300 underline-offset-2">{languages}</span>
                    <Pencil className="h-3.5 w-3.5 text-gray-400" />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Eye className="h-4 w-4" />
                Preview
              </button>
            </div>
          </div>

          {/* ── About ── */}
          <section className="rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-gray-900">About</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">{about}</p>
          </section>

          {/* ── Portfolio ── */}
          <section className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 p-6 shadow-sm">
            <div>
              <h2 className="mb-1 text-lg font-bold text-gray-900">Portfolio of past projects</h2>
              <p className="mb-4 text-sm text-gray-500">{portfolioBlurb}</p>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <ExternalLink className="h-4 w-4" />
                Start portfolio
              </button>
            </div>
            <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-100 sm:flex">
              <LayoutGrid className="h-8 w-8 text-gray-300" />
            </div>
          </section>

          {/* ── Intro video ── */}
          <section className="flex items-center justify-between gap-6 rounded-xl border border-gray-200 p-6 shadow-sm">
            <div>
              <h2 className="mb-1 text-lg font-bold text-gray-900">Intro video</h2>
              <p className="mb-4 text-sm text-gray-500">{introBlurb}</p>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
                Add intro video
              </button>
            </div>
            <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-100 sm:flex">
              <PlayCircle className="h-8 w-8 text-gray-300" />
            </div>
          </section>
        </div>

        {/* ── Sidebar ── */}
        <aside className="flex flex-col gap-6">
          <section className="rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Profile Strength</h2>
              <span className="text-lg font-bold text-gray-900">
                {strength}
                <span className="text-sm font-normal text-gray-400">/12</span>
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              A strong profile helps you stand out and attract better opportunities.
            </p>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-900"
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
                    className="flex items-center gap-2.5 rounded-lg border border-gray-200 px-3 py-2.5 text-left text-sm font-medium text-gray-800 transition hover:bg-gray-50"
                  >
                    <Icon className="h-4 w-4 text-gray-500" />
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="mb-3 text-base font-bold text-gray-900">Quick Links</h2>
            <div className="flex flex-col gap-1">
              {quickLinks.map(({ icon: Icon, label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="flex items-center gap-2.5 rounded-lg px-1 py-1.5 text-sm font-medium text-gray-800 transition hover:text-indigo-600"
                >
                  <Icon className="h-4 w-4 text-gray-500" />
                  {label}
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
