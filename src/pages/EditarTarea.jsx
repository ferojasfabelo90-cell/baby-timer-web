import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { listarTareas, editarTarea } from '../api/tareas';
import TareaForm from '../components/TareaForm';
import { extractErrorMessage } from '../api/client';

export default function EditarTarea() {
  const { bebeId, tareaId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Si venimos del listado, la tarea ya viaja en el state de navegación
  // y nos ahorramos una llamada. Si no (ej: se recargó la página), la buscamos.
  const [tarea, setTarea] = useState(location.state?.tarea || null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tarea) return;
    listarTareas(Number(bebeId))
      .then((tareas) => {
        const encontrada = tareas.find((t) => t.id === Number(tareaId));
        if (!encontrada) {
          setError('No encontramos esa tarea. Puede que ya haya sido desactivada.');
          return;
        }
        setTarea(encontrada);
      })
      .catch((err) => setError(extractErrorMessage(err, 'No pudimos cargar la tarea.')));
  }, [bebeId, tareaId, tarea]);

  async function handleSubmit(payload) {
    setError('');
    try {
      await editarTarea(Number(tareaId), payload);
      navigate(`/bebes/${bebeId}/tareas`);
    } catch (err) {
      setError(extractErrorMessage(err, 'No pudimos guardar los cambios. Revisá los datos.'));
    }
  }

  return (
    <div className="page">
      <Link to={`/bebes/${bebeId}/tareas`} className="muted-link" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
        ← Tareas
      </Link>
      <h2>Editar tarea</h2>

      {error && !tarea && <div className="error-banner">{error}</div>}

      {tarea ? (
        <TareaForm
          valoresIniciales={{
            tipoTarea: tarea.tipo,
            descripcion: tarea.descripcion,
            frecuencia: tarea.frecuencia,
            horaProgramada: tarea.horaProgramada,
          }}
          onSubmit={handleSubmit}
          textoBoton="Guardar cambios"
          error={error}
        />
      ) : (
        !error && <p>Cargando…</p>
      )}
    </div>
  );
}
