import PublisherNav from "../Components/PublisherNav";
import ProfilePage from "../Components/ProfilePage";
import Footer from "../Components/Footer";
import { useAuth } from "./context/authContext";

/**
 * CompanyProfile
 * --------------
 * Public-facing profile for a company, reached via "Profile" in the profile
 * dropdown on the Company Job Publisher page.
 */
export default function CompanyProfile() {
  const { user } = useAuth();

  const profileName = user?.companyName || user?.name || "Company";
  const profileUsername = user?.username || (user?.email ? user.email.split('@')[0] : "company");
  const profileLocation = user?.location || "Sri Lanka";
  const profileEmail = user?.email || "careers@company.com";
  const profileIndustry = user?.industry || "General";
  const profileHrContact = user?.hrContactName || user?.name || "HR Team";
  const profileAbout = `Hello,\n\nWe're ${profileName}, operating in ${profileIndustry}. We post internships and project opportunities for students and support growth through hands-on mentorship.\n\nHR Contact: ${profileHrContact}\nContact: ${profileEmail}\n\nThank you.`;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <PublisherNav title="Company Job Publisher" />

      <main className="flex-1">
        <ProfilePage
          name={profileName}
          username={profileUsername}
          avatarGradient="bg-gradient-to-br from-purple-700 via-fuchsia-500 to-pink-500"
          location={profileLocation}
          languages="Speaks English"
          about={profileAbout}
          showPortfolio={false}
          showIntroVideo={false}
          showStrength={false}
          showQuickLinks={false}
          backHref="/company/jobs"
        />
      </main>

      <Footer />
    </div>
  );
}
