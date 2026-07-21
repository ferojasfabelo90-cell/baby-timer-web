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

// Mismos nombres que usa el backend (java.time.DayOfWeek): MONDAY..SUNDAY
const DIAS_SEMANA = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export function diasSemanaOptions(t) {
  return DIAS_SEMANA.map((value) => ({
    value,
    label: t(`diaSemana.${value}`),
  }));
}

// "MONDAY" -> etiqueta corta traducida ("Lun" / "Mon"), para mostrar en
// el listado de tareas sin ocupar mucho espacio.
export function diaSemanaCorto(dia, t) {
  return t(`diaSemanaCorto.${dia}`);
}

// [1, 2, ..., 31] — para la grilla de "días del mes"
export function diasMesOptions() {
  return Array.from({ length: 31 }, (_, i) => i + 1);
}

// Arma un texto corto para mostrar en el listado de tareas, según la
// frecuencia: "Lun, Mié" / "5, 20" / "15/08/2026" / nada si no aplica.
export function resumenProgramacion(tarea, t) {
  if (tarea.frecuencia === 'SEMANAL' && tarea.diasProgramados?.length) {
    return tarea.diasProgramados.map((dia) => diaSemanaCorto(dia, t)).join(', ');
  }
  if (tarea.frecuencia === 'MENSUAL' && tarea.diasProgramados?.length) {
    return tarea.diasProgramados.join(', ');
  }
  if (tarea.frecuencia === 'UNICA' && tarea.fechaProgramada) {
    const [anio, mes, dia] = tarea.fechaProgramada.split('-');
    return `${dia}/${mes}/${anio}`;
  }
  return '';
}
