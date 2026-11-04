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
- `src/content/*.json` — contenido editable, separado del diseño: `textos.json` (textos de secciones, menú, footer, mensajes), `proyectos`, `eventos`, `impacto` (cifras), `historia` (línea de tiempo), `informes` (solo la tarjeta de ejemplo de Transparencia), `faq`, `planes` (personas) y `planes-empresas`.
- `src/components/` — componentes de diseño (home/, dona/, formularios, Header, Footer, Photo, LogoSprite). No llevan textos propios.
- `src/styles/global.css` — CSS copiado del prototipo (más un bloque "Añadidos del proyecto" al final).
- `src/scripts/` — JS mínimo: calculadora de empresas, botones de plan, transferencia, formularios, resaltado del menú.

Algunos textos de los JSON contienen HTML (enlaces) y se pintan con `set:html`: `textos.json` (nota de transparencia, consentimientos) y `faq.json` (respuestas). Los enlaces internos usan rutas absolutas (`/#seccion`) para funcionar desde `/dona`.

## Decisiones tomadas
- Dos páginas reales: `/` y `/dona` (en el prototipo era `#dona`). Menú y botones "Dona aquí" apuntan a `/dona`.
- Se eliminó la franja superior "Prototipo de rediseño".
- **Fotos reales** (de la web actual, propiedad de la fundación) en `src/assets/fotos/`, reducidas a ≤2000 px de ancho y mostradas con `<Image>` de Astro (WebP y tamaños para celular) mediante `Photo.astro`. Cada foto lleva su texto alternativo y su punto de enfoque (`object-position`) en los JSON (`proyectos.json`, `textos.json`). Sin foto, el componente vuelve al espacio de color. Inventario completo (origen, URL original, uso, alt, menores identificables) en `src/assets/fotos/inventario.md`.
- **Logo original** (`src/assets/logo-cokua.png`, PNG transparente 995×728, el mismo que la web actual) en encabezado, "Quiénes somos" y footer, vía `Logo.astro`. Reemplazó al SVG recreado.
- La portada de "Ayuda por el terremoto" en la web actual es el logo; aquí se usó una foto de esa publicación con voluntarios organizando ayudas (sin personas afectadas identificables). En el repositorio solo entran las fotos en uso y el logo; las demás se listan con su URL original en `inventario.md` (`src/assets/fotos/no-usadas/` está en `.gitignore` por si se descargan).
- No se usaron por ahora fotos nuevas para "Quiénes somos" ni "Historia" (hay propuestas en la conversación y fotos disponibles en el inventario).
- Planes sin enlace en `pagos.json`: el botón no abre nada y muestra "La suscripción mensual se habilitará muy pronto. Mientras tanto, puedes hacer una donación única con los canales de abajo." (en `textos.json` → `dona.planSinEnlace`). Con URL, el botón abre el enlace en pestaña nueva.
- Wompi y PayPal de donación única son **reales** (copiados del prototipo).
- "Transferencia Bancolombia" abre un panel con los datos de `pagos.json → transferencia` (banco, tipo, número, titular, QR). Mientras estén vacíos muestra "Escríbenos para recibir los datos de la cuenta."
- Formularios (voluntariado y certificado): validan, pero **no envían**. Muestran "Este formulario aún no está activo. Escríbenos a {correo} y te respondemos." (el correo sale de `sitio.json`). Se mantiene la casilla de autorización de datos (Ley 1581 de 2012) enlazada a `/politica-de-datos`.
- Footer: "Preguntas frecuentes" → `/dona#preguntas`; TikTok se oculta mientras `sitio.json → redes.tiktok` esté vacío; "Documentos de constitución legal" → `/#transparencia` (provisional).
- `lang="es"`, meta description por página (en `textos.json → meta`), favicon provisional (`public/favicon.svg`).
- **Rendición de cuentas:** se publica el **15 de cada mes en Instagram** con una plantilla de Canva que replica la tarjeta de la web. La web NO se actualiza cada mes: la tarjeta de Transparencia (Octubre 2026, sello "Datos de ejemplo", `informes.json`) es fija y solo muestra el ejemplo. Ningún texto debe prometer un informe por correo o publicado en la web; Transparencia enlaza a Instagram (URL de `sitio.json`).
- **/dona tiene selector Personas / Empresas** (botones con `aria-pressed`; Personas por defecto). Planes de empresa en `planes-empresas.json` (Semilla, Raíz, Aliada —destacada—, Constructora), con aporte anual y descuento 25 % calculados desde el monto. Sus botones llevan a `/?asunto=Vincular%20mi%20empresa#contacto` (el formulario preselecciona el asunto). `/dona#planes-empresas` abre directamente la pestaña Empresas.
- **Calculadora del inicio** (sección Empresas): el control se mueve solo entre los 4 planes empresariales y muestra el nombre del plan; el botón "Ver planes para empresas" lleva a `/dona#planes-empresas`.
- **Encabezado:** en escritorio (>980 px) solo la pestaña naranja "Dona aquí" del menú; en tablet/celular (≤980 px, menú deslizable) solo el botón. Verificado sin desbordes a 1440, 1280, 1024, 768 y 390 px.
- `.new` ("Nuevo") es siempre una píldora pequeña alineada a la izquierda (regla global en `global.css`).

