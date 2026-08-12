import { ArrowLeft } from "lucide-react";
import ProfileCard from "./ProfileCard";

/**
 * ProfileScreen
 * -------------
 * Full-width "Profile" view for a publisher page. Hidden by default —
 * shown only after the user opens the profile dropdown and clicks
 * "Profile"; the back button returns to whatever the page normally shows.
 */
export default function ProfileScreen({ heading, namePlaceholder, categories, onBack }) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <ProfileCard heading={heading} namePlaceholder={namePlaceholder} categories={categories} />
    </div>
  );
}
