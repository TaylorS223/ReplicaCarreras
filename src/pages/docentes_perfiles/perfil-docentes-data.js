export const DEFAULT_DOCENTE_SLUG = "abel-quimis-chilan";

const DEFAULT_DOCENTE = {
    rol: "Docente carrera de Arquitectura",
    correo: "Informacion institucional en actualizacion",
    ubicacion: "Edificio Carrera de Arquitectura - FIIA B07",
    areaEspecializacion: "Informacion en actualizacion.",
    horarioAtencion: "9h00 - 18h00",
    formacion: ["Informacion academica en actualizacion."],
    scholar: "https://scholar.google.com",
    researchgate: "https://www.researchgate.net"
};

function createDocente(overrides) {
    return Object.assign({}, DEFAULT_DOCENTE, overrides);
}

export const DOCENTES = {
    "abel-quimis-chilan": createDocente({
        nombre: "Abel Emilio Quimis Chilan",
        foto: "src/assets/imagenes/QUIMIS-ABEL-150x150.png",
        correo: "abel.quimis@uleam.edu.ec",
        areaEspecializacion: "Diseno curricular y arquitectura urbana",
        formacion: [
            "Arquitecto; Universidad Laica Eloy Alfaro de Manabi",
            "Especialista en Diseno Curricular por Competencias; Universidad del Mar",
            "Magister en arquitectura mencion diseno urbano; Universidad Laica Eloy Alfaro de Manabi"
        ]
    }),
    "alejandro-mendoza-chavez": createDocente({ nombre: "Alejandro Mendoza Chavez", rol: "Arquitecto", foto: "src/assets/imagenes/MENDOZA-ALEJANDRO-150x150.png" }),
    "andrea-intriago-landazuri": createDocente({ nombre: "Andrea Intriago Landazuri", rol: "Arquitecta", foto: "src/assets/imagenes/INTRIAGO-ANDREA-150x150.png" }),
    "armando-zambrano-loor": createDocente({ nombre: "Armando Zambrano Loor", rol: "Arquitecto", foto: "src/assets/imagenes/ZAMBRANO-ARMANDO-150x150.png" }),
    "cesar-palma-espinel": createDocente({ nombre: "Cesar Palma Espinel", rol: "Arquitecto", foto: "src/assets/imagenes/CESAR-PALMA-150x150.png" }),
    "cristhian-melgar-veliz": createDocente({ nombre: "Cristhian Melgar Veliz", rol: "Arquitecto", foto: "src/assets/imagenes/MELGAR-CRISTHIAN-150x150.png" }),
    "erick-cevallos-viera": createDocente({ nombre: "Erick Cevallos Viera", rol: "Arquitecto", foto: "src/assets/imagenes/CEVALLOS-ERICK-150x150.png" }),
    "fabricio-ormaza-garcia": createDocente({ nombre: "Fabricio Ormaza Garcia", rol: "Arquitecto", foto: "src/assets/imagenes/ORMAZA-FABRICIO-150x150.png" }),
    "fernando-represa-perez": createDocente({ nombre: "Fernando Represa Perez", rol: "Doctor", foto: "src/assets/imagenes/FERNANDO-REPRESA-150x150.png" }),
    "francisco-delgado-sanz": createDocente({ nombre: "Francisco Delgado Sanz", rol: "Ingeniero", foto: "src/assets/imagenes/DELGADO-FRANCISCO-150x150.png" }),
    "fulton-pesantes-macias": createDocente({
        nombre: "Fulton Harold Pesantes Macias",
        rol: "Docente carrera de Arquitectura",
        foto: "src/assets/imagenes/FULTON-PESANTES-150x150.png",
        correo: "fultonh.pesantes@uleam.edu.ec",
        areaEspecializacion: "Construccion, planificacion de viviendas",
        horarioAtencion: "9h00 - 18h00",
        formacion: [
            "Arquitecto; Universidad Laica Eloy Alfaro de Manabi",
            "Maestria en Planificacion de Viviendas mencion Bambu-Guadua; Universidad Laica Eloy Alfaro de Manabi Ecuador"
        ]
    }),
    "gabriel-barba-espinel": createDocente({ nombre: "Gabriel Barba Espinel", rol: "Arquitecto", foto: "src/assets/imagenes/BARBA-GABRIEL-150x150.png" }),
    "marcos-gallo-zambrano": createDocente({ nombre: "Marcos Gallo Zambrano", rol: "Arquitecto", foto: "src/assets/imagenes/GALLO-MARCOS-150x150.png" }),
    "nadia-aveiga-villacis": createDocente({ nombre: "Nadia Aveiga Villacis", rol: "Arquitecta", foto: "src/assets/imagenes/AVEIGA-NADIA-150x150.png" }),
    "nemar-torres-reyes": createDocente({ nombre: "Nemar Torres Reyes", rol: "Arquitecto", foto: "src/assets/imagenes/TORRES-NEMAR-150x150.png" }),
    "pablo-garcia-delgado": createDocente({ nombre: "Pablo Garcia Delgado", rol: "Arquitecto", foto: "src/assets/imagenes/GARCIA-PABLO-150x150.png" }),
    "ricardo-avila-avila": createDocente({ nombre: "Ricardo Avila Avila", rol: "Arquitecto", foto: "src/assets/imagenes/AVILA-RICARDO-150x150.png" }),
    "tatiana-cedeno-delgado": createDocente({ nombre: "Tatiana Cedeno Delgado", rol: "Arquitecta", foto: "src/assets/imagenes/CEDENO-TATIANA-150x150.png" }),
    "valeria-moreira-zambrano": createDocente({ nombre: "Valeria Moreira Zambrano", rol: "Arquitecta", foto: "src/assets/imagenes/MOREIRA-VALERIA-150x150.png" }),
    "winderson-muentes-rivera": createDocente({ nombre: "Winderson Muentes Rivera", rol: "Arquitecto", foto: "src/assets/imagenes/WINDERSON-MUENTES-150x150.png" })
};

export function getDocenteBySlug(slug) {
    return DOCENTES[slug] || DOCENTES[DEFAULT_DOCENTE_SLUG];
}
