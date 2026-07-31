import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") ?? "/";

  // Verifica el secreto para evitar accesos no autorizados
  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Token inválido", { status: 401 });
  }

  // Activa el Draft Mode
  (await draftMode()).enable();

  // Redirige a la página solicitada
  redirect(slug);
}
