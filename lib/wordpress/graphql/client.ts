/**
 * Cliente GraphQL para WPGraphQL.
 * Usa la misma base URL de WordPress pero apunta al endpoint /graphql.
 */

const getGraphqlEndpoint = (): string => {
  const base =
    process.env.WORDPRESS_API_BASE_URL ??
    process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL ??
    "http://fcvt-backend.local/wp-json/wp/v2";

  // Reemplaza /wp-json/wp/v2 por /graphql, o simplemente agrega /graphql al dominio
  const origin = base.replace(/\/wp-json.*$/, "").replace(/\/+$/, "");
  return `${origin}/graphql`;
};

export const gqlFetch = async <T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> => {
  const endpoint = getGraphqlEndpoint();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed (${response.status}) for ${endpoint}`);
  }

  const json = await response.json() as { data?: T; errors?: unknown[] };

  if (json.errors?.length) {
    console.error("GraphQL errors:", json.errors);
  }

  return json.data as T;
};
