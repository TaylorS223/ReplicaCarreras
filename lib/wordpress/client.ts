import { getWordpressApiBaseUrl } from "@/lib/wordpress/config";

type QueryValue = string | number | boolean | undefined;
type QueryParams = Record<string, QueryValue>;

// Tipo para las opciones de Next.js fetch (revalidate, tags)
type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

type WordpressFetchOptions = RequestInit & {
  query?: QueryParams;
  next?: NextFetchRequestConfig;
};

const buildQueryString = (query?: QueryParams) => {
  if (!query) {
    return "";
  }

  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    params.set(key, String(value));
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};

const buildWordpressUrl = (path: string, query?: QueryParams) => {
  const baseUrl = getWordpressApiBaseUrl();
  const normalizedPath = path.replace(/^\/+/, "");
  const queryString = buildQueryString(query);

  return `${baseUrl}/${normalizedPath}${queryString}`;
};

export const wpFetch = async <T>(path: string, options?: WordpressFetchOptions) => {
  const { query, headers, next, ...init } = options ?? {};
  const url = buildWordpressUrl(path, query);

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(next ? { next } : {}),
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed (${response.status}) for ${url}`);
  }

  return (await response.json()) as T;
};
