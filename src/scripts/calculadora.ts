// Calculadora ilustrativa: el control se mueve entre los planes empresariales (planes-empresas.json).
const slider = document.getElementById('aporte') as HTMLInputElement | null;
const caja = document.querySelector<HTMLElement>('.calc');

if (slider && caja) {
  const pct = Number(caja.dataset.porcentaje ?? 0.25);
  const planes: { nombre: string; monto: number }[] = JSON.parse(caja.dataset.planes ?? '[]');
  const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CO');
  const poner = (id: string, texto: string) => {
    const el = document.getElementById(id);
    if (el) el.textContent = texto;
  };
  const calc = () => {
    const plan = planes[Number(slider.value)];
    if (!plan) return;
    const anual = plan.monto * 12;
    const desc = anual * pct;
    poner('aporte-label', fmt(plan.monto));
    poner('aporte-plan', plan.nombre);
    poner('c-anual', fmt(anual));
    poner('c-desc', fmt(desc));
    poner('c-neto', fmt(anual - desc));
    slider.setAttribute('aria-valuetext', `${fmt(plan.monto)}, ${plan.nombre}`);
  };
  slider.addEventListener('input', calc);
  calc();
}
