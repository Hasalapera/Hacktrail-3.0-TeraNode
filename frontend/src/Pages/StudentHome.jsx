import { useState } from "react";
import Header from "../Components/Header";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";

/**
 * StudentHome
 * -----------
 * Student-side landing page, built from the hand-drawn wireframe:
 *   Header    -> logo, "Job"/"Company"/"Freelancer" category switch, profile icon
 *   FilterBar -> sub-filters for the active category
 *                  Company    -> Intern, Project
 *                  Freelancer -> Graphic Design, Video Editing, Typing
 *   Results   -> listings matching the active category + filter
 *   Footer    -> site footer
 *
 * Split into small components so each can be wired up independently
 * (search logic, auth, routing, data fetching) without touching the rest.
 */

// Header now lives in its own file: ../Components/Header.jsx (imported above)

// ---------------------------------------------------------------------------
// FilterBar: sub-filters for whichever category is active (e.g. "Intern",
// "Project" under Company). "All" is always available to clear the filter.
// ---------------------------------------------------------------------------
function FilterBar({ filters, activeFilter, onSelect }) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 px-6 pt-4">
      {["All", ...filters].map((filter) => {
        const isActive = filter === activeFilter;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onSelect(filter)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              isActive
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-gray-300 bg-white text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}

// ListingCard now lives in its own file: ../Components/ListingCard.jsx (imported above)

// ---------------------------------------------------------------------------
// ResultsList: listings for the active category, narrowed by activeFilter
// ---------------------------------------------------------------------------
function ResultsList({ listings, activeFilter }) {
  const filtered =
    activeFilter === "All"
      ? listings
      : listings.filter((listing) => listing.type === activeFilter);

  if (filtered.length === 0) {
    return (
      <p className="px-6 py-8 text-center text-sm text-gray-400">
        No listings found for this filter yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-6 py-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((listing) => (
        <ListingCard key={listing.title} listing={listing} />
      ))}
    </div>
  );
}

// Footer now lives in its own file: ./Footer.jsx (imported above)

// ---------------------------------------------------------------------------
// StudentHome: top-level page assembling all sections
// ---------------------------------------------------------------------------

// Sub-filters offered per top-level category, straight from the wireframe.
const FILTERS_BY_CATEGORY = {
  job: [],
  company: ["Intern", "Project"],
  freelancer: ["Graphic Design", "Video Editing", "Typing"],
};

// Sample listings per category. Swap for real data once the backend/API is
// wired up — shape stays { title, type, seller, isAd, badge, rating, reviews,
// price, image } where `type` matches a filter and `image` is a Tailwind
// gradient class standing in for a real thumbnail URL.
const LISTINGS_BY_CATEGORY = {
  job: [
    {
      title: "Junior Web Developer needed for a growing fintech startup",
      type: "Full-time",
      seller: "Nimal Perera",
      isAd: true,
      badge: "Vetted Pro",
      rating: 5.0,
      reviews: "1k+",
      price: 290,
      image: "bg-gradient-to-br from-slate-700 via-slate-500 to-emerald-600",
    },
    {
      title: "Remote React Native developer for a food delivery app",
      type: "Full-time",
      seller: "Ishara Fernando",
      isAd: false,
      badge: "Vetted Pro",
      rating: 4.9,
      reviews: "820",
      price: 450,
      image: "bg-gradient-to-br from-indigo-700 via-indigo-500 to-sky-500",
    },
  ],
  company: [
    {
      title: "Software Engineering Intern — 6 month placement",
      type: "Intern",
      seller: "TeraNode Labs",
      isAd: true,
      badge: "Vetted Pro",
      rating: 4.8,
      reviews: "312",
      price: 0,
      image: "bg-gradient-to-br from-purple-700 via-fuchsia-500 to-pink-500",
    },
    {
      title: "Marketing Intern for a campus ambassador program",
      type: "Intern",
      seller: "BrightWave Co.",
      isAd: false,
      badge: "",
      rating: 4.6,
      reviews: "97",
      price: 0,
      image: "bg-gradient-to-br from-amber-600 via-orange-500 to-rose-500",
    },
    {
      title: "Campus App Redesign — short-term project",
      type: "Project",
      seller: "PixelForge Studio",
      isAd: false,
      badge: "Vetted Pro",
      rating: 4.9,
      reviews: "540",
      price: 350,
      image: "bg-gradient-to-br from-cyan-700 via-teal-500 to-lime-500",
    },
  ],
  freelancer: [
    {
      title: "I will design a handcrafted 3d style logo with a premium finish",
      type: "Graphic Design",
      seller: "Kassou",
      isAd: true,
      badge: "Vetted Pro",
      rating: 5.0,
      reviews: "1k+",
      price: 290,
      image: "bg-gradient-to-br from-stone-700 via-stone-500 to-green-600",
    },
    {
      title: "I will edit a punchy highlight reel for your next event",
      type: "Video Editing",
      seller: "Ravindu Silva",
      isAd: false,
      badge: "Vetted Pro",
      rating: 4.9,
      reviews: "634",
      price: 120,
      image: "bg-gradient-to-br from-red-700 via-rose-500 to-orange-400",
    },
    {
      title: "I will transcribe your lecture notes accurately and fast",
      type: "Typing",
      seller: "Anusha Jayasuriya",
      isAd: false,
      badge: "",
      rating: 4.7,
      reviews: "215",
      price: 25,
      image: "bg-gradient-to-br from-blue-700 via-blue-500 to-indigo-400",
    },
  ],
};

export default function StudentHome() {
  const [activeCategory, setActiveCategory] = useState("company");
  const [activeFilter, setActiveFilter] = useState("All");

  function handleCategoryChange(category) {
    setActiveCategory(category);
    setActiveFilter("All"); // reset sub-filter whenever the main tab changes
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <Header
        categories={["job", "company", "freelancer"]}
        activeCategory={activeCategory}
        onSelectCategory={handleCategoryChange}
      />

      <FilterBar
        filters={FILTERS_BY_CATEGORY[activeCategory]}
        activeFilter={activeFilter}
        onSelect={setActiveFilter}
      />

      <main className="flex-1">
        <ResultsList
          listings={LISTINGS_BY_CATEGORY[activeCategory]}
          activeFilter={activeFilter}
        />
      </main>

      <Footer />
    </div>
  );
}
