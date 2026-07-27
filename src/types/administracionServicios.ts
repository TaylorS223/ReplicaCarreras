export type PersonalAdministrativoItem = {
  slug: string;
  nombre: string;
  cargo: string;
  foto: string;
  alt: string;
  email: string;
  ubicacion: string;
  horario: string;
};

export type PersonalAdministrativoGroup = {
  title: string;
  items: PersonalAdministrativoItem[];
};

export type AdministracionServiciosContent = {
  title: string;
  description: string;
  groups: PersonalAdministrativoGroup[];
};
