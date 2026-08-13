import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, UserCircle2 } from "lucide-react";
import { useAuth } from "../pages/context/authContext";

function MenuItem({ children, accent, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full px-4 py-1.5 text-left text-sm transition hover:bg-surface ${
        accent ? "font-medium text-accent-dark" : "text-text-sub"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="my-1.5 border-t border-border" />;
}

// ---------------------------------------------------------------------------
// ProfileMenu: profile icon + dropdown, shared across every page. Items are
// placeholders (no handlers yet) until accounts/auth are wired up.
// ---------------------------------------------------------------------------
export default function ProfileMenu({ profileHref }) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    setOpen(false);
    navigate('/login', { replace: true });
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Profile menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="text-text-sub hover:text-text-main"
      >
        <UserCircle2 className="h-8 w-8" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-border bg-white py-2 shadow-lg">
            {profileHref ? (
              <Link
                to={profileHref}
                onClick={() => setOpen(false)}
                className="block w-full px-4 py-1.5 text-left text-sm text-text-sub transition hover:bg-surface"
              >
                Profile
              </Link>
            ) : (
              <MenuItem>Profile</MenuItem>
            )}
            {/* <MenuItem>Post a job description</MenuItem>
            <MenuItem>Your briefs</MenuItem>
            <MenuItem>Dashboard</MenuItem>
            <MenuItem accent>Refer a friend</MenuItem>

            <Divider />

            <MenuItem>Account settings</MenuItem>
            <MenuItem>Billing and payments</MenuItem> */}

            <Divider />

            <div className="flex items-center justify-between px-4 py-1.5">
              <span className="text-sm font-semibold text-text-main">Exclusive features</span>
              <span className="rounded bg-primary-mid px-1.5 py-0.5 text-xs font-semibold text-white">
                UniLift Pro
              </span>
            </div>
            {/* <MenuItem>Invite your teammates</MenuItem>
            <MenuItem>Let us find your freelancer</MenuItem>
            <MenuItem>Let us manage your project</MenuItem> */}

            <Divider />

            <button
              type="button"
              className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm text-text-sub transition hover:bg-surface"
            >
              <Globe className="h-4 w-4" />
              English
            </button>
            {/* <MenuItem>Rs. LKR</MenuItem>
            <MenuItem>Support</MenuItem> */}

            <Divider />

            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </div>
        </>
      )}
    </div>
  );
}
