import type { CarreraContent } from "@/types/carrera-content";
import type { FacultadContent } from "@/types/facultad-content";
import type { Docente } from "@/types/docente";
import type { DecanatoProfile } from "@/types/decanato";
import type { DireccionCarreraProfile } from "@/types/direccionCarrera";
import type { ComisionProfile } from "@/types/comisiones";
import type { PersonalAdministrativoItem } from "@/types/administracionServicios";
import type {
  FooterContent,
  InicioPaginaContent,
  MateriaPlanEstudios,
  PlanEstudiosContent,
  StudyLevel,
  Course,
  SilaboData,
  SilaboUnidad,
  SilaboEvaluacion,
  SilaboReferencia,
} from "@/types/api";
import type { Noticia } from "@/types/noticia";
import type { Proyecto } from "@/types/proyecto";
import type {
  CarreraAcfSchema,
  FacultadAcfSchema,
  InicioPaginaAcfSchema,
  NoticiaPost,
  PersonalPost,
  PlanEstudiosMateriaAcf,
  RedSocialPost,
  SemestrePost,
  UnidadPost,
  WpAcfEnvelope,
} from "@/lib/wordpress/acf/types";
import { RED_SOCIAL_ID_MAP } from "@/lib/wordpress/acf/types";
import { NIVEL_ID_MAP } from "@/lib/wordpress/acf/types";
import { resolveMediaUrl } from "@/lib/wordpress/acf/repository";

const resolveImageUrl = (value: number | string | undefined): string => {
  if (typeof value === "string" && value.length > 0) return value;
  return "";
};

const buildAcfError = (scope: string, slug: string) =>
  new Error(`ACF payload inválido para ${scope} "${slug}". Se esperaba acf.content.`);

const normalizeAcfDate = (value: string | undefined): string => {
  if (!value) return "";
  if (/^\d{8}$/.test(value)) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }
  return value;
};

export const mapFacultadFromAcf = (
  payload: WpAcfEnvelope<FacultadAcfSchema>,
): FacultadContent => {
  const content = payload.acf?.content;
  if (!content) throw buildAcfError("facultad", payload.slug);
  return content;
};

export const mapCarreraFromAcf = (payload: WpAcfEnvelope<CarreraAcfSchema>): CarreraContent => {
  const content = payload.acf?.content;
  if (!content) throw buildAcfError("carrera", payload.slug);
  return content;
};

// ── Plan de estudios desde CPT semestres ──────────────────────────────────────

const getSilaboUrl = async (value: number | string | { url?: string } | undefined): Promise<string> => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") return value.url ?? "";
  return resolveMediaUrl(value);
};

