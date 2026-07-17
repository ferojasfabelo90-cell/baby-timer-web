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
    console.error('Error no controlado:', error, info);
  }

  render() {
    if (this.state.error) {
      // ErrorBoundary es un componente de clase: no puede usar el hook
      // useLanguage(), así que lee el idioma guardado directo de
      // localStorage para decidir el texto, sin depender del Context.
      const idiomaGuardado = localStorage.getItem('babytimer_language');
      const esIngles = idiomaGuardado === 'en';

      return (
        <div className="auth-page">
          <div className="card" style={{ width: '100%', maxWidth: 420, textAlign: 'center' }}>
            <h2>{esIngles ? 'Something went wrong' : 'Algo salió mal'}</h2>
            <p>
              {esIngles
                ? 'An unexpected error occurred. You can try reloading the page; if the problem continues, let us know what you were doing when it happened.'
                : 'Ocurrió un error inesperado. Podés intentar recargar la página; si el problema sigue, contanos qué estabas haciendo cuando pasó.'}
            </p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              {esIngles ? 'Reload' : 'Recargar'}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
