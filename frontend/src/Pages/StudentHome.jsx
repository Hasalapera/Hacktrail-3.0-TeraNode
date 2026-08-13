
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import Header from "../Components/Header";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";
import api from "../api/axiosInstance";

/**
 * StudentHome
 * -----------
 * Student-side landing page, built from the hand-drawn wireframe:
 *   Header    -> logo, "Retail Job"/"Company"/"Freelancer" category switch, profile icon
 *   FilterBar -> sub-filters for the active category
 *                  Retail Job -> Part-time, Full-time
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
    <div className="flex flex-wrap gap-2">
      {["All", ...filters].map((filter) => {
        const isActive = filter === activeFilter;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onSelect(filter)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              isActive
                ? "border-primary bg-primary text-white"
                : "border-border bg-white text-text-sub hover:border-primary-light hover:text-primary"
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
      : listings.filter(
          (listing) =>
            String(listing.type || "").toLowerCase() === activeFilter.toLowerCase()
        );

  if (filtered.length === 0) {
    return (
      <p className="px-6 py-8 text-center text-sm text-text-muted">
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

// Top-level category tabs — `key` drives filtering/state, `label` is what
// the Header shows (lets a tab read differently from its internal key).
const CATEGORIES = [
  { key: "job", label: "Retail Job" },
  { key: "company", label: "Company" },
  { key: "freelancer", label: "Freelancer" },
];

// Sub-filters offered per top-level category, straight from the wireframe.
const FILTERS_BY_CATEGORY = {
  job: ["Part-time", "Full-time"],
  company: ["Intern", "Project"],
  freelancer: ["Graphic Design", "Video Editing", "Typing"],
};

// Gradient thumbnails cycled through for real student gigs (no image uploads yet).
const THUMBNAILS = [
  "bg-gradient-to-br from-pink-700 via-rose-500 to-orange-400",
  "bg-gradient-to-br from-emerald-700 via-emerald-500 to-lime-400",
  "bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400",
  "bg-gradient-to-br from-slate-800 via-slate-600 to-gray-400",
  "bg-gradient-to-br from-purple-700 via-fuchsia-500 to-pink-500",
];

// Map an approved Gig (from the API) into the ListingCard shape.
const mapGigToListing = (gig, index) => ({
  title: gig.title,
  type: gig.category,
  seller: gig.student?.name || "Student",
  studentId: gig.student?.id,
  isAd: false,
  badge: gig.student?.isOpenToWork ? "Open to Work" : "",
  rating: 0,
  reviews: String(gig.orders || 0),
  price: Number(gig.price) || 0,
  image: THUMBNAILS[index % THUMBNAILS.length],
});

// Sample listings per category. Swap for real data once the backend/API is
// wired up — shape stays { title, type, seller, isAd, badge, rating, reviews,
// price, image } where `type` matches a filter and `image` is a Tailwind
// gradient class standing in for a real thumbnail URL.
const LISTINGS_BY_CATEGORY = {
  job: [
    {
      title: "Retail Sales Associate — weekend and evening shifts",
      type: "Part-time",
      seller: "Odel Fashion",
      isAd: true,
      badge: "Vetted Pro",
      rating: 4.7,
      reviews: "212",
      price: 1500,
      image: "bg-gradient-to-br from-pink-700 via-rose-500 to-orange-400",
    },
    {
      title: "Cashier needed for a busy campus-area supermarket",
      type: "Part-time",
      seller: "Cargills Food City",
      isAd: false,
      badge: "",
      rating: 4.5,
      reviews: "89",
      price: 1200,
      image: "bg-gradient-to-br from-emerald-700 via-emerald-500 to-lime-400",
    },
    {
      title: "Store Team Member — full-time, flexible scheduling",
      type: "Full-time",
      seller: "Keells Super",
      isAd: true,
      badge: "Vetted Pro",
      rating: 4.8,
      reviews: "456",
      price: 1800,
      image: "bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400",
    },
    {
      title: "Stock & Inventory Assistant for a electronics retail chain",
      type: "Full-time",
      seller: "Softlogic Retail",
      isAd: false,
      badge: "Top Rated",
      badgeVariant: "topRated",
      rating: 4.9,
      reviews: "173",
      price: 1700,
      image: "bg-gradient-to-br from-slate-800 via-slate-600 to-gray-400",
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
      price: 45000,
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
      price: 35000,
      image: "bg-gradient-to-br from-stone-700 via-stone-500 to-green-600",
    },
    {
      title: "I will design a modern minimalistic monogram logo for your brand",
      type: "Graphic Design",
      seller: "Unipen",
      isAd: true,
      badge: "Vetted Pro",
      rating: 4.8,
      reviews: "31",
      price: 20000,
      offersVideo: true,
      image: "bg-gradient-to-br from-neutral-900 via-neutral-800 to-black",
    },
    {
      title: "I will design a creative minimalist logo",
      type: "Graphic Design",
      seller: "Alpa",
      isAd: true,
      badge: "Vetted Pro",
      rating: 4.9,
      reviews: "1k+",
      price: 14000,
      offersVideo: true,
      image: "bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100",
    },
    {
      title: "Our agency will design business logo designs with brand style guide",
      type: "Graphic Design",
      seller: "Illustra Sol",
      isAd: true,
      badge: "Top Rated",
      badgeVariant: "topRated",
      rating: 5.0,
      reviews: "18",
      price: 30000,
      offersVideo: true,
      image: "bg-gradient-to-br from-slate-900 via-blue-700 to-blue-500",
    },
    {
      title: "I will design a modern minimal custom logo for your business",
      type: "Graphic Design",
      seller: "Bhavik C",
      isAd: true,
      badge: "Vetted Pro",
      rating: 4.9,
      reviews: "113",
      price: 16000,
      offersVideo: true,
      image: "bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400",
    },
    {
      title: "I will edit a punchy highlight reel for your next event",
      type: "Video Editing",
      seller: "Ravindu Silva",
      isAd: false,
      badge: "Vetted Pro",
      rating: 4.9,
      reviews: "634",
      price: 15000,
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
      price: 3000,
      image: "bg-gradient-to-br from-blue-700 via-blue-500 to-indigo-400",
    },
  ],
};
export default function StudentHome() {
  const [activeCategory, setActiveCategory] = useState("job");
  const [activeFilter, setActiveFilter] = useState("All");

  // Freelancer tab loads real students' approved gigs from the API
  const [freelancerGigs, setFreelancerGigs] = useState([]);
  const [freelancerLoading, setFreelancerLoading] = useState(false);
  const [freelancerError, setFreelancerError] = useState("");

  const fetchFreelancerGigs = async () => {
    setFreelancerLoading(true);
    setFreelancerError("");
    try {
      const res = await api.get("/gigs");
      setFreelancerGigs(res.data?.data || []);
    } catch (err) {
      setFreelancerError("Could not load freelancers. Please try again.");
      console.error("Failed to load freelancer gigs:", err);
    } finally {
      setFreelancerLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory === "freelancer") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchFreelancerGigs();
    }
  }, [activeCategory]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveFilter("All");
  };

  const isFreelancer = activeCategory === "freelancer";
  const listings = isFreelancer
    ? freelancerGigs.map(mapGigToListing)
    : LISTINGS_BY_CATEGORY[activeCategory] || [];

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <Header
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={handleCategoryChange}
        profileHref="/student/profile"
      />

      <div className="flex flex-wrap items-center justify-between gap-4 px-6 pt-4">
        <FilterBar
          filters={FILTERS_BY_CATEGORY[activeCategory] || []}
          activeFilter={activeFilter}
          onSelect={setActiveFilter}
        />
        <Link
          to="/messenger"
          className="flex items-center gap-1.5 rounded-full border border-primary bg-primary px-4 py-1.5 text-sm font-medium text-white transition hover:bg-primary-mid"
        >
          <MessageCircle className="h-4 w-4" />
          Messages
        </Link>
      </div>

      <main className="flex-1">
        {isFreelancer && freelancerLoading ? (
          <p className="px-6 py-10 text-center text-sm text-text-muted">
            Loading freelancers...
          </p>
        ) : isFreelancer && freelancerError ? (
          <p className="px-6 py-10 text-center text-sm text-red-500">{freelancerError}</p>
        ) : (
          <ResultsList listings={listings} activeFilter={activeFilter} />
        )}
      </main>

      <Footer />
    </div>
  );
}