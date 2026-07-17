import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { listarTareas, editarTarea } from '../api/tareas';
import TareaForm from '../components/TareaForm';
import { extractErrorMessage } from '../api/client';
import { useLanguage } from '../context/LanguageContext';

export default function EditarTarea() {
  const { bebeId, tareaId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const [tarea, setTarea] = useState(location.state?.tarea || null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tarea) return;
    listarTareas(Number(bebeId))
      .then((tareas) => {
        const encontrada = tareas.find((tItem) => tItem.id === Number(tareaId));
        if (!encontrada) {
          setError(t('tarea.noEncontrada'));
          return;
        }
        setTarea(encontrada);
      })
      .catch((err) => setError(extractErrorMessage(err, t('tarea.errorCarga'))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bebeId, tareaId, tarea]);

  async function handleSubmit(payload) {
    setError('');
    try {
      await editarTarea(Number(tareaId), payload);
      navigate(`/bebes/${bebeId}/tareas`);
    } catch (err) {
      setError(extractErrorMessage(err, t('tarea.errorGuardar')));
    }
  }

  return (
    <div className="page">
      <Link to={`/bebes/${bebeId}/tareas`} className="muted-link" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
        {t('tarea.volverTareas')}
      </Link>
      <h2>{t('tarea.editarTitulo')}</h2>

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
          textoBoton={t('tarea.guardarCambios')}
          error={error}
        />
      ) : (
        !error && <p>{t('tarea.cargando')}</p>
      )}
    </div>
  );
}
