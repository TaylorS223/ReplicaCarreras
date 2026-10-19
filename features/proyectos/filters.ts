import type { ProyectoItem } from "@/lib/wordpress/acf/proyectos";
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");

export function paginarProyectos(proyectos: ProyectoItem[], pagina: number) {
  const totalPaginas = Math.max(1, Math.ceil(proyectos.length / 5));
  const actual = Math.max(1, Math.min(pagina, totalPaginas));
  const inicio = (actual - 1) * 5;
  return { items: proyectos.slice(inicio, inicio + 5), actual, totalPaginas, desde: proyectos.length ? inicio + 1 : 0, hasta: Math.min(inicio + 5, proyectos.length) };
}

export function filtrarProyectos(proyectos: ProyectoItem[], busqueda: string, linea: string) {
  const query = normalize(busqueda.trim());
  return proyectos.filter(p => (!linea || p.linea === linea) && normalize([p.titulo, p.descripcion, p.linea, p.lider?.nombre ?? "", ...p.participantes.map(person => person.nombre)].join(" ")).includes(query));
}

export function fechaProyecto(value: string): string {
  const compact = value.match(/^(\d{4})(\d{2})(\d{2})$/);
  const iso = compact ? `${compact[1]}-${compact[2]}-${compact[3]}` : value;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return value;
  const date = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("es", { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}


