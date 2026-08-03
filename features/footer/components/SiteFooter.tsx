import { getFooterContent } from "@/lib/wordpress/services/getFooter";

type SocialPlatform = "facebook" | "instagram" | "tiktok" | "youtube";

const SocialIcon = ({ platform }: { platform: SocialPlatform }) => {
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M13.5 8.5V6.9c0-.8.5-1.1 1.1-1.1h1.3V3h-2.3c-2.5 0-3.8 1.5-3.8 3.8v1.7H7.6v2.9h2.2V21h3.7v-9.6h2.2l.4-2.9h-2.6Z" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1ZM18.1 6.9a1.12 1.12 0 1 1-1.12-1.12 1.12 1.12 0 0 1 1.12 1.12ZM21 17.1a5.77 5.77 0 0 1-1.57 4.08A5.8 5.8 0 0 1 15.35 22.8h-6.7a5.8 5.8 0 0 1-4.08-1.62A5.77 5.77 0 0 1 3 17.1v-6.2a5.77 5.77 0 0 1 1.57-4.08A5.8 5.8 0 0 1 8.65 5.2h6.7a5.8 5.8 0 0 1 4.08 1.62A5.77 5.77 0 0 1 21 10.9Zm-1.9 0v-6.2a3.9 3.9 0 0 0-1.02-2.74 3.93 3.93 0 0 0-2.73-1.07h-6.7a3.93 3.93 0 0 0-2.73 1.07 3.9 3.9 0 0 0-1.02 2.74v6.2a3.9 3.9 0 0 0 1.02 2.74 3.93 3.93 0 0 0 2.73 1.07h6.7a3.93 3.93 0 0 0 2.73-1.07 3.9 3.9 0 0 0 1.02-2.74Z" />
      </svg>
    );
  }

  if (platform === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.54V6.78a4.85 4.85 0 0 1-1.02-.09Z" />
      </svg>
    );
  }

  // youtube
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M23 7s-.3-1.9-1.1-2.7c-1.1-1.1-2.3-1.1-2.8-1.2C16.2 3 12 3 12 3s-4.2 0-7.1.1c-.5.1-1.7.1-2.8 1.2C1.3 5.1 1 7 1 7S.7 9.2.7 11.4v2.1C.7 15.7 1 17.9 1 17.9s.3 1.9 1.1 2.7c1.1 1.1 2.5 1.1 3.1 1.2C7.2 22 12 22 12 22s4.2 0 7.1-.2c.5-.1 1.7-.1 2.8-1.2.8-.8 1.1-2.7 1.1-2.7s.3-2.2.3-4.4v-2.1C23.3 9.2 23 7 23 7ZM9.7 15.5V8.4l7.6 3.6-7.6 3.5Z" />
    </svg>
  );
};

export const SiteFooter = () => {
  const content = getFooterContent();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            src={content.logoAcreditadoraFooter || content.brandImage}
            alt={content.logoAcreditadoraFooter ? "Logo acreditadora" : content.brandAlt}
          />
          <p>{content.location}</p>
          <p>{content.email}</p>
          <div className="footer-brand-line" aria-hidden="true" />
        </div>

        {content.groups
          .filter((group) =>
            // Si hay aliados de WordPress, oculta el grupo "Aliados estratégicos" del mock
            !(content.aliadosEstrategicos && group.title.toLowerCase().includes("aliados"))
          )
          .map((group) => (
            <div key={group.title}>
              <h3 className="footer-title">{group.title}</h3>
              <div className="footer-title-line" aria-hidden="true" />
              <ul className="footer-links">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        {content.aliadosEstrategicos && (
          <div>
            <h3 className="footer-title">Aliados estratégicos</h3>
            <div className="footer-title-line" aria-hidden="true" />
            <ul className="footer-links">
              {content.aliadosEstrategicos
                .split(/[;\n]/)
                .map((item) => item.trim())
                .filter(Boolean)
                .map((item) => (
                  <li key={item}>{item}</li>
                ))}
            </ul>
          </div>
        )}
      </div>

      <div className="site-footer-meta">
        <div className="container footer-meta-grid">
          <div className="footer-social">
            {content.socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                <SocialIcon platform={social.platform as SocialPlatform} />
              </a>
            ))}
          </div>
          <div className="footer-bottom">{content.copyright}</div>
        </div>
      </div>
    </footer>
  );
};
