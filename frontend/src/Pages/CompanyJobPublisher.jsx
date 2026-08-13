import { useState, useEffect } from "react";
import PublisherNav from "../Components/PublisherNav";
import FormField from "../Components/FormField";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";
import api from "../api/axiosInstance";

/**
 * CompanyJobPublisher
 * --------------------
 * Lets a company post an internship or short-term project for students.
 * Posted listings are held in local state only (no backend yet) and
 * rendered with the same ListingCard used on the student-facing browse
 * page, so a publisher can preview exactly what students will see.
 */

const LISTING_TYPES = ["Intern", "Project"];

const THUMBNAILS = [
  "bg-gradient-to-br from-purple-700 via-fuchsia-500 to-pink-500",
  "bg-gradient-to-br from-amber-600 via-orange-500 to-rose-500",
  "bg-gradient-to-br from-cyan-700 via-teal-500 to-lime-500",
];

const EMPTY_FORM = {
  companyName: "",
  title: "",
  listingType: LISTING_TYPES[0],
  budget: "",
  description: "",
};

export default function CompanyJobPublisher() {
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const fetchMyJobs = async () => {
    try {
      const res = await api.get('/jobs/my-gigs');
      const jobs = res.data?.data || [];

      const mapped = jobs.map((job, index) => ({
        title: job.title,
        type: job.category || job.title,
        seller: job.category || job.employer?.name || 'Company',
        city: job.city || 'Colombo',
        isAd: false,
        badge: '',
        rating: 0,
        reviews: 'New',
        price: Number(job.amount) || 0,
        image: THUMBNAILS[index % THUMBNAILS.length],
      }));

      setListings(mapped);
    } catch (fetchError) {
      console.error('Failed to fetch company jobs:', fetchError);
      setError('Unable to load your job listings right now.');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMyJobs();
  }, []);

  function handleChange(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!form.companyName || !form.title || !form.budget) {
      setError('Please fill in the required fields before posting the job.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: form.title.trim(),
        description: `${form.description || 'Company listing'}\nCompany: ${form.companyName}\nListing type: ${form.listingType}`,
        category: form.companyName.trim(),
        paymentType: 'TASK_BASED',
        amount: Number(form.budget),
        city: 'Colombo',
      };

      await api.post('/jobs', payload);
      setForm(EMPTY_FORM);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      await fetchMyJobs();
    } catch (submitError) {
      console.error('Failed to create company job:', submitError);
      setError(submitError.response?.data?.message || 'Failed to save the job listing.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <PublisherNav title="Company Job Publisher" profileHref="/company/profile" />

      <main className="flex-1 px-6 py-8">
        <h1 className="text-2xl font-semibold text-text-main">Post a Company Listing</h1>
        <p className="mt-1 text-sm text-text-sub">
          Find students for internships and short-term projects.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl border border-border p-5 shadow-sm"
          >
            <FormField label="Company name">
              <input
                type="text"
                required
                value={form.companyName}
                onChange={handleChange("companyName")}
                placeholder="e.g. TeraNode Labs"
                className="rounded-lg border border-border px-3 py-2 text-sm font-normal text-text-main outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light"
              />
            </FormField>

            <FormField label="Listing title">
              <input
                type="text"
                required
                value={form.title}
                onChange={handleChange("title")}
                placeholder="e.g. Software Engineering Intern"
                className="rounded-lg border border-border px-3 py-2 text-sm font-normal text-text-main outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light"
              />
            </FormField>

            <FormField label="Listing type">
              <select
                value={form.listingType}
                onChange={handleChange("listingType")}
                className="rounded-lg border border-border px-3 py-2 text-sm font-normal text-text-main outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light"
              >
                {LISTING_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Stipend / budget (Rs., 0 if unpaid)">
              <input
                type="number"
                min="0"
                required
                value={form.budget}
                onChange={handleChange("budget")}
                placeholder="e.g. 45000"
                className="rounded-lg border border-border px-3 py-2 text-sm font-normal text-text-main outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light"
              />
            </FormField>

            <FormField label="Description">
              <textarea
                rows={4}
                value={form.description}
                onChange={handleChange("description")}
                placeholder="Responsibilities, duration, requirements..."
                className="rounded-lg border border-border px-3 py-2 text-sm font-normal text-text-main outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light"
              />
            </FormField>

            {submitted && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                ✅ Job posted successfully!
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-mid disabled:opacity-70"
            >
              {loading ? "Saving job..." : "Post Company Listing"}
            </button>
          </form>

          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-sub">
              Your posted listings
            </h2>
            {listings.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-white px-6 py-12 text-center text-sm text-text-sub">
                No listings yet. Post your first company role.
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
