import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ facultad: string }>;
};

export default async function FacultadProyectosPage({ params }: Props) {
  const { facultad } = await params;
  redirect(`/${facultad}/proyectos/investigacion`);
}