const mapSilaboFromAcf = (acf: SemestrePost["acf"]): SilaboData | undefined => {
  if (!acf) return undefined;

  // Detectar si hay datos del sílabo (campo plano, repeater o campos numerados)
  const hasSilaboData =
    acf.codigo_asignatura ||
    acf.numero_unidad ||
    acf.titulo_unidad ||
    acf.titulo_unidad_2 ||
    acf.unidades_contenido?.length ||
    acf.ambito ||
    acf.criterios_evaluacion?.length ||
    acf.autores ||
    acf.referencias_bibliograficas?.length;

  if (!hasSilaboData) return undefined;

  // ── Unidades: repeater ACF Pro > campos numerados > campo plano (legacy) ──
  let unidades: SilaboUnidad[];
  if (acf.unidades_contenido && acf.unidades_contenido.length > 0) {
    // ACF Pro: repeater unidades_contenido
    unidades = acf.unidades_contenido.map((u) => ({
      numeroUnidad: Number(u.numero_unidad ?? 0),
      tituloUnidad: u.titulo_unidad ?? "",
      temasUnidad: u.temas_unidad ?? "",
      resultadoAprendizajeUnidad: u.resultado_aprendizaje_unidad ?? "",
      codigoResultado: u.codigo_resultado ?? "",
      actividadesPracticas: u.actividades_practicas ?? "",
    }));
  } else {
    // Sin ACF Pro: unidad 1 usa los campos planos, unidades 2-6 usan campos numerados
    const unidad1: SilaboUnidad | null =
      acf.titulo_unidad || acf.numero_unidad
        ? {
            numeroUnidad: Number(acf.numero_unidad ?? 1),
            tituloUnidad: acf.titulo_unidad ?? "",
            temasUnidad: acf.temas_unidad ?? "",
            resultadoAprendizajeUnidad: acf.resultado_aprendizaje_unidad ?? "",
            codigoResultado: acf.codigo_resultado ?? "",
            actividadesPracticas: acf.actividades_practicas ?? "",
          }
        : null;

    // Unidades 2-4: campos con sufijo _2, _3, _4 (mismo patrón que unidad 1)
    const extraUnidades: SilaboUnidad[] = [2, 3, 4].flatMap((n) => {
      const titulo = acf[`titulo_unidad_${n}` as keyof typeof acf] as string | undefined;
      if (!titulo) return [];
      const u: SilaboUnidad = {
        numeroUnidad: n,
        tituloUnidad: titulo,
        temasUnidad: (acf[`temas_unidad_${n}` as keyof typeof acf] as string | undefined) ?? "",
        resultadoAprendizajeUnidad: (acf[`resultado_aprendizaje_unidad_${n}` as keyof typeof acf] as string | undefined) ?? "",
        codigoResultado: (acf[`codigo_resultado_${n}` as keyof typeof acf] as string | undefined) ?? "",
        actividadesPracticas: (acf[`actividades_practicas_${n}` as keyof typeof acf] as string | undefined) ?? "",
      };
      return [u];
    });

    unidades = [...(unidad1 ? [unidad1] : []), ...extraUnidades];
  }

  // ── Criterios: repeater tiene prioridad, si no, campo plano ──
  let criterios: SilaboEvaluacion[];
  if (acf.criterios_evaluacion && acf.criterios_evaluacion.length > 0) {
    criterios = acf.criterios_evaluacion.map((c) => ({
      ambito: c.ambito ?? "",
      tipoEvaluacion: c.tipo_evaluacion ?? "",
      porcentaje: Number(c.porcentaje ?? 0),
      estrategias: c.estrategias ?? "",
    }));
  } else if (acf.ambito || acf.tipo_evaluacion) {
    criterios = [{
      ambito: acf.ambito ?? "",
      tipoEvaluacion: acf.tipo_evaluacion ?? "",
      porcentaje: Number(acf.porcentaje ?? 0),
      estrategias: acf.estrategias ?? "",
    }];
  } else {
    criterios = [];
  }

  // ── Referencias: repeater tiene prioridad, si no, campo plano ──
  let referencias: SilaboReferencia[];
  if (acf.referencias_bibliograficas && acf.referencias_bibliograficas.length > 0) {
    referencias = acf.referencias_bibliograficas.map((r) => ({
      tipoReferencia: (r.tipo_referencia === "complementaria" ? "complementaria" : "basica") as SilaboReferencia["tipoReferencia"],
      autores: r.autores ?? "",
      anio: String(r.anio ?? ""),
      tituloObra: r.titulo_obra ?? "",
      editorial: r.editorial ?? "",
      urlReferencia: r.url_referencia ?? "",
    }));
  } else if (acf.autores || acf.titulo_obra) {
    // tipo_referencia puede llegar como false desde ACF cuando no está seleccionado
    const rawTipo = acf.tipo_referencia as string | false | undefined;
    const tipoRef: SilaboReferencia["tipoReferencia"] =
      rawTipo === "complementaria" ? "complementaria" : "basica";
    referencias = [{
      tipoReferencia: tipoRef as SilaboReferencia["tipoReferencia"],
      autores: acf.autores ?? "",
      anio: String(acf.anio ?? ""),
      tituloObra: acf.titulo_obra ?? "",
      editorial: acf.editorial ?? "",
      urlReferencia: acf.url_referencia ?? "",
    }];
  } else {
    referencias = [];
  }

  return {
    codigoAsignatura: acf.codigo_asignatura ?? "",
    nivelMalla: acf.nivel_malla ?? "",
    modalidad: acf.modalidad ?? "",
    sistemaEstudio: acf.sistema_estudio ?? "",
    unidadAcademica: acf.unidad_academica ?? "",
    unidadOrganizacionCurricular: acf.unidad_organizacion_curricular ?? "",
    nucleoFormacion: acf.nucleo_formacion ?? "",
    horasContactoDocente: Number(acf.horas_contacto_docente ?? 0),
    horasPracticoExperimental: Number(acf.horas_practico_experimental ?? 0),
    horasAutonomas: Number(acf.horas_autonomas ?? 0),
    horasTotales: Number(acf.horas_totales ?? 0),
    planCurricular: acf.plan_curricular ?? "",
    periodoInicioVigencia: acf.periodo_inicio_vigencia ?? "",
    ultimaRevision: acf.ultima_revision ?? "",
    objetoEstudioCarrera: acf.objeto_estudio_carrera ?? "",
    perfilEgreso: acf.perfil_egreso ?? "",
    resultadoAprendizajePerfil: acf.resultado_aprendizaje_perfil ?? "",
    resultadoAprendizajeAsignatura: acf.resultado_aprendizaje_asignatura ?? "",
    unidadesContenido: unidades,
    criteriosEvaluacion: criterios,
    referenciasBibliograficas: referencias,
  };
};

