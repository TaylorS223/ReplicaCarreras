import { NextResponse } from "next/server";
import { getFacultadConfig } from "@/lib/facultades/registry";
import {
  getNoticiasContentByContext,
  getPersonalContentByContext,
  getDecanatoContentByContext,
  getDireccionCarreraContentByContext,
  getComisionesContentByContext,
  getAdministracionServiciosContentByContext,
  getMisionVisionItemsByContext,
  getProfileContentByContext,
  getAccreditationContentByContext,
  getPlanEstudiosContentByContext,
} from "@/lib/content/resolver";

export type Sugerencia = {
  texto: string;
  categoria: string;
  href: string;
};

const normalizar = (texto: string) =>
  texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export async function GET(
  request: Request,
  { params }: { params: Promise<{ facultad: string }> },
) {
  const { facultad } = await params;
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const query = normalizar(q.trim());

  if (query.length < 2) {
    return NextResponse.json([]);
  }

  const config = getFacultadConfig(facultad);
  if (!config) return NextResponse.json([]);

  const ctx = { facultadSlug: facultad, carreraSlug: config.defaultCarreraSlug };
  const sugerencias: Sugerencia[] = [];

  const push = (texto: string, categoria: string, href: string) => {
    if (normalizar(texto).includes(query) && sugerencias.length < 8) {
      sugerencias.push({ texto, categoria, href });
    }
  };

  // Noticias
  getNoticiasContentByContext(ctx).forEach((n) => {
    push(n.titulo, "Noticia", `/${facultad}/noticias/${n.slug}`);
  });

  // Docentes
  getPersonalContentByContext(ctx).docentes.forEach((d) => {
    push(d.nombre, "Docente", `/${facultad}/personal/${d.slug}`);
  });

  // Decanato
  getDecanatoContentByContext(ctx).profiles.forEach((p) => {
    push(p.nombre, "Decanato", `/${facultad}/personal/decanato`);
  });

  // Dirección de Carrera
  getDireccionCarreraContentByContext(ctx).profiles.forEach((p) => {
    push(p.nombre, "Dirección de Carrera", `/${facultad}/personal/direccion-carrera`);
  });

  // Comisiones
  getComisionesContentByContext(ctx).profiles.forEach((p) => {
    push(p.nombre, "Comisiones", `/${facultad}/personal/comisiones`);
  });

  // Administración
  getAdministracionServiciosContentByContext(ctx).groups.forEach((g) => {
    g.items.forEach((item) => {
      push(item.nombre, "Administración", `/${facultad}/personal/administracion-servicios`);
    });
  });

  // Misión / Visión
  getMisionVisionItemsByContext(ctx).forEach((mv) => {
    push(mv.title, "Misión / Visión", `/${facultad}#mision`);
  });

  // Perfil
  getProfileContentByContext(ctx).cards.forEach((card) => {
    push(card.title, "Información institucional", `/${facultad}#perfil`);
  });

  // Acreditación
  const acc = getAccreditationContentByContext(ctx);
  push(acc.title, "Acreditación", `/${facultad}#acreditacion`);

  // Plan de estudios
  getPlanEstudiosContentByContext(ctx).levels.forEach((level) => {
    level.courses.forEach((course) => {
      push(course.title, `Plan de estudios — ${level.title}`, `/${facultad}#planestudios`);
    });
  });

  return NextResponse.json(sugerencias);
}
