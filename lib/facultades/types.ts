export type FacultadTheme = {
  colorPrimary: string;
  colorSecondary: string;
};

export type FacultadWordPressConfig = {
  baseUrl: string;
  micrositeId: string;
};

export type FacultadConfig = {
  slug: string;
  nombre: string;
  descripcion: string;
  logo: string;
  subdominio?: string | null;
  domain?: string;
  defaultCarreraSlug: string;
  theme: FacultadTheme;
  wordpressUrl?: string;
  wordpress: FacultadWordPressConfig;
};

export type FacultadRegistry = Record<string, FacultadConfig>;
