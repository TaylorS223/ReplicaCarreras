import type { NavItem } from "@/types/nav";

export function completeProyectosNav(items: NavItem[], carreraSlug = "arquitectura"): NavItem[] {
  const result = [...items];
  // Las páginas y el layout pueden hidratar en paralelo una carrera aún no registrada.
  // Completar la estructura aquí evita persistir un menú parcial en el store.
  if (!result.some(item => item.href === "/")) {
    result.unshift({ label: "Inicio", href: "/" });
  }
  if (!result.some(item => item.href.includes("personal"))) {
    result.splice(1, 0, { label: "Personal", href: "/personal", subItems: [
      { label: "Decanato", href: "/personal/decanato" },
      { label: "Dirección de Carrera", href: "/personal/direccion-carrera" },
      { label: "Docentes", href: "/personal#docentes" },
      { label: "Comisiones", href: "/personal/comisiones" },
      { label: "Administración y servicios", href: "/personal/administracion-servicios" },
    ] });
  }
  if (!result.some(item => item.href.includes("plan"))) {
    result.push({ label: "Plan de estudios", href: `/carreras/${carreraSlug}/plan-estudios` });
  }
  if (result.some(item => item.href.includes("proyectos"))) return result;
  const index = result.findIndex(item => item.href.includes("plan"));
  result.splice(index < 0 ? result.length : index, 0, {
    label: "Proyectos", href: "/proyectos", subItems: [
      { label: "Vinculación con el medio", href: "/proyectos/vinculacion" },
      { label: "Investigación", href: "/proyectos/investigacion" },
    ],
  });
  return result;
}
