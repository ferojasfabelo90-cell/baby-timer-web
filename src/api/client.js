import axios from 'axios';

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

// Traduce los distintos formatos de error del backend
// (ApiErrorResponse vs. Map<String,String> de validación) a un string legible.
export function extractErrorMessage(error, fallback = 'Ocurrió un error. Intentá de nuevo.') {
  const data = error?.response?.data;
  if (!data) return fallback;
  if (typeof data.message === 'string') return data.message;
  if (typeof data === 'object') {
    const firstFieldError = Object.values(data)[0];
    if (typeof firstFieldError === 'string') return firstFieldError;
  }
  return fallback;
}
