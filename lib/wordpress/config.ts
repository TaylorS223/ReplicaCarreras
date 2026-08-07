const DEFAULT_BASE_URL = "http://localhost/wp-json/wp/v2";

export const getWordpressApiBaseUrl = () => {
  const baseUrl =
    process.env.WORDPRESS_API_BASE_URL ??
    DEFAULT_BASE_URL;

  return baseUrl.replace(/\/+$/, "");
};
