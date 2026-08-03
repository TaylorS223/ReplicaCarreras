export type Docente = {
  slug: string;
  nombre: string;
  titulo: string;       // campo profesion — usado en homepage (tarjeta)
  areadocencia: string; // campo areadocencia — usado en perfil individual (subtítulo)
  foto: string;
  alt: string;
  especializacion: string;
  formacionAcademica: string[];
  publicaciones: Array<{
    label: string;
    href: string;
  }>;
  email: string;
  ubicacion: string;
  horario?: string;
};
