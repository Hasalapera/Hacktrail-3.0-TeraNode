import { MapPin, MessageCircle, Play, Star, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";


// ---------------------------------------------------------------------------
// ListingCard: job listing card restyled with UniLift green palette.
//
// Props:
//   listing      — job/gig data object
//   isStudentView — when true, shows "Apply Now" button instead of
//                   publisher-only "View Poster / View Job" buttons.
//                   Students should NEVER see the publisher buttons.
// ---------------------------------------------------------------------------
export default function ListingCard({ listing, isStudentView = false }) {
  const navigate = useNavigate();
  const {
    id,
    title,
    seller,
    studentId,
    isAd,
    badge,
    badgeVariant = "pro",
    rating,
    reviews,
    price,
    image,
    offersVideo,
    type,
    city,
    posterPath,
    jobPath,
  } = listing;

  // Student "Apply Now" navigates to the detail/apply page
  const applyPath = id ? `/student/jobs/${id}` : null;
  const openMessenger = (e) => {
    e.stopPropagation();
    // Deep-link straight into a chat with the freelancer when we know their id
    const params = new URLSearchParams();
    if (studentId) {
      params.set("user", studentId);
      params.set("name", encodeURIComponent(seller || ""));
      params.set("role", "STUDENT");
    }
    navigate(`/messenger${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-white text-left shadow-sm transition hover:border-primary-light hover:shadow-md">
      {/* Thumbnail */}
      <div className={`relative aspect-video w-full ${image}`}>
        {/* Message */}
        <span
          role="button"
          tabIndex={0}
          aria-label="Message seller"
          onClick={openMessenger}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openMessenger(e);
            }
          }}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white backdrop-blur-sm transition hover:scale-110"
          style={{ background: "rgba(0,0,0,0.30)" }}
        >
          <MessageCircle className="h-4 w-4" />
        </span>
        {/* Play */}
        <span
          className="absolute bottom-2.5 left-2.5 rounded-full p-1.5 text-white backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.30)" }}
        >
          <Play className="h-3 w-3 fill-current" />
        </span>
        {/* Dots */}
        <span className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1">
          {[0, 1, 2, 3].map(dot => (
            <span
              key={dot}
              className={`h-1.5 w-1.5 rounded-full ${dot === 0 ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </span>
        {/* Employment type chip */}
        {type && (
          <span
            className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
            style={{ background: "rgba(11,77,46,0.80)", color: "#4ADE80", backdropFilter: "blur(4px)" }}
          >
            {type}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 px-4 py-3">
        {/* Seller row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-primary-mid">
              {seller.charAt(0)}
            </span>
            <span className="text-sm font-medium text-text-main">{seller}</span>
            {isAd && <span className="text-xs text-text-muted">Ad</span>}
          </div>
          {badge && (
            <span
              className="whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold"
              style={
                badgeVariant === "topRated"
                  ? { background: "#FEF3C7", color: "#92400E" }
                  : { background: "#F0FDF4", color: "#166534", border: "1px solid #BBF7D0" }
              }
            >
              {badge}{badgeVariant === "topRated" && " ♦♦♦"}
            </span>
          )}
        </div>

        <p className="line-clamp-2 text-sm text-text-sub">{title}</p>

        {/* City if present */}
        {city && (
          <p className="flex items-center gap-1 text-xs" style={{ color: "#94A3B8" }}>
            <MapPin className="h-3 w-3" />{city}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-text-main">{rating.toFixed(1)}</span>
          <span className="text-text-muted">({reviews})</span>
        </div>

        <p className="text-sm text-text-sub">
          From <span className="font-semibold text-text-main">Rs. {price.toLocaleString()}</span>
        </p>

        {offersVideo && (
          <p className="flex items-center gap-1.5 text-xs text-text-sub">
            <Video className="h-3.5 w-3.5" />
            Offers video consultations
          </p>
        )}

        {/* ── Student view: "Apply Now" button ── */}
        {isStudentView && applyPath && (
          <button
            type="button"
            onClick={() => navigate(applyPath)}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #0B4D2E 0%, #166534 100%)",
              boxShadow: "0 3px 12px rgba(11,77,46,0.25)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
            </svg>
            Apply Now
          </button>
        )}

        {/* ── Publisher view: "View Poster / View Job" buttons ── */}
        {!isStudentView && (posterPath || jobPath) && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={!posterPath}
              onClick={() => posterPath && navigate(posterPath)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#1A3268] hover:text-[#1A3268] disabled:cursor-not-allowed disabled:opacity-50"
            >
              View Poster
            </button>
            <button
              type="button"
              disabled={!jobPath}
              onClick={() => jobPath && navigate(jobPath)}
              className="rounded-lg bg-[#0D1F4C] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#1A3268] disabled:cursor-not-allowed disabled:opacity-50"
            >
              View Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
