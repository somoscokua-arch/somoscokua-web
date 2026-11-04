// Calculadora ilustrativa de descuento tributario para empresas.
const slider = document.getElementById('aporte') as HTMLInputElement | null;
const caja = document.querySelector<HTMLElement>('.calc');

if (slider && caja) {
  const pct = Number(caja.dataset.porcentaje ?? 0.25);
  const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CO');
  const poner = (id: string, v: number) => {
    const el = document.getElementById(id);
    if (el) el.textContent = fmt(v);
  };
  const calc = () => {
    const mensual = Number(slider.value);
    const anual = mensual * 12;
    const desc = anual * pct;
    poner('aporte-label', mensual);
    poner('c-anual', anual);
    poner('c-desc', desc);
    poner('c-neto', anual - desc);
  };
  slider.addEventListener('input', calc);
  calc();
}
