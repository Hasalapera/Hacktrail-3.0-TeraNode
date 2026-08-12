/**
 * Footer
 * ------
 * Modern site footer: brand blurb, quick-link columns, socials, legal bar.
 * Self-contained — import and drop in at the bottom of any page.
 */

const FOOTER_LINKS = {
  Platform: ["Jobs", "Company Listings", "Freelance Gigs", "For Students"],
  Support: ["Help Center", "Contact Us", "FAQs", "Report an Issue"],
  Company: ["About", "Careers", "Blog", "Privacy Policy"],
};

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X", href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-primary bg-primary text-white/70">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-dark text-sm font-bold text-white">
              W
            </div>
            <span className="text-base font-semibold text-white">Web Name</span>
          </div>
          <p className="mt-3 text-sm text-white/55">
            Connecting students with internships, projects, and freelance
            opportunities.
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              {heading}
            </h4>
            <ul className="mt-3 flex flex-col gap-2">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white/55 transition hover:text-accent"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/45">
            &copy; {new Date().getFullYear()} Web Name. All rights reserved.
          </p>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-xs text-white/55 transition hover:text-accent"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
