import type { NextConfig } from "next";

// Lee el hostname y protocolo del servidor de medios de WordPress desde variables de entorno.
// Si no están definidas se usa "localhost" como fallback seguro para desarrollo local.
const wpMediaHost = process.env.WORDPRESS_MEDIA_HOST ?? "localhost";
const wpMediaProtocol = (process.env.WORDPRESS_MEDIA_PROTOCOL ?? "http") as "http" | "https";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: wpMediaProtocol,
        hostname: wpMediaHost,
      },
    ],
  },
};

export default nextConfig;
