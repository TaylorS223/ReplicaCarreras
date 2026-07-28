const DEFAULT_BASE_URL = "http://fcvt-backend.local/wp-json/wp/v2";

export const getWordpressApiBaseUrl = () => {
  const baseUrl =
    process.env.WORDPRESS_API_BASE_URL ??
    process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL ??
    DEFAULT_BASE_URL;

  return baseUrl.replace(/\/+$/, "");
};
