// Muestra/oculta los datos de la cuenta (o el aviso si aún están vacíos).
const btn = document.getElementById('btn-transfer');
const panel = document.getElementById('transfer-info');
btn?.addEventListener('click', () => {
  if (!panel) return;
  const abrir = panel.hidden;
  panel.hidden = !abrir;
  btn.setAttribute('aria-expanded', String(abrir));
});
