import { NextResponse } from "next/server";
import { getFacultadConfig } from "@/lib/facultades/registry";
import { getNoticiasContentByContext } from "@/lib/content/resolver";

export type SugerenciaNoticia = {
  texto: string;
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

  const sugerencias: SugerenciaNoticia[] = getNoticiasContentByContext(ctx)
    .filter(
      (n) =>
        normalizar(n.titulo).includes(query) ||
        normalizar(n.resumen).includes(query),
    )
    .slice(0, 6)
    .map((n) => ({
      texto: n.titulo,
      href: `/${facultad}/noticias/${n.slug}`,
    }));

  return NextResponse.json(sugerencias);
}