// Convierte los posts del CPT unidades en un mapa semestreId → SilaboUnidad[]
export const groupUnidadesBySemestre = (unidadPosts: UnidadPost[]): Record<number, SilaboUnidad[]> => {
  const map: Record<number, SilaboUnidad[]> = {};
  for (const post of unidadPosts) {
    const semestreId = post.acf?.semestre;
    if (!semestreId) continue;
    if (!map[semestreId]) map[semestreId] = [];
    map[semestreId].push({
      numeroUnidad: Number(post.acf?.numero_unidad ?? 0),
      tituloUnidad: post.acf?.titulo_unidad ?? "",
      temasUnidad: post.acf?.temas_unidad ?? "",
      resultadoAprendizajeUnidad: post.acf?.resultado_aprendizaje_unidad ?? "",
      codigoResultado: post.acf?.codigo_resultado ?? "",
      actividadesPracticas: post.acf?.actividades_practicas ?? "",
    });
  }
  // Ordenar cada grupo por numero_unidad
  for (const id of Object.keys(map)) {
    map[Number(id)].sort((a, b) => a.numeroUnidad - b.numeroUnidad);
  }
  return map;
};

export const mapSemestrePostToCourse = async (
  post: SemestrePost,
  unidadesBySemestre: Record<number, SilaboUnidad[]> = {},
): Promise<Course> => {
  const silaboBase = mapSilaboFromAcf(post.acf);
  // Si hay unidades del CPT para este semestre, las fusiona con las del sílabo
  const unidadesCpt = unidadesBySemestre[post.id] ?? [];
  const silabo = silaboBase && unidadesCpt.length > 0
    ? { ...silaboBase, unidadesContenido: [...silaboBase.unidadesContenido, ...unidadesCpt].sort((a, b) => a.numeroUnidad - b.numeroUnidad) }
    : silaboBase ?? (unidadesCpt.length > 0 ? { codigoAsignatura: "", nivelMalla: "", modalidad: "", sistemaEstudio: "", unidadAcademica: "", unidadOrganizacionCurricular: "", nucleoFormacion: "", horasContactoDocente: 0, horasPracticoExperimental: 0, horasAutonomas: 0, horasTotales: 0, planCurricular: "", periodoInicioVigencia: "", ultimaRevision: "", objetoEstudioCarrera: "", perfilEgreso: "", resultadoAprendizajePerfil: "", resultadoAprendizajeAsignatura: "", unidadesContenido: unidadesCpt, criteriosEvaluacion: [], referenciasBibliograficas: [] } : undefined);

  return {
    title: post.acf?.nombremateria ?? post.title.rendered,
    description: post.acf?.resultadoaprendizaje ?? "",
    credits: String(post.acf?.creditos ?? ""),
    syllabusUrl: await getSilaboUrl(post.acf?.silaboenlace),
    silabo,
  };
};

