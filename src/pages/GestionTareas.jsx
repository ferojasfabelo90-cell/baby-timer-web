import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { obtenerBebe } from '../api/bebes';
import { listarTareas, desactivarTarea } from '../api/tareas';
import { infoTipoTarea, formatearHora, FRECUENCIA_INFO } from '../utils/tareas';
import { extractErrorMessage } from '../api/client';

export default function GestionTareas() {
  const { bebeId } = useParams();
  const navigate = useNavigate();

  const [bebe, setBebe] = useState(null);
  const [tareas, setTareas] = useState(null);
  const [error, setError] = useState('');
  const [desactivandoId, setDesactivandoId] = useState(null);

  useEffect(() => {
    setError('');
    Promise.all([obtenerBebe(bebeId), listarTareas(Number(bebeId))])
      .then(([bebeData, tareasData]) => {
        setBebe(bebeData);
        setTareas(tareasData);
      })
      .catch((err) => setError(extractErrorMessage(err, 'No pudimos cargar las tareas.')));
  }, [bebeId]);

  async function handleDesactivar(tareaId) {
    if (!window.confirm('¿Desactivar esta tarea? Ya no va a aparecer en las actividades del día.')) {
      return;
    }
    setDesactivandoId(tareaId);
    setError('');
    try {
      await desactivarTarea(tareaId);
      setTareas((actuales) => actuales.filter((t) => t.id !== tareaId));
    } catch (err) {
      setError(extractErrorMessage(err, 'No pudimos desactivar la tarea.'));
    } finally {
      setDesactivandoId(null);
    }
  }

  if (error && !bebe) {
    return (
      <div className="page">
        <div className="error-banner">{error}</div>
        <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block' }}>
          Volver al dashboard
        </Link>
      </div>
    );
  }

  if (!bebe || tareas === null) {
    return <div className="page">Cargando…</div>;
  }

  // Defensa en el cliente: la API igual rechaza esto con 403,
  // pero evitamos que un CUIDADOR llegue a ver esta pantalla por error.
  if (bebe.rol !== 'ADMIN') {
    return (
      <div className="page">
        <div className="error-banner">Solo el administrador de {bebe.nombre} puede gestionar tareas.</div>
        <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block' }}>
          Volver al dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
        ← Dashboard de {bebe.nombre}
      </Link>

      <h2>Tareas de {bebe.nombre}</h2>

      {error && <div className="error-banner">{error}</div>}

      {tareas.length === 0 ? (
        <p>Todavía no hay tareas creadas.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
          {tareas.map((tarea) => {
            const { label, icono } = infoTipoTarea(tarea.tipo);
            return (
              <div key={tarea.id} className="card actividad-card">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: '1.2rem' }}>{icono}</span>
                    <strong>{label}</strong>
                    <span className="badge badge-pending">{formatearHora(tarea.horaProgramada)}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      {FRECUENCIA_INFO[tarea.frecuencia]}
                    </span>
                  </div>
                  {tarea.descripcion && <p style={{ margin: '4px 0 0' }}>{tarea.descripcion}</p>}
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <button
                    className="btn btn-secondary"
                    style={{ width: 'auto' }}
                    onClick={() => navigate(`/bebes/${bebeId}/tareas/${tarea.id}/editar`, { state: { tarea } })}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    disabled={desactivandoId === tarea.id}
                    onClick={() => handleDesactivar(tarea.id)}
                  >
                    {desactivandoId === tarea.id ? 'Desactivando…' : 'Desactivar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Link to={`/bebes/${bebeId}/tareas/nueva`} className="btn btn-primary" style={{ display: 'inline-flex' }}>
        + Nueva tarea
      </Link>
    </div>
  );
}
