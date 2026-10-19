"use client";

import { useState } from "react";
import type { ProyectoItem } from "@/lib/wordpress/acf/proyectos";

import { filtrarProyectos, fechaProyecto, paginarProyectos } from "@/features/proyectos/filters";

export function ProyectosListado({ proyectos, tipo }: { proyectos: ProyectoItem[]; tipo: "investigacion" | "vinculacion" }) {
  const [busqueda, setBusqueda] = useState("");
  const [linea, setLinea] = useState("");
  const [pagina, setPagina] = useState(1);
  const lineas = [...new Set(proyectos.map(p => p.linea).filter(Boolean))];
  const visibles = filtrarProyectos(proyectos, busqueda, linea);
  const paginacion = paginarProyectos(visibles, pagina);
  const investigacion = tipo === "investigacion";
  return <section className="projects-page">
    <div className="projects-hero"><div className="container">
      <h1>{investigacion ? "Proyectos de Investigación" : "Proyectos de Vinculación"}</h1>
      <p>{investigacion ? "Conoce los proyectos de investigación y los docentes participantes en las iniciativas desarrolladas por nuestra comunidad universitaria." : "Conoce los proyectos de vinculación y las personas que trabajan junto a nuestra comunidad para responder a las necesidades de su entorno."}</p>
    </div></div>
    <div className="container projects-main">
      {proyectos.length > 0 && <div className="projects-filters">
        <div className="projects-controls">
          <label className="projects-search"><span aria-hidden="true">⌕</span><span className="projects-sr">Buscar proyectos</span><input type="search" placeholder="Buscar por título, participante o línea de estudio" value={busqueda} onChange={e => { setBusqueda(e.target.value); setPagina(1); }} /></label>
          <div className="projects-chips" role="group" aria-label="Filtrar por línea de estudio">
            {["", ...lineas].map(value => <button type="button" key={value} aria-pressed={linea === value} onClick={() => { setLinea(value); setPagina(1); }}>{value || "Todos"}</button>)}
          </div>
        </div>
        <p className="projects-count" role="status">Mostrando {paginacion.desde}–{paginacion.hasta} de {visibles.length} proyectos{visibles.length !== proyectos.length ? ` (${proyectos.length} en total)` : ""} · Más recientes primero</p>
      </div>}
      <div className="projects-list">
        {paginacion.items.map(p => <article key={p.slug} className={`projects-card${p.imagen ? "" : " projects-card-no-image"}`}>
          {p.imagen && <div className="projects-photo"><img src={p.imagen} alt={p.imagenAlt} loading="lazy" /><div className="projects-caption">{p.encabezado && <span>{p.encabezado}</span>}{p.linea && <strong>{p.linea}</strong>}</div></div>}
          <div className="projects-body">
            {(p.fechaInicio || p.fechaFinal) && <div className="projects-dates">
              {p.fechaInicio && <p className="projects-date">Inicio: {fechaProyecto(p.fechaInicio)}</p>}
              {p.fechaFinal && <p className="projects-date">Finalización: {fechaProyecto(p.fechaFinal)}</p>}
            </div>}
            <h2>{p.titulo || "Proyecto"}</h2>
            {p.descripcion && <p className="projects-description">{p.descripcion}</p>}
            {!p.imagen && p.linea && <p className="projects-line">{p.encabezado || "Línea de estudio"}: {p.linea}</p>}
            {(p.lider || p.participantes.length > 0) && <div className="projects-people"><ul>
              {p.lider && <li><span className="projects-avatar" aria-hidden="true">{p.lider.nombre.trim().split(/\s+/).slice(0, 2).map(word => word[0]).join("")}</span><span><span className="projects-person-role">Líder del proyecto</span><strong>{p.lider.nombre}</strong></span></li>}
              {p.participantes.map(person => <li key={person.id}><span className="projects-avatar projects-avatar-member" aria-hidden="true">{person.nombre.trim().split(/\s+/).slice(0, 2).map(word => word[0]).join("")}</span><span><span className="projects-person-role">Integrante</span>{person.nombre}</span></li>)}
            </ul></div>}
          </div>
        </article>)}
        {visibles.length === 0 && <p className="projects-empty">{proyectos.length ? "No hay proyectos que coincidan con tu búsqueda." : `Próximamente publicaremos los proyectos de ${investigacion ? "investigación" : "vinculación con el medio"}.`}</p>}
      </div>
      {paginacion.totalPaginas > 1 && <nav className="projects-pagination" aria-label="Páginas de proyectos">
        <button type="button" disabled={paginacion.actual === 1} onClick={() => setPagina(paginacion.actual - 1)}>Anterior</button>
        <span role="status">Página {paginacion.actual} de {paginacion.totalPaginas}</span>
        <button type="button" disabled={paginacion.actual === paginacion.totalPaginas} onClick={() => setPagina(paginacion.actual + 1)}>Siguiente</button>
      </nav>}
    </div>
  </section>;
}

