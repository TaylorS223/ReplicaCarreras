# WordPress ACF integration (preparada)

Esta carpeta quedó lista para activar ACF sin romper el flujo actual con mocks.

## Modo actual

- Fuente activa: `mock`
- Datos leídos desde:
  - `lib/content/facultades-data.ts`
  - `lib/content/carreras-data.ts`

## Estructura ACF lista

- `lib/wordpress/client.ts`: cliente REST (`wpFetch`)
- `lib/wordpress/config.ts`: URL base REST (`WORDPRESS_API_BASE_URL`)
- `lib/wordpress/acf/repository.ts`: lectura de páginas ACF por slug
- `lib/wordpress/acf/mappers.ts`: mapeo de `acf.content` a tipos de dominio
- `lib/wordpress/acf/syncContentStore.ts`: inyección en los stores `FACULTADES_CONTENT` y `CARRERAS_CONTENT`
- `lib/content/bootstrap.ts`: helper para hidratar contexto

## Convención de slugs ACF

- Facultad: `facultad-{facultadSlug}`
- Carrera: `carrera-{facultadSlug}-{carreraSlug}`

## Shape esperado en ACF

Cada página debe tener un campo `acf.content` con estructura completa:

- Facultad: `FacultadContent`
- Carrera: `CarreraContent`

## Activación para pruebas (mañana)

1. Levantar WordPress local.
2. Definir variables de entorno:

```bash
CONTENT_SOURCE_MODE=acf
WORDPRESS_API_BASE_URL=http://tu-wp.local/wp-json/wp/v2
```

3. En rutas/layout server-side, ejecutar antes de leer contenido:

```ts
await hydrateContentForContext({ facultadSlug, carreraSlug });
```

Si `CONTENT_SOURCE_MODE` no es `acf`, no hace fetch y todo sigue con mocks.
