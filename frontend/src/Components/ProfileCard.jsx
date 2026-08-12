import { useState } from "react";
import FormField from "./FormField";

/**
 * ProfileCard
 * -----------
 * Minimalistic take on the Fiverr seller-profile edit page (avatar, name,
 * location, about, category tags) — trimmed to just what a publisher needs
 * to identify themselves to students. No portfolio/intro-video/work-history
 * sections; local state only, no backend yet.
 */
export default function ProfileCard({ heading, namePlaceholder, categories }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  function toggleCategory(category) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((selected) => selected !== category)
        : [...prev, category]
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-700">
          {name.trim().charAt(0).toUpperCase() || "?"}
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900">{heading}</h2>
          <p className="text-xs text-gray-500">Shown to students on your listings</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Name">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={namePlaceholder}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </FormField>

        <FormField label="Location">
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="e.g. Colombo, Sri Lanka"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <div className="mt-4">
        <FormField label="About">
          <textarea
            rows={3}
            value={about}
            onChange={(event) => setAbout(event.target.value)}
            placeholder="A short introduction students will see on your listings..."
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <div className="mt-4">
        <span className="text-sm font-medium text-gray-700">Categories</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="mt-5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        Save profile
      </button>
    </section>
  );
}
