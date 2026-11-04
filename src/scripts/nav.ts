// Resalta el enlace activo del menú en la página de inicio según el hash (como el prototipo).
const links = document.querySelectorAll<HTMLAnchorElement>('a[data-nav-home]');

function marcar() {
  const enInicio = location.pathname === '/' || location.pathname === '/index.html';
  const hash = location.hash || '#inicio';
  links.forEach((a) => {
    const on = enInicio && a.getAttribute('href') === '/' + hash;
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}
window.addEventListener('hashchange', marcar);
marcar();
