import { getWordpressApiBaseUrl } from "@/lib/wordpress/config";

type QueryValue = string | number | boolean | undefined;
type QueryParams = Record<string, QueryValue>;

type WordpressFetchOptions = RequestInit & {
  query?: QueryParams;
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
  const { query, headers, ...init } = options ?? {};
  const url = buildWordpressUrl(path, query);

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed (${response.status}) for ${url}`);
  }

  return (await response.json()) as T;
};
