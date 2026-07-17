import axios from 'axios';
import { backendMessageTranslations } from '../i18n/backendMessages';

// La URL del backend se define en .env como VITE_API_URL.
// Ver .env.example para el valor por defecto (http://localhost:8080).
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const TOKEN_KEY = 'babytimer_token';

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Adjunta el JWT a cada request saliente, si existe.
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si el backend responde 401, el token ya no sirve: lo limpiamos
// y forzamos vuelta al login.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Traduce los distintos formatos de error del backend a un string legible,
// SIEMPRE en el idioma activo — el backend no se modifica para esto, así
// que siempre responde en español. Reconocemos el texto exacto que ya
// sabemos que manda (backendMessageTranslations) y lo traducimos; si no lo
// reconocemos, NUNCA mostramos el texto crudo — usamos el fallback que
// cada pantalla ya trae traducido.
export function extractErrorMessage(error, fallback = 'Ocurrió un error. Intentá de nuevo.') {
  const data = error?.response?.data;
  if (!data) return fallback;

  const idioma = localStorage.getItem('babytimer_language') === 'en' ? 'en' : 'es';

  // Caso 1: respuesta de error "normal" (ApiErrorResponse), con campo `message`.
  if (typeof data.message === 'string') {
    const traducido = backendMessageTranslations[data.message.trim()];
    if (traducido) return traducido[idioma];
    return fallback; // mensaje no mapeado: nunca mostramos el crudo en español
  }

  // Caso 2: errores de validación de formulario (Map<String,String> del
  // backend, sin envoltorio). Tampoco mostramos el texto crudo — directo
  // al fallback traducido de la pantalla.
  if (typeof data === 'object') {
    return fallback;
  }

  return fallback;
}
