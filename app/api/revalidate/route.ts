import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

// Tags permitidos — deben coincidir con los definidos en repository.ts y graphql/client.ts
const ALLOWED_TAGS = [
  "wp-pages",
  "personal",
  "semestres",
  "noticias",
  "redes-sociales",
  "enlaces-interes",
  "wp-media",
  "carrusel",
  "graphql",
] as const;

type AllowedTag = (typeof ALLOWED_TAGS)[number];

const isAllowedTag = (tag: string): tag is AllowedTag =>
  (ALLOWED_TAGS as readonly string[]).includes(tag);

/**
 * POST /api/revalidate
 *
 * Invalida el caché de un tag específico de Next.js.
 * Requiere el header: X-Revalidate-Secret: <REVALIDATE_SECRET>
 * Body JSON: { "tag": "noticias" }
 *
 * Uso desde WordPress (functions.php o plugin):
 *   wp_remote_post( NEXT_REVALIDATE_URL, [
 *     'headers' => [ 'X-Revalidate-Secret' => REVALIDATE_SECRET, 'Content-Type' => 'application/json' ],
 *     'body'    => json_encode( [ 'tag' => 'noticias' ] ),
 *   ]);
 */
export async function POST(request: NextRequest) {
  const revalidateSecret = process.env.REVALIDATE_SECRET ?? "";

  // Sin secreto configurado → error de servidor (no expone detalles al cliente)
  if (!revalidateSecret) {
    console.error("[revalidate] REVALIDATE_SECRET no está configurado.");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const incoming = request.headers.get("x-revalidate-secret") ?? "";

  // Comparación timing-safe para evitar timing attacks
  const encoder = new TextEncoder();
  const a = encoder.encode(incoming);
  const b = encoder.encode(revalidateSecret);

  if (a.length !== b.length) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a[i] ^ b[i];
  }
  if (mismatch !== 0) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parsear body
  let tag: string;
  try {
    const body = (await request.json()) as { tag?: string };
    tag = body.tag ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!tag || !isAllowedTag(tag)) {
    return NextResponse.json(
      { error: `Tag '${tag}' no permitido. Valores válidos: ${ALLOWED_TAGS.join(", ")}` },
      { status: 400 },
    );
  }

  revalidateTag(tag);
  console.log(`[revalidate] Tag invalidado: ${tag}`);

  return NextResponse.json({ revalidated: true, tag });
}
