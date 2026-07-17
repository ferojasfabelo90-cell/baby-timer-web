import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerBebe } from '../api/bebes';
import { obtenerActividadesDeHoy, marcarTareaRealizada } from '../api/tareas';
import { calcularEdad } from '../utils/edad';
import { infoTipoTarea, formatearHora } from '../utils/tareas';
import { extractErrorMessage } from '../api/client';
import { useLanguage } from '../context/LanguageContext';

export default function BebeDetalle() {
  const { bebeId } = useParams();
  const { t } = useLanguage();

  const [bebe, setBebe] = useState(null);
  const [actividades, setActividades] = useState(null);
  const [error, setError] = useState('');
  const [enviandoId, setEnviandoId] = useState(null);

  const cargarActividades = useCallback(() => {
    return obtenerActividadesDeHoy(Number(bebeId)).then(setActividades);
  }, [bebeId]);

  useEffect(() => {
    setError('');
    Promise.all([obtenerBebe(bebeId), cargarActividades()])
      .then(([bebeData]) => setBebe(bebeData))
      .catch((err) => setError(extractErrorMessage(err, t('dashboard.errorCarga'))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bebeId, cargarActividades]);

  async function handleMarcarRealizada(tareaId) {
    setEnviandoId(tareaId);
    setError('');
    try {
      await marcarTareaRealizada(tareaId);
      await cargarActividades();
    } catch (err) {
      setError(extractErrorMessage(err, t('dashboard.errorMarcar')));
    } finally {
      setEnviandoId(null);
    }
  }

  if (error && !bebe) {
    return (
      <div className="page">
        <div className="error-banner">{error}</div>
        <Link to="/bebes" className="muted-link" style={{ display: 'block' }}>
          {t('dashboard.misBebes')}
        </Link>
      </div>
    );
  }

  if (!bebe || actividades === null) {
    return <div className="page">{t('dashboard.cargando')}</div>;
  }

  const pendientes = [...actividades]
    .filter((a) => a.estado === 'PENDIENTE')
    .sort((a, b) => (a.horaProgramada || '').localeCompare(b.horaProgramada || ''));
  const completadas = [...actividades]
    .filter((a) => a.estado === 'COMPLETADA')
    .sort((a, b) => (a.horaProgramada || '').localeCompare(b.horaProgramada || ''));

  return (
    <div className="page">
      <Link to="/bebes" className="muted-link" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
        {t('dashboard.misBebes')}
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        <div>
          <h2 style={{ marginBottom: 2 }}>👶 {bebe.nombre}</h2>
          <p style={{ margin: 0 }}>{calcularEdad(bebe.fechaNacimiento, t)}</p>
        </div>
        <span className={`badge ${bebe.rol === 'ADMIN' ? 'badge-admin' : 'badge-cuidador'}`}>
          {bebe.rol === 'ADMIN' ? t('dashboard.administrador') : t('dashboard.cuidador')}
        </span>
      </div>

      {bebe.rol === 'CUIDADOR' && (
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
          {t('dashboard.aclaracionCuidador', { nombre: bebe.nombre })}
        </p>
      )}

      {bebe.rol === 'ADMIN' && (
        <Link
          to={`/bebes/${bebeId}/tareas`}
          className="btn btn-secondary"
          style={{ display: 'inline-flex', marginBottom: 'var(--space-3)' }}
        >
          {t('dashboard.gestionarTareas')}
        </Link>
      )}
      {bebe.rol === 'ADMIN' && (
        <Link
          to={`/bebes/${bebeId}/invitar`}
          className="btn btn-secondary"
          style={{ display: 'inline-flex', marginBottom: 'var(--space-3)' }}
        >
          {t('dashboard.invitarCuidador')}
        </Link>
      )}
      <Link
        to={`/bebes/${bebeId}/bitacora`}
        className="btn btn-secondary"
        style={{ display: 'inline-flex', marginBottom: 'var(--space-5)' }}
      >
        {t('dashboard.verBitacora')}
      </Link>

      {error && <div className="error-banner">{error}</div>}

      <h3>{t('dashboard.hoyPendientes')}</h3>
      {pendientes.length === 0 ? (
        <p>{t('dashboard.sinPendientes')}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          {pendientes.map((actividad) => {
            const { label, icono } = infoTipoTarea(actividad.tipo, t);
            const enviando = enviandoId === actividad.tareaId;
            return (
              <div key={actividad.tareaId} className="card actividad-card">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: '1.2rem' }}>{icono}</span>
                    <strong>{label}</strong>
                    <span className="badge badge-pending">{formatearHora(actividad.horaProgramada)}</span>
                  </div>
                  {actividad.descripcion && (
                    <p style={{ margin: '4px 0 0' }}>{actividad.descripcion}</p>
                  )}
                </div>
                <button
                  className="btn btn-primary"
                  style={{ width: 'auto' }}
                  disabled={enviando}
                  onClick={() => handleMarcarRealizada(actividad.tareaId)}
                >
                  {enviando ? t('dashboard.marcando') : t('dashboard.marcarHecha')}
                </button>
              </div>
            );
          })}
        </div>
      )}

      <h3>{t('dashboard.hoyCompletadas')}</h3>
      {completadas.length === 0 ? (
        <p>{t('dashboard.sinCompletadas')}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {completadas.map((actividad) => {
            const { label, icono } = infoTipoTarea(actividad.tipo, t);
            return (
              <div key={actividad.tareaId} className="card actividad-card actividad-completada">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontSize: '1.2rem' }}>{icono}</span>
                  <strong>{label}</strong>
                  <span className="badge badge-success">{formatearHora(actividad.horaProgramada)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
