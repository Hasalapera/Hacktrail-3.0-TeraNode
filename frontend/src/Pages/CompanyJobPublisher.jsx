import { useState } from "react";
import PublisherNav from "../Components/PublisherNav";
import ProfileScreen from "../Components/ProfileScreen";
import InfoScreen from "../Components/InfoScreen";
import { MENU_SCREENS } from "../Components/menuScreens";
import FormField from "../Components/FormField";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";

const COMPANY_CATEGORIES = ["Software", "Marketing", "Finance", "Design", "Operations"];

/**
 * CompanyJobPublisher
 * --------------------
 * Lets a company post an internship or short-term project for students.
 * Posted listings are held in local state only (no backend yet) and
 * rendered with the same ListingCard used on the student-facing browse
 * page, so a publisher can preview exactly what students will see.
 */

const LISTING_TYPES = ["Intern", "Project"];

// Gradient thumbnails cycled through for newly posted listings — placeholder
// for a real image upload once the backend exists.
const THUMBNAILS = [
  "bg-gradient-to-br from-purple-700 via-fuchsia-500 to-pink-500",
  "bg-gradient-to-br from-amber-600 via-orange-500 to-rose-500",
  "bg-gradient-to-br from-cyan-700 via-teal-500 to-lime-500",
];

const INITIAL_LISTINGS = [
  {
    title: "Software Engineering Intern — 6 month placement",
    type: "Intern",
    seller: "TeraNode Labs",
    isAd: true,
    badge: "Vetted Pro",
    rating: 4.8,
    reviews: "312",
    price: 0,
    image: THUMBNAILS[0],
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
    image: THUMBNAILS[2],
  },
];

const EMPTY_FORM = {
  companyName: "",
  title: "",
  listingType: LISTING_TYPES[0],
  budget: "",
  description: "",
};

export default function CompanyJobPublisher() {
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
      type: form.listingType,
      seller: form.companyName,
      isAd: false,
      badge: "",
      rating: 0,
      reviews: "New",
      price: Number(form.budget) || 0,
      image: THUMBNAILS[listings.length % THUMBNAILS.length],
    };

    setListings((prev) => [newListing, ...prev]);
    setForm(EMPTY_FORM);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <PublisherNav title="Company Job Publisher" onNavigate={setActiveScreen} />

      <main className="flex-1 px-6 py-8">
        {activeScreen === "profile" ? (
          <ProfileScreen
            heading="Company Profile"
            namePlaceholder="e.g. TeraNode Labs"
            categories={COMPANY_CATEGORIES}
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
            <h1 className="text-2xl font-semibold text-gray-900">Post a Company Listing</h1>
            <p className="mt-1 text-sm text-gray-500">
              Find students for internships and short-term projects.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                <FormField label="Company name">
                  <input
                    type="text"
                    required
                    value={form.companyName}
                    onChange={handleChange("companyName")}
                    placeholder="e.g. TeraNode Labs"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField label="Listing title">
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={handleChange("title")}
                    placeholder="e.g. Software Engineering Intern"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField label="Listing type">
                  <select
                    value={form.listingType}
                    onChange={handleChange("listingType")}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    {LISTING_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Stipend / budget (US$, 0 if unpaid)">
                  <input
                    type="number"
                    min="0"
                    required
                    value={form.budget}
                    onChange={handleChange("budget")}
                    placeholder="e.g. 350"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField label="Description">
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={handleChange("description")}
                    placeholder="Responsibilities, duration, requirements..."
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </FormField>

                <button
                  type="submit"
                  className="mt-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Post Company Listing
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
