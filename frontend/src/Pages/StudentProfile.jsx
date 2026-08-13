import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, PencilLine } from "lucide-react";
import Header from "../Components/Header";
import ProfilePage from "../Components/ProfilePage";
import GigsScreen from "../Components/GigsScreen";
import Footer from "../Components/Footer";
import api from "../api/axiosInstance";
import { useAuth } from "./context/authContext";

const CATEGORIES = [
  { key: "job", label: "Retail Job" },
  { key: "company", label: "Company" },
  { key: "freelancer", label: "Freelancer" },
];

const PROFILE_TABS = [
  { key: "profile", label: "Profile" },
  { key: "gigs", label: "Gigs" },
];

const defaultProfile = {
  name: "",
  username: "",
  phoneNumber: "",
  university_id: "",
  email: "",
  location: "Colombo, Sri Lanka",
  languages: "Speaks English, Sinhala",
  about: "",
};

export default function StudentProfile() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    if (!user) return;

    setProfile({
      name: user.name || "",
      username: user.username || "",
      phoneNumber: user.phoneNumber || "",
      university_id: user.university_id || "",
      email: user.email || "",
      location: "Colombo, Sri Lanka",
      languages: "Speaks English, Sinhala",
      about:
        user.about ||
        `Hello,\n\nI'm a student looking for opportunities to build experience while studying. I'm reliable, eager to learn, and ready to contribute to part-time, internship, and freelance work.`,
    });
  }, [user]);

  const tabSwitcher = (
    <div className="mb-6 flex gap-6 border-b border-border">
      {PROFILE_TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-sm font-medium transition ${
              isActive
                ? "border-b-2 border-primary text-primary"
                : "text-text-sub hover:text-text-main"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );

  const handleFieldChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!profile.name || !profile.username || !profile.phoneNumber || !profile.university_id || !profile.email) {
      setError("All profile fields are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const res = await api.put('/students/profile', {
        name: profile.name,
        username: profile.username,
        phoneNumber: profile.phoneNumber,
        university_id: profile.university_id,
        email: profile.email,
      });

      updateUser(res.data.user);
      setSuccess("Profile saved successfully.");
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <Header categories={CATEGORIES} activeCategory="" onSelectCategory={() => {}} />

      <main className="flex-1">
        {activeTab === "profile" ? (
          <div className="mx-auto max-w-6xl px-6 py-8">
            <Link
              to="/student/home"
              className="mb-4 flex items-center gap-1.5 text-sm font-medium text-text-sub transition hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            {tabSwitcher}

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            )}

            {!isEditing ? (
              <>
                <div className="mb-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0D1F4C] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1A3268]"
                  >
                    <PencilLine className="h-4 w-4" />
                    Edit profile
                  </button>
                </div>

                <ProfilePage
                  name={profile.name || "Student"}
                  username={profile.username || "student"}
                  avatarGradient="bg-gradient-to-br from-indigo-700 via-indigo-500 to-sky-500"
                  location={profile.location}
                  languages={profile.languages}
                  about={profile.about}
                  showPortfolio={false}
                  showIntroVideo={false}
                  showStrength={false}
                  showQuickLinks={false}
                  backHref="/student/home"
                  extraNav={null}
                />
              </>
            ) : (
              <form onSubmit={handleSave} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-bold text-slate-900">Edit profile</h2>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</span>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1A3268] focus:ring-4 focus:ring-[#1A3268]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Username</span>
                    <input
                      type="text"
                      value={profile.username}
                      onChange={(e) => handleFieldChange("username", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1A3268] focus:ring-4 focus:ring-[#1A3268]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</span>
                    <input
                      type="tel"
                      value={profile.phoneNumber}
                      onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1A3268] focus:ring-4 focus:ring-[#1A3268]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">University ID</span>
                    <input
                      type="text"
                      value={profile.university_id}
                      onChange={(e) => handleFieldChange("university_id", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1A3268] focus:ring-4 focus:ring-[#1A3268]/10"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">University Email</span>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1A3268] focus:ring-4 focus:ring-[#1A3268]/10"
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">About</span>
                    <textarea
                      rows={5}
                      value={profile.about}
                      onChange={(e) => handleFieldChange("about", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1A3268] focus:ring-4 focus:ring-[#1A3268]/10"
                    />
                  </label>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0D1F4C] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#1A3268] disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-6xl px-6 py-8">
            <Link
              to="/student/home"
              className="mb-4 flex items-center gap-1.5 text-sm font-medium text-text-sub transition hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            {tabSwitcher}

            <GigsScreen />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
