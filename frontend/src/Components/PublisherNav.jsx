import { UserCircle2 } from "lucide-react";

// ---------------------------------------------------------------------------
// PublisherNav: top bar shared by the three publisher pages — logo + title,
// profile icon.
// ---------------------------------------------------------------------------
export default function PublisherNav({ title }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-6 py-4 bg-white">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-lg font-bold text-white shadow-sm">
          U
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">UniLift</span>
      </div>

      <div className="flex items-center gap-4">
        {title && <span className="text-sm font-semibold text-[var(--primary-light)]">{title}</span>}

        <button
          type="button"
          aria-label="Profile"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-sub)] hover:bg-[var(--border)] transition-colors"
        >
          <UserCircle2 className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
