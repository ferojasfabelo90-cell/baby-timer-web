import { apiClient } from './client';

export async function listarTareas(bebeId) {
  const { data } = await apiClient.get('/api/v1/tareas', { params: { bebeId } });
  return data; // [{ id, tipo, descripcion, frecuencia, horaProgramada }]
}

// Sin inicio/fin, el backend interpreta "hoy".
export async function obtenerActividadesDeHoy(bebeId) {
  const { data } = await apiClient.post('/api/v1/tareas/actividades', { bebeId });
  return data; // [{ tareaId, tipo, descripcion, horaProgramada, estado }]
}

export async function marcarTareaRealizada(tareaId) {
  await apiClient.post(`/api/v1/tareas/${tareaId}/realizar`);
}

export async function crearTarea(bebeId, payload) {
  const { data } = await apiClient.post('/api/v1/tareas', payload, { params: { bebeId } });
  return data;
}

export async function editarTarea(tareaId, payload) {
  const { data } = await apiClient.put(`/api/v1/tareas/${tareaId}`, payload);
  return data;
}

export async function desactivarTarea(tareaId) {
  await apiClient.patch(`/api/v1/tareas/${tareaId}/desactivar`);
}
