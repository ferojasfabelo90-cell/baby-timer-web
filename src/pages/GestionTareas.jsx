import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { obtenerBebe } from '../api/bebes';
import { listarTareas, desactivarTarea } from '../api/tareas';
import { infoTipoTarea, formatearHora, frecuenciaLabel, resumenProgramacion } from '../utils/tareas';
import { extractErrorMessage } from '../api/client';
import { useLanguage } from '../context/LanguageContext';

export default function GestionTareas() {
  const { bebeId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

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
      .catch((err) => setError(extractErrorMessage(err, t('gestionTareas.errorCarga'))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bebeId]);

  async function handleDesactivar(tareaId) {
    if (!window.confirm(t('gestionTareas.confirmarDesactivar'))) {
      return;
    }
    setDesactivandoId(tareaId);
    setError('');
    try {
      await desactivarTarea(tareaId);
      setTareas((actuales) => actuales.filter((t2) => t2.id !== tareaId));
    } catch (err) {
      setError(extractErrorMessage(err, t('gestionTareas.errorDesactivar')));
    } finally {
      setDesactivandoId(null);
    }
  }

  if (error && !bebe) {
    return (
      <div className="page">
        <div className="error-banner">{error}</div>
        <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block' }}>
          {t('gestionTareas.volverDashboardLink')}
        </Link>
      </div>
    );
  }

  if (!bebe || tareas === null) {
    return <div className="page">{t('gestionTareas.cargando')}</div>;
  }

  if (bebe.rol !== 'ADMIN') {
    return (
      <div className="page">
        <div className="error-banner">{t('gestionTareas.soloAdmin', { nombre: bebe.nombre })}</div>
        <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block' }}>
          {t('gestionTareas.volverDashboardLink')}
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
        {t('gestionTareas.volverDashboard', { nombre: bebe.nombre })}
      </Link>

      <h2>{t('gestionTareas.tareasDe', { nombre: bebe.nombre })}</h2>

      {error && <div className="error-banner">{error}</div>}

      {tareas.length === 0 ? (
        <p>{t('gestionTareas.sinTareas')}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
          {tareas.map((tarea) => {
            const { label, icono } = infoTipoTarea(tarea.tipo, t);
            const resumen = resumenProgramacion(tarea, t);
            return (
              <div key={tarea.id} className="card actividad-card">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.2rem' }}>{icono}</span>
                    <strong>{label}</strong>
                    <span className="badge badge-pending">{formatearHora(tarea.horaProgramada)}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      {frecuenciaLabel(tarea.frecuencia, t)}
                      {resumen && ` · ${resumen}`}
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
                    {t('gestionTareas.editar')}
                  </button>
                  <button
                    className="btn btn-danger"
                    disabled={desactivandoId === tarea.id}
                    onClick={() => handleDesactivar(tarea.id)}
                  >
                    {desactivandoId === tarea.id ? t('gestionTareas.desactivando') : t('gestionTareas.desactivar')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Link to={`/bebes/${bebeId}/tareas/nueva`} className="btn btn-primary" style={{ display: 'inline-flex' }}>
        {t('gestionTareas.nuevaTarea')}
      </Link>
    </div>
  );
}
