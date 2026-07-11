import { apiClient } from './client';

export async function listarBebes() {
  const { data } = await apiClient.get('/api/v1/bebes');
  return data; // [{ id, nombre, fechaNacimiento, rol }]
}

export async function obtenerBebe(bebeId) {
  const { data } = await apiClient.get(`/api/v1/bebes/${bebeId}`);
  return data;
}

export async function crearBebe({ nombre, fechaNacimiento }) {
  const { data } = await apiClient.post('/api/v1/bebes', { nombre, fechaNacimiento });
  return data;
}

export async function invitarCuidador(bebeId, email) {
  await apiClient.post(`/api/v1/bebes/${bebeId}/invitar`, { email });
}

export async function listarInvitacionesPendientes() {
  const { data } = await apiClient.get('/api/v1/bebes/invitaciones');
  return data; // [{ id, bebeId, bebeNombre }]
}

export async function aceptarInvitacion(invitacionId) {
  await apiClient.post(`/api/v1/bebes/invitaciones/${invitacionId}/aceptar`);
}

export async function rechazarInvitacion(invitacionId) {
  await apiClient.post(`/api/v1/bebes/invitaciones/${invitacionId}/rechazar`);
}
