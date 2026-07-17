import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { crearBebe } from '../api/bebes';
import { extractErrorMessage } from '../api/client';
import { useLanguage } from '../context/LanguageContext';

export default function NuevoBebe() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!nombre.trim() || !fechaNacimiento) {
      setError(t('validacion.campoRequerido'));
      return;
    }
    setGuardando(true);
    try {
      const bebe = await crearBebe({ nombre, fechaNacimiento });
      navigate(`/bebes/${bebe.id}`);
    } catch (err) {
      setError(extractErrorMessage(err, t('nuevoBebe.errorGenerico')));
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="page">
      <h2>{t('nuevoBebe.titulo')}</h2>

      {error && <div className="error-banner">{error}</div>}

      <form className="card" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="nombre">{t('nuevoBebe.nombre')}</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Sofía"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="fechaNacimiento">{t('nuevoBebe.fechaNacimiento')}</label>
          <input
            id="fechaNacimiento"
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={guardando}>
          {guardando ? t('nuevoBebe.guardando') : t('nuevoBebe.guardar')}
        </button>
      </form>

      <Link to="/bebes" className="muted-link" style={{ display: 'block' }}>
        {t('nuevoBebe.cancelar')}
      </Link>
    </div>
  );
}
