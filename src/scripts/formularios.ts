// Formularios preparados pero SIN envío real: validan y muestran el aviso de que aún no están activos.
// Cuando haya envío real, reemplazar el cuerpo del bloque "si todo está completo".
['form-vol', 'certificado'].forEach((id) => {
  const f = document.getElementById(id) as HTMLFormElement | null;
  if (!f) return;
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = f.querySelector<HTMLElement>('.form-msg')!;
    const faltan = Array.from(f.querySelectorAll<HTMLInputElement>('[required]')).filter((i) =>
      i.type === 'checkbox' ? !i.checked : !i.value.trim(),
    );
    msg.textContent = '';
    if (faltan.length) {
      msg.textContent = f.dataset.msgError ?? '';
      faltan[0].focus();
      return;
    }
    // Aviso: "Este formulario aún no está activo. Escríbenos a {correo} y te respondemos."
    const [antes, despues = ''] = (f.dataset.msgInactivo ?? '').split('{correo}');
    const correo = f.dataset.correo ?? '';
    const a = document.createElement('a');
    a.href = 'mailto:' + correo;
    a.textContent = correo;
    msg.append(antes, a, despues);
  });
});
