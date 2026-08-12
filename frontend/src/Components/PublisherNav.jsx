import { UserCircle2, Store, Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

// ---------------------------------------------------------------------------
// PublisherNav: top bar shared by the three publisher pages — logo + title,
// profile icon. Restyled with the UniLift forest-green palette.
// ---------------------------------------------------------------------------
export default function PublisherNav({ title }) {
  return (
    <header
      className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 sticky top-0 z-50"
      style={{
        background: "linear-gradient(135deg, #0B4D2E 0%, #166534 100%)",
        borderBottom: "1px solid rgba(74,222,128,0.15)",
        boxShadow: "0 2px 16px rgba(11,77,46,0.25)",
      }}
    >
      {/* Brand */}
      <Link to="/" className="flex items-center gap-2.5 no-underline">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold shadow"
          style={{ background: "#4ADE80", color: "#0B4D2E" }}
        >
          U
        </div>
        <div>
          <span className="text-base font-bold text-white leading-tight">UniLift</span>
          {title && (
            <p className="text-[10px] font-medium leading-none" style={{ color: "rgba(187,247,208,0.65)" }}>
              {title}
            </p>
          )}
        </div>
      </Link>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
          style={{ color: "rgba(240,253,244,0.65)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,222,128,0.12)"; e.currentTarget.style.color = "#4ADE80"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(240,253,244,0.65)"; }}
        >
          <Bell className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Profile"
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
          style={{ color: "rgba(240,253,244,0.80)", border: "1px solid rgba(74,222,128,0.20)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,222,128,0.10)"; e.currentTarget.style.color = "#ffffff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(240,253,244,0.80)"; }}
        >
          <UserCircle2 className="h-5 w-5" />
          <span className="max-sm:hidden">My Shop</span>
        </button>

        <button
          type="button"
          aria-label="Logout"
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
          style={{ color: "rgba(240,253,244,0.50)" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; e.currentTarget.style.color = "#FCA5A5"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(240,253,244,0.50)"; }}
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