export const mapSemestrePostsToPlanEstudios = async (
  posts: SemestrePost[],
  existing: PlanEstudiosContent,
  unidadesBySemestre: Record<number, SilaboUnidad[]> = {},
): Promise<PlanEstudiosContent> => {  if (posts.length === 0) return existing;

  const byLevel: Record<number, SemestrePost[]> = {};
  for (const post of posts) {
    const nivelId = post.nivel?.[0];
    const nivelNum = nivelId !== undefined ? (NIVEL_ID_MAP[nivelId] ?? null) : null;
    if (nivelNum === null) continue;
    if (!byLevel[nivelNum]) byLevel[nivelNum] = [];
    byLevel[nivelNum].push(post);
  }

  const allLevels: (StudyLevel | null)[] = await Promise.all(
    Array.from({ length: 10 }, async (_, i) => {
      const num = i + 1;
      const levelPosts = byLevel[num] ?? [];
      const existingLevel = existing.levels[i];

      if (levelPosts.length === 0) {
        // Solo incluir el nivel si ya tenía cursos previamente (existingLevel con cursos)
        // Si no hay posts WP y no hay cursos existentes, devolvemos null para filtrar
        if (existingLevel && existingLevel.courses.length > 0) return existingLevel;
        return null;
      }

      const courses = await Promise.all(levelPosts.map((p) => mapSemestrePostToCourse(p, unidadesBySemestre)));
      const totalCredits = courses
        .reduce((acc, c) => acc + (parseFloat(c.credits) || 0), 0)
        .toFixed(1);

      return {
        title: existingLevel?.title ?? `NIVEL ${num}`,
        totalCredits,
        courses,
        open: existingLevel?.open,
      };
    }),
  );

  // Filtrar los niveles vacíos (null)
  const levels = allLevels.filter((l): l is StudyLevel => l !== null);

  return { ...existing, levels };
};

// ── Campos planos de la página de carrera (Inicio/Homepage) ───────────────────

