import { Heart, Play, Star, Video, MapPin } from "lucide-react";

// ---------------------------------------------------------------------------
// ListingCard: job listing card restyled with UniLift green palette.
// ---------------------------------------------------------------------------
export default function ListingCard({ listing }) {
  const {
    title,
    seller,
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
  } = listing;

  const isNew = reviews === "New";

  return (
    <button
      type="button"
      className="flex w-full flex-col overflow-hidden rounded-2xl text-left transition-all duration-200"
      style={{
        background: "#ffffff",
        border: "1.5px solid #E2E8F0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "#15803D";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(11,77,46,0.14)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "#E2E8F0";
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Thumbnail */}
      <div className={`relative aspect-video w-full ${image}`}>
        {/* Favourite */}
        <span
          className="absolute right-2.5 top-2.5 rounded-full p-1.5 text-white backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.30)" }}
        >
          <Heart className="h-4 w-4" />
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
          <div className="flex items-center gap-2">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: "#F0FDF4", color: "#166534", border: "1px solid #BBF7D0" }}
            >
              {seller.charAt(0)}
            </span>
            <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>{seller}</span>
            {isAd && <span className="text-xs" style={{ color: "#94A3B8" }}>Ad</span>}
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

        {/* Title */}
        <p className="line-clamp-2 text-sm font-medium leading-snug" style={{ color: "#475569" }}>{title}</p>

        {/* City if present */}
        {city && (
          <p className="flex items-center gap-1 text-xs" style={{ color: "#94A3B8" }}>
            <MapPin className="h-3 w-3" />{city}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          {isNew ? (
            <span className="text-xs font-semibold" style={{ color: "#22C55E" }}>New listing</span>
          ) : (
            <>
              <span className="font-bold" style={{ color: "#0F172A" }}>{rating.toFixed(1)}</span>
              <span style={{ color: "#94A3B8" }}>({reviews})</span>
            </>
          )}
        </div>

        {/* Price */}
        <div
          className="flex items-center justify-between rounded-xl px-3 py-2 mt-0.5"
          style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}
        >
          <p className="text-xs" style={{ color: "#475569" }}>
            Hourly from{" "}
            <span className="text-sm font-extrabold" style={{ color: "#0B4D2E" }}>LKR {price * 300}</span>
          </p>
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-bold"
            style={{ background: "#4ADE80", color: "#0B4D2E" }}
          >
            Apply →
          </span>
        </div>

        {offersVideo && (
          <p className="flex items-center gap-1.5 text-xs" style={{ color: "#94A3B8" }}>
            <Video className="h-3.5 w-3.5" />
            Offers video consultations
          </p>
        )}
      </div>
    </button>
  );
}
