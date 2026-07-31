"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type NoticiasSearchFormProps = {
  facultad: string;
  initialQuery?: string;
};

export const NoticiasSearchForm = ({ facultad, initialQuery = "" }: NoticiasSearchFormProps) => {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`/${facultad}/noticias/buscar?q=${encodeURIComponent(q)}`);
  };

  return (
    <form className="ap-search" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        className="ap-search-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        aria-label="Buscar noticias"
      />
      <button type="submit" className="ap-search-btn" aria-label="Buscar">
        &#128269;
      </button>
    </form>
  );
};
