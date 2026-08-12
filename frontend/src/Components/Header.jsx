import { UserCircle2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Header: logo + site name, category tabs (Job/Company/Freelancer), profile icon
// ---------------------------------------------------------------------------
export default function Header({ categories, activeCategory, onSelectCategory }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
          W
        </div>
        <span className="text-lg font-semibold text-gray-900">Web Name</span>
      </div>

      <nav className="flex gap-8">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`text-sm font-medium capitalize transition-colors ${
                isActive
                  ? "border-b-2 border-indigo-600 pb-2 text-indigo-600"
                  : "pb-2 text-gray-500 hover:text-gray-800"
              }`}
            >
              {category}
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        aria-label="Profile"
        className="text-gray-600 hover:text-gray-900"
      >
        <UserCircle2 className="h-8 w-8" />
      </button>
    </header>
  );
}
