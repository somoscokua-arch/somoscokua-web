# Web de la Fundación Somos Cokua

Sitio web estático de la Fundación Somos Cokua (Caldas, Antioquia), hecho con [Astro](https://astro.build). No usa servidor ni base de datos. Tiene tres páginas: inicio (`/`), donación (`/dona`) y política de datos (`/politica-de-datos`).

El diseño aprobado está en `prototipo/somos-cokua.html`. El contexto del proyecto, las decisiones tomadas y los pendientes están en `CLAUDE.md`.

## Instalar y correr en local

Requisitos: [Node.js](https://nodejs.org) (versión LTS) y Git.

```bash
npm install        # instala las dependencias
npm run dev        # servidor local en http://localhost:4321
npm run build      # genera el sitio final en dist/
npm run preview    # previsualiza el sitio generado
```

## Dónde se editan los contenidos

Los textos no están dentro de los componentes: se editan en archivos JSON.

- `src/content/` — textos y listas: proyectos, eventos, cifras de impacto, línea de tiempo, informe de ejemplo, preguntas frecuentes, planes (personas y empresas) y textos de las secciones.
- `src/config/sitio.json` — datos de la fundación (nombre, NIT, dirección, correo, redes) y el interruptor `indexable`.
- `src/config/pagos.json` — enlaces de pago de los planes, donación única y datos de transferencia.

## Versión de prueba

Mientras `indexable` sea `false` en `src/config/sitio.json`, el sitio pide a los buscadores que no lo indexen (`noindex` y `robots.txt`). Hay que pasarlo a `true` el día del lanzamiento.
