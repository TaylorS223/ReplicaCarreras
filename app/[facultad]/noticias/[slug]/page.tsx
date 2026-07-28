import { notFound } from "next/navigation";
import { getNoticias } from "@/lib/wordpress/services/getNoticias";
import { getFacultadConfig } from "@/lib/facultades/registry";

type NoticiaDetailPageProps = {
  params: Promise<{ facultad: string; slug: string }>;
};

export default async function NoticiaDetailPage({ params }: NoticiaDetailPageProps) {
  const { facultad, slug } = await params;
  const facultadConfig = getFacultadConfig(facultad);

  if (!facultadConfig) {
    notFound();
  }

  const noticia = getNoticias({
    facultadSlug: facultad,
    carreraSlug: facultadConfig.defaultCarreraSlug,
  }).find((entry) => entry.slug === slug);

  if (!noticia) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>{noticia.titulo}</h2>
          <p>{noticia.fechaTexto}</p>
        </div>
        <img src={noticia.imagen} alt={noticia.alt} />
        <p>{noticia.contenido}</p>
      </div>
    </section>
  );
}
