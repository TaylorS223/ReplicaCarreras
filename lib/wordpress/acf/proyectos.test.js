import { describe, expect, mock, test } from "bun:test";


mock.module("react", () => ({ cache: (fn) => fn }));
const requests = [];
mock.module("@/lib/wordpress/client", () => ({
  wpFetch: async (path, options) => {
    requests.push({ path, query: options?.query });
    if (path === "types") return {
      proyectos: { slug: "proyecto_investigacion", rest_base: "investigaciones" },
      docentes: { slug: "docentes", rest_base: "docentes" },
    };
    if (path === "investigaciones") return { status: 200, headers: { "X-WP-TotalPages": "1" }, body: [{
      id: 9, slug: "proyecto-nuevo", content: { rendered: "GUTENBERG NO DEBE APARECER" },
      acf: { titulo_proyecto: "Proyecto ACF", descripcion_proyecto: "Resumen", proyecto_fecha_inicio: "20261001", proyecto_fecha_final: "20271231", lider_proyecto: [{ ID: 33 }], imagen_proyecto: { url: "https://example.org/foto.jpg", alt: "Laboratorio" }, titulo_imagen_encabezado: "Línea de estudio", descripcion_imagen_encabezado: "Biopolímeros", proyecto_participantes: [31, { ID: 31 }, { ID: 32 }, 33] },
    }, { id: 8, slug: "sin-opcionales", acf: { titulo_proyecto: "Anterior" } }] };
    if (path === "docentes/31") return { id: 31, title: { rendered: "Ficha" }, acf: { nombredocente: "Ana Pérez" } };
    if (path === "docentes/33") return { id: 33, acf: { nombredocente: "José Líder" } };
    throw new Error("Registro no disponible");
  },
}));
mock.module("@/lib/wordpress/services/getCarreraTermId", () => ({ getCarreraTermId: async (slug) => slug === "marketing" ? 7 : null }));
mock.module("@/lib/wordpress/acf/repository", () => ({ resolveMediaUrl: async (value) => value || "" }));
const { getAcfProyectos } = await import("./proyectos");
const { filtrarProyectos, fechaProyecto, paginarProyectos } = await import("../../../features/proyectos/filters");

describe("proyectos ACF", () => {
  test("pagina de cinco en cinco conservando el orden y controla listas vacías", () => {
    const items = Array.from({ length: 12 }, (_, id) => ({ slug: String(id) }));
    expect(paginarProyectos(items, 1).items).toEqual(items.slice(0, 5));
    expect(paginarProyectos(items, 2).items).toEqual(items.slice(5, 10));
    expect(paginarProyectos(items, 3)).toMatchObject({ items: items.slice(10), desde: 11, hasta: 12, totalPaginas: 3 });
    expect(paginarProyectos(items.slice(0, 2), 3).actual).toBe(1);
    expect(paginarProyectos([], 1)).toMatchObject({ items: [], desde: 0, hasta: 0, totalPaginas: 1 });
  });
  test("lee ACF, conserva el orden y filtra por carrera sin consultar Gutenberg", async () => {
    const projects = await getAcfProyectos("investigacion", "marketing");
    expect(projects.map(p => p.titulo)).toEqual(["Proyecto ACF", "Anterior"]);
    expect(projects[0].linea).toBe("Biopolímeros");
    expect(projects[0].imagenAlt).toBe("Laboratorio");
    expect(projects[0].participantes).toEqual([{ id: 31, nombre: "Ana Pérez" }]);
    expect(projects[0].lider).toEqual({ id: 33, nombre: "José Líder" });
    expect(projects[0].fechaFinal).toBe("20271231");
    const query = requests.find(r => r.path === "investigaciones")?.query;
    expect(query).toMatchObject({ carrera: 7, status: "publish", orderby: "date", order: "desc" });
    expect(query?._fields).not.toContain("content");
    expect(JSON.stringify(projects)).not.toContain("GUTENBERG");
    expect(projects[1].participantes).toEqual([]);
    expect(projects[1].imagen).toBe("");
    expect(projects[1].lider).toBeNull();
    expect(projects[1].fechaFinal).toBe("");
  });
  test("una carrera desconocida no recibe proyectos de otras carreras", async () => {
    expect(await getAcfProyectos("investigacion", "desconocida")).toEqual([]);
  });
  test("busca por descripción de imagen y participante sin distinguir tildes y combina el filtro", async () => {
    const projects = await getAcfProyectos("investigacion", "marketing");
    expect(filtrarProyectos(projects, "biopolimeros", "")).toHaveLength(1);
    expect(filtrarProyectos(projects, "ana perez", "Biopolímeros")).toHaveLength(1);
    expect(filtrarProyectos(projects, "jose lider", "")).toHaveLength(1);
    expect(filtrarProyectos(projects, "anterior", "Biopolímeros")).toHaveLength(0);
    expect(filtrarProyectos(projects, "", "")).toEqual(projects);
    expect(fechaProyecto("20261001")).toBe("octubre de 2026");
    expect(fechaProyecto("2026-10-01")).toBe("octubre de 2026");
  });
});



