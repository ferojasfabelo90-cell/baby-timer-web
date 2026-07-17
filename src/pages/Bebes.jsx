import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listarBebes, listarInvitacionesPendientes, aceptarInvitacion, rechazarInvitacion } from '../api/bebes';
import { calcularEdad } from '../utils/edad';
import { extractErrorMessage } from '../api/client';
import { useLanguage } from '../context/LanguageContext';

export default function Bebes() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [bebes, setBebes] = useState(null); // null = cargando
  const [invitaciones, setInvitaciones] = useState([]);
  const [error, setError] = useState('');
  const [procesandoId, setProcesandoId] = useState(null);

  function cargarTodo() {
    return Promise.all([listarBebes(), listarInvitacionesPendientes()]).then(
      ([bebesData, invitacionesData]) => {
        setBebes(bebesData);
        setInvitaciones(invitacionesData);
      }
    );
  }

  useEffect(() => {
    cargarTodo().catch((err) =>
      setError(extractErrorMessage(err, t('bebes.errorCarga')))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAceptar(invitacionId) {
    setProcesandoId(invitacionId);
    setError('');
    try {
      await aceptarInvitacion(invitacionId);
      await cargarTodo();
    } catch (err) {
      setError(extractErrorMessage(err, t('bebes.errorAceptar')));
    } finally {
      setProcesandoId(null);
    }
  }

  async function handleRechazar(invitacionId) {
    setProcesandoId(invitacionId);
    setError('');
    try {
      await rechazarInvitacion(invitacionId);
      setInvitaciones((actuales) => actuales.filter((inv) => inv.id !== invitacionId));
    } catch (err) {
      setError(extractErrorMessage(err, t('bebes.errorRechazar')));
    } finally {
      setProcesandoId(null);
    }
  }

  if (error && bebes === null) {
    return (
      <div className="page">
        <div className="error-banner">{error}</div>
      </div>
    );
  }

  if (bebes === null) {
    return <div className="page">{t('bebes.cargando')}</div>;
  }

  const seccionInvitaciones = invitaciones.length > 0 && (
    <div style={{ marginBottom: 'var(--space-6)' }}>
      <h3>{t('bebes.invitacionesPendientes')}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {invitaciones.map((inv) => (
          <div key={inv.id} className="card evento-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
            <div>
              <strong>👶 {inv.bebeNombre}</strong>
              <p style={{ margin: '4px 0 0' }}>{t('bebes.invitacionTexto')}</p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <button
                className="btn btn-primary"
                style={{ width: 'auto' }}
                disabled={procesandoId === inv.id}
                onClick={() => handleAceptar(inv.id)}
              >
                {t('bebes.aceptar')}
              </button>
              <button
                className="btn btn-danger"
                disabled={procesandoId === inv.id}
                onClick={() => handleRechazar(inv.id)}
              >
                {t('bebes.rechazar')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (bebes.length === 0) {
    return (
      <div className="page">
        {seccionInvitaciones}
        {error && <div className="error-banner">{error}</div>}
        <div className="card" style={{ textAlign: 'center' }}>
          <h2>{t('bebes.bienvenido')}</h2>
          <p>{t('bebes.sinBebes')}</p>
          <button className="btn btn-primary" onClick={() => navigate('/bebes/nuevo')}>
            {t('bebes.crearPrimero')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {seccionInvitaciones}
      {error && <div className="error-banner">{error}</div>}

      <h2>{t('bebes.misBebes')}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {bebes.map((bebe) => (
          <button
            key={bebe.id}
            className="card bebe-card"
            onClick={() => navigate(`/bebes/${bebe.id}`)}
          >
            <div>
              <h3 style={{ margin: 0 }}>👶 {bebe.nombre}</h3>
              <p style={{ margin: '4px 0 0' }}>{calcularEdad(bebe.fechaNacimiento, t)}</p>
            </div>
            <span className={`badge ${bebe.rol === 'ADMIN' ? 'badge-admin' : 'badge-cuidador'}`}>
              {bebe.rol === 'ADMIN' ? t('bebes.admin') : t('bebes.cuidador')}
            </span>
          </button>
        ))}
      </div>

      <Link to="/bebes/nuevo" className="btn btn-secondary" style={{ marginTop: 'var(--space-5)' }}>
        {t('bebes.nuevoBebe')}
      </Link>
    </div>
  );
}
