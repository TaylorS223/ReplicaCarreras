import { redirect } from "next/navigation";
import { getProyectosInvestigacion } from "@/lib/wordpress/graphql/proyectos";

type Props = {
  params: Promise<{ carrera: string }>;
};

export default async function CarreraProyectosPage({ params }: Props) {
  const { carrera } = await params;
  const investigacion = await getProyectosInvestigacion(carrera);
  redirect(`/${carrera}/proyectos/${investigacion.length ? "investigacion" : "vinculacion"}`);
}
