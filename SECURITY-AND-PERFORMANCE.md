# Seguridad, Rendimiento y SEO — Guía técnica

Documentación técnica de las mejoras aplicadas al proyecto.  
**Este documento no contiene URLs reales, credenciales, nombres de instituciones ni datos operativos.**

---

## Índice

1. [Seguridad](#1-seguridad)
2. [Cacheo y Revalidación](#2-cacheo-y-revalidación)
3. [Rendimiento — Core Web Vitals](#3-rendimiento--core-web-vitals)
4. [SEO](#4-seo)
5. [Bundle y Hidratación](#5-bundle-y-hidratación)
6. [Variables de entorno](#6-variables-de-entorno)
7. [Configuración del webhook en WordPress](#7-configuración-del-webhook-en-wordpress)
8. [Checklist antes de desplegar](#8-checklist-antes-de-desplegar)

---

## 1. Seguridad

### Secretos fuertes
Los endpoints sensibles (`/api/preview` y `/api/revalidate`) requieren un secreto en la variable de entorno correspondiente. El valor debe generarse con un generador criptográfico:

```bash
openssl rand -hex 32
```

Cada secreto debe ser único y diferente entre sí. Nunca se escriben directamente en el código.

### Variables server-only
La URL de la API interna de WordPress se lee **únicamente** desde una variable sin prefijo `NEXT_PUBLIC_`. El prefijo `NEXT_PUBLIC_` hace que las variables sean visibles en el bundle de JavaScript del navegador — una URL de API interna nunca debe exponerse así.

Regla: si una variable es para uso exclusivo del servidor (fetch a APIs privadas, secretos, tokens), no debe tener `NEXT_PUBLIC_` en el nombre.

### Dominio de imágenes dinámico
`next/image` requiere declarar qué dominios externos pueden servir imágenes (`remotePatterns` en `next.config.ts`). En lugar de escribir el dominio directamente en el código, se lee desde dos variables de entorno:

- Una variable para el hostname del servidor de medios.
- Una variable para el protocolo (`http` en desarrollo, `https` en producción).

Esto garantiza que al cambiar de entorno solo se edita el `.env`, sin tocar código.

### Validación timing-safe
Ambos endpoints sensibles (preview y revalidación) validan el secreto con una comparación de tiempo constante (XOR byte a byte), lo que evita ataques de temporización que permitirían adivinar el secreto midiendo diferencias de tiempo en las respuestas.

---

## 2. Cacheo y Revalidación

### ISR con tags (Incremental Static Regeneration)
Antes, todos los `fetch` a WordPress usaban `cache: "no-store"`, lo que significa que **cada visita a cualquier página disparaba en tiempo real todas las llamadas REST y GraphQL** al servidor de WordPress.

Ahora cada `fetch` usa `next: { revalidate: 3600, tags: [...] }`:

- **`revalidate: 3600`** — Next.js almacena la respuesta en caché por 1 hora. Si WordPress no cambia, el servidor no hace ninguna llamada durante ese tiempo.
- **`tags`** — cada tipo de contenido tiene uno o más tags identificadores (por ejemplo `"noticias"`, `"personal"`, `"semestres"`). Esto permite invalidar solo el tipo de contenido que cambió, sin refrescar todo el sitio.

Tags definidos:
- `wp-pages` — páginas ACF de configuración de facultad/carrera
- `personal` / `personal-{tipo}` — personal docente y administrativo
- `semestres` — materias del plan de estudios
- `noticias` — noticias y proyectos
- `redes-sociales` — redes sociales del footer
- `enlaces-interes` — enlaces del footer
- `wp-media` — resolución de IDs de media a URLs
- `carrusel` — slides del hero
- `graphql` — todas las consultas GraphQL (visibilidad de submenús)

### Revalidación instantánea por webhook
Se creó el endpoint `POST /api/revalidate` que permite a WordPress notificar al sitio cuando se publica o edita contenido, invalidando inmediatamente el caché del tag correspondiente — sin esperar que expire el tiempo de revalidación.

El endpoint requiere el header `X-Revalidate-Secret` con el valor de la variable `REVALIDATE_SECRET` y un body JSON `{ "tag": "noticias" }`.

---

## 3. Rendimiento — Core Web Vitals

### next/image en todas las imágenes
Se reemplazaron todos los elementos `<img>` planos por el componente `<Image>` de Next.js en todos los componentes y páginas del proyecto. Esto activa automáticamente:

- Conversión a **WebP/AVIF** — formatos modernos con menor peso.
- **Lazy loading** por defecto — las imágenes fuera del viewport no se cargan hasta que el usuario las necesita.
- **Tamaños responsivos** (`sizes`) — el navegador descarga solo el tamaño de imagen necesario para la pantalla actual.
- **Priority** en imágenes LCP — la imagen principal above-the-fold de cada página tiene `priority={true}`, lo que la precarga para mejorar el LCP (Largest Contentful Paint).

---

## 4. SEO

### Sitemap dinámico
Se creó `app/sitemap.ts` que genera automáticamente `sitemap.xml` con las URLs de todas las facultades, carreras y secciones registradas. La URL base se lee de `NEXT_PUBLIC_SITE_URL`.

### robots.txt dinámico
Se creó `app/robots.ts` que genera `robots.txt` apuntando al sitemap correcto y bloqueando la indexación de `/api/`.

### generateMetadata por página
Se añadió `generateMetadata` en cada página individual que no lo tenía:
- Página de noticias (`/[facultad]/noticias`)
- Detalle de noticia (`/[facultad]/noticias/[slug]`) — incluye OG image dinámica desde WordPress
- Página de personal docente (`/[facultad]/personal`)
- Detalle de carrera (`/[facultad]/carreras/[carrera]`) — title, description e imagen desde los datos de WordPress

En el detalle de noticia y carrera, los metadatos se extraen de los datos ya hidratados desde WordPress, por lo que responden a cambios en el CMS.

---

## 5. Bundle y Hidratación

### ParticleNetwork con lazy loading
El componente canvas de partículas (`ParticleNetwork`) usa APIs del navegador (`window`, `devicePixelRatio`, `requestAnimationFrame`) que no existen en el servidor. Se importa con `next/dynamic` y `{ ssr: false }`, lo que:

- Excluye el componente del bundle del servidor (sin hydration warnings).
- Lo carga de forma asíncrona solo en el cliente, después del render inicial.
- Reduce el JS del bundle inicial de la página.

### Patrón Server + Client Wrapper para reveal-on-scroll
Los componentes de secciones (`MisionVision`, `DatosCarrera`, `ProyectosSection`, `AcreditacionSection`, `PersonalDocenteSection`) se dividieron en dos capas:

**Capa servidor** (componente sin `"use client"`): renderiza el HTML del contenido real. Este HTML se genera en el servidor y se envía pre-renderizado al navegador.

**Capa cliente** (wrapper `*Wrapper.tsx` con `"use client"`): solo contiene el `useReveal` hook y una etiqueta `<section>` que aplica las clases CSS de animación. Recibe el contenido del servidor como `children`.

```
<SeccionWrapper>          ← client: solo maneja clases CSS de reveal
  [contenido HTML]        ← server: generado en servidor, llega pre-renderizado
</SeccionWrapper>
```

Esto mantiene el beneficio del reveal-on-scroll sin convertir secciones enteras con contenido dinámico en bundles de cliente.

---

## 6. Variables de entorno

Todas las variables están documentadas en `.env.example`. Esta es la lista con su propósito:

| Variable | Propósito |
|---|---|
| `WORDPRESS_API_BASE_URL` | URL del endpoint REST de WordPress. Server-only. |
| `WORDPRESS_MEDIA_HOST` | Hostname del servidor de medios (para `next/image` remotePatterns). |
| `WORDPRESS_MEDIA_PROTOCOL` | Protocolo del servidor de medios: `http` o `https`. |
| `CONTENT_SOURCE_MODE` | `mock` para desarrollo local, `acf` para WordPress real. |
| `PREVIEW_SECRET` | Secreto del endpoint de Draft Mode preview. |
| `REVALIDATE_SECRET` | Secreto del endpoint de revalidación por webhook. |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio frontend (usada en sitemap y robots). |

---

## 7. Configuración del webhook en WordPress

Para que el contenido nuevo publicado en WordPress invalide el caché del sitio de forma instantánea, agrega el siguiente código en `functions.php` de tu tema hijo (o en un plugin personalizado):

```php
<?php
/**
 * Webhook de revalidación para el sitio Next.js.
 * Se dispara cuando se guarda, publica o actualiza cualquier post.
 */
add_action( 'save_post', 'nextjs_revalidate_on_save', 10, 3 );

function nextjs_revalidate_on_save( int $post_id, WP_Post $post, bool $update ): void {
    // Evitar auto-saves y revisiones
    if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) return;
    if ( wp_is_post_revision( $post_id ) ) return;
    if ( $post->post_status !== 'publish' ) return;

    // Mapea el tipo de post al tag de caché correspondiente
    $tag_map = [
        'post'              => 'noticias',
        'noticias'          => 'noticias',
        'docentes'          => 'personal',
        'decano'            => 'personal',
        'comision'          => 'personal',
        'administracion'    => 'personal',
        'servicios'         => 'personal',
        'direccion_carrera' => 'personal',
        'semestres'         => 'semestres',
        'redsocial'         => 'redes-sociales',
        'enlace_de_interes' => 'enlaces-interes',
        'carrusel_carrera'  => 'carrusel',
        'page'              => 'wp-pages',
    ];

    $tag = $tag_map[ $post->post_type ] ?? 'wp-pages';

    // URL y secreto desde constantes de WordPress (definidas en wp-config.php)
    $revalidate_url    = defined('NEXTJS_REVALIDATE_URL')    ? NEXTJS_REVALIDATE_URL    : '';
    $revalidate_secret = defined('NEXTJS_REVALIDATE_SECRET') ? NEXTJS_REVALIDATE_SECRET : '';

    if ( empty($revalidate_url) || empty($revalidate_secret) ) return;

    wp_remote_post( $revalidate_url, [
        'timeout'     => 10,
        'headers'     => [
            'Content-Type'          => 'application/json',
            'X-Revalidate-Secret'   => $revalidate_secret,
        ],
        'body' => json_encode( [ 'tag' => $tag ] ),
    ]);
}
```

En `wp-config.php` define:

```php
define( 'NEXTJS_REVALIDATE_URL',    'https://tu-sitio-next.com/api/revalidate' );
define( 'NEXTJS_REVALIDATE_SECRET', 'el-valor-de-REVALIDATE_SECRET-del-.env' );
```

> **Nunca** escribas el secreto directamente en `functions.php`. Siempre usa constantes definidas en `wp-config.php`, que no se sube al control de versiones.

**Tags disponibles para el body del webhook:**
`wp-pages`, `personal`, `semestres`, `noticias`, `redes-sociales`, `enlaces-interes`, `wp-media`, `carrusel`, `graphql`

---

## 8. Checklist antes de desplegar

### Configuración obligatoria

- [ ] Generar `PREVIEW_SECRET` seguro con `openssl rand -hex 32` y añadirlo al `.env` de producción.
- [ ] Generar `REVALIDATE_SECRET` seguro (distinto al anterior) y añadirlo al `.env` de producción.
- [ ] Configurar `WORDPRESS_API_BASE_URL` con la URL del WordPress de producción.
- [ ] Configurar `WORDPRESS_MEDIA_HOST` con el hostname del servidor de medios de producción.
- [ ] Configurar `WORDPRESS_MEDIA_PROTOCOL=https` en producción.
- [ ] Configurar `NEXT_PUBLIC_SITE_URL` con la URL pública definitiva del sitio.
- [ ] Configurar `CONTENT_SOURCE_MODE=acf` en producción.

### Configuración en WordPress

- [ ] Añadir el código del webhook en `functions.php` o plugin personalizado.
- [ ] Definir `NEXTJS_REVALIDATE_URL` y `NEXTJS_REVALIDATE_SECRET` en `wp-config.php`.
- [ ] Verificar que las llamadas del webhook llegan correctamente (revisar logs de WordPress o usar un plugin de log de HTTP).

### Seguridad en WordPress

- [ ] Deshabilitar XML-RPC si no se usa (plugin: Disable XML-RPC o filtro `xmlrpc_enabled`).
- [ ] Deshabilitar la ruta `/wp-json/wp/v2/users` si no es necesaria para el frontend.
- [ ] Configurar CORS en WordPress para aceptar solo el dominio del frontend (plugin: CORS o código en `functions.php`).
- [ ] Asegurarse de que ningún tipo de post tenga permisos de escritura pública en el REST API.

### Verificación final

- [ ] Confirmar que `sitemap.xml` es accesible en producción y lista todas las URLs esperadas.
- [ ] Confirmar que `robots.txt` apunta al sitemap correcto.
- [ ] Probar el endpoint de preview con un borrador de WordPress.
- [ ] Probar el endpoint de revalidación manualmente con `curl`:
  ```bash
  curl -X POST https://tu-sitio.com/api/revalidate \
    -H "Content-Type: application/json" \
    -H "X-Revalidate-Secret: TU_REVALIDATE_SECRET" \
    -d '{"tag":"noticias"}'
  ```
- [ ] Verificar en DevTools que las imágenes se sirven en formato WebP.
- [ ] Verificar que `NEXT_PUBLIC_WORDPRESS_API_BASE_URL` **no** está definida en ningún `.env` de producción.
