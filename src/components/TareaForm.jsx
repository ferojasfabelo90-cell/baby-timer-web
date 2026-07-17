import { useState } from 'react';
import { tipoTareaOptions, frecuenciaOptions } from '../utils/tareas';
import { useLanguage } from '../context/LanguageContext';

// valoresIniciales: { tipoTarea, descripcion, frecuencia, horaProgramada } (opcional, para editar)
export default function TareaForm({ valoresIniciales, onSubmit, textoBoton, error }) {
  const { t } = useLanguage();
  const [tipoTarea, setTipoTarea] = useState(valoresIniciales?.tipoTarea || 'ALIMENTACION');
  const [descripcion, setDescripcion] = useState(valoresIniciales?.descripcion || '');
  const [frecuencia, setFrecuencia] = useState(valoresIniciales?.frecuencia || 'DIARIA');
  const [horaProgramada, setHoraProgramada] = useState(
    valoresIniciales?.horaProgramada ? valoresIniciales.horaProgramada.slice(0, 5) : ''
  );
  const [enviando, setEnviando] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorValidacion('');
    if (!horaProgramada) {
      setErrorValidacion(t('validacion.campoRequerido'));
      return;
    }
    setEnviando(true);
    try {
      await onSubmit({
        tipoTarea,
        descripcion: descripcion.trim() || null,
        frecuencia,
        horaProgramada: `${horaProgramada}:00`,
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      {(errorValidacion || error) && <div className="error-banner">{errorValidacion || error}</div>}

      <div className="field">
        <label htmlFor="tipoTarea">{t('tarea.tipo')}</label>
        <select id="tipoTarea" value={tipoTarea} onChange={(e) => setTipoTarea(e.target.value)} required>
          {tipoTareaOptions(t).map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="descripcion">{t('tarea.descripcion')}</label>
        <input
          id="descripcion"
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder={t('tarea.descripcionPlaceholder')}
        />
      </div>

      <div className="field">
        <label htmlFor="frecuencia">{t('tarea.frecuencia')}</label>
        <select id="frecuencia" value={frecuencia} onChange={(e) => setFrecuencia(e.target.value)} required>
          {frecuenciaOptions(t).map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="horaProgramada">{t('tarea.horaProgramada')}</label>
        <input
          id="horaProgramada"
          type="time"
          value={horaProgramada}
          onChange={(e) => setHoraProgramada(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-primary" type="submit" disabled={enviando}>
        {enviando ? t('tarea.guardando') : textoBoton}
      </button>
    </form>
  );
}
