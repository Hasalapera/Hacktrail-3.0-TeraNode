

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

// Sample listings were replaced by live data:
//  - job/company tabs fetch from GET /jobs (jobListings / companyListings)
//  - freelancer tab fetches approved gigs from GET /gigs (freelancerGigs)
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
    : activeCategory === "job"
    ? jobListings
    : activeCategory === "company"
    ? companyListings
    : [];

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
        {isFreelancer ? (
          freelancerLoading ? (
            <p className="px-6 py-10 text-center text-sm text-text-muted">
              Loading freelancers...
            </p>
          ) : freelancerError ? (
            <p className="px-6 py-10 text-center text-sm text-red-500">{freelancerError}</p>
          ) : (
            <ResultsList listings={listings} activeFilter={activeFilter} />
          )
        ) : (
          <ResultsList
            listings={listings}
            activeFilter={activeFilter}
            loading={loading}
            error={error}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}