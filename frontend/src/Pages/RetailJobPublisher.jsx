import { useState } from "react";
import { Briefcase, Clock, DollarSign, FileText, Store, PlusCircle, LayoutGrid, ChevronDown } from "lucide-react";
import PublisherNav from "../Components/PublisherNav";
import FormField from "../Components/FormField";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";

/**
 * RetailJobPublisher
 * -------------------
 * Lets a store/business post a part-time or full-time retail role.
 * Posted listings are held in local state only (no backend yet).
 * Restyled with the UniLift forest-green palette.
 */

const EMPLOYMENT_TYPES = ["Part-time", "Full-time"];

const THUMBNAILS = [
  "bg-gradient-to-br from-pink-700 via-rose-500 to-orange-400",
  "bg-gradient-to-br from-emerald-700 via-emerald-500 to-lime-400",
  "bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400",
  "bg-gradient-to-br from-slate-800 via-slate-600 to-gray-400",
];

const INITIAL_LISTINGS = [
  {
    title: "Retail Sales Associate — weekend and evening shifts",
    type: "Part-time",
    seller: "Odel Fashion",
    city: "Colombo",
    isAd: true,
    badge: "Vetted Pro",
    rating: 4.7,
    reviews: "212",
    price: 1500,
    image: THUMBNAILS[0],
  },
  {
    title: "Cashier needed for a busy campus-area supermarket",
    type: "Part-time",
    seller: "Cargills Food City",
    city: "Kandy",
    isAd: false,
    badge: "",
    rating: 4.5,
    reviews: "89",
    price: 1200,
    image: THUMBNAILS[1],
  },
];

const EMPTY_FORM = {
  businessName: "",
  title: "",
  employmentType: EMPLOYMENT_TYPES[0],
  hourlyRate: "",
  description: "",
  city: "",
};

const inputStyle = {
  border: "1.5px solid #E2E8F0",
  background: "#ffffff",
  color: "#0F172A",
  borderRadius: "10px",
  padding: "10px 14px",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.2s",
  width: "100%",
};

function GreenInput({ as: Tag = "input", ...props }) {
  return (
    <Tag
      {...props}
      style={{ ...inputStyle, ...(Tag === "textarea" ? { resize: "vertical", minHeight: "90px" } : {}), ...(Tag === "select" ? { cursor: "pointer" } : {}) }}
      onFocus={e => { e.target.style.borderColor = "#15803D"; e.target.style.boxShadow = "0 0 0 3px rgba(21,128,61,0.10)"; }}
      onBlur={e => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
    />
  );
}

export default function RetailJobPublisher() {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newListing = {
      title:   form.title,
      type:    form.employmentType,
      seller:  form.businessName,
      city:    form.city,
      isAd:    false,
      badge:   "",
      rating:  0,
      reviews: "New",
      price:   Number(form.hourlyRate) || 0,
      image:   THUMBNAILS[listings.length % THUMBNAILS.length],
    };

    setListings((prev) => [newListing, ...prev]);
    setForm(EMPTY_FORM);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (

    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <PublisherNav title="Retail Job Publisher" profileHref="/retail/profile" />

      <main className="flex-1 px-6 py-8">
        <h1 className="text-2xl font-semibold text-text-main">Post a Retail Job</h1>
        <p className="mt-1 text-sm text-text-sub">
          Reach students looking for part-time and full-time retail shifts.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
          <div className="rounded-2xl shadow-sm border border-slate-200 overflow-hidden bg-white">
            <div className="px-6 py-5" style={{ background: "linear-gradient(135deg, #0B4D2E 0%, #166534 100%)" }}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "rgba(74,222,128,0.15)" }}>
                  <PlusCircle className="h-5 w-5" style={{ color: "#4ADE80" }} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">New Job Listing</h2>
                  <p className="text-xs" style={{ color: "rgba(187,247,208,0.60)" }}>Fill in the details below</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-6">

              <FormField label="Business name" required>
                <GreenInput
                  type="text"
                  required
                  value={form.businessName}
                  onChange={handleChange("businessName")}
                  placeholder="e.g. Odel Fashion"
                />
              </FormField>

              <FormField label="Job title" required>
                <GreenInput
                  type="text"
                  required
                  value={form.title}
                  onChange={handleChange("title")}
                  placeholder="e.g. Weekend Sales Associate"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Employment type">
                  <div className="relative">
                    <GreenInput
                      as="select"
                      value={form.employmentType}
                      onChange={handleChange("employmentType")}
                    >
                      {EMPLOYMENT_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </GreenInput>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "#94A3B8" }} />
                  </div>
                </FormField>

                <FormField label="Hourly rate (LKR)" required>
                  <GreenInput
                    type="number"
                    min="0"
                    required
                    value={form.hourlyRate}
                    onChange={handleChange("hourlyRate")}
                    placeholder="e.g. 300"
                  />
                </FormField>
              </div>

              <FormField label="City / Location" required>
                <GreenInput
                  type="text"
                  required
                  value={form.city}
                  onChange={handleChange("city")}
                  placeholder="e.g. Colombo"
                />
              </FormField>

              <FormField label="Job description">
                <GreenInput
                  as="textarea"
                  rows={4}
                  value={form.description}
                  onChange={handleChange("description")}
                  placeholder="Shift hours, responsibilities, requirements..."
                />
              </FormField>

              {/* Success flash */}
              {submitted && (
                <div
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
                  style={{ background: "#F0FDF4", border: "1.5px solid #BBF7D0", color: "#166534" }}
                >
                  ✅ Job posted successfully!
                </div>
              )}

              <button
                type="submit"
                className="mt-1 w-full rounded-xl py-3.5 text-sm font-bold tracking-wide text-white transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #0B4D2E 0%, #166534 100%)",
                  boxShadow: "0 4px 16px rgba(11,77,46,0.28)",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(11,77,46,0.42)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(11,77,46,0.28)"}
              >
                🏪 Post Retail Job
              </button>
            </form>
          </div>

          {/* ── Listings panel ── */}
          <div>

            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-sub">
              Your posted listings
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {listings.map((listing, index) => (
                <ListingCard key={`${listing.title}-${index}`} listing={listing} />
              ))}
            </div>

            {listings.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center rounded-2xl py-16 text-center"
                style={{ background: "#ffffff", border: "1.5px dashed #E2E8F0" }}
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "#F0FDF4" }}>
                  <Briefcase className="h-7 w-7" style={{ color: "#BBF7D0" }} />
                </div>
                <p className="font-semibold" style={{ color: "#0F172A" }}>No listings yet</p>
                <p className="mt-1 text-sm" style={{ color: "#94A3B8" }}>Post your first retail job using the form.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {listings.map((listing, index) => (
                  <ListingCard key={`${listing.title}-${index}`} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
