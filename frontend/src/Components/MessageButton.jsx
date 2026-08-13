import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

// ---------------------------------------------------------------------------
// MessageButton: fixed bottom-right launcher for the messenger. Rendered once
// at the app level so it shows on every page.
// ---------------------------------------------------------------------------
export default function MessageButton() {
  return (
    <Link
      to="/messenger"
      aria-label="Messages"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:bg-primary-mid"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  );
}
