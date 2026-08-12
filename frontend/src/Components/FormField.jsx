// ---------------------------------------------------------------------------
// FormField: labeled wrapper for a single publisher-form input/select/textarea.
// ---------------------------------------------------------------------------
export default function FormField({ label, children }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
      {label}
      {children}
    </label>
  );
}
