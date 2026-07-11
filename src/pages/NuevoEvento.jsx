import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { crearEvento } from '../api/eventos';
import { TIPO_EVENTO_MANUAL_OPTIONS } from '../utils/eventos';
import { extractErrorMessage } from '../api/client';

export default function NuevoEvento() {
  const { bebeId } = useParams();
  const navigate = useNavigate();

  const [tipoEvento, setTipoEvento] = useState('OBSERVACION');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      await crearEvento({ bebeId: Number(bebeId), tipoEvento, descripcion: descripcion.trim() });
      navigate(`/bebes/${bebeId}/bitacora`);
    } catch (err) {
      setError(extractErrorMessage(err, 'No pudimos registrar el evento. Revisá los datos.'));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="page">
      <Link to={`/bebes/${bebeId}/bitacora`} className="muted-link" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
        ← Bitácora
      </Link>
      <h2>Registrar evento</h2>

      <form className="card" onSubmit={handleSubmit}>
        {error && <div className="error-banner">{error}</div>}

        <div className="field">
          <label htmlFor="tipoEvento">Tipo de evento</label>
          <select id="tipoEvento" value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value)} required>
            {TIPO_EVENTO_MANUAL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <input
            id="descripcion"
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ej: se despertó llorando a las 3am"
            required
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={enviando}>
          {enviando ? 'Guardando…' : 'Registrar evento'}
        </button>
      </form>
    </div>
  );
}
