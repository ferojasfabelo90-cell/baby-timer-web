// Solo los íconos son fijos; las etiquetas se piden vía t() para que
// salgan en el idioma activo. Por eso casi todo acá son funciones que
// reciben `t` (de useLanguage), no constantes estáticas como antes.

const ICONOS_TIPO_TAREA = {
  ALIMENTACION: '🍼',
  MEDICACION: '💊',
  'BAÑO': '🛁',
  'SUEÑO': '😴',
  OTRO: '📝',
};

export function infoTipoTarea(tipo, t) {
  return {
    label: t(`tipoTarea.${tipo}`),
    icono: ICONOS_TIPO_TAREA[tipo] || '📌',
  };
}

export function tipoTareaOptions(t) {
  return Object.keys(ICONOS_TIPO_TAREA).map((value) => ({
    value,
    label: `${ICONOS_TIPO_TAREA[value]} ${t(`tipoTarea.${value}`)}`,
  }));
}

const FRECUENCIAS = ['UNICA', 'DIARIA', 'SEMANAL', 'MENSUAL'];

export function frecuenciaLabel(frecuencia, t) {
  return t(`frecuencia.${frecuencia}`);
}

export function frecuenciaOptions(t) {
  return FRECUENCIAS.map((value) => ({ value, label: t(`frecuencia.${value}`) }));
}

// "08:00:00" -> "08:00"
export function formatearHora(horaProgramada) {
  if (!horaProgramada) return '';
  return horaProgramada.slice(0, 5);
}
