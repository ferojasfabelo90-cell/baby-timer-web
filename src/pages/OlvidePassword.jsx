import { useState } from 'react';
import { Link } from 'react-router-dom';
import { solicitarRecuperacion } from '../api/auth';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function OlvidePassword() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError(t('validacion.campoRequerido'));
      return;
    }
    setEnviando(true);
    try {
      await solicitarRecuperacion(email.trim());
      // Siempre mostramos el mismo mensaje de éxito, exista o no esa
      // cuenta — es el mismo criterio que ya aplica el backend, para no
      // revelar qué emails están registrados.
      setEnviado(true);
    } catch {
      // Ante cualquier error de red mostramos igual el mensaje genérico:
      // no hay nada específico y accionable que decirle al usuario acá.
      setEnviado(true);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="auth-page">
      <LanguageSwitcher style={{ position: 'absolute', top: 20, right: 20 }} />
      <div className="card" style={{ width: '100%', maxWidth: 380 }}>
        <h1>{t('olvidePassword.titulo')}</h1>

        {enviado ? (
          <>
            <p>{t('olvidePassword.exito')}</p>
            <Link to="/login" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              {t('olvidePassword.volverLogin')}
            </Link>
          </>
        ) : (
          <>
            <p>{t('olvidePassword.subtitulo')}</p>

            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="email">{t('olvidePassword.email')}</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <button className="btn btn-primary" type="submit" disabled={enviando}>
                {enviando ? t('olvidePassword.enviando') : t('olvidePassword.enviar')}
              </button>
            </form>

            <p className="muted-link">
              <Link to="/login">{t('olvidePassword.volverLogin')}</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
