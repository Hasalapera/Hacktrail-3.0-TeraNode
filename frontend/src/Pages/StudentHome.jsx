
import { useEffect, useMemo, useState } from "react";
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
function ResultsList({ listings, activeFilter, loading, error }) {
  if (loading) {
    return (
      <p className="px-6 py-8 text-center text-sm text-text-muted">
        Loading latest listings...
      </p>
    );
  }

  if (error) {
    return (
      <p className="px-6 py-8 text-center text-sm text-red-600">
        {error}
      </p>
    );
  }

  const filtered =
    activeFilter === "All"
      ? listings
      : listings.filter((listing) => listing.type === activeFilter);

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
        <ListingCard
          key={listing.id || `${listing.title}-${listing.seller}`}
          listing={listing}
          isStudentView={true}
        />
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

const LISTINGS_BY_CATEGORY = {
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

const THUMBNAILS = [
  "bg-gradient-to-br from-pink-700 via-rose-500 to-orange-400",
  "bg-gradient-to-br from-emerald-700 via-emerald-500 to-lime-400",
  "bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400",
  "bg-gradient-to-br from-purple-700 via-fuchsia-500 to-pink-500",
  "bg-gradient-to-br from-amber-600 via-orange-500 to-rose-500",
  "bg-gradient-to-br from-cyan-700 via-teal-500 to-lime-500",
];

const companyTypeFromDescription = (description = "") => {
  const match = description.match(/Listing type:\s*(Intern|Project)/i);
  if (!match) return "Project";
  return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
};

export default function StudentHome() {
  const [activeCategory, setActiveCategory] = useState("job");
  const [activeFilter, setActiveFilter] = useState("All");
  const [jobListings, setJobListings] = useState([]);
  const [companyListings, setCompanyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const fetchOpenJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get('/jobs');
        const jobs = res.data?.data || [];

        const retail = [];
        const company = [];

        jobs.forEach((job, index) => {
          const employer = job.employer || {};
          const employerType = employer.employerType || (employer.shopName ? 'RETAILER' : 'COMPANY');

          const base = {
            id: job.id,
            title: job.title,
            seller:
              employerType === 'RETAILER'
                ? employer.shopName || employer.name || job.category || 'Retail Business'
                : employer.companyName || employer.name || job.category || 'Company',
            city: job.city || 'Sri Lanka',
            isAd: false,
            badge: '',
            rating: 0,
            reviews: 'New',
            price: Number(job.amount) || 0,
            image: THUMBNAILS[index % THUMBNAILS.length],
            jobPath: `/student/jobs/${job.id}`,
            posterPath: `/student/jobs/${job.id}?view=poster`,
          };

          if (employerType === 'RETAILER') {
            retail.push({
              ...base,
              type: job.paymentType === 'DAILY_WAGE' ? 'Full-time' : 'Part-time',
            });
          } else {
            company.push({
              ...base,
              type: companyTypeFromDescription(job.description),
            });
          }
        });

        if (!isActive) return;
        setJobListings(retail);
        setCompanyListings(company);
      } catch (fetchError) {
        if (!isActive) return;
        setError(fetchError.response?.data?.message || 'Unable to load job previews right now.');
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchOpenJobs();

    return () => {
      isActive = false;
    };
  }, []);

  const listingsByCategory = useMemo(() => ({
    job: jobListings,
    company: companyListings,
    freelancer: LISTINGS_BY_CATEGORY.freelancer,
  }), [jobListings, companyListings]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveFilter("All");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <Header
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={handleCategoryChange}
        profileHref="/student/profile"
      />

      <FilterBar
        filters={FILTERS_BY_CATEGORY[activeCategory] || []}
        activeFilter={activeFilter}
        onSelect={setActiveFilter}
      />

      <main className="flex-1">
        <ResultsList
          listings={listingsByCategory[activeCategory] || []}
          activeFilter={activeFilter}
          loading={loading && activeCategory !== 'freelancer'}
          error={activeCategory !== 'freelancer' ? error : ''}
        />
      </main>

      <Footer />
    </div>
  );
}