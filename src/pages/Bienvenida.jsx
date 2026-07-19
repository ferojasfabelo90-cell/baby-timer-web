import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Bienvenida() {
  const { usuario } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [mostrarEmail, setMostrarEmail] = useState(false);

  if (mostrarEmail) {
    return (
      <div className="page">
        <div className="card" style={{ textAlign: 'center' }}>
          <h2>{t('bienvenida.tituloInvitado')}</h2>
          <p>{t('bienvenida.explicacionInvitado')}</p>
          <p style={{
            fontWeight: 600,
            fontSize: '1.1rem',
            background: 'var(--color-brand-light)',
            color: 'var(--color-brand-dark)',
            padding: '10px 16px',
            borderRadius: 'var(--radius-sm)',
            display: 'inline-block',
          }}>
            {usuario?.email}
          </p>
          <button className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }} onClick={() => navigate('/bebes')}>
            {t('bienvenida.continuar')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>{t('bienvenida.titulo')}</h2>
        <p>{t('bienvenida.subtitulo')}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          <button className="btn btn-primary" onClick={() => navigate('/bebes/nuevo')}>
            {t('bienvenida.opcionPropio')}
          </button>
          <button className="btn btn-secondary" onClick={() => setMostrarEmail(true)}>
            {t('bienvenida.opcionInvitado')}
          </button>
        </div>
      </div>
    </div>
  );
}
