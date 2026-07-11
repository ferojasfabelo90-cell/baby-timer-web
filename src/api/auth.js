import { apiClient } from './client';

export async function login({ email, password }) {
  const { data } = await apiClient.post('/api/v1/auth/login', { email, password });
  return data; // { token: "..." }
}

export async function register({ nombre, email, password }) {
  const { data } = await apiClient.post('/api/v1/usuarios', { nombre, email, password });
  return data;
}

export async function getUsuarioActual() {
  const { data } = await apiClient.get('/api/v1/usuarios/me');
  return data;
}
