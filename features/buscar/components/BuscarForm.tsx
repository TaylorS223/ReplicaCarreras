"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type BuscarFormProps = {
  facultad: string;
  initialQuery: string;
};

export const BuscarForm = ({ facultad, initialQuery }: BuscarFormProps) => {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`/${facultad}/buscar?q=${encodeURIComponent(q)}`);
  };

  return (
    <form className="buscar-form" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        className="buscar-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar en el micrositio..."
        aria-label="Buscar"
        autoFocus
      />
      <button type="submit" className="buscar-btn">Buscar</button>
    </form>
  );
};
