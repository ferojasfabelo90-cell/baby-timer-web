// Calcula una edad legible ("1 año 2 meses", "3 meses", "12 días")
// a partir de una fecha de nacimiento en formato ISO (YYYY-MM-DD).
export function calcularEdad(fechaNacimientoISO) {
  if (!fechaNacimientoISO) return 'Edad no disponible';

  const nacimiento = new Date(fechaNacimientoISO + 'T00:00:00');
  const hoy = new Date();

  // Si la fecha vino en un formato que no pudimos interpretar,
  // mostramos esto en vez de "NaN años NaN meses".
  if (isNaN(nacimiento.getTime())) {
    return 'Edad no disponible';
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
    return dias <= 1 ? 'Recién nacido' : `${dias} días`;
  }
  if (años === 0) {
    return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  }
  if (meses === 0) {
    return `${años} ${años === 1 ? 'año' : 'años'}`;
  }
  return `${años} ${años === 1 ? 'año' : 'años'} ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
}
