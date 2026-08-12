// ---------------------------------------------------------------------------
// FormField: labeled wrapper for a single publisher-form input/select/textarea.
// Restyled with UniLift green palette.
// ---------------------------------------------------------------------------
export default function FormField({ label, required, children }) {
  return (

    <label className="flex flex-col gap-1 text-sm font-medium text-text-sub">
      <span>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>

      {children}
    </label>
  );
}
