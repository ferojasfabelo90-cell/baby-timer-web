import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  if (!usuario) return null;

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="navbar">
      <Link to="/bebes" className="navbar-brand">Baby Timer</Link>
      <div className="navbar-actions">
        <span className="navbar-user">
          {usuario.nombre}
        </span>
        <button className="btn btn-ghost" onClick={handleLogout}>Salir</button>
      </div>
    </header>
  );
}
