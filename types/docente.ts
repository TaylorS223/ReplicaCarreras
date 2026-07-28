export type Docente = {
  slug: string;
  nombre: string;
  titulo: string;
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
};
