import type { MetadataRoute } from "next";

/**
 * Genera robots.txt dinámicamente.
 * La URL base se lee de NEXT_PUBLIC_SITE_URL — nunca está hardcodeada.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
