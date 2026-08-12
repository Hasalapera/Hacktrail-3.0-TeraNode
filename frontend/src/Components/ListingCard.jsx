import { Heart, Play, Star, Video } from "lucide-react";

// Badge styling per variant — "pro" mirrors the indigo "Vetted Pro" pill,
// "topRated" mirrors the amber "Top Rated ♦♦♦" pill.
const BADGE_STYLES = {
  pro: "bg-[var(--accent-soft)] text-[var(--primary)] border border-[var(--accent-border)]",
  topRated: "bg-[#FEF9C3] text-[#854D0E] border border-[#FEF08A]",
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
      className="flex w-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-white text-left shadow-sm transition hover:border-[var(--primary-light)] hover:shadow-md"
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
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold text-[var(--primary)]">
              {seller.charAt(0)}
            </span>
            <span className="text-sm font-semibold text-gray-900 tracking-tight">{seller}</span>
            {isAd && <span className="text-xs text-gray-400">Ad</span>}
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

        <p className="line-clamp-2 text-sm text-gray-700">{title}</p>

        <div className="flex items-center gap-1 text-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-gray-900">{rating.toFixed(1)}</span>
          <span className="text-gray-400">({reviews})</span>
        </div>

        <p className="text-sm text-gray-500">
          From <span className="font-semibold text-gray-900">US${price}</span>
        </p>

        {offersVideo && (
          <p className="flex items-center gap-1.5 text-xs text-gray-500">
            <Video className="h-3.5 w-3.5" />
            Offers video consultations
          </p>
        )}
      </div>
    </button>
  );
}
