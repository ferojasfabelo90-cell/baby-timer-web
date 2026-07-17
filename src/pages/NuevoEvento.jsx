import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { crearEvento } from '../api/eventos';
import { tipoEventoManualOptions } from '../utils/eventos';
import { extractErrorMessage } from '../api/client';
import { useLanguage } from '../context/LanguageContext';

export default function NuevoEvento() {
  const { bebeId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [tipoEvento, setTipoEvento] = useState('OBSERVACION');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!descripcion.trim()) {
      setError(t('validacion.campoRequerido'));
      return;
    }
    setEnviando(true);
    try {
      await crearEvento({ bebeId: Number(bebeId), tipoEvento, descripcion: descripcion.trim() });
      navigate(`/bebes/${bebeId}/bitacora`);
    } catch (err) {
      setError(extractErrorMessage(err, t('nuevoEvento.errorGenerico')));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="page">
      <Link to={`/bebes/${bebeId}/bitacora`} className="muted-link" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
        {t('nuevoEvento.volverBitacora')}
      </Link>
      <h2>{t('nuevoEvento.titulo')}</h2>

      <form className="card" onSubmit={handleSubmit} noValidate>
        {error && <div className="error-banner">{error}</div>}

        <div className="field">
          <label htmlFor="tipoEvento">{t('nuevoEvento.tipo')}</label>
          <select id="tipoEvento" value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)} required>
            {tipoEventoManualOptions(t).map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="descripcion">{t('nuevoEvento.descripcion')}</label>
          <input
            id="descripcion"
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder={t('nuevoEvento.descripcionPlaceholder')}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={enviando}>
          {enviando ? t('nuevoEvento.guardando') : t('nuevoEvento.registrar')}
        </button>
      </form>
    </div>
  );
}
