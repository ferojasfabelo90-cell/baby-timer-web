import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { crearTarea } from '../api/tareas';
import TareaForm from '../components/TareaForm';
import { extractErrorMessage } from '../api/client';

export default function NuevaTarea() {
  const { bebeId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function handleSubmit(payload) {
    setError('');
    try {
      await crearTarea(Number(bebeId), payload);
      navigate(`/bebes/${bebeId}/tareas`);
    } catch (err) {
      setError(extractErrorMessage(err, 'No pudimos crear la tarea. Revisá los datos.'));
    }
  }

  return (
    <div className="page">
      <Link to={`/bebes/${bebeId}/tareas`} className="muted-link" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
        ← Tareas
      </Link>
      <h2>Nueva tarea</h2>
      <TareaForm onSubmit={handleSubmit} textoBoton="Crear tarea" error={error} />
    </div>
  );
}
