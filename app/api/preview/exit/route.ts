import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const returnTo = searchParams.get("returnTo") ?? "/";

  // Desactivar Draft Mode
  (await draftMode()).disable();

  // Solo redirigir a rutas internas
  const safeReturn =
    returnTo.startsWith("/") &&
    !returnTo.startsWith("//") &&
    !returnTo.startsWith("http")
      ? returnTo
      : "/";

  redirect(safeReturn);
}