export const mergeCarreraFromInicioPagina = async (
  acf: CarreraAcfSchema,
  existing: CarreraContent,
): Promise<CarreraContent> => {
  const result = { ...existing };

  if (acf.bannerimagen || acf.bannerimagentexto) {
    const imagenUrl = acf.bannerimagen ? await resolveMediaUrl(acf.bannerimagen) : "";
    result.hero = {
      ...result.hero,
      ...(acf.bannerimagentexto ? { description: acf.bannerimagentexto } : {}),
      ...(imagenUrl ? { images: [{ src: imagenUrl, alt: acf.bannerimagentexto ?? "" }] } : {}),
    };
  }

  if (acf.mision || acf.vision || acf.titulomision || acf.titulovision) {
    result.misionVision = existing.misionVision.map((item) => {
      if (item.title.toLowerCase().includes("misión") || item.title.toLowerCase().includes("mision")) {
        return {
          ...item,
          ...(acf.mision ? { description: acf.mision } : {}),
          ...(acf.titulomision ? { title: acf.titulomision } : {}),
        };
      }
      if (item.title.toLowerCase().includes("visión") || item.title.toLowerCase().includes("vision")) {
        return {
          ...item,
          ...(acf.vision ? { description: acf.vision } : {}),
          ...(acf.titulovision ? { title: acf.titulovision } : {}),
        };
      }
      return item;
    });
  }

  if (acf.esloganmotivacional) {
    result.profile = { ...result.profile, sectionTitle: acf.esloganmotivacional };
  }

  if (acf.perfilegreso && result.profile.cards.length > 0) {
    const cards = [...result.profile.cards];
    cards[0] = { ...cards[0], paragraphs: [acf.perfilegreso] };
    result.profile = { ...result.profile, cards };
  }

  if (acf.tituloperfilegreso && result.profile.cards.length > 0) {
    const cards = [...result.profile.cards];
    cards[0] = { ...cards[0], title: acf.tituloperfilegreso };
    result.profile = { ...result.profile, cards };
  }

  if (acf.campolaboral && result.profile.cards.length > 1) {
    const cards = [...result.profile.cards];
    cards[1] = {
      ...cards[1],
      paragraphs: [acf.campolaboral],
      cta: acf.mallacurricular
        ? {
            label: "Malla curricular",
            href: typeof acf.mallacurricular === "string"
              ? acf.mallacurricular
              : (acf.mallacurricular.url ?? ""),
          }
        : cards[1].cta,
    };
    result.profile = { ...result.profile, cards };
  }

  if (acf.titulocampolaboral && result.profile.cards.length > 1) {
    const cards = [...result.profile.cards];
    cards[1] = { ...cards[1], title: acf.titulocampolaboral };
    result.profile = { ...result.profile, cards };
  }

  // Normaliza videourl: puede llegar como string o como objeto link {url, title, target}
  const resolveVideoUrl = (v: typeof acf.videourl): string => {
    if (!v) return "";
    if (typeof v === "string") return v;
    return v.url ?? "";
  };

  const rawVideoUrl = resolveVideoUrl(acf.videourl);

  if (acf.descripcionacreditacioninternacional) {
    result.accreditation = {
      ...result.accreditation,
      paragraphs: [acf.descripcionacreditacioninternacional],
      ...(acf.enlaceacreditacioninternacional
        ? { cta: { ...result.accreditation.cta, href: acf.enlaceacreditacioninternacional } }
        : {}),
      ...(acf.tituloacreditacioninternacional ? { title: acf.tituloacreditacioninternacional } : {}),
      ...(rawVideoUrl ? { videoUrl: rawVideoUrl } : {}),
    };
  } else if (rawVideoUrl) {
    result.accreditation = {
      ...result.accreditation,
      videoUrl: rawVideoUrl,
    };
  }

  if (acf.tituloacreditacioninternacional && !acf.descripcionacreditacioninternacional) {
    result.accreditation = { ...result.accreditation, title: acf.tituloacreditacioninternacional };
  }

  if (acf.miniaturavideo) {
    const thumbnailUrl = await resolveMediaUrl(acf.miniaturavideo);
    if (thumbnailUrl) {
      result.accreditation = { ...result.accreditation, thumbnailUrl };
    }
  }

  if (acf.tituloprofesional || acf.jornada || acf.duracion || acf.modalidad) {
    result.infoCards = result.infoCards.map((card) => {
      const title = card.title.toLowerCase();
      if (title.includes("titulo") || title.includes("título") || title.includes("profesional")) {
        return { ...card, value: acf.tituloprofesional || card.value };
      }
      if (title.includes("jornada")) {
        return { ...card, value: acf.jornada || card.value };
      }
      if (title.includes("duración") || title.includes("duracion")) {
        return { ...card, value: acf.duracion || card.value };
      }
      if (title.includes("modalidad")) {
        return { ...card, value: acf.modalidad || card.value };
      }
      return card;
    });
  }

  // Imágenes de fondo para cada InfoCard
  if (acf.imagentituloprofesional || acf.imagenjornada || acf.imagenduracion || acf.imagenmodalidad) {
    const [imgTitulo, imgJornada, imgDuracion, imgModalidad] = await Promise.all([
      resolveMediaUrl(acf.imagentituloprofesional),
      resolveMediaUrl(acf.imagenjornada),
      resolveMediaUrl(acf.imagenduracion),
      resolveMediaUrl(acf.imagenmodalidad),
    ]);

    result.infoCards = result.infoCards.map((card) => {
      const title = card.title.toLowerCase();
      if ((title.includes("titulo") || title.includes("título") || title.includes("profesional")) && imgTitulo) {
        return { ...card, imagenFondo: imgTitulo };
      }
      if (title.includes("jornada") && imgJornada) {
        return { ...card, imagenFondo: imgJornada };
      }
      if ((title.includes("duración") || title.includes("duracion")) && imgDuracion) {
        return { ...card, imagenFondo: imgDuracion };
      }
      if (title.includes("modalidad") && imgModalidad) {
        return { ...card, imagenFondo: imgModalidad };
      }
      return card;
    });
  }

  if (acf.menuplanestudio) {
    result.planEstudios = { ...result.planEstudios, title: acf.menuplanestudio };
  }

  if (acf.menupersonal) {
    result.personal = { ...result.personal, title: acf.menupersonal };
  }

  if (acf.hometitulonoticiaactualidad) {
    result.proyectos = { ...result.proyectos, title: acf.hometitulonoticiaactualidad };
  }

  return result;
};

// ── Personal ──────────────────────────────────────────────────────────────────

