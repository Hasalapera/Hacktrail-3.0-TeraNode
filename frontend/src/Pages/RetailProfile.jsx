import PublisherNav from "../Components/PublisherNav";
import ProfilePage from "../Components/ProfilePage";
import Footer from "../Components/Footer";
import { useAuth } from "./context/authContext";

/**
 * RetailProfile
 * -------------
 * Public-facing profile for a retail business, reached via "Profile" in the
 * profile dropdown on the Retail Job Publisher page.
 */
export default function RetailProfile() {
  const { user } = useAuth();

  const profileName = user?.shopName || user?.name || "Retail Store";
  const profileUsername = user?.username || (user?.email ? user.email.split('@')[0] : "retailer");
  const profileLocation = user?.location || "Sri Lanka";
  const profileEmail = user?.email || "hr@retail.lk";
  const profileOwner = user?.ownerName || user?.name || "Store Owner";
  const profileService = user?.serviceType || user?.businessType || "Retail";
  const profileAbout = `Hello,\n\nWe're ${profileName}, and we regularly hire students for flexible shifts and entry-level opportunities.\n\nOwner: ${profileOwner}\nService Type: ${profileService}\nContact: ${profileEmail}\n\nThank you.`;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <PublisherNav title="Retail Job Publisher" />

      <main className="flex-1">
        <ProfilePage
          name={profileName}
          username={profileUsername}
          avatarGradient="bg-gradient-to-br from-pink-700 via-rose-500 to-orange-400"
          location={profileLocation}
          languages="Speaks English, Sinhala"
          about={profileAbout}
          showPortfolio={false}
          showIntroVideo={false}
          showStrength={false}
          showQuickLinks={false}
          backHref="/retail/jobs"
        />
      </main>

      <Footer />
    </div>
  );
}