## Pendientes
000. **Confirmar con la fundación si el código QR de la web actual (foto 60 del inventario, "Cokua Fundacion Somos Cokua") es el QR de pagos vigente.** No se guardó en el repositorio; si lo es, se carga en `pagos.json → transferencia.qrImagen`.
00. **Día del lanzamiento: pasar `indexable` a `true` en `src/config/sitio.json`.** Mientras sea `false` (versión de prueba pública) todas las páginas llevan `<meta name="robots" content="noindex">` y `/robots.txt` bloquea a los buscadores, para no competir en Google con la web actual.
0. **Validar con el contador de la fundación que los beneficios empresariales no constituyan contraprestación** (mención en la web, jornadas de voluntariado corporativo, informe trimestral), porque podrían afectar el carácter de donación y el descuento del art. 257 E.T.
1. **Enlaces de pasarela** de los planes Amigo, Aliado y Padrino (`pagos.json → planes.*.url`, marcados "PENDIENTE: enlace de la pasarela de la fundación").
2. **Datos de la cuenta Bancolombia** y la imagen del QR (`pagos.json → transferencia`; poner el QR en `public/`).
3. **NIT** de la fundación (`sitio.json → nit.valor`). Aparece en el footer y en la política de datos cuando se complete.
4. **Confirmar el correo de contacto** `cokua.oficial@gmail.com` con la fundación.
5. **URL de TikTok** (`sitio.json → redes.tiktok`); hoy oculto.
6. **Política de datos**: es un borrador con aviso visible "Borrador pendiente de revisión por la fundación". La fundación (idealmente con asesoría legal) debe revisarlo, completar NIT y fecha de vigencia y quitar el aviso.
7. **Documentos de constitución legal**: falta el enlace real (hoy apunta a `/#transparencia`; en `informes.json → archivo` figura "Enlace de la web actual").
8. **Mensajes provisionales que cambian al activar funciones**: el de los planes (cuando haya pasarela) y el de los formularios (cuando haya envío real; ver `src/scripts/formularios.ts`).
9. **Autorización de menores:** confirmar con la fundación que tiene autorización de los acudientes para publicar las fotos con niños reconocibles (marcadas en `src/assets/fotos/inventario.md`). Quedan por usar/proponer otras fotos del inventario.
10. **Plantilla de Canva** de la rendición de cuentas mensual (réplica de la tarjeta de la web) y publicación el 15 de cada mes en Instagram.
11. **Pedir el logo en SVG** a la fundación (hoy se usa el PNG de la web actual, 995×728 px).
12. **Panel de edición** para que la fundación actualice los JSON de `src/content/` y `src/config/` sin tocar código (candidatos: Keystatic, Decap CMS).
13. **Envío real de formularios** (voluntariado y certificado) y **dominio/hosting**.
14. Enlace "TikTok" y favicon definitivo.
