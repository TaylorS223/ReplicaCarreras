"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SugerenciaNoticia } from "@/app/[facultad]/noticias/buscar/sugerencias/route";

type NoticiasSearchFormProps = {
  facultad: string;
  initialQuery?: string;
};

export const NoticiasSearchForm = ({ facultad, initialQuery = "" }: NoticiasSearchFormProps) => {
  const [value, setValue] = useState(initialQuery);
  const [sugerencias, setSugerencias] = useState<SugerenciaNoticia[]>([]);
  const [abierto, setAbierto] = useState(false);
  const [indiceActivo, setIndiceActivo] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSugerencias = (q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.trim().length < 2) {
      setSugerencias([]);
      setAbierto(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/${facultad}/noticias/buscar/sugerencias?q=${encodeURIComponent(q)}`,
        );
        const data: SugerenciaNoticia[] = await res.json();
        setSugerencias(data);
        setAbierto(data.length > 0);
        setIndiceActivo(-1);
      } catch {
        setSugerencias([]);
      }
    }, 220);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    fetchSugerencias(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    setAbierto(false);
    router.push(`/${facultad}/noticias/buscar?q=${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!abierto || sugerencias.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndiceActivo((prev) => Math.min(prev + 1, sugerencias.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndiceActivo((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && indiceActivo >= 0) {
      e.preventDefault();
      const s = sugerencias[indiceActivo];
      setValue(s.texto);
      setAbierto(false);
      router.push(s.href);
    } else if (e.key === "Escape") {
      setAbierto(false);
    }
  };

  const handleSugerenciaClick = (s: SugerenciaNoticia) => {
    setValue(s.texto);
    setAbierto(false);
    router.push(s.href);
  };

  return (
    <div ref={wrapperRef} className="ap-search-wrapper">
      <form className="ap-search" onSubmit={handleSubmit} role="search">
        <input
          type="search"
          className="ap-search-input"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => sugerencias.length > 0 && setAbierto(true)}
          placeholder="Search..."
          aria-label="Buscar noticias"
          aria-autocomplete="list"
          aria-expanded={abierto}
          autoComplete="off"
        />
        <button type="submit" className="ap-search-btn" aria-label="Buscar">
          &#128269;
        </button>
      </form>

      {abierto && sugerencias.length > 0 && (
        <ul className="buscar-sugerencias ap-sug-list" role="listbox">
          {sugerencias.map((s, i) => (
            <li
              key={`${s.href}-${i}`}
              role="option"
              aria-selected={i === indiceActivo}
              className={`buscar-sugerencia-item${i === indiceActivo ? " is-active" : ""}`}
              onMouseDown={() => handleSugerenciaClick(s)}
            >
              <span className="buscar-sug-texto">{s.texto}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
