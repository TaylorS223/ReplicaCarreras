export type DireccionCarreraProfile = {
  slug: string;
  nombre: string;
  cargo: string;
  foto: string;
  alt: string;
  email: string;
  ubicacion: string;
  horario: string;
  biografia: string[];
};

export type DireccionCarreraContent = {
  title: string;
  description: string;
  profiles: DireccionCarreraProfile[];
};

