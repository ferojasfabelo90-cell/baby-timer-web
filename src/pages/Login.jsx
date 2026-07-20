import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { extractErrorMessage } from '../api/client';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError(t('validacion.campoRequerido'));
      return;
    }
    setEnviando(true);
    try {
      await login({ email, password });
      navigate('/bebes');
    } catch (err) {
      setError(
        err.response?.status === 401
          ? t('login.errorCredenciales')
          : extractErrorMessage(err)
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="auth-page">
      <LanguageSwitcher style={{ position: 'absolute', top: 20, right: 20 }} />
      <div className="card" style={{ width: '100%', maxWidth: 380 }}>
        <h1>{t('login.titulo')}</h1>
        <p>{t('login.subtitulo')}</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">{t('login.email')}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="field">
            <label htmlFor="password">{t('login.password')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={enviando}>
            {enviando ? t('login.ingresando') : t('login.ingresar')}
          </button>
        </form>

        <p className="muted-link">
          <Link to="/olvide-password">{t('login.olvidePassword')}</Link>
        </p>

        <p className="muted-link">
          {t('login.sinCuenta')} <Link to="/registro">{t('login.creaUna')}</Link>
        </p>
      </div>
    </div>
  );
}