export const mapPersonalPostToDocente = (
  post: PersonalPost,
  images: Record<string, string> = {},
): Docente => ({
  slug: post.slug,
  nombre: post.acf?.nombredocente ?? post.title.rendered,
  titulo: post.acf?.profesion ?? "",
  areadocencia: post.acf?.areadocencia ?? "",
  foto: images["fotodocente"] ?? resolveImageUrl(post.acf?.fotodocente),
  alt: post.acf?.nombredocente ?? post.title.rendered,
  especializacion: post.acf?.areaespecializacion ?? "",
  formacionAcademica: post.acf?.formacionacademica ? [post.acf.formacionacademica] : [],
  publicaciones: (() => {
    type LinkField = string | { url?: string; title?: string; target?: string } | null | undefined;
    const resolveLink = (v: LinkField): string => {
      if (!v) return "";
      if (typeof v === "string") return v;
      return v.url ?? "";
    };
    const links: Array<{ label: string; href: string }> = [];
    const gs = resolveLink(post.acf?.publicaciongooglescholar);
    if (gs) links.push({ label: "Google Scholar", href: gs });
    const rg = resolveLink(post.acf?.publicacionresearchgate);
    if (rg) links.push({ label: "ResearchGate", href: rg });
    return links;
  })(),
  email: post.acf?.correoinstitucional ?? "",
  ubicacion: post.acf?.ubicaciontrabajo ?? "",
  horario: post.acf?.horarioatencion ?? "",
});

export const mapPersonalPostToDecanatoProfile = (
  post: PersonalPost,
  images: Record<string, string> = {},
): DecanatoProfile => ({
  slug: post.slug,
  nombre: post.acf?.nombredecano ?? post.title.rendered,
  cargo: post.acf?.cargoasignado ?? "",
  foto: images["imagendecano"] ?? resolveImageUrl(post.acf?.imagendecano),
  alt: post.acf?.nombredecano ?? post.title.rendered,
  email: post.acf?.correoinstitucional ?? "",
  ubicacion: post.acf?.ubicaciontrabajo ?? "",
  horario: post.acf?.horaatencion ?? "",
  biografia: post.acf?.presentacionbreve ? [post.acf.presentacionbreve] : [],
});

export const mapPersonalPostToDireccionCarreraProfile = (
  post: PersonalPost,
  images: Record<string, string> = {},
): DireccionCarreraProfile => ({
  slug: post.slug,
  nombre: post.acf?.nombredireccioncarrera ?? post.title.rendered,
  cargo: post.acf?.cargo ?? "",
  foto: images["imagen"] ?? resolveImageUrl(post.acf?.imagen),
  alt: post.acf?.nombredireccioncarrera ?? post.title.rendered,
  email: post.acf?.correoinstitucionaldireccioncarrera ?? "",
  ubicacion: post.acf?.ubicacionfacultaddireccioncarrea ?? "",
  horario: post.acf?.tiempo ?? "",
  biografia: post.acf?.descripciondireccioncarrera ? [post.acf.descripciondireccioncarrera] : [],
});

export const mapPersonalPostToComisionProfile = (
  post: PersonalPost,
  images: Record<string, string> = {},
): ComisionProfile => ({
  slug: post.slug,
  nombre: post.acf?.nombrepersonalcomision ?? post.title.rendered,
  comision: post.acf?.tipocargocomision ?? "",
  foto: images["imagencomision"] ?? resolveImageUrl(post.acf?.imagencomision),
  alt: post.acf?.nombrepersonalcomision ?? post.title.rendered,
  email: post.acf?.emailcomision ?? "",
  ubicacion: post.acf?.ubicacionfacultadcomision ?? "",
  formacionAcademica: post.acf?.descripcioncomision ? [post.acf.descripcioncomision] : [],
});

export const mapPersonalPostToAdministrativo = (
  post: PersonalPost,
  images: Record<string, string> = {},
): PersonalAdministrativoItem => {
  const nombre =
    post.acf?.nombreadministracion ||
    post.acf?.nombrepersonalservicios ||
    post.title.rendered;
  const cargo = post.acf?.tipocargo || post.acf?.tipocargoservicios || "";
  const email =
    post.acf?.emailadministracionservicios ||
    post.acf?.emailpersonalservicios ||   // nombre correcto del campo servicios
    "";
  const ubicacion =
    post.acf?.telefonoadminstracionservicio ||
    post.acf?.ubicacionfacultadservicios ||  // nombre correcto del campo servicios
    "";
  const horario =
    post.acf?.descripcionbreveadministracionservicio ||
    post.acf?.horaatencionpersonalservicios ||  // nombre correcto del campo servicios
    "";
  const foto =
    images["imagenadministracion"] ||
    images["imagenpersonalservicios"] ||
    resolveImageUrl(post.acf?.imagenadministracion) ||
    resolveImageUrl(post.acf?.imagenpersonalservicios);

  return { slug: post.slug, nombre, cargo, foto, alt: nombre, email, ubicacion, horario };
};

