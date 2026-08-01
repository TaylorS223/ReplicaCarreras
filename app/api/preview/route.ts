import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";
import { getFacultadConfig } from "@/lib/facultades/registry";

// Lista de prefijos de rutas internas permitidas.
// Solo se puede previsualizar rutas que pertenezcan al propio micrositio.
const isAllowedSlug = (slug: string): boolean => {
  try {
    // Rechaza URLs absolutas (open redirect)
    if (slug.startsWith("http://") || slug.startsWith("https://") || slug.startsWith("//")) {
      return false;
    }
    // Debe comenzar con /
    if (!slug.startsWith("/")) {
      return false;
    }
    // El primer segmento debe ser una facultad registrada
    const firstSegment = slug.split("/").filter(Boolean)[0] ?? "";
    return !!getFacultadConfig(firstSegment);
  } catch {
    return false;
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") ?? "/";

  // 1. Verificar que PREVIEW_SECRET esté configurado
  const previewSecret = process.env.PREVIEW_SECRET;
  if (!previewSecret) {
    return NextResponse.json(
      { error: "Preview no configurado en el servidor." },
      { status: 500 },
    );
  }

  // 2. Validar el secreto con comparación de longitud constante para evitar timing attacks
  const encoder = new TextEncoder();
  const a = encoder.encode(secret ?? "");
  const b = encoder.encode(previewSecret);

  if (a.length !== b.length) {
    return NextResponse.json({ error: "Token inválido." }, { status: 401 });
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a[i] ^ b[i];
  }
  if (mismatch !== 0) {
    return NextResponse.json({ error: "Token inválido." }, { status: 401 });
  }

  // 3. Validar que el slug sea una ruta interna del micrositio
  if (!isAllowedSlug(slug)) {
    return NextResponse.json(
      { error: "Ruta no permitida para preview." },
      { status: 400 },
    );
  }

  // 4. Activar Draft Mode
  (await draftMode()).enable();

  // 5. Redirigir a la ruta solicitada
  redirect(slug);
}
