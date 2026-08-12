import { LayoutGrid } from "lucide-react";
import PublisherNav from "../Components/PublisherNav";
import ProfilePage from "../Components/ProfilePage";
import Footer from "../Components/Footer";

/**
 * FreelancerProfile
 * -----------------
 * Public-facing profile for a client posting freelance requests, reached via
 * "Profile" in the profile dropdown on the Freelancer Client page.
 */
export default function FreelancerProfile() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <PublisherNav title="Freelancer Client" />

      <main className="flex-1">
        <ProfilePage
          name="Nova Threads"
          username="nova_threads"
          avatarGradient="bg-gradient-to-br from-stone-700 via-stone-500 to-green-600"
          location="Galle, Sri Lanka"
          languages="Speaks English, Sinhala"
          about={`Hello,\n\nWe're Nova Threads, a small fashion brand that regularly hires student freelancers for design, video editing, and typing work. We value clear communication and quick turnarounds, and we're happy to work with first-time freelancers.\n\ncontact us: hello@novathreads.lk\nThank you.`}
          portfolioBlurb="Show freelancers examples of past briefs and finished work."
          introBlurb="Introduce yourself and make a connection with freelancers."
          strength={6}
          quickLinks={[{ icon: LayoutGrid, label: "Requests", to: "/student/freelance" }]}
          backHref="/student/freelance"
        />
      </main>

      <Footer />
    </div>
  );
}
