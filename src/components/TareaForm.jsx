import { useState } from 'react';
import { TIPO_TAREA_OPTIONS, FRECUENCIA_OPTIONS } from '../utils/tareas';

// valoresIniciales: { tipoTarea, descripcion, frecuencia, horaProgramada } (opcional, para editar)
export default function TareaForm({ valoresIniciales, onSubmit, textoBoton, error }) {
  const [tipoTarea, setTipoTarea] = useState(valoresIniciales?.tipoTarea || 'ALIMENTACION');
  const [descripcion, setDescripcion] = useState(valoresIniciales?.descripcion || '');
  const [frecuencia, setFrecuencia] = useState(valoresIniciales?.frecuencia || 'DIARIA');
  const [horaProgramada, setHoraProgramada] = useState(
    valoresIniciales?.horaProgramada ? valoresIniciales.horaProgramada.slice(0, 5) : ''
  );
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    try {
      await onSubmit({
        tipoTarea,
        descripcion: descripcion.trim() || null,
        frecuencia,
        // el backend espera HH:mm:ss
        horaProgramada: `${horaProgramada}:00`,
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      {error && <div className="error-banner">{error}</div>}

      <div className="field">
        <label htmlFor="tipoTarea">Tipo de tarea</label>
        <select id="tipoTarea" value={tipoTarea} onChange={(e) => setTipoTarea(e.target.value)} required>
          {TIPO_TAREA_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="descripcion">Descripción (opcional)</label>
        <input
          id="descripcion"
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ej: mamadera cada 4 horas"
        />
      </div>

      <div className="field">
        <label htmlFor="frecuencia">Frecuencia</label>
        <select id="frecuencia" value={frecuencia} onChange={(e) => setFrecuencia(e.target.value)} required>
          {FRECUENCIA_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="horaProgramada">Hora programada</label>
        <input
          id="horaProgramada"
          type="time"
          value={horaProgramada}
          onChange={(e) => setHoraProgramada(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-primary" type="submit" disabled={enviando}>
        {enviando ? 'Guardando…' : textoBoton}
      </button>
    </form>
  );
}
