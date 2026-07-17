// Calcula una edad legible ("1 año 2 meses", "3 meses", "12 días")
// a partir de una fecha de nacimiento en formato ISO (YYYY-MM-DD).
// Recibe la función `t` (de useLanguage) para devolver el texto en el
// idioma activo — por eso no es un texto fijo como antes.
export function calcularEdad(fechaNacimientoISO, t) {
  if (!fechaNacimientoISO) return t('edad.noDisponible');

  const nacimiento = new Date(fechaNacimientoISO + 'T00:00:00');
  const hoy = new Date();

  if (isNaN(nacimiento.getTime())) {
    return t('edad.noDisponible');
  }

  let años = hoy.getFullYear() - nacimiento.getFullYear();
  let meses = hoy.getMonth() - nacimiento.getMonth();
  let dias = hoy.getDate() - nacimiento.getDate();

  if (dias < 0) {
    meses -= 1;
    const mesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
    dias += mesAnterior.getDate();
  }
  if (meses < 0) {
    años -= 1;
    meses += 12;
  }

  if (años <= 0 && meses <= 0) {
    return dias <= 1 ? t('edad.recienNacido') : t('edad.dias', { n: dias });
  }

  const textoAnios = años > 0 ? t(años === 1 ? 'edad.anio' : 'edad.anios', { n: años }) : '';
  const textoMeses = meses > 0 ? t(meses === 1 ? 'edad.mes' : 'edad.meses', { n: meses }) : '';

  return [textoAnios, textoMeses].filter(Boolean).join(' ');
}
