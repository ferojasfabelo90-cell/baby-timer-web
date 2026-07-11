# Baby Timer — Web

Frontend en React del MVP de **Baby Timer**, una aplicación para que
familias con más de un cuidador (padres, abuelos, niñeras) coordinen el
cuidado de un bebé: qué tareas hay que hacer, quién las hizo, y un historial
auditable de eventos. Reemplaza el "WhatsApp + notas sueltas" por un
registro centralizado con permisos por rol.

Consume la API REST de [Baby Timer Backend](#) (Spring Boot + MySQL, repo
separado).

## Funcionalidad

- Registro e inicio de sesión con JWT.
- Alta de bebés, cada uno con un administrador y cero o más cuidadores.
- Creación, edición y desactivación de tareas programadas (solo ADMIN).
- Dashboard diario: qué está pendiente hoy, marcar como realizado.
- Bitácora de eventos (automáticos + manuales) por bebé.
- Invitación de cuidadores por email, con permisos diferenciados de ADMIN.

## Stack

- React 18 + Vite
- React Router v6
- Axios
- CSS con variables (sin framework de UI, diseño propio)

## Cómo correrlo localmente

Necesitás el [backend](#) corriendo en paralelo — ver ese repo para instrucciones.

```bash
npm install
cp .env.example .env    # ajustá VITE_API_URL si tu backend no está en localhost:8080
npm run dev
```

Abrí `http://localhost:5173`.

**Nota de CORS**: el backend debe tener `http://localhost:5173` habilitado en
sus orígenes permitidos (variable de entorno `CORS_ALLOWED_ORIGINS` del backend).

## Estructura

```
src/
├── api/            # una función por endpoint del backend
├── components/     # UI reutilizable (Navbar, formularios, rutas protegidas)
├── context/         # estado global de sesión (AuthContext)
├── pages/          # una pantalla = un archivo
├── utils/          # helpers de presentación (edad, formato de hora, catálogos)
└── styles/         # tokens.css (paleta/tipografía) + global.css
```

## Roles y permisos

Cada usuario tiene un rol (`ADMIN` o `CUIDADOR`) **por bebé**, no global —
la misma persona puede ser ADMIN de un bebé y CUIDADOR de otro. El frontend
oculta condicionalmente acciones según el rol devuelto por el backend, pero
la validación real vive en el backend: cualquier intento de saltarse la UI
(URL directa, llamada a la API) es rechazado ahí con 403.

## Deploy

Pensado para desplegarse en **Vercel** o **Netlify**:

1. Variable de entorno: `VITE_API_URL` = URL pública de tu backend ya desplegado.
2. Build command: `npm run build` — output: `dist`.
3. Una vez desplegado, agregá esta URL a `CORS_ALLOWED_ORIGINS` en el backend.

## Roadmap (fuera del alcance del MVP actual)

- Resumen de traspaso entre cuidadores (agregación de las últimas horas).
- Recordatorios de tareas vencidas.
- Endpoint y pantalla para listar/quitar cuidadores existentes.
- Tests automatizados (actualmente no hay).
- Versión mobile (React Native o PWA).

## Licencia

MIT — ver [LICENSE](./LICENSE).
