import { useState } from "react";
import { Globe, UserCircle2 } from "lucide-react";

function MenuItem({ children, accent, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full px-4 py-1.5 text-left text-sm transition hover:bg-gray-50 ${
        accent ? "font-medium text-emerald-600" : "text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="my-1.5 border-t border-gray-100" />;
}

// ---------------------------------------------------------------------------
// ProfileMenu: profile icon + dropdown, shared across every page. Every item
// that leads somewhere calls onNavigate(key) — the parent page decides what
// to show ("profile" -> ProfileScreen, everything else -> InfoScreen).
// Language/currency toggles and "Sign out" have no page and stay inert.
// ---------------------------------------------------------------------------
export default function ProfileMenu({ onNavigate }) {
  const [open, setOpen] = useState(false);

  function handleNavigate(key) {
    return () => {
      setOpen(false);
      onNavigate?.(key);
    };
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Profile menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="text-gray-600 hover:text-gray-900"
      >
        <UserCircle2 className="h-8 w-8" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
            <MenuItem onClick={handleNavigate("profile")}>Profile</MenuItem>
            <MenuItem onClick={handleNavigate("postJob")}>Post a job description</MenuItem>
            <MenuItem onClick={handleNavigate("briefs")}>Your briefs</MenuItem>
            <MenuItem onClick={handleNavigate("dashboard")}>Dashboard</MenuItem>
            <MenuItem accent onClick={handleNavigate("refer")}>
              Refer a friend
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleNavigate("accountSettings")}>Account settings</MenuItem>
            <MenuItem onClick={handleNavigate("billing")}>Billing and payments</MenuItem>

            <Divider />

            <div className="flex items-center justify-between px-4 py-1.5">
              <span className="text-sm font-semibold text-gray-900">Exclusive features</span>
              <span className="rounded bg-emerald-800 px-1.5 py-0.5 text-xs font-semibold text-white">
                Web Name Pro
              </span>
            </div>
            <MenuItem onClick={handleNavigate("inviteTeam")}>Invite your teammates</MenuItem>
            <MenuItem onClick={handleNavigate("findFreelancer")}>
              Let us find your freelancer
            </MenuItem>
            <MenuItem onClick={handleNavigate("manageProject")}>
              Let us manage your project
            </MenuItem>

            <Divider />

            <button
              type="button"
              className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <Globe className="h-4 w-4" />
              English
            </button>
            <MenuItem>US$ USD</MenuItem>
            <MenuItem onClick={handleNavigate("support")}>Support</MenuItem>

            <Divider />

            <MenuItem>Sign out</MenuItem>
          </div>
        </>
      )}
    </div>
  );
}
