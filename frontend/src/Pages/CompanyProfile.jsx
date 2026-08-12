import PublisherNav from "../Components/PublisherNav";
import ProfilePage from "../Components/ProfilePage";
import Footer from "../Components/Footer";

/**
 * CompanyProfile
 * --------------
 * Public-facing profile for a company, reached via "Profile" in the profile
 * dropdown on the Company Job Publisher page.
 */
export default function CompanyProfile() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-white">
      <PublisherNav title="Company Job Publisher" />

      <main className="flex-1">
        <ProfilePage
          name="TeraNode Labs"
          username="teranode_labs"
          avatarGradient="bg-gradient-to-br from-purple-700 via-fuchsia-500 to-pink-500"
          location="Colombo, Sri Lanka"
          languages="Speaks English"
          about={`Hello,\n\nWe're TeraNode Labs, a software company offering internships and short-term projects to university students. We care about mentorship as much as output — every intern is paired with an engineer and works on real, shipped features.\n\ncontact us: careers@teranodelabs.com\nThank you.`}
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
