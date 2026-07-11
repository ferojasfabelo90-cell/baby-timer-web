import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { crearBebe } from '../api/bebes';
import { extractErrorMessage } from '../api/client';

export default function NuevoBebe() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setGuardando(true);
    try {
      const bebe = await crearBebe({ nombre, fechaNacimiento });
      navigate(`/bebes/${bebe.id}`);
    } catch (err) {
      setError(extractErrorMessage(err, 'No pudimos guardar el bebé. Revisá los datos.'));
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="page">
      <h2>Nuevo bebé</h2>

      {error && <div className="error-banner">{error}</div>}

      <form className="card" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
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
          <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
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
          {guardando ? 'Guardando…' : 'Guardar'}
        </button>
      </form>

      <Link to="/bebes" className="muted-link" style={{ display: 'block' }}>
        Cancelar
      </Link>
    </div>
  );
}
