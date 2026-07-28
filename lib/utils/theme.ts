import type { CSSProperties } from "react";
import type { FacultadTheme } from "@/lib/facultades/types";

export const buildFacultadThemeVars = (theme: FacultadTheme): CSSProperties =>
  ({
    "--accent": theme.colorPrimary,
    "--accent-strong": theme.colorPrimary,
    "--brand-secondary": theme.colorSecondary,
  }) as CSSProperties;
