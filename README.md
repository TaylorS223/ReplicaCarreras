# Portal de Carreras — ULEAM

Replica del micrositio de carreras de la Universidad Laica Eloy Alfaro de Manabí (ULEAM). Permite a cada carrera tener su propia sección con noticias, personal docente, plan de estudios, acreditación y más, conectado a WordPress como fuente de contenido.

---

## ¿Qué hace este proyecto?

- Muestra la información de cada carrera universitaria en su propio micrositio
- Se conecta a WordPress para obtener el contenido real (noticias, docentes, plan de estudios, etc.)
- Mientras WordPress no esté conectado, usa datos de ejemplo (llamados "mock") para que la página funcione de todas formas
- Incluye buscador general, buscador de noticias, modo de vista previa desde WordPress y más

---

## Tecnologías usadas

| Tecnología | Para qué sirve |
|---|---|
| **Next.js 15** | El framework principal que genera las páginas web |
| **React 18** | Para construir los componentes visuales |
| **TypeScript** | Para escribir el código con tipos y evitar errores |
| **Bun** | Reemplaza a npm/node, es más rápido para instalar paquetes y correr el proyecto |
| **WordPress + ACF** | El sistema de gestión de contenido donde los editores publican noticias, docentes, etc. |
| **ACF (Advanced Custom Fields)** | Plugin de WordPress que permite crear campos personalizados (imágenes, textos, fechas, etc.) |
| **CSS puro** | Para los estilos visuales, sin frameworks como Tailwind |

---

## Requisitos previos

Antes de empezar necesitas tener instalado:

1. **Bun** — el gestor de paquetes del proyecto

   - Mac/Linux: abre la Terminal y pega esto:
     ```bash
     curl -fsSL https://bun.sh/install | bash
     ```
   - Windows: abre PowerShell como administrador y pega esto:
     ```powershell
     powershell -c "irm bun.sh/install.ps1 | iex"
     ```
   - Verifica que se instaló correctamente:
     ```bash
     bun --version
     ```

