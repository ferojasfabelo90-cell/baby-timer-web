import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { extractErrorMessage } from '../api/client';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      await login({ email, password });
      navigate('/bebes');
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'Email o contraseña incorrectos.'
          : extractErrorMessage(err)
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="card" style={{ width: '100%', maxWidth: 380 }}>
        <h1>Baby Timer</h1>
        <p>Iniciá sesión para ver las tareas de hoy.</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Contraseña</label>
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
            {enviando ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <p className="muted-link">
          ¿No tenés cuenta? <Link to="/registro">Creá una</Link>
        </p>
      </div>
    </div>
  );
}
