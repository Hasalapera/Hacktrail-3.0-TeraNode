import { ArrowLeft } from "lucide-react";

/**
 * InfoScreen
 * ----------
 * Generic full-width placeholder shown for profile-dropdown items that
 * don't have a dedicated screen yet (Dashboard, Billing, Support...).
 * Swap for a real page as each feature gets built.
 */
export default function InfoScreen({ heading, description, onBack }) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <section className="rounded-xl border border-gray-200 p-8 text-center shadow-sm">
        <h2 className="text-base font-semibold text-gray-900">{heading}</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">{description}</p>
        <span className="mt-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
          Coming soon
        </span>
      </section>
    </div>
  );
}
