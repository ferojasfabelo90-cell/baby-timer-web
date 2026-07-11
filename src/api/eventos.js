import { apiClient } from './client';

export async function listarEventos(bebeId) {
  const { data } = await apiClient.get('/api/v1/eventos', { params: { bebeId } });
  return data; // [{ id, tipoEvento, descripcion, fechaHora }], ya viene ordenado desc
}

export async function crearEvento({ bebeId, tipoEvento, descripcion }) {
  await apiClient.post('/api/v1/eventos', { bebeId, tipoEvento, descripcion });
}
