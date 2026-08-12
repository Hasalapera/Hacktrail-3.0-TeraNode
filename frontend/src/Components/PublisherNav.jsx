import ProfileMenu from "./ProfileMenu";

// ---------------------------------------------------------------------------
// PublisherNav: top bar shared by the three publisher pages — logo + title,
// profile icon.
// ---------------------------------------------------------------------------
export default function PublisherNav({ title, profileHref }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
          W
        </div>
        <span className="text-lg font-semibold text-text-main">Web Name</span>
      </div>

      <div className="flex items-center gap-4">
        {title && <span className="text-sm font-medium text-text-sub">{title}</span>}

        <ProfileMenu profileHref={profileHref} />
      </div>
    </header>
  );
}
