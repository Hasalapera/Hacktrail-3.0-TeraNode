import { useState, useEffect } from "react";
import { ChevronDown, Edit, Trash2, Pause, Play, AlertCircle } from "lucide-react";
import CreateGigForm from "./CreateGigForm";
import api from "../api/axiosInstance";

const STATUS_TABS = ["Active", "Pending Approval", "Requires Modification", "Draft", "Paused"];

const THUMBNAILS = [
  "bg-gradient-to-br from-pink-700 via-rose-500 to-orange-400",
  "bg-gradient-to-br from-emerald-700 via-emerald-500 to-lime-400",
  "bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400",
  "bg-gradient-to-br from-slate-800 via-slate-600 to-gray-400",
];

export default function GigsScreen() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeStatus, setActiveStatus] = useState("Active");
  const [acceptingCustomOrders, setAcceptingCustomOrders] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingGig, setEditingGig] = useState(null);

  const fetchGigs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/student/gigs");
      if (res.data && res.data.success) {
        setGigs(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load gigs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGigs();
  }, []);

  const getFilteredGigs = () => {
    return gigs.filter((gig) => {
      const status = gig.status ? gig.status.toUpperCase() : "PENDING";
      if (activeStatus === "Active") return status === "APPROVED";
      if (activeStatus === "Pending Approval") return status === "PENDING";
      if (activeStatus === "Requires Modification") return status === "REJECTED";
      if (activeStatus === "Draft") return status === "DRAFT";
      if (activeStatus === "Paused") return status === "PAUSED";
      return false;
    });
  };

  const getCount = (statusTab) => {
    return gigs.filter((gig) => {
      const status = gig.status ? gig.status.toUpperCase() : "PENDING";
      if (statusTab === "Active") return status === "APPROVED";
      if (statusTab === "Pending Approval") return status === "PENDING";
      if (statusTab === "Requires Modification") return status === "REJECTED";
      if (statusTab === "Draft") return status === "DRAFT";
      if (statusTab === "Paused") return status === "PAUSED";
      return false;
    }).length;
  };

  const handleSaveAndContinue = async (data) => {
    try {
      if (data.id) {
        // Edit gig
        await api.put(`/student/gigs/${data.id}`, {
          title: data.title,
          category: data.category,
          subcategory: data.subcategory,
          tags: data.tags,
          price: data.price,
          description: data.description,
          status: "PENDING", // go back to pending on edit
        });
      } else {
        // Create new gig
        await api.post("/student/gigs", {
          title: data.title,
          category: data.category,
          subcategory: data.subcategory,
          tags: data.tags,
          price: data.price,
          description: data.description,
          status: "PENDING",
        });
      }
      setIsCreating(false);
      setEditingGig(null);
      fetchGigs();
      setActiveStatus("Pending Approval");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save gig.");
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/student/gigs/${id}`, { status: newStatus });
      fetchGigs();
      if (newStatus === "PENDING") {
        setActiveStatus("Pending Approval");
      } else if (newStatus === "PAUSED") {
        setActiveStatus("Paused");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gig?")) return;
    try {
      await api.delete(`/student/gigs/${id}`);
      fetchGigs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete gig.");
    }
  };

  const filteredGigs = getFilteredGigs();

  if (isCreating) {
    return (
      <CreateGigForm
        initialData={editingGig}
        onSaveAndContinue={handleSaveAndContinue}
        onCancel={() => {
          setIsCreating(false);
          setEditingGig(null);
        }}
      />
    );
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
            const count = getCount(status);
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
          onClick={() => {
            setEditingGig(null);
            setIsCreating(true);
          }}
          className="mb-2 rounded-md bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-primary-mid"
        >
          Create a New Gig
        </button>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

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

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : filteredGigs.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-text-muted">
            No gigs in this status yet.
          </p>
        ) : (
          <table className="w-full min-w-[640px] text-sm text-text-main">
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
                <th className="w-24 px-2 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGigs.map((gig, idx) => {
                const thumb = gig.thumbnail || THUMBNAILS[idx % THUMBNAILS.length];
                return (
                  <tr key={gig.id || idx} className="border-b border-border last:border-0 hover:bg-slate-50/50">
                    <td className="px-5 py-4">
                      <input type="checkbox" />
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-16 shrink-0 rounded ${thumb}`} />
                        <span className="font-medium">{gig.title}</span>
                      </div>
                    </td>
                    <td className="px-2 py-4 text-right font-medium">Rs. {Number(gig.price).toLocaleString()}</td>
                    <td className="px-2 py-4 text-right text-text-sub">{gig.impressions || 0}</td>
                    <td className="px-2 py-4 text-right text-text-sub">{gig.clicks || 0}</td>
                    <td className="px-2 py-4 text-right text-text-sub">{gig.orders || 0}</td>
                    <td className="px-2 py-4 text-right text-text-sub">{gig.cancellations || "0%"}</td>
                    <td className="px-2 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingGig(gig);
                            setIsCreating(true);
                          }}
                          title="Edit Gig"
                          className="rounded border border-border p-1.5 text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        {gig.status === "APPROVED" ? (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(gig.id, "PAUSED")}
                            title="Pause Gig"
                            className="rounded border border-border p-1.5 text-amber-600 hover:bg-amber-50 transition cursor-pointer"
                          >
                            <Pause className="h-3.5 w-3.5" />
                          </button>
                        ) : gig.status === "PAUSED" ? (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(gig.id, "PENDING")}
                            title="Activate (requires approval)"
                            className="rounded border border-border p-1.5 text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                          >
                            <Play className="h-3.5 w-3.5" />
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => handleDelete(gig.id)}
                          title="Delete Gig"
                          className="rounded border border-border p-1.5 text-red-600 hover:bg-red-50 transition cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
