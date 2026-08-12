import { useState } from "react";
import PublisherNav from "../Components/PublisherNav";
import FormField from "../Components/FormField";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";

/**
 * FreelancerClient
 * -----------------
 * Lets a client post a freelance request (graphic design, video editing,
 * typing...) for student freelancers to pick up. Posted listings are held
 * in local state only (no backend yet) and rendered with the same
 * ListingCard used on the student-facing browse page, so a client can
 * preview exactly what students will see.
 */

const CATEGORIES = ["Graphic Design", "Video Editing", "Typing"];

// Gradient thumbnails cycled through for newly posted listings — placeholder
// for a real image upload once the backend exists.
const THUMBNAILS = [
  "bg-gradient-to-br from-stone-700 via-stone-500 to-green-600",
  "bg-gradient-to-br from-red-700 via-rose-500 to-orange-400",
  "bg-gradient-to-br from-blue-700 via-blue-500 to-indigo-400",
];

const INITIAL_LISTINGS = [
  {
    title: "Need a modern minimalist logo for a new fashion brand",
    type: "Graphic Design",
    seller: "Nova Threads",
    isAd: false,
    badge: "",
    rating: 0,
    reviews: "New",
    price: 150,
    image: THUMBNAILS[0],
  },
  {
    title: "Looking for a short recap video from our campus event footage",
    type: "Video Editing",
    seller: "Horizon Society",
    isAd: false,
    badge: "",
    rating: 0,
    reviews: "New",
    price: 80,
    image: THUMBNAILS[1],
  },
];

const EMPTY_FORM = {
  clientName: "",
  title: "",
  category: CATEGORIES[0],
  budget: "",
  description: "",
  offersVideo: false,
};

export default function FreelancerClient() {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [form, setForm] = useState(EMPTY_FORM);

  function handleChange(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function handleOffersVideoChange(event) {
    setForm((prev) => ({ ...prev, offersVideo: event.target.checked }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newListing = {
      title: form.title,
      type: form.category,
      seller: form.clientName,
      isAd: false,
      badge: "",
      rating: 0,
      reviews: "New",
      price: Number(form.budget) || 0,
      offersVideo: form.offersVideo,
      image: THUMBNAILS[listings.length % THUMBNAILS.length],
    };

    setListings((prev) => [newListing, ...prev]);
    setForm(EMPTY_FORM);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <PublisherNav title="Freelancer Client" profileHref="/freelancer/profile" />

      <main className="flex-1 px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">Post a Freelance Request</h1>
        <p className="mt-1 text-sm text-gray-500">
          Find student freelancers for design, video, and typing work.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <FormField label="Your name / business">
              <input
                type="text"
                required
                value={form.clientName}
                onChange={handleChange("clientName")}
                placeholder="e.g. Nova Threads"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </FormField>

            <FormField label="Project title">
              <input
                type="text"
                required
                value={form.title}
                onChange={handleChange("title")}
                placeholder="e.g. Logo for a new fashion brand"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </FormField>

            <FormField label="Category">
              <select
                value={form.category}
                onChange={handleChange("category")}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Budget (US$)">
              <input
                type="number"
                min="0"
                required
                value={form.budget}
                onChange={handleChange("budget")}
                placeholder="e.g. 150"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </FormField>

            <FormField label="Description">
              <textarea
                rows={4}
                value={form.description}
                onChange={handleChange("description")}
                placeholder="Scope, deadline, references..."
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </FormField>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={form.offersVideo}
                onChange={handleOffersVideoChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Open to a video consultation
            </label>

            <button
              type="submit"
              className="mt-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Post Freelance Request
            </button>
          </form>

          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Your posted requests
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {listings.map((listing, index) => (
                <ListingCard key={`${listing.title}-${index}`} listing={listing} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
