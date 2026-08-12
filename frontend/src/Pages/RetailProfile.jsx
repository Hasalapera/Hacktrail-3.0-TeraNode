import PublisherNav from "../Components/PublisherNav";
import ProfilePage from "../Components/ProfilePage";
import Footer from "../Components/Footer";

/**
 * RetailProfile
 * -------------
 * Public-facing profile for a retail business, reached via "Profile" in the
 * profile dropdown on the Retail Job Publisher page.
 */
export default function RetailProfile() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <PublisherNav title="Retail Job Publisher" />

      <main className="flex-1">
        <ProfilePage
          name="Odel Fashion"
          username="odel_fashion"
          avatarGradient="bg-gradient-to-br from-pink-700 via-rose-500 to-orange-400"
          location="Colombo, Sri Lanka"
          languages="Speaks English, Sinhala"
          about={`Hello,\n\nWe're Odel Fashion, a retail store in Colombo hiring students for weekend and evening shifts. We're looking for friendly, reliable people to join our sales floor team — no experience required, just a good attitude and a willingness to learn.\n\ncontact us: hr@odelfashion.lk\nThank you.`}
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
