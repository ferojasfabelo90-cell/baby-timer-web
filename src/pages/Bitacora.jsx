import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerBebe } from '../api/bebes';
import { listarEventos } from '../api/eventos';
import { infoTipoEvento, formatearFechaHora } from '../utils/eventos';
import { extractErrorMessage } from '../api/client';

export default function Bitacora() {
  const { bebeId } = useParams();

  const [bebe, setBebe] = useState(null);
  const [eventos, setEventos] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    Promise.all([obtenerBebe(bebeId), listarEventos(Number(bebeId))])
      .then(([bebeData, eventosData]) => {
        setBebe(bebeData);
        setEventos(eventosData);
      })
      .catch((err) => setError(extractErrorMessage(err, 'No pudimos cargar la bitácora.')));
  }, [bebeId]);

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

  if (!bebe || eventos === null) {
    return <div className="page">Cargando…</div>;
  }

  return (
    <div className="page">
      <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
        ← Dashboard de {bebe.nombre}
      </Link>

      <h2>Bitácora de {bebe.nombre}</h2>

      {error && <div className="error-banner">{error}</div>}

      {eventos.length === 0 ? (
        <p>Todavía no hay eventos registrados.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
          {eventos.map((evento) => {
            const { label, icono } = infoTipoEvento(evento.tipoEvento);
            return (
              <div key={evento.id} className="card evento-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontSize: '1.2rem' }}>{icono}</span>
                  <strong>{label}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {formatearFechaHora(evento.fechaHora)}
                  </span>
                </div>
                {evento.descripcion && <p style={{ margin: '6px 0 0' }}>{evento.descripcion}</p>}
              </div>
            );
          })}
        </div>
      )}

      <Link to={`/bebes/${bebeId}/bitacora/nuevo`} className="btn btn-primary" style={{ display: 'inline-flex' }}>
        + Registrar evento
      </Link>
    </div>
  );
}
