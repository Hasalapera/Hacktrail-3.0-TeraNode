import { useState } from "react";
import Header from "../Components/Header";
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

// ---------------------------------------------------------------------------
// ListingCard: single result row (a job, an internship, a freelance gig...)
// ---------------------------------------------------------------------------
function ListingCard({ title, type }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-indigo-400 hover:shadow-md"
    >
      <span className="text-sm font-medium text-gray-800">{title}</span>
      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
        {type}
      </span>
    </button>
  );
}

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
    <div className="flex flex-col gap-2 px-6 py-4">
      {filtered.map((listing) => (
        <ListingCard key={listing.title} title={listing.title} type={listing.type} />
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

// Sample listings per category. Swap for real data once the backend/API
// is wired up — shape stays { title, type } where `type` matches a filter.
const LISTINGS_BY_CATEGORY = {
  job: [{ title: "Junior Web Developer", type: "Full-time" }],
  company: [
    { title: "Software Engineering Intern", type: "Intern" },
    { title: "Marketing Intern", type: "Intern" },
    { title: "Campus App Redesign", type: "Project" },
  ],
  freelancer: [
    { title: "Logo & Brand Kit", type: "Graphic Design" },
    { title: "Event Highlight Reel", type: "Video Editing" },
    { title: "Lecture Notes Transcription", type: "Typing" },
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
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col bg-white">
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
