export type DecanatoProfile = {
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

export type DecanatoContent = {
  title: string;
  description: string;
  profiles: DecanatoProfile[];
};

