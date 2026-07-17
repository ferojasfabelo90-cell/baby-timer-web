import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { crearTarea } from '../api/tareas';
import TareaForm from '../components/TareaForm';
import { extractErrorMessage } from '../api/client';
import { useLanguage } from '../context/LanguageContext';

export default function NuevaTarea() {
  const { bebeId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [error, setError] = useState('');

  async function handleSubmit(payload) {
    setError('');
    try {
      await crearTarea(Number(bebeId), payload);
      navigate(`/bebes/${bebeId}/tareas`);
    } catch (err) {
      setError(extractErrorMessage(err, t('tarea.errorCrear')));
    }
  }

  return (
    <div className="page">
      <Link to={`/bebes/${bebeId}/tareas`} className="muted-link" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
        {t('tarea.volverTareas')}
      </Link>
      <h2>{t('tarea.nuevaTitulo')}</h2>
      <TareaForm onSubmit={handleSubmit} textoBoton={t('tarea.crear')} error={error} />
    </div>
  );
}
