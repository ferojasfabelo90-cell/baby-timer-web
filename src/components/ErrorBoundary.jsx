import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // En un proyecto real esto iría a un servicio de logging (Sentry, etc.).
    // Para el MVP, con el log en consola alcanza para debuggear durante la prueba.
    console.error('Error no controlado:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="auth-page">
          <div className="card" style={{ width: '100%', maxWidth: 420, textAlign: 'center' }}>
            <h2>Algo salió mal</h2>
            <p>
              Ocurrió un error inesperado. Podés intentar recargar la página;
              si el problema sigue, contanos qué estabas haciendo cuando pasó.
            </p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Recargar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
