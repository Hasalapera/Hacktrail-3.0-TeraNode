import { useId } from "react";

/**
 * Logo
 * ----
 * UniLift brand mark — the U-curve + upward "lift" arrow icon, plus an
 * optional "UniLift" wordmark. `variant="light"` swaps the wordmark to
 * white/sky for use on dark backgrounds (the footer, the Login brand panel).
 */
export default function Logo({
  iconClassName = "h-9 w-9",
  textClassName = "text-lg",
  showWordmark = true,
  variant = "dark",
}) {
  const uid = useId();
  const primaryGradientId = `logo-primary-${uid}`;
  const liftGradientId = `logo-lift-${uid}`;

  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 190 145" className={iconClassName} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={primaryGradientId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id={liftGradientId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>

        <path
          d="M 30 30 L 30 110 A 50 50 0 0 0 130 110 L 130 85 L 102 85 L 102 110 A 22 22 0 0 1 58 110 L 58 30 Z"
          fill={`url(#${primaryGradientId})`}
        />
        <path
          d="M 102 95 L 102 55 L 82 55 L 116 15 L 150 55 L 130 55 L 130 95 Z"
          fill={`url(#${liftGradientId})`}
        />
        <circle cx="30" cy="20" r="10" fill="#38BDF8" />
        <circle cx="116" cy="120" r="7" fill="#2563EB" opacity="0.3" />
      </svg>

      {showWordmark && (
        <span className={`font-extrabold tracking-tight ${textClassName}`}>
          {variant === "light" ? (
            <>
              <span className="text-white">Uni</span>
              <span className="text-primary-light">Lift</span>
            </>
          ) : (
            <>
              <span className="text-text-main">Uni</span>
              <span className="text-primary-mid">Lift</span>
            </>
          )}
        </span>
      )}
    </div>
  );
}
