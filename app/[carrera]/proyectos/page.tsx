import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ carrera: string }>;
};

export default async function CarreraProyectosPage({ params }: Props) {
  const { carrera } = await params;
  redirect(`/${carrera}/proyectos/investigacion`);
}
