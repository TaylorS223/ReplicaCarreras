import { expect, test } from "bun:test";
import { completeProyectosNav } from "./proyectos-nav";

test("agrega Proyectos al menú de carreras nuevas sin modificar el original", () => {
  const items = [{ label: "Inicio", href: "/" }, { label: "Plan", href: "/plan-estudios" }];
  const result = completeProyectosNav(items);
  expect(result.map(item => item.href)).toEqual(["/", "/personal", "/proyectos", "/plan-estudios"]);
  expect(result[2].subItems.map(item => item.href)).toEqual(["/proyectos/vinculacion", "/proyectos/investigacion"]);
  expect(items).toHaveLength(2);
  expect(completeProyectosNav(result)).toEqual(result);
});

test("recupera las opciones base con store vacío o parcialmente inicializado", () => {
  const empty = completeProyectosNav([], "software");
  const partial = completeProyectosNav([{ label: "Proyectos", href: "/proyectos", subItems: [{ label: "Vinculación", href: "/proyectos/vinculacion" }] }], "software");
  expect(empty.map(item => item.href)).toEqual(["/", "/personal", "/proyectos", "/carreras/software/plan-estudios"]);
  expect(partial.map(item => item.href)).toEqual(["/", "/personal", "/proyectos", "/carreras/software/plan-estudios"]);
  expect(partial[2].subItems).toHaveLength(1);
});
