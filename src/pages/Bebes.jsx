import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { listarBebes } from '../api/bebes';
import { calcularEdad } from '../utils/edad';
import { extractErrorMessage } from '../api/client';

export default function Bebes() {
  const navigate = useNavigate();
  const [bebes, setBebes] = useState(null); // null = cargando
  const [error, setError] = useState('');

  useEffect(() => {
    listarBebes()
      .then(setBebes)
      .catch((err) => setError(extractErrorMessage(err, 'No pudimos cargar tus bebés.')));
  }, []);

  if (error) {
    return (
      <div className="page">
        <div className="error-banner">{error}</div>
      </div>
    );
  }

  if (bebes === null) {
    return <div className="page">Cargando…</div>;
  }

  // Estado vacío: todavía no tiene ningún bebé registrado.
  if (bebes.length === 0) {
    return (
      <div className="page">
        <div className="card" style={{ textAlign: 'center' }}>
          <h2>Bienvenido 👋</h2>
          <p>Aún no tenés bebés registrados.</p>
          <button className="btn btn-primary" onClick={() => navigate('/bebes/nuevo')}>
            Crear mi primer bebé
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Mis bebés</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {bebes.map((bebe) => (
          <button
            key={bebe.id}
            className="card bebe-card"
            onClick={() => navigate(`/bebes/${bebe.id}`)}
          >
            <div>
              <h3 style={{ margin: 0 }}>👶 {bebe.nombre}</h3>
              <p style={{ margin: '4px 0 0' }}>{calcularEdad(bebe.fechaNacimiento)}</p>
            </div>
            <span className={`badge ${bebe.rol === 'ADMIN' ? 'badge-admin' : 'badge-cuidador'}`}>
              {bebe.rol === 'ADMIN' ? 'Admin' : 'Cuidador'}
            </span>
          </button>
        ))}
      </div>

      <Link to="/bebes/nuevo" className="btn btn-secondary" style={{ marginTop: 'var(--space-5)' }}>
        + Nuevo bebé
      </Link>
    </div>
  );
}
