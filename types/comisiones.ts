export type ComisionProfile = {
  slug: string;
  nombre: string;
  comision: string;
  foto: string;
  alt: string;
  email: string;
  ubicacion: string;
  formacionAcademica: string[];
};

export type ComisionesContent = {
  title: string;
  description: string;
  profiles: ComisionProfile[];
};

