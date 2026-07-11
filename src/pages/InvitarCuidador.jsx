import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { obtenerBebe, invitarCuidador } from '../api/bebes';
import { extractErrorMessage } from '../api/client';

export default function InvitarCuidador() {
  const { bebeId } = useParams();
  const navigate = useNavigate();

  const [bebe, setBebe] = useState(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    obtenerBebe(bebeId)
      .then(setBebe)
      .catch((err) => setError(extractErrorMessage(err, 'No pudimos cargar este bebé.')));
  }, [bebeId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setExito(false);
    setEnviando(true);
    try {
      await invitarCuidador(Number(bebeId), email.trim());
      setExito(true);
      setEmail('');
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Ese email todavía no tiene una cuenta en Baby Timer. Pedile que se registre primero y volvé a intentar.');
      } else if (err.response?.status === 400) {
        setError('Esa persona ya tiene acceso a este bebé, o ya le enviaste una invitación que todavía no respondió.');
      } else {
        setError(extractErrorMessage(err, 'No pudimos enviar la invitación.'));
      }
    } finally {
      setEnviando(false);
    }
  }

  if (error && !bebe) {
    return (
      <div className="page">
        <div className="error-banner">{error}</div>
        <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block' }}>
          Volver al dashboard
        </Link>
      </div>
    );
  }

  if (!bebe) {
    return <div className="page">Cargando…</div>;
  }

  // Defensa en el cliente, igual que en Gestión de tareas: la API rechaza
  // esto con 403 de todos modos si no sos ADMIN.
  if (bebe.rol !== 'ADMIN') {
    return (
      <div className="page">
        <div className="error-banner">Solo el administrador de {bebe.nombre} puede invitar cuidadores.</div>
        <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block' }}>
          Volver al dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to={`/bebes/${bebeId}`} className="muted-link" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
        ← Dashboard de {bebe.nombre}
      </Link>

      <h2>Invitar cuidador</h2>
      <p>
        La persona que invites va a poder ver y marcar las tareas de {bebe.nombre},
        pero no podrá crearlas, editarlas ni invitar a nadie más.
      </p>

      <form className="card" onSubmit={handleSubmit}>
        {error && <div className="error-banner">{error}</div>}
        {exito && (
          <div style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: 'var(--space-4)', fontSize: '0.9rem' }}>
            ¡Invitación enviada! {bebe.nombre} va a aparecer en su cuenta como una invitación pendiente hasta que la acepte.
          </div>
        )}

        <div className="field">
          <label htmlFor="email">Email de la persona a invitar</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="cuidador@email.com"
            required
          />
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Tiene que ser el mismo email con el que esa persona se registró en Baby Timer.
          </span>
        </div>

        <button className="btn btn-primary" type="submit" disabled={enviando}>
          {enviando ? 'Enviando…' : 'Invitar'}
        </button>
      </form>
    </div>
  );
}
