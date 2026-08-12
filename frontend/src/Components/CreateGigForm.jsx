import { useState } from "react";

const CATEGORIES = ["Graphic Design", "Video Editing", "Typing", "Retail", "Software Development"];

const SUBCATEGORIES_BY_CATEGORY = {
  "Graphic Design": ["Logo Design", "Brand Style Guides", "Illustration"],
  "Video Editing": ["Video Editing", "Intro & Outro Videos"],
  Typing: ["Transcription", "Data Entry"],
  Retail: ["Sales Associate", "Cashier", "Stock & Inventory"],
  "Software Development": ["Web Development", "Mobile Apps"],
};

/**
 * CreateGigForm
 * -------------
 * Fiverr-style "create a gig" step one — title, category/subcategory,
 * search tags — plus the "Seller Plus" promo banner and keyword-tip panel.
 * On submit, hands the entered fields back to the caller (GigsScreen adds
 * it as a new Draft gig); no backend yet.
 */
export default function CreateGigForm({ onSaveAndContinue, onCancel }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");

  const subcategories = SUBCATEGORIES_BY_CATEGORY[category] ?? [];

  function handleSubmit(event) {
    event.preventDefault();
    onSaveAndContinue?.({ title, category, subcategory, tags, price: Number(price) || 0 });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ── Promo banner ── */}
      <div className="relative mb-6 overflow-hidden rounded-xl bg-rose-100 p-6">
        <div className="max-w-md">
          <h2 className="mb-2 text-lg font-bold text-text-main">
            Want to know what potential clients are looking for?
          </h2>
          <p className="mb-3 text-sm text-text-sub">
            Join Seller Plus Kickstart for exclusive access to market research tools, insights,
            and analytics to create Gigs that get noticed.
          </p>
          <a href="#" className="text-sm font-semibold text-text-main underline underline-offset-2">
            Tell me more →
          </a>
        </div>
        <span className="absolute right-6 top-6 hidden rounded bg-rose-600 px-2 py-1 text-xs font-bold text-white sm:inline-block">
          Plus
        </span>
      </div>

      <div className="flex flex-col gap-8 rounded-xl border border-border bg-white p-6 shadow-sm lg:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          {/* Gig title */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
            <div>
              <h3 className="mb-1 text-sm font-bold text-text-main">Gig title</h3>
              <p className="text-xs leading-relaxed text-text-sub">
                As your Gig storefront, your{" "}
                <strong className="text-text-main">title is the most important place</strong> to
                include keywords that buyers would likely use to search for a service like yours.
              </p>
            </div>
            <div>
              <textarea
                rows={2}
                maxLength={80}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="I will do something I'm really good at"
                className="w-full resize-none rounded-lg border border-border p-4 text-base text-text-main outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light"
              />
              <p className="mt-1 text-right text-xs text-text-muted">{title.length} / 80 max</p>
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
            <div>
              <h3 className="mb-1 text-sm font-bold text-text-main">Category</h3>
              <p className="text-xs leading-relaxed text-text-sub">
                Choose the category and sub-category most suitable for your Gig.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setSubcategory("");
                }}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-text-sub outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={subcategory}
                onChange={(event) => setSubcategory(event.target.value)}
                disabled={!category}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-text-sub outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light disabled:opacity-50"
              >
                <option value="">Select a subcategory</option>
                {subcategories.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search tags */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
            <div>
              <h3 className="mb-1 text-sm font-bold text-text-main">Search tags</h3>
              <p className="text-xs leading-relaxed text-text-sub">
                Tag your Gig with buzz words that are relevant to the services you offer. Use all
                5 tags to get found.
              </p>
            </div>
            <div>
              <h4 className="mb-1 text-sm font-bold text-text-main">Positive keywords</h4>
              <p className="mb-2 text-xs text-text-sub">
                Enter search terms you feel your buyers will use when looking for your service.
              </p>
              <input
                type="text"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-text-main outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light"
              />
              <p className="mt-1 text-xs text-text-muted">5 tags maximum. Use letters and numbers only.</p>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
            <div>
              <h3 className="mb-1 text-sm font-bold text-text-main">Pricing</h3>
              <p className="text-xs leading-relaxed text-text-sub">
                Set the starting price for this Gig. You can add more packages and pricing tiers
                later.
              </p>
            </div>
            <div>
              <h4 className="mb-1 text-sm font-bold text-text-main">Starting price</h4>
              <div className="relative max-w-xs">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">
                  Rs.
                </span>
                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="5000"
                  className="w-full rounded-lg border border-border py-2.5 pl-11 pr-3 text-sm text-text-main outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Tip panel ── */}
        <aside className="w-full shrink-0 rounded-xl border border-border bg-surface p-5 lg:w-72">
          <span className="mb-2 inline-block rounded bg-rose-600 px-2 py-1 text-xs font-bold text-white">
            Plus
          </span>
          <h3 className="mb-2 text-sm font-bold text-text-main">
            Are you including the right keywords?
          </h3>
          <p className="text-xs leading-relaxed text-text-sub">
            The best Gig titles include keywords that your target buyers are searching for.
            Seller Plus Kickstart members can access Fiverr's{" "}
            <strong className="text-text-main">keyword research tool</strong>, helping them
            identify the most effective keywords for their Gig's performance.
          </p>
          <a
            href="#"
            className="mt-2 inline-block text-xs font-semibold text-primary underline underline-offset-2"
          >
            Join Seller Plus Kickstart
          </a>
        </aside>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text-sub transition hover:bg-surface"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-lg bg-text-main px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Save &amp; Continue
        </button>
      </div>
    </form>
  );
}
