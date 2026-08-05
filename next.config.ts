import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "replicacarreras.local",
      },
      {
        protocol: "https",
        hostname: "replicacarreras.local",
      },
      // Patrón genérico para el dominio de producción cuando lo tengas
      {
        protocol: "https",
        hostname: "*.uleam.edu.ec",
      },
    ],
  },
};

export default nextConfig;
