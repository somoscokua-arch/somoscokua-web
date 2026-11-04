// 1) Botones de plan sin enlace de pasarela: muestran el aviso en lugar de abrir algo.
const nota = document.getElementById('pay-note');
document.querySelectorAll<HTMLAnchorElement>('[data-plan-sin-enlace]').forEach((b) => {
  b.addEventListener('click', (e) => {
    e.preventDefault();
    if (nota) nota.textContent = nota.dataset.msgSinEnlace ?? '';
  });
});

// 2) Selector Personas / Empresas. "/dona#planes-empresas" abre directamente Empresas.
const botones = document.querySelectorAll<HTMLButtonElement>('.plan-switch__btn');
const paneles = document.querySelectorAll<HTMLElement>('[data-panel]');

function mostrar(tab: string) {
  botones.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tab === tab)));
  paneles.forEach((p) => { p.hidden = p.dataset.panel !== tab; });
}

botones.forEach((b) =>
  b.addEventListener('click', () => {
    mostrar(b.dataset.tab ?? 'personas');
    history.replaceState(null, '', b.dataset.tab === 'empresas' ? '#planes-empresas' : location.pathname);
  }),
);

function irAEmpresas() {
  document.querySelector('.plan-switch')?.scrollIntoView({ behavior: 'instant' });
}
function desdeHash() {
  if (location.hash !== '#planes-empresas') return;
  mostrar('empresas');
  // Esperar a que carguen fuentes y estilos para que el desplazamiento no se pierda.
  if (document.readyState === 'complete') irAEmpresas();
  else window.addEventListener('load', irAEmpresas, { once: true });
}
window.addEventListener('hashchange', desdeHash);
desdeHash();
