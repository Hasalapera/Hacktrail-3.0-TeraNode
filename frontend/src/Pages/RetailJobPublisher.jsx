import { useState } from "react";
import PublisherNav from "../Components/PublisherNav";
import ProfileScreen from "../Components/ProfileScreen";
import InfoScreen from "../Components/InfoScreen";
import { MENU_SCREENS } from "../Components/menuScreens";
import FormField from "../Components/FormField";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";

const BUSINESS_CATEGORIES = ["Fashion", "Grocery", "Electronics", "Food & Beverage", "Home & Living"];

/**
 * RetailJobPublisher
 * -------------------
 * Lets a store/business post a part-time or full-time retail role. Posted
 * listings are held in local state only (no backend yet) and rendered with
 * the same ListingCard used on the student-facing browse page, so a
 * publisher can preview exactly what students will see.
 */

const EMPLOYMENT_TYPES = ["Part-time", "Full-time"];

// Gradient thumbnails cycled through for newly posted listings — placeholder
// for a real image upload once the backend exists.
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
    isAd: true,
    badge: "Vetted Pro",
    rating: 4.7,
    reviews: "212",
    price: 12,
    image: THUMBNAILS[0],
  },
  {
    title: "Cashier needed for a busy campus-area supermarket",
    type: "Part-time",
    seller: "Cargills Food City",
    isAd: false,
    badge: "",
    rating: 4.5,
    reviews: "89",
    price: 10,
    image: THUMBNAILS[1],
  },
];

const EMPTY_FORM = {
  businessName: "",
  title: "",
  employmentType: EMPLOYMENT_TYPES[0],
  hourlyRate: "",
  description: "",
};

export default function RetailJobPublisher() {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [form, setForm] = useState(EMPTY_FORM);
  const [activeScreen, setActiveScreen] = useState(null);

  function handleChange(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newListing = {
      title: form.title,
      type: form.employmentType,
      seller: form.businessName,
      isAd: false,
      badge: "",
      rating: 0,
      reviews: "New",
      price: Number(form.hourlyRate) || 0,
      image: THUMBNAILS[listings.length % THUMBNAILS.length],
    };

    setListings((prev) => [newListing, ...prev]);
    setForm(EMPTY_FORM);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <PublisherNav title="Retail Job Publisher" onNavigate={setActiveScreen} />

      <main className="flex-1 px-6 py-8">
        {activeScreen === "profile" ? (
          <ProfileScreen
            heading="Business Profile"
            namePlaceholder="e.g. Odel Fashion"
            categories={BUSINESS_CATEGORIES}
            onBack={() => setActiveScreen(null)}
          />
        ) : activeScreen ? (
          <InfoScreen
            heading={MENU_SCREENS[activeScreen].heading}
            description={MENU_SCREENS[activeScreen].description}
            onBack={() => setActiveScreen(null)}
          />
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-gray-900">Post a Retail Job</h1>
            <p className="mt-1 text-sm text-gray-500">
              Reach students looking for part-time and full-time retail shifts.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                <FormField label="Business name">
                  <input
                    type="text"
                    required
                    value={form.businessName}
                    onChange={handleChange("businessName")}
                    placeholder="e.g. Odel Fashion"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField label="Job title">
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={handleChange("title")}
                    placeholder="e.g. Weekend Sales Associate"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField label="Employment type">
                  <select
                    value={form.employmentType}
                    onChange={handleChange("employmentType")}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    {EMPLOYMENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Hourly rate (US$)">
                  <input
                    type="number"
                    min="0"
                    required
                    value={form.hourlyRate}
                    onChange={handleChange("hourlyRate")}
                    placeholder="e.g. 12"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField label="Description">
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={handleChange("description")}
                    placeholder="Shift hours, responsibilities, requirements..."
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </FormField>

                <button
                  type="submit"
                  className="mt-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Post Retail Job
                </button>
              </form>

              <div>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Your posted listings
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {listings.map((listing, index) => (
                    <ListingCard key={`${listing.title}-${index}`} listing={listing} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
