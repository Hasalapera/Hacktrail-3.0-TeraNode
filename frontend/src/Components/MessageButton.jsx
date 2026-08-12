import { MessageCircle } from "lucide-react";

// ---------------------------------------------------------------------------
// MessageButton: fixed bottom-right launcher for the upcoming messenger
// service. Rendered once at the app level so it shows on every page.
// ---------------------------------------------------------------------------
export default function MessageButton() {
  return (
    <button
      type="button"
      aria-label="Messages"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-700"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
