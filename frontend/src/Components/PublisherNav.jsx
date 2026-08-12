import { UserCircle2 } from "lucide-react";

// ---------------------------------------------------------------------------
// PublisherNav: top bar shared by the three publisher pages — logo + title,
// profile icon.
// ---------------------------------------------------------------------------
export default function PublisherNav({ title }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
          W
        </div>
        <span className="text-lg font-semibold text-gray-900">Web Name</span>
      </div>

      <div className="flex items-center gap-4">
        {title && <span className="text-sm font-medium text-gray-500">{title}</span>}

        <button
          type="button"
          aria-label="Profile"
          className="text-gray-600 hover:text-gray-900"
        >
          <UserCircle2 className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
}
