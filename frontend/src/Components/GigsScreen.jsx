import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CreateGigForm from "./CreateGigForm";

const STATUS_TABS = ["Active", "Pending Approval", "Requires Modification", "Draft", "Denied", "Paused"];

// Dummy gigs, keyed by status — only "Paused" starts with data; the rest
// render an empty state until real gig data exists. New gigs created via
// "Create a New Gig" land in "Draft".
const INITIAL_GIGS_BY_STATUS = {
  Paused: [
    {
      title: "do creative logo design design",
      price: 6000,
      impressions: 0,
      clicks: 0,
      orders: 0,
      cancellations: "0%",
      thumbnail: "bg-gradient-to-br from-amber-200 via-rose-200 to-slate-300",
    },
    {
      title: "create unique and professional graphic designs",
      price: 7500,
      impressions: 0,
      clicks: 0,
      orders: 0,
      cancellations: "0%",
      thumbnail: "bg-gradient-to-br from-orange-700 via-red-700 to-neutral-900",
    },
  ],
};

/**
 * GigsScreen
 * ----------
 * Fiverr-style "Gigs" seller dashboard — status tabs (Active, Draft,
 * Paused...), an "Accepting Custom Orders" toggle, and a table of gigs for
 * whichever status is selected. "Create a New Gig" swaps in CreateGigForm;
 * saving adds the new gig under "Draft". Dummy data only, no backend.
 */
export default function GigsScreen() {
  const [gigsByStatus, setGigsByStatus] = useState(INITIAL_GIGS_BY_STATUS);
  const [activeStatus, setActiveStatus] = useState("Paused");
  const [acceptingCustomOrders, setAcceptingCustomOrders] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const gigs = gigsByStatus[activeStatus] ?? [];

  function handleSaveAndContinue({ title, price }) {
    const newGig = {
      title: title.trim() || "Untitled gig",
      price: price || 0,
      impressions: 0,
      clicks: 0,
      orders: 0,
      cancellations: "0%",
      thumbnail: "bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700",
    };

    setGigsByStatus((prev) => ({
      ...prev,
      Draft: [newGig, ...(prev.Draft ?? [])],
    }));
    setActiveStatus("Draft");
    setIsCreating(false);
  }

  if (isCreating) {
    return <CreateGigForm onSaveAndContinue={handleSaveAndContinue} onCancel={() => setIsCreating(false)} />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-normal text-text-main">Gigs</h1>

        <label className="flex items-center gap-2.5 text-sm font-medium text-text-main">
          <button
            type="button"
            role="switch"
            aria-checked={acceptingCustomOrders}
            onClick={() => setAcceptingCustomOrders((prev) => !prev)}
            className={`relative h-5 w-9 rounded-full transition ${
              acceptingCustomOrders ? "bg-accent-dark" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
                acceptingCustomOrders ? "left-[18px]" : "left-0.5"
              }`}
            />
          </button>
          Accepting Custom Orders
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-border">
        <nav className="flex flex-wrap gap-6">
          {STATUS_TABS.map((status) => {
            const isActive = status === activeStatus;
            const count = gigsByStatus[status]?.length;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setActiveStatus(status)}
                className={`flex items-center gap-1.5 pb-3 text-xs font-semibold uppercase tracking-wide transition ${
                  isActive
                    ? "border-b-2 border-primary text-text-main"
                    : "text-text-muted hover:text-text-sub"
                }`}
              >
                {status}
                {!!count && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-dark px-1 text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="mb-2 rounded-md bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-primary-mid"
        >
          Create a New Gig
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-border">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-text-main">
            {activeStatus} Gigs
          </h2>
          <button
            type="button"
            className="flex shrink-0 items-center gap-1 rounded border border-border px-3 py-1.5 text-xs font-medium text-text-sub"
          >
            Last 30 days
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        {gigs.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-text-muted">
            No gigs in this status yet.
          </p>
        ) : (
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-text-muted">
                <th className="w-10 px-5 py-3">
                  <input type="checkbox" />
                </th>
                <th className="px-2 py-3 text-left">Gig</th>
                <th className="px-2 py-3 text-right">Price</th>
                <th className="px-2 py-3 text-right">Impressions</th>
                <th className="px-2 py-3 text-right">Clicks</th>
                <th className="px-2 py-3 text-right">Orders</th>
                <th className="px-2 py-3 text-right">Cancellations</th>
                <th className="w-10 px-2 py-3" />
              </tr>
            </thead>
            <tbody>
              {gigs.map((gig) => (
                <tr key={gig.title} className="border-b border-border last:border-0">
                  <td className="px-5 py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="px-2 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-16 shrink-0 rounded ${gig.thumbnail}`} />
                      <span className="text-text-main">{gig.title}</span>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-right font-medium text-text-main">Rs. {gig.price.toLocaleString()}</td>
                  <td className="px-2 py-4 text-right text-text-sub">{gig.impressions}</td>
                  <td className="px-2 py-4 text-right text-text-sub">{gig.clicks}</td>
                  <td className="px-2 py-4 text-right text-text-sub">{gig.orders}</td>
                  <td className="px-2 py-4 text-right text-text-sub">{gig.cancellations}</td>
                  <td className="px-2 py-4 text-right">
                    <button
                      type="button"
                      className="rounded border border-border p-1 text-text-muted transition hover:bg-surface"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-4 text-right text-sm">
        <a href="#" className="text-primary hover:underline">
          What does your Gig® status mean?
        </a>
      </p>
    </div>
  );
}
