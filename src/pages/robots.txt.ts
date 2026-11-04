import sitio from '../config/sitio.json';

// Mientras sitio.json → indexable sea false (versión de prueba), se bloquea a los buscadores.
export function GET() {
  const cuerpo = sitio.indexable ? 'User-agent: *\nAllow: /\n' : 'User-agent: *\nDisallow: /\n';
  return new Response(cuerpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
