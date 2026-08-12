import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../Components/Header";
import ProfilePage from "../Components/ProfilePage";
import GigsScreen from "../Components/GigsScreen";
import Footer from "../Components/Footer";

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

/**
 * StudentProfile
 * --------------
 * Public-facing profile for a student, reached via "Profile" in the profile
 * dropdown on the student browse page. Portfolio/intro-video/profile-strength
 * /quick-links are hidden here in favor of a "Gigs" tab — a student manages
 * their freelance listings there instead.
 */
export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState("profile");

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
            name="Nimal Perera"
            username="nimal_perera"
            avatarGradient="bg-gradient-to-br from-indigo-700 via-indigo-500 to-sky-500"
            location="Colombo, Sri Lanka"
            languages="Speaks English, Sinhala"
            about={`Hello,\n\nI'm a Computer Science undergraduate looking for part-time retail work, internships, and freelance design gigs to build experience alongside my studies. I'm reliable, quick to learn, and comfortable working with teams.\n\ncontact me: nimal.perera@example.com\nThank you.`}
            showPortfolio={false}
            showIntroVideo={false}
            showStrength={false}
            showQuickLinks={false}
            backHref="/student/home"
            extraNav={tabSwitcher}
          />
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
