// ---------------------------------------------------------------------------
// FormField: labeled wrapper for a single publisher-form input/select/textarea.
// Restyled with UniLift green palette.
// ---------------------------------------------------------------------------
export default function FormField({ label, required, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold" style={{ color: "#475569" }}>
      <span>
        {label}
        {required && <span className="ml-1" style={{ color: "#EF4444" }}>*</span>}
      </span>
      {children}
    </label>
  );
}
