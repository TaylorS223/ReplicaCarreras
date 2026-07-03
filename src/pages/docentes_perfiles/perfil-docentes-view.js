export function getProfileElements() {
    return {
        nombre: document.getElementById("docente-nombre"),
        rol: document.getElementById("docente-rol"),
        foto: document.getElementById("docente-foto"),
        area: document.getElementById("docente-area"),
        correo: document.getElementById("docente-correo"),
        ubicacion: document.getElementById("docente-ubicacion"),
        horario: document.getElementById("docente-horario"),
        formacion: document.getElementById("docente-formacion"),
        scholar: document.getElementById("docente-scholar"),
        researchgate: document.getElementById("docente-researchgate")
    };
}

export function renderDocenteProfile(elements, docente) {
    elements.nombre.textContent = docente.nombre;
    elements.rol.textContent = docente.rol;
    elements.foto.src = docente.foto;
    elements.foto.alt = docente.nombre;
    elements.area.textContent = docente.areaEspecializacion;
    elements.correo.textContent = docente.correo;
    elements.ubicacion.textContent = docente.ubicacion;
    elements.horario.textContent = docente.horarioAtencion;
    elements.scholar.href = docente.scholar;
    elements.researchgate.href = docente.researchgate;

    elements.formacion.innerHTML = "";
    docente.formacion.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item;
        elements.formacion.appendChild(li);
    });
}

export function setProfilePageTitle(nombreDocente) {
    document.title = nombreDocente + " | Perfil docente";
}
