import { UserCircle2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Header: logo + site name, category tabs, profile icon
// ---------------------------------------------------------------------------
export default function Header({ categories, activeCategory, onSelectCategory }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-6 py-4 bg-white">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-lg font-bold text-white shadow-sm">
          U
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">UniLift</span>
      </div>

      <nav className="flex gap-8">
        {categories.map(({ key, label }) => {
          const isActive = key === activeCategory;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectCategory(key)}
              className={`text-sm font-semibold transition-colors ${
                isActive
                  ? "border-b-2 border-[var(--primary)] pb-2 text-[var(--primary)]"
                  : "pb-2 text-gray-500 hover:text-gray-900"
              }`}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        aria-label="Profile"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-sub)] hover:bg-[var(--border)] transition-colors"
      >
        <UserCircle2 className="h-6 w-6" />
      </button>
    </header>
  );
}
