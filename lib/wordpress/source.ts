export type ContentSourceMode = "mock" | "acf";

const DEFAULT_SOURCE_MODE: ContentSourceMode = "mock";

export const getContentSourceMode = (): ContentSourceMode => {
  const rawValue = process.env.CONTENT_SOURCE_MODE?.toLowerCase();

  if (rawValue === "acf") {
    return "acf";
  }

  return DEFAULT_SOURCE_MODE;
};

export const isAcfSourceEnabled = () => getContentSourceMode() === "acf";
