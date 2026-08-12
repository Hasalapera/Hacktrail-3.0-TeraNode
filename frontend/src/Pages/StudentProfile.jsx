import { LayoutGrid } from "lucide-react";
import Header from "../Components/Header";
import ProfilePage from "../Components/ProfilePage";
import Footer from "../Components/Footer";

// Same category tabs as StudentHome, so the header stays consistent when a
// student navigates back and forth between browsing and their profile.
const CATEGORIES = [
  { key: "job", label: "Retail Job" },
  { key: "company", label: "Company" },
  { key: "freelancer", label: "Freelancer" },
];

/**
 * StudentProfile
 * --------------
 * Public-facing profile for a student, reached via "Profile" in the profile
 * dropdown on the student browse page.
 */
export default function StudentProfile() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <Header categories={CATEGORIES} activeCategory="" onSelectCategory={() => {}} />

      <main className="flex-1">
        <ProfilePage
          name="Nimal Perera"
          username="nimal_perera"
          avatarGradient="bg-gradient-to-br from-indigo-700 via-indigo-500 to-sky-500"
          location="Colombo, Sri Lanka"
          languages="Speaks English, Sinhala"
          about={`Hello,\n\nI'm a Computer Science undergraduate looking for part-time retail work, internships, and freelance design gigs to build experience alongside my studies. I'm reliable, quick to learn, and comfortable working with teams.\n\ncontact me: nimal.perera@example.com\nThank you.`}
          portfolioBlurb="Show employers and clients your best work and projects."
          introBlurb="Introduce yourself and make a connection with employers."
          strength={5}
          quickLinks={[{ icon: LayoutGrid, label: "Browse listings", to: "/student/home" }]}
          backHref="/student/home"
        />
      </main>

      <Footer />
    </div>
  );
}
