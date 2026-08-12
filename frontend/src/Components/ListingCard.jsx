import { Heart, Play, Star, Video } from "lucide-react";

// Badge styling per variant — "pro" mirrors the brand-green "Vetted Pro"
// pill, "topRated" mirrors the amber "Top Rated ♦♦♦" merit pill.
const BADGE_STYLES = {
  pro: "bg-accent-soft text-primary-mid",
  topRated: "bg-amber-100 text-amber-800",
};

// ---------------------------------------------------------------------------
// ListingCard: Fiverr-style gig card — thumbnail, seller row, title, rating,
// starting price. `image` is a CSS gradient so the card renders with no
// network dependency; swap for a real thumbnail URL once wired to an API.
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
  } = listing;

  return (
    <button
      type="button"
      className="flex w-full flex-col overflow-hidden rounded-xl border border-border bg-white text-left shadow-sm transition hover:border-primary-light hover:shadow-md"
    >
      <div className={`relative aspect-video w-full ${image}`}>
        <span className="absolute right-2 top-2 rounded-full bg-black/30 p-1.5 text-white backdrop-blur-sm">
          <Heart className="h-4 w-4" />
        </span>
        <span className="absolute bottom-2 left-2 rounded-full bg-black/30 p-1.5 text-white backdrop-blur-sm">
          <Play className="h-3 w-3 fill-current" />
        </span>
        <span className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
          {[0, 1, 2, 3].map((dot) => (
            <span
              key={dot}
              className={`h-1.5 w-1.5 rounded-full ${dot === 0 ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 px-3 py-3">
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
              className={`whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-medium ${BADGE_STYLES[badgeVariant]}`}
            >
              {badge}
              {badgeVariant === "topRated" && " ♦♦♦"}
            </span>
          )}
        </div>

        <p className="line-clamp-2 text-sm text-text-sub">{title}</p>

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
