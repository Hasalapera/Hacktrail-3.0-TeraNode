
import Logo from "./Logo";
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";


// ---------------------------------------------------------------------------
// PublisherNav: top bar shared by the three publisher pages — logo + title,
// profile icon. Restyled with the UniLift forest-green palette.
// ---------------------------------------------------------------------------
export default function PublisherNav({ title, profileHref }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4">
      <Logo iconClassName="h-9 w-9" textClassName="text-lg" />

      <div className="flex items-center gap-4">
        {title && <span className="text-sm font-medium text-text-sub">{title}</span>}

        <Link
          to="/messenger"
          className="flex items-center gap-1.5 text-sm font-medium text-text-sub transition-colors hover:text-text-main"
        >
          <MessageCircle className="h-5 w-5" />
          <span>Messages</span>
        </Link>

        <ProfileMenu profileHref={profileHref} />

      </div>
    </header>
  );
}