// ── CPT Noticias ──────────────────────────────────────────────────────────────

export const mapNoticiaPost = (
  post: NoticiaPost,
  images: Record<string, string> = {},
): Noticia => {
  const rawDate = post.date ?? "";
  const fechaISO = rawDate.slice(0, 10);
  const fechaTexto = post.acf?.fechanotifica ?? fechaISO;

  const contenidoRaw = post.content?.rendered ?? "";
  const contenido = contenidoRaw
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();

  return {
    slug: post.slug,
    titulo: post.title?.rendered ?? post.slug,
    fechaISO,
    fechaTexto,
    resumen: contenido.slice(0, 200),
    contenido,
    imagen: images["imagennoticia"] ?? resolveImageUrl(post.acf?.imagennoticia),
    alt: post.title?.rendered ?? post.slug,
    href: "",
    autor: post.acf?.autor ?? "",
  };
};

export const mapNoticiaPostToProyecto = async (
  post: NoticiaPost,
  facultadSlug: string,
): Promise<Proyecto> => {
  const imagen = await resolveMediaUrl(post.acf?.imagennoticia);
  const titulo = post.acf?.titulonoticia ?? post.title.rendered;
  const fechaISO = (post.date ?? "").slice(0, 10);
  const fechaTexto = post.acf?.fechanotifica ?? fechaISO;

  return {
    slug: post.slug,
    titulo,
    fechaISO,
    fechaTexto,
    imagen,
    alt: titulo,
    href: `/${facultadSlug}/noticias/${post.slug}`,
  };
};

// ── Página Inicio — campos ACF planos ──────────────────────────────────────────

const mapMateriaFromAcf = async (row: PlanEstudiosMateriaAcf): Promise<MateriaPlanEstudios> => ({
  nombreMateria: row.nombremateria ?? "",
  resultadoAprendizaje: row.resultadoaprendizaje ?? "",
  creditos: row.creditos !== undefined ? String(row.creditos) : "",
  silaboEnlace: await resolveMediaUrl(row.silaboenlace),
});

export const mapInicioPaginaFromAcf = async (
  acf: InicioPaginaAcfSchema,
  images: Record<string, string> = {},
): Promise<InicioPaginaContent> => ({
  bannerImagen: images["bannerimagen"] ?? resolveImageUrl(acf.bannerimagen),
  bannerImagenTexto: acf.bannerimagentexto ?? "",
  bannerImagenEnlace: acf.bannerimagenenlace ?? "",
  tituloProfesional: acf.tituloprofesional ?? "",
  jornada: acf.jornada ?? "",
  duracion: acf.duracion ?? "",
  modalidad: acf.modalidad ?? "",
  mision: acf.mision ?? "",
  vision: acf.vision ?? "",
  eslogaMotivacional: acf.esloganmotivacional ?? "",
  perfilEgreso: acf.perfilegreso ?? "",
  campoLaboral: acf.campolaboral ?? "",
  mallaCurricular: typeof acf.mallacurricular === "string"
    ? acf.mallacurricular
    : (acf.mallacurricular?.url ?? ""),
  imagenNoticia: images["imagennoticia"] ?? resolveImageUrl(acf.imagennoticia),
  fechaNoticia: normalizeAcfDate(acf.fechanoticia),
  descripcionAcreditacionInternacional: acf.descripcionacreditacioninternacional ?? "",
  enlaceAcreditacionInternacional: acf.enlaceacreditacioninternacional ?? "",
  materiasPlanEstudios: await Promise.all((acf.planestudios ?? []).map(mapMateriaFromAcf)),
});

// ── CPT carrusel_carrera → HeroContent slides ─────────────────────────────────

