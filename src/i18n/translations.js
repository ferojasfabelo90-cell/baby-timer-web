// Diccionario de traducciones. Cada clave vive en ambos idiomas con la
// misma forma — si agregás una clave nueva, agregala en los dos objetos.
// Soporta interpolación simple: t('key', { nombre: 'Sofía' }) reemplaza
// {{nombre}} dentro del texto.

export const translations = {
  es: {
    // Navbar
    'nav.salir': 'Salir',

    // Login
    'login.titulo': 'Baby Timer',
    'login.subtitulo': 'Iniciá sesión para ver las tareas de hoy.',
    'login.email': 'Email',
    'login.password': 'Contraseña',
    'login.ingresar': 'Ingresar',
    'login.ingresando': 'Ingresando…',
    'login.sinCuenta': '¿No tenés cuenta?',
    'login.creaUna': 'Creá una',
    'login.errorCredenciales': 'Email o contraseña incorrectos.',
    'login.olvidePassword': '¿Olvidaste tu contraseña?',

    // Register
    'register.titulo': 'Creá tu cuenta',
    'register.subtitulo': 'Para empezar a registrar el cuidado de tu bebé.',
    'register.nombre': 'Nombre',
    'register.email': 'Email',
    'register.password': 'Contraseña',
    'register.crear': 'Crear cuenta',
    'register.creando': 'Creando cuenta…',
    'register.yaTeneCuenta': '¿Ya tenés cuenta?',
    'register.ingresa': 'Ingresá',
    'register.errorGenerico': 'No pudimos crear la cuenta. Revisá los datos.',

    // Bebes (listado)
    'bebes.cargando': 'Cargando…',
    'bebes.errorCarga': 'No pudimos cargar tus bebés.',
    'bebes.invitacionesPendientes': 'Invitaciones pendientes',
    'bebes.invitacionTexto': 'Te invitaron a ser cuidador de este bebé.',
    'bebes.aceptar': 'Aceptar',
    'bebes.rechazar': 'Rechazar',
    'bebes.errorAceptar': 'No pudimos aceptar la invitación.',
    'bebes.errorRechazar': 'No pudimos rechazar la invitación.',
    'bebes.bienvenido': 'Bienvenido 👋',
    'bebes.sinBebes': 'Aún no tenés bebés registrados.',
    'bebes.crearPrimero': 'Crear mi primer bebé',
    'bebes.misBebes': 'Mis bebés',
    'bebes.nuevoBebe': '+ Nuevo bebé',
    'bebes.admin': 'Admin',
    'bebes.cuidador': 'Cuidador',

    // Nuevo bebé
    'nuevoBebe.titulo': 'Nuevo bebé',
    'nuevoBebe.nombre': 'Nombre',
    'nuevoBebe.fechaNacimiento': 'Fecha de nacimiento',
    'nuevoBebe.guardar': 'Guardar',
    'nuevoBebe.guardando': 'Guardando…',
    'nuevoBebe.cancelar': 'Cancelar',
    'nuevoBebe.errorGenerico': 'No pudimos guardar el bebé. Revisá los datos.',

    // Dashboard (BebeDetalle)
    'dashboard.misBebes': '← Mis bebés',
    'dashboard.administrador': 'Administrador',
    'dashboard.cuidador': 'Cuidador',
    'dashboard.aclaracionCuidador': 'Podés ver y marcar tareas, pero no crearlas ni invitar a otros cuidadores — eso lo maneja el administrador de {{nombre}}.',
    'dashboard.gestionarTareas': '⚙️ Gestionar tareas',
    'dashboard.invitarCuidador': '👥 Invitar cuidador',
    'dashboard.verBitacora': '📋 Ver bitácora',
    'dashboard.hoyPendientes': 'Hoy — pendientes',
    'dashboard.sinPendientes': 'No quedan actividades pendientes por hoy. 🎉',
    'dashboard.hoyCompletadas': 'Hoy — completadas',
    'dashboard.sinCompletadas': 'Todavía no marcaste ninguna actividad como hecha.',
    'dashboard.marcarHecha': 'Marcar hecha',
    'dashboard.marcando': 'Marcando…',
    'dashboard.errorCarga': 'No pudimos cargar este bebé.',
    'dashboard.errorMarcar': 'No pudimos marcar la tarea como realizada.',
    'dashboard.cargando': 'Cargando…',

    // Gestión de tareas
    'gestionTareas.tareasDe': 'Tareas de {{nombre}}',
    'gestionTareas.volverDashboard': '← Dashboard de {{nombre}}',
    'gestionTareas.sinTareas': 'Todavía no hay tareas creadas.',
    'gestionTareas.editar': 'Editar',
    'gestionTareas.desactivar': 'Desactivar',
    'gestionTareas.desactivando': 'Desactivando…',
    'gestionTareas.confirmarDesactivar': '¿Desactivar esta tarea? Ya no va a aparecer en las actividades del día.',
    'gestionTareas.nuevaTarea': '+ Nueva tarea',
    'gestionTareas.soloAdmin': 'Solo el administrador de {{nombre}} puede gestionar tareas.',
    'gestionTareas.volverDashboardLink': 'Volver al dashboard',
    'gestionTareas.errorCarga': 'No pudimos cargar las tareas.',
    'gestionTareas.errorDesactivar': 'No pudimos desactivar la tarea.',
    'gestionTareas.cargando': 'Cargando…',

    // Nueva / Editar tarea
    'tarea.nuevaTitulo': 'Nueva tarea',
    'tarea.editarTitulo': 'Editar tarea',
    'tarea.volverTareas': '← Tareas',
    'tarea.tipo': 'Tipo de tarea',
    'tarea.descripcion': 'Descripción (opcional)',
    'tarea.descripcionPlaceholder': 'Ej: mamadera cada 4 horas',
    'tarea.frecuencia': 'Frecuencia',
    'tarea.horaProgramada': 'Hora programada',
    'tarea.crear': 'Crear tarea',
    'tarea.guardarCambios': 'Guardar cambios',
    'tarea.guardando': 'Guardando…',
    'tarea.errorCrear': 'No pudimos crear la tarea. Revisá los datos.',
    'tarea.errorGuardar': 'No pudimos guardar los cambios. Revisá los datos.',
    'tarea.errorCarga': 'No pudimos cargar la tarea.',
    'tarea.noEncontrada': 'No encontramos esa tarea. Puede que ya haya sido desactivada.',
    'tarea.cargando': 'Cargando…',

    // Bitácora
    'bitacora.tituloDe': 'Bitácora de {{nombre}}',
    'bitacora.volverDashboard': '← Dashboard de {{nombre}}',
    'bitacora.sinEventos': 'Todavía no hay eventos registrados.',
    'bitacora.registrarEvento': '+ Registrar evento',
    'bitacora.errorCarga': 'No pudimos cargar la bitácora.',
    'bitacora.cargando': 'Cargando…',
    'bitacora.volverDashboardLink': 'Volver al dashboard',

    // Nuevo evento
    'nuevoEvento.titulo': 'Registrar evento',
    'nuevoEvento.volverBitacora': '← Bitácora',
    'nuevoEvento.tipo': 'Tipo de evento',
    'nuevoEvento.descripcion': 'Descripción',
    'nuevoEvento.descripcionPlaceholder': 'Ej: se despertó llorando a las 3am',
    'nuevoEvento.registrar': 'Registrar evento',
    'nuevoEvento.guardando': 'Guardando…',
    'nuevoEvento.errorGenerico': 'No pudimos registrar el evento. Revisá los datos.',

    // Invitar cuidador
    'invitar.titulo': 'Invitar cuidador',
    'invitar.explicacion': 'La persona que invites va a poder ver y marcar las tareas de {{nombre}}, pero no podrá crearlas, editarlas ni invitar a nadie más.',
    'invitar.emailLabel': 'Email de la persona a invitar',
    'invitar.emailAyuda': 'Tiene que ser el mismo email con el que esa persona se registró en Baby Timer.',
    'invitar.invitar': 'Invitar',
    'invitar.enviando': 'Enviando…',
    'invitar.exito': '¡Invitación enviada! {{nombre}} va a aparecer en su cuenta como una invitación pendiente hasta que la acepte.',
    'invitar.error404': 'Ese email todavía no tiene una cuenta en Baby Timer. Pedile que se registre primero y volvé a intentar.',
    'invitar.error400': 'Esa persona ya tiene acceso a este bebé, o ya le enviaste una invitación que todavía no respondió.',
    'invitar.errorGenerico': 'No pudimos enviar la invitación.',
    'invitar.soloAdmin': 'Solo el administrador de {{nombre}} puede invitar cuidadores.',
    'invitar.errorCarga': 'No pudimos cargar este bebé.',
    'invitar.volverDashboard': 'Volver al dashboard',
    'invitar.cargando': 'Cargando…',
    'invitar.volverDashboardLink': '← Dashboard de {{nombre}}',

    // Error boundary
    'error.titulo': 'Algo salió mal',
    'error.texto': 'Ocurrió un error inesperado. Podés intentar recargar la página; si el problema sigue, contanos qué estabas haciendo cuando pasó.',
    'error.recargar': 'Recargar',

    // Validación de formularios (reemplaza el aviso nativo del navegador,
    // que sale en el idioma del navegador/SO y no en el de la app).
    'validacion.campoRequerido': 'Completá este campo.',
    'validacion.passwordCorta': 'La contraseña tiene que tener al menos 6 caracteres.',

    // Bienvenida (post-registro, solo orienta, no fija ningún rol)
    'bienvenida.titulo': '¡Cuenta creada! 👋',
    'bienvenida.subtitulo': '¿Qué vas a hacer en Baby Timer?',
    'bienvenida.opcionPropio': 'Voy a coordinar el cuidado de mi bebé',
    'bienvenida.opcionInvitado': 'Me invitaron a cuidar el bebé de alguien más',
    'bienvenida.tituloInvitado': '¡Perfecto!',
    'bienvenida.explicacionInvitado': 'Compartí este email con quien te va a invitar — lo va a necesitar exacto para agregarte:',
    'bienvenida.continuar': 'Entendido, continuar',

    // Olvidé mi contraseña
    'olvidePassword.titulo': 'Recuperar contraseña',
    'olvidePassword.subtitulo': 'Ingresá tu email y te mandamos un link para elegir una contraseña nueva.',
    'olvidePassword.email': 'Email',
    'olvidePassword.enviar': 'Enviar link',
    'olvidePassword.enviando': 'Enviando…',
    'olvidePassword.exito': 'Si ese email tiene una cuenta en Baby Timer, te mandamos un link para restablecer tu contraseña. Revisá tu bandeja de entrada (y spam, por las dudas).',
    'olvidePassword.volverLogin': '← Volver al login',

    // Restablecer contraseña
    'restablecer.titulo': 'Elegí una contraseña nueva',
    'restablecer.subtitulo': 'Tiene que tener al menos 6 caracteres.',
    'restablecer.passwordNueva': 'Contraseña nueva',
    'restablecer.confirmarPassword': 'Confirmá la contraseña',
    'restablecer.guardar': 'Guardar contraseña',
    'restablecer.guardando': 'Guardando…',
    'restablecer.passwordsNoCoinciden': 'Las contraseñas no coinciden.',
    'restablecer.errorGenerico': 'No pudimos restablecer tu contraseña. Probá pedir un link nuevo.',
    'restablecer.linkInvalido': 'Link incompleto',
    'restablecer.linkInvalidoTexto': 'Este link no tiene la información necesaria para restablecer tu contraseña. Pedí uno nuevo.',
    'restablecer.pedirNuevo': 'Pedir un link nuevo',
    'restablecer.exitoTitulo': '¡Listo! 🎉',
    'restablecer.exitoTexto': 'Tu contraseña se actualizó correctamente. Ya podés iniciar sesión con la nueva.',
    'restablecer.irALogin': 'Ir al login',

    // Edad
    'edad.noDisponible': 'Edad no disponible',
    'edad.recienNacido': 'Recién nacido',
    'edad.dias': '{{n}} días',
    'edad.meses': '{{n}} meses',
    'edad.mes': '{{n}} mes',
    'edad.anios': '{{n}} años',
    'edad.anio': '{{n}} año',
    'edad.aniosYMeses': '{{anios}} {{anios}} {{meses}}',

    // Tipos de tarea
    'tipoTarea.ALIMENTACION': 'Alimentación',
    'tipoTarea.MEDICACION': 'Medicación',
    'tipoTarea.BAÑO': 'Baño',
    'tipoTarea.SUEÑO': 'Sueño',
    'tipoTarea.OTRO': 'Otro',

    // Frecuencias
    'frecuencia.UNICA': 'Única vez',
    'frecuencia.DIARIA': 'Diaria',
    'frecuencia.SEMANAL': 'Semanal',
    'frecuencia.MENSUAL': 'Mensual',

    // Tipos de evento
    'tipoEvento.TAREA_REALIZADA': 'Tarea realizada',
    'tipoEvento.CAMBIO': 'Cambio',
    'tipoEvento.IMPREVISTO': 'Imprevisto',
    'tipoEvento.OBSERVACION': 'Observación',
  },

  en: {
    // Navbar
    'nav.salir': 'Log out',

    // Login
    'login.titulo': 'Baby Timer',
    'login.subtitulo': "Log in to see today's tasks.",
    'login.email': 'Email',
    'login.password': 'Password',
    'login.ingresar': 'Log in',
    'login.ingresando': 'Logging in…',
    'login.sinCuenta': "Don't have an account?",
    'login.creaUna': 'Create one',
    'login.errorCredenciales': 'Incorrect email or password.',
    'login.olvidePassword': 'Forgot your password?',

    // Register
    'register.titulo': 'Create your account',
    'register.subtitulo': "To start tracking your baby's care.",
    'register.nombre': 'Name',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.crear': 'Create account',
    'register.creando': 'Creating account…',
    'register.yaTeneCuenta': 'Already have an account?',
    'register.ingresa': 'Log in',
    'register.errorGenerico': "We couldn't create your account. Check your details.",

    // Bebes (list)
    'bebes.cargando': 'Loading…',
    'bebes.errorCarga': "We couldn't load your babies.",
    'bebes.invitacionesPendientes': 'Pending invitations',
    'bebes.invitacionTexto': "You've been invited to be a caregiver for this baby.",
    'bebes.aceptar': 'Accept',
    'bebes.rechazar': 'Decline',
    'bebes.errorAceptar': "We couldn't accept the invitation.",
    'bebes.errorRechazar': "We couldn't decline the invitation.",
    'bebes.bienvenido': 'Welcome 👋',
    'bebes.sinBebes': "You don't have any babies registered yet.",
    'bebes.crearPrimero': 'Add my first baby',
    'bebes.misBebes': 'My babies',
    'bebes.nuevoBebe': '+ New baby',
    'bebes.admin': 'Admin',
    'bebes.cuidador': 'Caregiver',

    // New baby
    'nuevoBebe.titulo': 'New baby',
    'nuevoBebe.nombre': 'Name',
    'nuevoBebe.fechaNacimiento': 'Date of birth',
    'nuevoBebe.guardar': 'Save',
    'nuevoBebe.guardando': 'Saving…',
    'nuevoBebe.cancelar': 'Cancel',
    'nuevoBebe.errorGenerico': "We couldn't save the baby. Check the details.",

    // Dashboard
    'dashboard.misBebes': '← My babies',
    'dashboard.administrador': 'Admin',
    'dashboard.cuidador': 'Caregiver',
    'dashboard.aclaracionCuidador': "You can view and check off tasks, but you can't create them or invite other caregivers — that's handled by {{nombre}}'s administrator.",
    'dashboard.gestionarTareas': '⚙️ Manage tasks',
    'dashboard.invitarCuidador': '👥 Invite caregiver',
    'dashboard.verBitacora': '📋 View log',
    'dashboard.hoyPendientes': 'Today — pending',
    'dashboard.sinPendientes': 'No pending activities left for today. 🎉',
    'dashboard.hoyCompletadas': 'Today — completed',
    'dashboard.sinCompletadas': "You haven't marked any activity as done yet.",
    'dashboard.marcarHecha': 'Mark as done',
    'dashboard.marcando': 'Marking…',
    'dashboard.errorCarga': "We couldn't load this baby.",
    'dashboard.errorMarcar': "We couldn't mark the task as done.",
    'dashboard.cargando': 'Loading…',

    // Task management
    'gestionTareas.tareasDe': "{{nombre}}'s tasks",
    'gestionTareas.volverDashboard': "← {{nombre}}'s dashboard",
    'gestionTareas.sinTareas': 'No tasks created yet.',
    'gestionTareas.editar': 'Edit',
    'gestionTareas.desactivar': 'Deactivate',
    'gestionTareas.desactivando': 'Deactivating…',
    'gestionTareas.confirmarDesactivar': "Deactivate this task? It won't show up in daily activities anymore.",
    'gestionTareas.nuevaTarea': '+ New task',
    'gestionTareas.soloAdmin': "Only {{nombre}}'s administrator can manage tasks.",
    'gestionTareas.volverDashboardLink': 'Back to dashboard',
    'gestionTareas.errorCarga': "We couldn't load the tasks.",
    'gestionTareas.errorDesactivar': "We couldn't deactivate the task.",
    'gestionTareas.cargando': 'Loading…',

    // New / edit task
    'tarea.nuevaTitulo': 'New task',
    'tarea.editarTitulo': 'Edit task',
    'tarea.volverTareas': '← Tasks',
    'tarea.tipo': 'Task type',
    'tarea.descripcion': 'Description (optional)',
    'tarea.descripcionPlaceholder': 'E.g: bottle every 4 hours',
    'tarea.frecuencia': 'Frequency',
    'tarea.horaProgramada': 'Scheduled time',
    'tarea.crear': 'Create task',
    'tarea.guardarCambios': 'Save changes',
    'tarea.guardando': 'Saving…',
    'tarea.errorCrear': "We couldn't create the task. Check the details.",
    'tarea.errorGuardar': "We couldn't save the changes. Check the details.",
    'tarea.errorCarga': "We couldn't load the task.",
    'tarea.noEncontrada': "We couldn't find that task. It may have been deactivated already.",
    'tarea.cargando': 'Loading…',

    // Log
    'bitacora.tituloDe': "{{nombre}}'s log",
    'bitacora.volverDashboard': "← {{nombre}}'s dashboard",
    'bitacora.sinEventos': 'No events logged yet.',
    'bitacora.registrarEvento': '+ Log event',
    'bitacora.errorCarga': "We couldn't load the log.",
    'bitacora.cargando': 'Loading…',
    'bitacora.volverDashboardLink': 'Back to dashboard',

    // New event
    'nuevoEvento.titulo': 'Log event',
    'nuevoEvento.volverBitacora': '← Log',
    'nuevoEvento.tipo': 'Event type',
    'nuevoEvento.descripcion': 'Description',
    'nuevoEvento.descripcionPlaceholder': 'E.g: woke up crying at 3am',
    'nuevoEvento.registrar': 'Log event',
    'nuevoEvento.guardando': 'Saving…',
    'nuevoEvento.errorGenerico': "We couldn't log the event. Check the details.",

    // Invite caregiver
    'invitar.titulo': 'Invite caregiver',
    'invitar.explicacion': "The person you invite will be able to view and check off {{nombre}}'s tasks, but won't be able to create or edit them, or invite anyone else.",
    'invitar.emailLabel': 'Email of the person to invite',
    'invitar.emailAyuda': 'It has to be the same email that person used to sign up for Baby Timer.',
    'invitar.invitar': 'Invite',
    'invitar.enviando': 'Sending…',
    'invitar.exito': "Invitation sent! {{nombre}} will show up in their account as a pending invitation until they accept it.",
    'invitar.error404': "That email doesn't have a Baby Timer account yet. Ask them to sign up first and try again.",
    'invitar.error400': "That person already has access to this baby, or already has a pending invitation from you.",
    'invitar.errorGenerico': "We couldn't send the invitation.",
    'invitar.soloAdmin': "Only {{nombre}}'s administrator can invite caregivers.",
    'invitar.errorCarga': "We couldn't load this baby.",
    'invitar.volverDashboard': 'Back to dashboard',
    'invitar.cargando': 'Loading…',
    'invitar.volverDashboardLink': "← {{nombre}}'s dashboard",

    // Error boundary
    'error.titulo': 'Something went wrong',
    'error.texto': 'An unexpected error occurred. You can try reloading the page; if the problem continues, let us know what you were doing when it happened.',
    'error.recargar': 'Reload',

    // Form validation (replaces the browser's native prompt, which shows
    // in the browser/OS language instead of the app's language).
    'validacion.campoRequerido': 'Please fill in this field.',
    'validacion.passwordCorta': 'Password must be at least 6 characters long.',

    // Welcome (post-registration, just routes, doesn't set any role)
    'bienvenida.titulo': 'Account created! 👋',
    'bienvenida.subtitulo': 'What are you going to do in Baby Timer?',
    'bienvenida.opcionPropio': "I'm going to coordinate my baby's care",
    'bienvenida.opcionInvitado': "I was invited to help care for someone else's baby",
    'bienvenida.tituloInvitado': 'Perfect!',
    'bienvenida.explicacionInvitado': "Share this email with whoever is going to invite you — they'll need it exactly to add you:",
    'bienvenida.continuar': 'Got it, continue',

    // Forgot password
    'olvidePassword.titulo': 'Recover password',
    'olvidePassword.subtitulo': "Enter your email and we'll send you a link to choose a new password.",
    'olvidePassword.email': 'Email',
    'olvidePassword.enviar': 'Send link',
    'olvidePassword.enviando': 'Sending…',
    'olvidePassword.exito': "If that email has a Baby Timer account, we sent a link to reset your password. Check your inbox (and spam, just in case).",
    'olvidePassword.volverLogin': '← Back to login',

    // Reset password
    'restablecer.titulo': 'Choose a new password',
    'restablecer.subtitulo': 'Must be at least 6 characters long.',
    'restablecer.passwordNueva': 'New password',
    'restablecer.confirmarPassword': 'Confirm password',
    'restablecer.guardar': 'Save password',
    'restablecer.guardando': 'Saving…',
    'restablecer.passwordsNoCoinciden': "Passwords don't match.",
    'restablecer.errorGenerico': "We couldn't reset your password. Try requesting a new link.",
    'restablecer.linkInvalido': 'Incomplete link',
    'restablecer.linkInvalidoTexto': "This link doesn't have what's needed to reset your password. Request a new one.",
    'restablecer.pedirNuevo': 'Request a new link',
    'restablecer.exitoTitulo': 'All set! 🎉',
    'restablecer.exitoTexto': 'Your password was updated successfully. You can log in with it now.',
    'restablecer.irALogin': 'Go to login',

    // Age
    'edad.noDisponible': 'Age not available',
    'edad.recienNacido': 'Newborn',
    'edad.dias': '{{n}} days',
    'edad.meses': '{{n}} months',
    'edad.mes': '{{n}} month',
    'edad.anios': '{{n}} years',
    'edad.anio': '{{n}} year',
    'edad.aniosYMeses': '{{anios}} {{meses}}',

    // Task types
    'tipoTarea.ALIMENTACION': 'Feeding',
    'tipoTarea.MEDICACION': 'Medication',
    'tipoTarea.BAÑO': 'Bath',
    'tipoTarea.SUEÑO': 'Sleep',
    'tipoTarea.OTRO': 'Other',

    // Frequencies
    'frecuencia.UNICA': 'One time',
    'frecuencia.DIARIA': 'Daily',
    'frecuencia.SEMANAL': 'Weekly',
    'frecuencia.MENSUAL': 'Monthly',

    // Event types
    'tipoEvento.TAREA_REALIZADA': 'Task completed',
    'tipoEvento.CAMBIO': 'Change',
    'tipoEvento.IMPREVISTO': 'Unexpected event',
    'tipoEvento.OBSERVACION': 'Note',
  },
};
