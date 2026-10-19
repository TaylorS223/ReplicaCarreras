import { cache } from "react";
import { wpFetch } from "@/lib/wordpress/client";
import { resolveMediaUrl } from "@/lib/wordpress/acf/repository";
import { getCarreraTermId } from "@/lib/wordpress/services/getCarreraTermId";

export type ProyectoItem = {
  slug: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFinal: string;
  lider: { id: number; nombre: string } | null;
  imagen: string;
  imagenAlt: string;
  encabezado: string;
  linea: string;
  participantes: Array<{ id: number; nombre: string }>;
};
type Post = {
  id: number;
  slug: string;
  title?: { rendered: string };
  acf?: Record<string, unknown>;
};
type WpType = { slug: string; rest_base: string; rest_namespace?: string };
const options = () => process.env.NODE_ENV === "development"
  ? { cache: "no-store" as const }
  : { next: { revalidate: 3600, tags: ["proyectos", "personal"] } };
const getTypes = cache(() => wpFetch<Record<string, WpType>>("types", options()));
const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
const personId = (value: unknown): number => {
  if (Array.isArray(value)) value = value[0];
  const record = value && typeof value === "object" ? value as Record<string, unknown> : null;
  const id = Number(record ? record.ID ?? record.id : value);
  return Number.isInteger(id) && id > 0 ? id : 0;
};
const personFields = ["nombredocente", "nombredecano", "nombrepersonalcomision", "nombredireccioncarrera", "nombreadministracion", "nombrepersonalservicios"];

const getPerson = cache(async (id: number): Promise<{ id: number; nombre: string } | null> => {
  const types = await getTypes();
  const personal = Object.values(types).filter(t => /^(docentes|decano|comision|direccion_carrera|administracion|servicios)$/.test(t.slug));
  const results = await Promise.all(personal.map(async t => {
    try {
      const post = await wpFetch<Post>(`${t.rest_base}/${id}`, { ...options(), query: { _fields: "id,title,acf" } });
      const nombre = personFields.map(key => text(post.acf?.[key])).find(Boolean) || text(post.title?.rendered);
      return nombre ? { id, nombre } : null;
    } catch { return null; }
  }));
  return results.find(Boolean) ?? null;
});

async function mapPost(post: Post): Promise<ProyectoItem> {
  const acf = post.acf ?? {};
  const image = acf.imagen_proyecto;
  const imageObject = image && typeof image === "object" ? image as Record<string, unknown> : undefined;
  const imageValue = imageObject ? imageObject.url ?? imageObject.ID ?? imageObject.id : image;
  const rawParticipants = Array.isArray(acf.proyecto_participantes) ? acf.proyecto_participantes : [];
  const liderId = personId(acf.lider_proyecto);
  const ids = [...new Set(rawParticipants.map(personId).filter(id => id > 0 && id !== liderId))];
  const [lider, participants] = await Promise.all([
    liderId ? getPerson(liderId) : Promise.resolve(null),
    Promise.all(ids.map(getPerson)),
  ]);
  return {
    slug: post.slug,
    titulo: text(acf.titulo_proyecto),
    descripcion: text(acf.descripcion_proyecto),
    fechaInicio: text(acf.proyecto_fecha_inicio),
    fechaFinal: text(acf.proyecto_fecha_final),
    lider,
    imagen: await resolveMediaUrl(typeof imageValue === "number" || typeof imageValue === "string" ? imageValue : undefined),
    imagenAlt: text(imageObject?.alt) || text(acf.titulo_proyecto),
    encabezado: text(acf.titulo_imagen_encabezado),
    linea: text(acf.descripcion_imagen_encabezado),
    participantes: participants.filter((person): person is NonNullable<typeof person> => person !== null),
  };
}

export async function getAcfProyectos(tipo: "vinculacion" | "investigacion", carreraSlug?: string): Promise<ProyectoItem[]> {
  try {
    const types = await getTypes();
    const slug = tipo === "investigacion" ? "proyecto_i" : "proyecto_vinculacion";
    const type = types[slug] ?? Object.values(types).find(t => t.slug.includes("proyecto") && t.slug.includes(tipo));
    if (!type) throw new Error(`El CPT de ${tipo} no está expuesto en REST`);
    const carrera = carreraSlug ? await getCarreraTermId(carreraSlug) : undefined;
    if (carreraSlug && carrera == null) return [];
    const projects: Post[] = [];
    for (let page = 1; ; page++) {
      const response = await wpFetch<{ body: Post[]; headers: Record<string, string>; status: number }>(type.rest_base, { ...options(), query: {
        status: "publish", per_page: 100, page, orderby: "date", order: "desc",
        carrera: carrera ?? undefined, _fields: "id,slug,acf", _envelope: true,
      } });
      if (response.status !== 200) throw new Error(`WordPress respondió ${response.status}`);
      projects.push(...response.body);
      const totalPages = Number(response.headers["X-WP-TotalPages"] ?? response.headers["x-wp-totalpages"]);
      if (page >= totalPages || response.body.length < 100) break;
    }
    return await Promise.all(projects.map(mapPost));
  } catch (error) {
    console.error(`Error cargando proyectos ACF de ${tipo}:`, error);
    return [];
  }
}
