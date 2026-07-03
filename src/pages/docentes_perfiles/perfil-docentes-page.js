import { DEFAULT_DOCENTE_SLUG, getDocenteBySlug } from "./perfil-docentes-data.js";
import { getProfileElements, renderDocenteProfile, setProfilePageTitle } from "./perfil-docentes-view.js";

function getDocenteSlugFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get("docente") || DEFAULT_DOCENTE_SLUG;
}

function initDocenteProfilePage() {
    var slug = getDocenteSlugFromUrl();
    var docente = getDocenteBySlug(slug);
    var elements = getProfileElements();

    renderDocenteProfile(elements, docente);
    setProfilePageTitle(docente.nombre);
}

initDocenteProfilePage();
