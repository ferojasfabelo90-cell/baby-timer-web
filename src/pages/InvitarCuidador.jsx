import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerBebe, invitarCuidador } from '../api/bebes';
import { extractErrorMessage } from '../api/client';
import { useLanguage } from '../context/LanguageContext';

export default function InvitarCuidador() {
  const { bebeId } = useParams();
  const { t } = useLanguage();

  const [bebe, setBebe] = useState(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    obtenerBebe(bebeId)
      .then(setBebe)
      .catch((err) => setError(extractErrorMessage(err, t('invitar.errorCarga'))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bebeId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setExito(false);
    if (!email.trim()) {
      setError(t('validacion.campoRequerido'));
      return;
    }
    setEnviando(true);
    try {
      await invitarCuidador(Number(bebeId), email.trim());
      setExito(true);
      setEmail('');
    } catch (err) {
      if (err.response?.status === 404) {
        setError(t('invitar.error404'));
      } else if (err.response?.status === 400) {
        setError(t('invitar.error400'));
      } else {
        setError(extractErrorMessage(err, t('invitar.errorGenerico')));
      }
    } finally {
      setEnviando(false);
    }
  }

  if (error && !bebe) {
    return (
      <div className="page">
        <div className="error-banner">{error}</div>
        <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block' }}>
          {t('invitar.volverDashboard')}
        </Link>
      </div>
    );
  }

  if (!bebe) {
    return <div className="page">{t('invitar.cargando')}</div>;
  }

  if (bebe.rol !== 'ADMIN') {
    return (
      <div className="page">
        <div className="error-banner">{t('invitar.soloAdmin', { nombre: bebe.nombre })}</div>
        <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block' }}>
          {t('invitar.volverDashboard')}
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
        {t('invitar.volverDashboardLink', { nombre: bebe.nombre })}
      </Link>

      <h2>{t('invitar.titulo')}</h2>
      <p>{t('invitar.explicacion', { nombre: bebe.nombre })}</p>

      <form className="card" onSubmit={handleSubmit} noValidate>
        {error && <div className="error-banner">{error}</div>}
        {exito && (
          <div style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: 'var(--space-4)', fontSize: '0.9rem' }}>
            {t('invitar.exito', { nombre: bebe.nombre })}
          </div>
        )}

        <div className="field">
          <label htmlFor="email">{t('invitar.emailLabel')}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="cuidador@email.com"
            required
          />
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            {t('invitar.emailAyuda')}
          </span>
        </div>

        <button className="btn btn-primary" type="submit" disabled={enviando}>
          {enviando ? t('invitar.enviando') : t('invitar.invitar')}
        </button>
      </form>
    </div>
  );
}
