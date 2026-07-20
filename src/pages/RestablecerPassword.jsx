import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { restablecerPassword } from '../api/auth';
import { useLanguage } from '../context/LanguageContext';
import { extractErrorMessage } from '../api/client';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function RestablecerPassword() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!password || !confirmarPassword) {
      setError(t('validacion.campoRequerido'));
      return;
    }
    if (password.length < 6) {
      setError(t('validacion.passwordCorta'));
      return;
    }
    if (password !== confirmarPassword) {
      setError(t('restablecer.passwordsNoCoinciden'));
      return;
    }

    setEnviando(true);
    try {
      await restablecerPassword(token, password);
      setExito(true);
    } catch (err) {
      setError(extractErrorMessage(err, t('restablecer.errorGenerico')));
    } finally {
      setEnviando(false);
    }
  }

  // Sin token en la URL, este link no sirve para nada — se lo decimos
  // directo, sin mostrar un formulario que de entrada no va a funcionar.
  if (!token) {
    return (
      <div className="auth-page">
        <div className="card" style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>
          <h2>{t('restablecer.linkInvalido')}</h2>
          <p>{t('restablecer.linkInvalidoTexto')}</p>
          <Link to="/olvide-password" className="btn btn-primary" style={{ display: 'inline-flex' }}>
            {t('restablecer.pedirNuevo')}
          </Link>
        </div>
      </div>
    );
  }

  if (exito) {
    return (
      <div className="auth-page">
        <div className="card" style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>
          <h2>{t('restablecer.exitoTitulo')}</h2>
          <p>{t('restablecer.exitoTexto')}</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            {t('restablecer.irALogin')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <LanguageSwitcher style={{ position: 'absolute', top: 20, right: 20 }} />
      <div className="card" style={{ width: '100%', maxWidth: 380 }}>
        <h1>{t('restablecer.titulo')}</h1>
        <p>{t('restablecer.subtitulo')}</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="password">{t('restablecer.passwordNueva')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="field">
            <label htmlFor="confirmarPassword">{t('restablecer.confirmarPassword')}</label>
            <input
              id="confirmarPassword"
              type="password"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={enviando}>
            {enviando ? t('restablecer.guardando') : t('restablecer.guardar')}
          </button>
        </form>
      </div>
    </div>
  );
}
