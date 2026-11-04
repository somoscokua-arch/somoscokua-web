// Botones de plan sin enlace de pasarela: muestran el aviso en lugar de abrir algo.
const nota = document.getElementById('pay-note');
document.querySelectorAll<HTMLAnchorElement>('[data-plan-sin-enlace]').forEach((b) => {
  b.addEventListener('click', (e) => {
    e.preventDefault();
    if (nota) nota.textContent = nota.dataset.msgSinEnlace ?? '';
  });
});