2. **Git** — para descargar el proyecto
   - Descárgalo desde [git-scm.com](https://git-scm.com/)
   - Verifica:
     ```bash
     git --version
     ```

---

## Cómo correr el proyecto paso a paso

### 1. Descargar el proyecto

Abre la terminal (Mac) o PowerShell (Windows) y escribe:

```bash
git clone https://github.com/tu-usuario/replica-carreras.git
cd replica-carreras
```

> Si no tienes el enlace de Git, pide el archivo comprimido del proyecto y descomprímelo. Luego abre la terminal dentro de esa carpeta.

---

### 2. Instalar las dependencias

```bash
bun install
```

Esto descarga todos los paquetes necesarios. Solo hay que hacerlo una vez.

---

### 3. Configurar las variables de entorno

El proyecto necesita un archivo llamado `.env.local` en la carpeta raíz. Crea ese archivo (o pide una copia a tu equipo) con este contenido:

```env
# URL del servidor de WordPress local
WORDPRESS_URL=http://tu-wordpress.local

# Secreto compartido con WordPress para el modo preview
PREVIEW_SECRET=un-texto-secreto-largo-y-dificil-de-adivinar

# (Opcional) Activar WordPress como fuente de datos
# Si no lo pones, el proyecto usa datos de ejemplo
# CONTENT_SOURCE_MODE=acf
```

> **Nota:** El archivo `.env.local` nunca se sube a Git porque contiene información privada.

---

### 4. Correr el proyecto en modo desarrollo

```bash
bun dev
```

Luego abre tu navegador y ve a:

```
http://localhost:3000
```

Para ver la carrera de Arquitectura:

```
http://localhost:3000/arquitectura
```

> La primera vez que abres una página puede tardar unos segundos mientras Next.js la compila. Las siguientes cargas son inmediatas.

---

### 5. Construir para producción (cuando vas a publicar)

```bash
bun run build
bun run start
```

Esto genera una versión optimizada y la pone a correr. Es mucho más rápida que el modo desarrollo.

---

## Estructura del proyecto

```
replica-carreras/
│
├── app/                        # Páginas del sitio (rutas Next.js)
│   ├── [facultad]/             # Micrositio de cada facultad/carrera
│   │   ├── page.tsx            # Homepage de la carrera
│   │   ├── layout.tsx          # Estructura común (header, footer)
│   │   ├── noticias/           # Sección de noticias
│   │   ├── personal/           # Docentes, decanato, comisiones, etc.
│   │   ├── buscar/             # Buscador general
│   │   └── carreras/           # Páginas de carreras individuales
│   └── api/
│       └── preview/            # Endpoint para modo vista previa de WordPress
│
├── components/                 # Componentes visuales reutilizables
├── features/                   # Módulos por funcionalidad (noticias, búsqueda, etc.)
├── lib/
│   ├── content/                # Datos y lógica de contenido
│   │   ├── carreras-data.ts    # Datos de ejemplo de carreras
│   │   ├── facultades-data.ts  # Datos de ejemplo de facultades
│   │   ├── resolver.ts         # Funciones para leer el contenido
│   │   └── bootstrap.ts        # Sincroniza datos desde WordPress
│   └── wordpress/
│       ├── acf/                # Conexión con campos ACF de WordPress
│       └── services/           # Servicios para leer cada tipo de contenido
├── shared/
│   └── styles/                 # Archivos CSS globales
├── types/                      # Definiciones de tipos TypeScript
└── .env.local                  # Variables de entorno (NO se sube a Git)
```

---

## Cómo funciona el contenido

El proyecto tiene dos modos:

### Modo Mock (por defecto)
Usa datos de ejemplo guardados en el código. **No necesita WordPress.** Ideal para desarrollo cuando no tienes el servidor de WordPress disponible.

### Modo ACF (producción)
Se conecta a WordPress y lee el contenido real. Para activarlo, agrega esta línea en `.env.local`:

```env
CONTENT_SOURCE_MODE=acf
```

Cuando está en modo ACF, al cargar cualquier página el sistema:
1. Busca la página de la carrera en WordPress por su slug (ej. `carrera-arquitectura-arquitectura`)
2. Lee todos los campos ACF (noticias, docentes, plan de estudios, etc.)
3. Guarda los datos en memoria para servir las páginas rápido
4. En modo preview, siempre actualiza los datos desde WordPress para mostrar los cambios más recientes

---

## Vista previa desde WordPress (Preview Mode)

Cuando un editor en WordPress hace click en "Preview" en una noticia o página, el sistema:

1. WordPress llama a `http://localhost:3000/api/preview?secret=TU_SECRET&slug=/arquitectura/noticias/mi-noticia`
2. Next.js verifica el secreto y activa el modo borrador
3. Se carga la página con los datos más recientes de WordPress (incluso si no están publicados)
4. Aparece un **banner amarillo** en la parte inferior que dice "Modo vista previa activo"
5. Para salir, hacer click en el botón "Salir del preview" del banner

---

## Campos ACF de WordPress

Los editores controlan el contenido desde WordPress usando estos campos:

### Página de inicio de la carrera
| Campo | Nombre en ACF | Tipo |
|---|---|---|
| Imagen del banner | `bannerimagen` | Image |
| Texto del banner | `bannerimagentexto` | Text |
| Título profesional | `tituloprofesional` | Text |
| Misión | `mision` | Text |
| Visión | `vision` | Text |
| Perfil de egreso | `perfilegreso` | Text |
| Campo laboral | `campolaboral` | Text |
| Malla curricular | `mallacurricular` | Link |
| Descripción acreditación | `descripcionacreditacioninternacional` | Text |
| Plan de estudios | `planestudios` | Repeater |

### CPT Noticias
| Campo | Nombre en ACF | Tipo |
|---|---|---|
| Imagen | `imagennoticia` | Image |
| Fecha | `fechanoticia` | Date Picker |
| Autor | `autor` | Text |

---

## Rutas principales del sitio

| URL | Qué muestra |
|---|---|
| `/arquitectura` | Homepage de la carrera de Arquitectura |
| `/arquitectura/noticias` | Lista de todas las noticias |
| `/arquitectura/noticias/[slug]` | Detalle de una noticia |
| `/arquitectura/noticias/autor/[autor]` | Noticias de un autor |
| `/arquitectura/noticias/archivo/[mes]` | Noticias de un mes (ej. `2025-07`) |
| `/arquitectura/personal` | Lista de docentes |
| `/arquitectura/personal/[slug]` | Detalle de un docente |
| `/arquitectura/personal/decanato` | Página del decanato |
| `/arquitectura/personal/comisiones` | Página de comisiones |
| `/arquitectura/buscar?q=texto` | Resultados de búsqueda general |
| `/arquitectura/noticias/buscar?q=texto` | Búsqueda dentro de noticias |

---

## Solución a problemas comunes

**"No encuentra el comando bun"**
→ Cierra y vuelve a abrir la terminal después de instalar Bun. Si persiste, reinicia el equipo.

**"La página carga muy lento la primera vez"**
→ Es normal en modo desarrollo. Next.js compila cada página la primera vez que la visitas. Las siguientes cargas son rápidas. En producción (`bun run build`) esto no ocurre.

**"No veo cambios después de editar un archivo"**
→ El servidor de desarrollo detecta cambios automáticamente. Si no se actualiza, guarda el archivo de nuevo o reinicia con `bun dev`.

**"Error: Cannot find module"**
→ Corre `bun install` de nuevo. Puede que falten dependencias.

**"El preview de WordPress no funciona"**
→ Verifica que el `PREVIEW_SECRET` en `.env.local` sea exactamente igual al configurado en WordPress. Sin espacios extra.