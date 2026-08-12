import ProfileMenu from "./ProfileMenu";

// ---------------------------------------------------------------------------
// Header: logo + site name, category tabs (Retail Job/Company/Freelancer), profile icon
// ---------------------------------------------------------------------------
export default function Header({ categories, activeCategory, onSelectCategory, onNavigate }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
          W
        </div>
        <span className="text-lg font-semibold text-gray-900">Web Name</span>
      </div>

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
                  ? "border-b-2 border-indigo-600 pb-2 text-indigo-600"
                  : "pb-2 text-gray-500 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <ProfileMenu onNavigate={onNavigate} />
    </header>
  );
}
