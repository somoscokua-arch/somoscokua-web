# Somos Cokua — web de la Fundación Somos Cokua

Sitio estático (Astro, sin servidor ni base de datos) de la Fundación Somos Cokua, ESAL del Régimen Tributario Especial, Caldas, Antioquia.
El diseño está **aprobado** y es `prototipo/somos-cokua.html`: se respeta de forma exacta en colores, tipografías, textos, estructura y comportamiento. No rediseñar; solo cambiar lo que se pida.

## Comandos
- `npm run dev` — servidor local (http://localhost:4321)
- `npm run build` — genera `dist/`
- `npm run preview` — previsualiza el build

## Estructura
- `src/pages/` — `index.astro` (`/`), `dona.astro` (`/dona`), `politica-de-datos.astro` (`/politica-de-datos`)
- `src/config/sitio.json` — datos de la fundación (nombre, NIT, dirección, correo, redes). **Todo el sitio lee de aquí.**
- `src/config/pagos.json` — enlaces de pago (planes, donación única Wompi/PayPal) y datos de transferencia/QR.
- `src/content/*.json` — contenido editable, separado del diseño: `textos.json` (textos de secciones, menú, footer, mensajes), `proyectos`, `eventos`, `impacto` (cifras), `historia` (línea de tiempo), `informes` (informe mensual + archivo), `faq`, `planes`.
- `src/components/` — componentes de diseño (home/, dona/, formularios, Header, Footer, Photo, LogoSprite). No llevan textos propios.
- `src/styles/global.css` — CSS copiado del prototipo (más un bloque "Añadidos del proyecto" al final).
- `src/scripts/` — JS mínimo: calculadora de empresas, botones de plan, transferencia, formularios, resaltado del menú.

Algunos textos de los JSON contienen HTML (enlaces) y se pintan con `set:html`: `textos.json` (nota de transparencia, consentimientos) y `faq.json` (respuestas). Los enlaces internos usan rutas absolutas (`/#seccion`) para funcionar desde `/dona`.

## Decisiones tomadas
- Dos páginas reales: `/` y `/dona` (en el prototipo era `#dona`). Menú y botones "Dona aquí" apuntan a `/dona`.
- Se eliminó la franja superior "Prototipo de rediseño".
- Fotos: por ahora son los bloques de color del prototipo (`Photo.astro`). No se han descargado imágenes.
- Planes sin enlace en `pagos.json`: el botón no abre nada y muestra "La suscripción mensual se habilitará muy pronto. Mientras tanto, puedes hacer una donación única con los canales de abajo." (en `textos.json` → `dona.planSinEnlace`). Con URL, el botón abre el enlace en pestaña nueva.
- Wompi y PayPal de donación única son **reales** (copiados del prototipo).
- "Transferencia Bancolombia" abre un panel con los datos de `pagos.json → transferencia` (banco, tipo, número, titular, QR). Mientras estén vacíos muestra "Escríbenos para recibir los datos de la cuenta."
- Formularios (voluntariado y certificado): validan, pero **no envían**. Muestran "Este formulario aún no está activo. Escríbenos a {correo} y te respondemos." (el correo sale de `sitio.json`). Se mantiene la casilla de autorización de datos (Ley 1581 de 2012) enlazada a `/politica-de-datos`.
- Footer: "Preguntas frecuentes" → `/dona#preguntas`; TikTok se oculta mientras `sitio.json → redes.tiktok` esté vacío; "Documentos de constitución legal" → `/#transparencia` (provisional).
- `lang="es"`, meta description por página (en `textos.json → meta`), favicon provisional (`public/favicon.svg`).
- El informe mensual de ejemplo (Octubre 2026) lleva el sello "Datos de ejemplo"; el archivo de informes dice "Disponible al lanzar".

## Pendientes
1. **Enlaces de pasarela** de los planes Amigo, Aliado y Padrino (`pagos.json → planes.*.url`, marcados "PENDIENTE: enlace de la pasarela de la fundación").
2. **Datos de la cuenta Bancolombia** y la imagen del QR (`pagos.json → transferencia`; poner el QR en `public/`).
3. **NIT** de la fundación (`sitio.json → nit.valor`). Aparece en el footer y en la política de datos cuando se complete.
4. **Confirmar el correo de contacto** `cokua.oficial@gmail.com` con la fundación.
5. **URL de TikTok** (`sitio.json → redes.tiktok`); hoy oculto.
6. **Política de datos**: es un borrador con aviso visible "Borrador pendiente de revisión por la fundación". La fundación (idealmente con asesoría legal) debe revisarlo, completar NIT y fecha de vigencia y quitar el aviso.
7. **Documentos de constitución legal**: falta el enlace real (hoy apunta a `/#transparencia`; en `informes.json → archivo` figura "Enlace de la web actual").
8. **Mensajes provisionales que cambian al activar funciones**: el de los planes (cuando haya pasarela) y el de los formularios (cuando haya envío real; ver `src/scripts/formularios.ts`).
9. **Fotos reales** (hero, proyectos, historia del mes) — reemplazar los bloques de color.
10. **Informes mensuales reales** (Septiembre y Agosto 2026) y reemplazar el informe de ejemplo.
11. **Logo**: es una recreación provisional (SVG en `LogoSprite.astro`); sustituir por el oficial.
12. **Panel de edición** para que la fundación actualice los JSON de `src/content/` y `src/config/` sin tocar código (candidatos: Keystatic, Decap CMS).
13. **Envío real de formularios** (voluntariado y certificado) y **dominio/hosting**.
14. Enlace "TikTok" y favicon definitivo.
