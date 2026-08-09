import { NextResponse } from "next/server";
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
  { params }: { params: Promise<{ carrera: string }> },
) {
  const { carrera } = await params;
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const query = normalizar(q.trim());

  if (query.length < 2) return NextResponse.json([]);

  const ctx = { facultadSlug: carrera, carreraSlug: carrera };
  const sugerencias: Sugerencia[] = [];

  const push = (texto: string, categoria: string, href: string) => {
    if (normalizar(texto).includes(query) && sugerencias.length < 8) {
      sugerencias.push({ texto, categoria, href });
    }
  };

  getNoticiasContentByContext(ctx).forEach((n) => {
    push(n.titulo, "Noticia", `/${carrera}/noticias/${n.slug}`);
  });
  getPersonalContentByContext(ctx).docentes.forEach((d) => {
    push(d.nombre, "Docente", `/${carrera}/personal/${d.slug}`);
  });
  getDecanatoContentByContext(ctx).profiles.forEach((p) => {
    push(p.nombre, "Decanato", `/${carrera}/personal/decanato`);
  });
  getDireccionCarreraContentByContext(ctx).profiles.forEach((p) => {
    push(p.nombre, "Dirección de Carrera", `/${carrera}/personal/direccion-carrera`);
  });
  getComisionesContentByContext(ctx).profiles.forEach((p) => {
    push(p.nombre, "Comisiones", `/${carrera}/personal/comisiones`);
  });
  getAdministracionServiciosContentByContext(ctx).groups.forEach((g) => {
    g.items.forEach((item) => {
      push(item.nombre, "Administración", `/${carrera}/personal/administracion-servicios`);
    });
  });
  getMisionVisionItemsByContext(ctx).forEach((mv) => {
    push(mv.title, "Misión / Visión", `/${carrera}#mision`);
  });
  getProfileContentByContext(ctx).cards.forEach((card) => {
    push(card.title, "Información institucional", `/${carrera}#perfil`);
  });
  const acc = getAccreditationContentByContext(ctx);
  push(acc.title, "Acreditación", `/${carrera}#acreditacion`);
  getPlanEstudiosContentByContext(ctx).levels.forEach((level) => {
    level.courses.forEach((course) => {
      push(course.title, `Plan de estudios — ${level.title}`, `/${carrera}#planestudios`);
    });
  });

  return NextResponse.json(sugerencias);
}
