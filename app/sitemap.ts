import type { MetadataRoute } from "next";
import { getFacultadSlugs, getFacultadConfig } from "@/lib/facultades/registry";

/**
 * Genera el sitemap.xml dinámicamente a partir de las facultades y carreras registradas.
 * La URL base se lee de NEXT_PUBLIC_SITE_URL — nunca está hardcodeada.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  const slugs = getFacultadSlugs();

  const routes: MetadataRoute.Sitemap = [];

  for (const slug of slugs) {
    const config = getFacultadConfig(slug);
    if (!config) continue;

    // Página principal de la facultad
    routes.push({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });

    // Sección noticias
    routes.push({
      url: `${baseUrl}/${slug}/noticias`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });

    // Sección personal docente
    routes.push({
      url: `${baseUrl}/${slug}/personal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });

    // Subsecciones de personal
    for (const sub of ["decanato", "direccion-carrera", "comisiones", "administracion-servicios"] as const) {
      routes.push({
        url: `${baseUrl}/${slug}/personal/${sub}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }

    // Sección carreras
    routes.push({
      url: `${baseUrl}/${slug}/carreras`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });

    // Si la facultad tiene una carrera por defecto, agregar su página
    if (config.defaultCarreraSlug) {
      routes.push({
        url: `${baseUrl}/${slug}/carreras/${config.defaultCarreraSlug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
      routes.push({
        url: `${baseUrl}/${slug}/carreras/${config.defaultCarreraSlug}/plan-estudios`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
