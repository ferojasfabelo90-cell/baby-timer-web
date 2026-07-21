// El backend siempre responde en español (no lo modificamos para esto).
// Acá reconocemos los mensajes EXACTOS que ya sabemos que manda, y les
// damos su traducción. Si un mensaje no está mapeado acá, nunca se
// muestra tal cual — extractErrorMessage() cae en el fallback que cada
// pantalla ya trae traducido. Por eso este diccionario no necesita estar
// 100% completo para que la app nunca muestre texto crudo en español.
//
// Si en algún momento cambia el texto exacto de una excepción en el
// backend, hay que actualizar la clave acá (son strings exactos, no
// parciales).

export const backendMessageTranslations = {
  // BebeService
  'Usuario no existe': {
    es: 'El usuario no existe.',
    en: "The user doesn't exist.",
  },
  'Bebe no encontrado': {
    es: 'No encontramos ese bebé.',
    en: "We couldn't find that baby.",
  },
  'Bebé no encontrado': {
    es: 'No encontramos ese bebé.',
    en: "We couldn't find that baby.",
  },
  'Relación usuario-bebe no encontrada': {
    es: 'No tenés acceso a este bebé.',
    en: "You don't have access to this baby.",
  },
  'No tienes permisos de ADMIN': {
    es: 'No tenés permisos de administrador para hacer esto.',
    en: "You don't have administrator permissions to do this.",
  },
  'Usuario no encontrado': {
    es: 'Ese email todavía no tiene una cuenta en Baby Timer.',
    en: "That email doesn't have a Baby Timer account yet.",
  },
  'El usuario ya pertenece a este bebé o ya tiene una invitación pendiente': {
    es: 'Esa persona ya tiene acceso a este bebé, o ya le enviaste una invitación pendiente.',
    en: 'That person already has access to this baby, or already has a pending invitation.',
  },
  'Invitación no encontrada': {
    es: 'No encontramos esa invitación.',
    en: "We couldn't find that invitation.",
  },
  'Esta invitación ya fue resuelta': {
    es: 'Esa invitación ya fue aceptada o rechazada.',
    en: 'That invitation was already accepted or declined.',
  },

  // AuthController / login
  'Email o contraseña incorrectos': {
    es: 'Email o contraseña incorrectos.',
    en: 'Incorrect email or password.',
  },

  // Recuperación de contraseña
  'El link no es válido o ya fue usado': {
    es: 'Este link no es válido o ya fue usado.',
    en: 'This link is invalid or was already used.',
  },
  'El link venció, pedí uno nuevo': {
    es: 'Este link venció — pedí uno nuevo.',
    en: 'This link expired — request a new one.',
  },

  // Programación de tareas
  'Elegí al menos un día de la semana para una tarea semanal': {
    es: 'Elegí al menos un día de la semana.',
    en: 'Pick at least one day of the week.',
  },
  'Elegí al menos un día del mes para una tarea mensual': {
    es: 'Elegí al menos un día del mes.',
    en: 'Pick at least one day of the month.',
  },
  'Elegí la fecha en la que va a ocurrir esta tarea': {
    es: 'Elegí la fecha en la que va a ocurrir.',
    en: 'Pick the date this is going to happen.',
  },
  'La fecha no puede ser en el pasado': {
    es: 'La fecha no puede ser en el pasado.',
    en: "The date can't be in the past.",
  },
};
