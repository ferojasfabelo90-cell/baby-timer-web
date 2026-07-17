const ICONOS_TIPO_EVENTO = {
  TAREA_REALIZADA: '✅',
  CAMBIO: '🔄',
  IMPREVISTO: '⚠️',
  OBSERVACION: '📝',
};

export function infoTipoEvento(tipo, t) {
  return {
    label: t(`tipoEvento.${tipo}`),
    icono: ICONOS_TIPO_EVENTO[tipo] || '📌',
  };
}

// TAREA_REALIZADA la genera el sistema automáticamente al marcar una tarea
// como hecha — no se ofrece como opción al registrar un evento manual.
const TIPOS_EVENTO_MANUAL = ['CAMBIO', 'IMPREVISTO', 'OBSERVACION'];

export function tipoEventoManualOptions(t) {
  return TIPOS_EVENTO_MANUAL.map((value) => ({
    value,
    label: `${ICONOS_TIPO_EVENTO[value]} ${t(`tipoEvento.${value}`)}`,
  }));
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
