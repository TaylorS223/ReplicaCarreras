export type WpRenderedField = {
  rendered: string;
};

export type WpPage = {
  id: number;
  slug: string;
  title: WpRenderedField;
  content: WpRenderedField;
  acf?: Record<string, unknown>;
};
