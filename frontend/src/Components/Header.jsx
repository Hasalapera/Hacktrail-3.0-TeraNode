import Logo from "./Logo";
import ProfileMenu from "./ProfileMenu";

// ---------------------------------------------------------------------------
// Header: logo + site name, category tabs (Retail Job/Company/Freelancer), profile icon
// ---------------------------------------------------------------------------
export default function Header({ categories, activeCategory, onSelectCategory, profileHref }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4">
      <Logo iconClassName="h-9 w-9" textClassName="text-lg" />

      <nav className="flex gap-8">
        {categories.map(({ key, label }) => {
          const isActive = key === activeCategory;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectCategory(key)}
              className={`text-sm font-medium transition-colors ${
                isActive
                  ? "border-b-2 border-primary pb-2 text-primary"
                  : "pb-2 text-text-sub hover:text-text-main"
              }`}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <ProfileMenu profileHref={profileHref} />
    </header>
  );
}
