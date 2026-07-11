export const TIPO_TAREA_INFO = {
  ALIMENTACION: { label: 'Alimentación', icono: '🍼' },
  MEDICACION: { label: 'Medicación', icono: '💊' },
  'BAÑO': { label: 'Baño', icono: '🛁' },
  'SUEÑO': { label: 'Sueño', icono: '😴' },
  OTRO: { label: 'Otro', icono: '📝' },
};

export const TIPO_TAREA_OPTIONS = Object.entries(TIPO_TAREA_INFO).map(([value, info]) => ({
  value,
  label: `${info.icono} ${info.label}`,
}));

export const FRECUENCIA_INFO = {
  UNICA: 'Única vez',
  DIARIA: 'Diaria',
  SEMANAL: 'Semanal',
  MENSUAL: 'Mensual',
};

export const FRECUENCIA_OPTIONS = Object.entries(FRECUENCIA_INFO).map(([value, label]) => ({
  value,
  label,
}));

export function infoTipoTarea(tipo) {
  return TIPO_TAREA_INFO[tipo] || { label: tipo, icono: '📌' };
}

// "08:00:00" -> "08:00"
export function formatearHora(horaProgramada) {
  if (!horaProgramada) return '';
  return horaProgramada.slice(0, 5);
}
