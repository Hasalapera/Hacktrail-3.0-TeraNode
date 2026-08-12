
import { Heart, MapPin, Play, Star, Video } from "lucide-react";


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

  return (
    <button
      type="button"
      className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-white text-left shadow-sm transition hover:border-primary-light hover:shadow-md"

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
      </div>
    </button>
  );
}
