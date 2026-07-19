import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { extractErrorMessage } from '../api/client';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Register() {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!nombre.trim() || !email.trim() || !password) {
      setError(t('validacion.campoRequerido'));
      return;
    }
    if (password.length < 6) {
      setError(t('validacion.passwordCorta'));
      return;
    }
    setEnviando(true);
    try {
      await register({ nombre, email, password });
      navigate('/bienvenida');
    } catch (err) {
      setError(extractErrorMessage(err, t('register.errorGenerico')));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="auth-page">
      <LanguageSwitcher style={{ position: 'absolute', top: 20, right: 20 }} />
      <div className="card" style={{ width: '100%', maxWidth: 380 }}>
        <h1>{t('register.titulo')}</h1>
        <p>{t('register.subtitulo')}</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="nombre">{t('register.nombre')}</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <div className="field">
            <label htmlFor="email">{t('register.email')}</label>
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
            <label htmlFor="password">{t('register.password')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={6}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={enviando}>
            {enviando ? t('register.creando') : t('register.crear')}
          </button>
        </form>

        <p className="muted-link">
          {t('register.yaTeneCuenta')} <Link to="/login">{t('register.ingresa')}</Link>
        </p>
      </div>
    </div>
  );
}
