import { hydrateContentForContext } from "@/lib/content/bootstrap";
import { getProyectosVinculacion } from "@/lib/wordpress/graphql/proyectos";
import { ProyectosListado } from "@/features/proyectos/components/ProyectosListado";

type Props = { params: Promise<{ carrera: string }> };

export default async function ProyectosPage({ params }: Props) {
  const { carrera } = await params;
  await hydrateContentForContext({ facultadSlug: carrera, carreraSlug: carrera });
  const proyectos = await getProyectosVinculacion(carrera);
  return <ProyectosListado proyectos={proyectos} tipo="vinculacion" />;
}
