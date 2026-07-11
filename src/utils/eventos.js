export const TIPO_EVENTO_INFO = {
  TAREA_REALIZADA: { label: 'Tarea realizada', icono: '✅' },
  CAMBIO: { label: 'Cambio', icono: '🔄' },
  IMPREVISTO: { label: 'Imprevisto', icono: '⚠️' },
  OBSERVACION: { label: 'Observación', icono: '📝' },
};

// TAREA_REALIZADA la genera el sistema automáticamente al marcar una tarea
// como hecha — no se ofrece como opción al registrar un evento manual.
export const TIPO_EVENTO_MANUAL_OPTIONS = [
  { value: 'CAMBIO', label: '🔄 Cambio' },
  { value: 'IMPREVISTO', label: '⚠️ Imprevisto' },
  { value: 'OBSERVACION', label: '📝 Observación' },
];

export function infoTipoEvento(tipo) {
  return TIPO_EVENTO_INFO[tipo] || { label: tipo, icono: '📌' };
}

// "2026-07-08T14:30:00" -> "08/07 14:30"
export function formatearFechaHora(fechaHoraISO) {
  if (!fechaHoraISO) return '';
  const fecha = new Date(fechaHoraISO);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const hora = String(fecha.getHours()).padStart(2, '0');
  const min = String(fecha.getMinutes()).padStart(2, '0');
  return `${dia}/${mes} ${hora}:${min}`;
}
