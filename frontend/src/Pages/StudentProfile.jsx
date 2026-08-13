import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../Components/Header";
import ProfilePage from "../Components/ProfilePage";
import GigsScreen from "../Components/GigsScreen";
import Footer from "../Components/Footer";
import { useAuth } from "./context/authContext";
import api from "../api/axiosInstance";

// Same category tabs as StudentHome, so the header stays consistent when a
// student navigates back and forth between browsing and their profile.
const CATEGORIES = [
  { key: "job", label: "Retail Job" },
  { key: "company", label: "Company" },
  { key: "freelancer", label: "Freelancer" },
];

const PROFILE_TABS = [
  { key: "profile", label: "Profile" },
  { key: "gigs", label: "Gigs" },
];

export default function StudentProfile() {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const handleSaveProfile = async (formData) => {
    try {
      const res = await api.put("/auth/profile", formData);
      if (res.data && res.data.user) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

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

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <Header categories={CATEGORIES} activeCategory="" onSelectCategory={() => {}} />

      <main className="flex-1">
        {activeTab === "profile" ? (
          <ProfilePage
            name={user?.name || "No Name"}
            username={user?.username || user?.university_id || "username"}
            avatarGradient="bg-gradient-to-br from-indigo-700 via-indigo-500 to-sky-500"
            location={user?.location || "Colombo, Sri Lanka"}
            languages={user?.languages || "Speaks English, Sinhala"}
            about={user?.about || "Hello, tell us about yourself."}
            showPortfolio={false}
            showIntroVideo={false}
            showStrength={false}
            showQuickLinks={false}
            backHref="/student-home"
            extraNav={tabSwitcher}
            isEditable={true}
            onSaveProfile={handleSaveProfile}
          />
        ) : (
          <div className="mx-auto max-w-6xl px-6 py-8">
            <Link
              to="/student-home"
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
