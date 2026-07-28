import { getFooterContent } from "@/lib/wordpress/services/getFooter";

const SocialIcon = ({ platform }: { platform: "facebook" | "instagram" }) => {
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M13.5 8.5V6.9c0-.8.5-1.1 1.1-1.1h1.3V3h-2.3c-2.5 0-3.8 1.5-3.8 3.8v1.7H7.6v2.9h2.2V21h3.7v-9.6h2.2l.4-2.9h-2.6Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1ZM18.1 6.9a1.12 1.12 0 1 1-1.12-1.12 1.12 1.12 0 0 1 1.12 1.12ZM21 17.1a5.77 5.77 0 0 1-1.57 4.08A5.8 5.8 0 0 1 15.35 22.8h-6.7a5.8 5.8 0 0 1-4.08-1.62A5.77 5.77 0 0 1 3 17.1v-6.2a5.77 5.77 0 0 1 1.57-4.08A5.8 5.8 0 0 1 8.65 5.2h6.7a5.8 5.8 0 0 1 4.08 1.62A5.77 5.77 0 0 1 21 10.9Zm-1.9 0v-6.2a3.9 3.9 0 0 0-1.02-2.74 3.93 3.93 0 0 0-2.73-1.07h-6.7a3.93 3.93 0 0 0-2.73 1.07 3.9 3.9 0 0 0-1.02 2.74v6.2a3.9 3.9 0 0 0 1.02 2.74 3.93 3.93 0 0 0 2.73 1.07h6.7a3.93 3.93 0 0 0 2.73-1.07 3.9 3.9 0 0 0 1.02-2.74Z" />
    </svg>
  );
};

export const SiteFooter = () => {
  const content = getFooterContent();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={content.brandImage} alt={content.brandAlt} />
          <p>{content.location}</p>
          <p>{content.email}</p>
          <div className="footer-brand-line" aria-hidden="true" />
        </div>

        {content.groups.map((group) => (
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
                <SocialIcon platform={social.platform} />
              </a>
            ))}
          </div>
          <div className="footer-bottom">{content.copyright}</div>
        </div>
      </div>
    </footer>
  );
};
