/**
 * Footer — UniLift green palette restyle.
 * Self-contained — import and drop in at the bottom of any page.
 */

const FOOTER_LINKS = {
  Platform: ["Jobs", "Company Listings", "Freelance Gigs", "For Students"],
  Support:  ["Help Center", "Contact Us", "FAQs", "Report an Issue"],
  Company:  ["About", "Careers", "Blog", "Privacy Policy"],
};

const SOCIAL_LINKS = [
  { label: "Facebook",  href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn",  href: "#" },
  { label: "X",         href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{ background: "#0B4D2E", borderTop: "1px solid rgba(74,222,128,0.15)" }}
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4">
        {/* Brand column */}
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold shadow"
              style={{ background: "#4ADE80", color: "#0B4D2E" }}
            >
              U
            </div>
            <span className="text-base font-bold text-white">UniLift</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(187,247,208,0.55)" }}>
            Connecting Sri Lankan students with internships, part-time jobs, and freelance opportunities.
          </p>
          {/* Social links */}
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map(social => (
              <a
                key={social.label}
                href={social.href}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors"
                style={{ background: "rgba(74,222,128,0.10)", color: "rgba(187,247,208,0.65)", border: "1px solid rgba(74,222,128,0.15)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,222,128,0.20)"; e.currentTarget.style.color = "#4ADE80"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(74,222,128,0.10)"; e.currentTarget.style.color = "rgba(187,247,208,0.65)"; }}
              >
                {social.label.charAt(0)}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#4ADE80" }}>
              {heading}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {links.map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm transition-colors"
                    style={{ color: "rgba(187,247,208,0.55)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#4ADE80"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(187,247,208,0.55)"}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal bar */}
      <div style={{ borderTop: "1px solid rgba(74,222,128,0.10)" }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-4 sm:flex-row">
          <p className="text-xs" style={{ color: "rgba(187,247,208,0.35)" }}>
            © {new Date().getFullYear()} UniLift. All rights reserved. · Empowering Sri Lankan Students
          </p>
          <div className="flex gap-4">
            {["Terms", "Privacy", "Cookies"].map(item => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors"
                style={{ color: "rgba(187,247,208,0.35)" }}
                onMouseEnter={e => e.currentTarget.style.color = "#4ADE80"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(187,247,208,0.35)"}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
