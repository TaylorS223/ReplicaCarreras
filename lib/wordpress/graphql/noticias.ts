import { gqlFetch } from "@/lib/wordpress/graphql/client";

type NoticiaContentResult = {
  noticias: {
    nodes: Array<{
      content: string | null;
      slug: string;
    }>;
  };
};

const NOTICIA_CONTENT_QUERY = `
  query GetNoticiaContent($slug: String!) {
    noticias(where: { name: $slug }) {
      nodes {
        slug
        content
      }
    }
  }
`;

export const getNoticiaContent = async (slug: string): Promise<string> => {
  try {
    const data = await gqlFetch<NoticiaContentResult>(NOTICIA_CONTENT_QUERY, { slug });
    const node = data?.noticias?.nodes?.[0];
    return node?.content ?? "";
  } catch (error) {
    console.error(`Error fetching noticia content for slug "${slug}":`, error);
    return "";
  }
};