export const mapCarruselFromAcf = (
  acf: import("@/lib/wordpress/acf/types").CarruselCarreraAcfSchema,
  images: Record<string, string>,
): import("@/types/api").HeroContent["images"] => {
  // Retorna los slides como array de imágenes para mantener compatibilidad
  // El HeroSection usa los campos directamente via heroSlides
  return [
    { src: images["slide1_imagen_fondo"] ?? "", alt: acf.slide1_titulo ?? "" },
    { src: images["slide2_imagen_fondo"] ?? "", alt: acf.slide2_titulo ?? "" },
    { src: images["slide3_imagen_fondo"] ?? "", alt: acf.slide3_titulo ?? "" },
    { src: images["slide4_imagen_fondo"] ?? "", alt: acf.slide4_titulo ?? "" },
  ].filter((img) => img.src !== "");
};

const resolveCtaUrl = (value: string | { url?: string; title?: string; target?: string } | undefined): string => {
  if (!value) return "#";
  if (typeof value === "string") return value;
  return value.url ?? "#";
};

export const mapCarruselToHeroSlides = (
  acf: import("@/lib/wordpress/acf/types").CarruselCarreraAcfSchema,
  images: Record<string, string>,
): import("@/types/carrera-content").HeroSlide[] => [
  {
    type: "acreditacion" as const,
    position: "center" as const,
    bg: images["slide1_imagen_fondo"] ?? "",
    overlay: images["slide1_imagen_superior"] ?? "",
    logoAcreditacion: images["slide1_logo_acreditacion"] ?? "",
    titulo: acf.slide1_titulo ?? "",
    badgeTexto: acf.slide1_badge_texto ?? "",
    duracion: acf.slide1_duracion ?? "",
    modalidadSedes: acf.slide1_modalidad_sedes ?? "",
    textoAcreditacion: acf.slide1_texto_acreditacion ?? "",
    botonEnlace: resolveCtaUrl(acf.slide1_boton_enlace),
  },
  {
    type: "carrera" as const,
    position: "center" as const,
    bg: images["slide2_imagen_fondo"] ?? "",
    overlay: images["slide2_imagen_superior"] ?? "",
    titulo: acf.slide2_titulo ?? "",
    eyebrow: acf.slide2_etiqueta_superior ?? "",
    subtitulo: acf.slide2_subtitulo ?? "",
  },
  {
    type: "taller" as const,
    position: "left" as const,
    bg: images["slide3_imagen_fondo"] ?? "",
    overlay: images["slide3_imagen_superior"] ?? "",
    titulo: acf.slide3_titulo ?? "",
    eyebrow: acf.slide3_etiqueta_superior ?? "",
    subtitulo: acf.slide3_subtitulo ?? "",
  },
  {
    type: "espacios" as const,
    position: "left" as const,
    bg: images["slide4_imagen_fondo"] ?? "",
    overlay: images["slide4_imagen_superior"] ?? "",
    titulo: acf.slide4_titulo ?? "",
    eyebrow: acf.slide4_etiqueta_superior ?? "",
    subtitulo: acf.slide4_subtitulo ?? "",
  },
].filter((slide) => slide.bg !== "");

export const mapRedesSocialesFromCpt = (
  posts: RedSocialPost[],
): FooterContent["socialLinks"] => {
  return posts
    .map((post) => {
      const tipoId = post.tipo_de_red_social?.[0];
      const platform = tipoId !== undefined ? RED_SOCIAL_ID_MAP[tipoId] : undefined;
      const url = post.acf?.redessociales?.url ?? "";
      if (!platform || !url) return null;
      return {
        label: platform.charAt(0).toUpperCase() + platform.slice(1),
        href: url,
        platform,
      } as FooterContent["socialLinks"][number];
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
};

// ── CPT enlaces de interés ────────────────────────────────────────────────────

export const mapEnlacesInteresFromCpt = (
  posts: import("@/lib/wordpress/acf/types").EnlaceInteresPost[],
): import("@/types/api").FooterLinkGroup => ({
  title: "Enlaces de interés",
  links: posts
    .map((post) => ({
      label: post.acf?.enlaces?.title ?? post.title.rendered,
      href: post.acf?.enlaces?.url ?? "",
    }))
    .filter((link) => link.href),
});
