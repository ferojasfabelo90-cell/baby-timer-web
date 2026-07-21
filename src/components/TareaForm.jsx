import { useState } from 'react';
import { tipoTareaOptions, frecuenciaOptions, diasSemanaOptions, diasMesOptions } from '../utils/tareas';
import { useLanguage } from '../context/LanguageContext';

// valoresIniciales: { tipoTarea, descripcion, frecuencia, horaProgramada,
//                      diasProgramados, fechaProgramada } (opcional, para editar)
export default function TareaForm({ valoresIniciales, onSubmit, textoBoton, error }) {
  const { t } = useLanguage();
  const [tipoTarea, setTipoTarea] = useState(valoresIniciales?.tipoTarea || 'ALIMENTACION');
  const [descripcion, setDescripcion] = useState(valoresIniciales?.descripcion || '');
  const [frecuencia, setFrecuencia] = useState(valoresIniciales?.frecuencia || 'DIARIA');
  const [horaProgramada, setHoraProgramada] = useState(
    valoresIniciales?.horaProgramada ? valoresIniciales.horaProgramada.slice(0, 5) : ''
  );

  // Solo se usan según la frecuencia elegida — ver el render condicional más abajo.
  const [diasSemana, setDiasSemana] = useState(
    valoresIniciales?.frecuencia === 'SEMANAL' ? (valoresIniciales?.diasProgramados || []) : []
  );
  const [diasMes, setDiasMes] = useState(
    valoresIniciales?.frecuencia === 'MENSUAL' ? (valoresIniciales?.diasProgramados || []) : []
  );
  const [fechaProgramada, setFechaProgramada] = useState(
    valoresIniciales?.frecuencia === 'UNICA' ? (valoresIniciales?.fechaProgramada || '') : ''
  );

  const [enviando, setEnviando] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState('');

  function toggleDiaSemana(dia) {
    setDiasSemana((actuales) =>
      actuales.includes(dia) ? actuales.filter((d) => d !== dia) : [...actuales, dia]
    );
  }

  function toggleDiaMes(dia) {
    const diaStr = String(dia);
    setDiasMes((actuales) =>
      actuales.includes(diaStr) ? actuales.filter((d) => d !== diaStr) : [...actuales, diaStr]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorValidacion('');

    if (!horaProgramada) {
      setErrorValidacion(t('validacion.campoRequerido'));
      return;
    }
    if (frecuencia === 'SEMANAL' && diasSemana.length === 0) {
      setErrorValidacion(t('tarea.errorDiasSemana'));
      return;
    }
    if (frecuencia === 'MENSUAL' && diasMes.length === 0) {
      setErrorValidacion(t('tarea.errorDiasMes'));
      return;
    }
    if (frecuencia === 'UNICA') {
      if (!fechaProgramada) {
        setErrorValidacion(t('tarea.errorFecha'));
        return;
      }
      const hoy = new Date().toISOString().split('T')[0];
      if (fechaProgramada < hoy) {
        setErrorValidacion(t('tarea.errorFechaPasada'));
        return;
      }
    }

    let diasProgramados = null;
    if (frecuencia === 'SEMANAL') diasProgramados = diasSemana;
    if (frecuencia === 'MENSUAL') diasProgramados = diasMes;

    setEnviando(true);
    try {
      await onSubmit({
        tipoTarea,
        descripcion: descripcion.trim() || null,
        frecuencia,
        horaProgramada: `${horaProgramada}:00`,
        diasProgramados,
        fechaProgramada: frecuencia === 'UNICA' ? fechaProgramada : null,
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

      {frecuencia === 'SEMANAL' && (
        <div className="field">
          <label>{t('tarea.diasSemana')}</label>
          <div className="dias-grid">
            {diasSemanaOptions(t).map((dia) => (
              <button
                type="button"
                key={dia.value}
                className={diasSemana.includes(dia.value) ? 'dia-chip dia-chip-activo' : 'dia-chip'}
                onClick={() => toggleDiaSemana(dia.value)}
              >
                {dia.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {frecuencia === 'MENSUAL' && (
        <div className="field">
          <label>{t('tarea.diasMes')}</label>
          <div className="dias-grid dias-grid-mes">
            {diasMesOptions().map((dia) => (
              <button
                type="button"
                key={dia}
                className={diasMes.includes(String(dia)) ? 'dia-chip dia-chip-activo' : 'dia-chip'}
                onClick={() => toggleDiaMes(dia)}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>
      )}

      {frecuencia === 'UNICA' && (
        <div className="field">
          <label htmlFor="fechaProgramada">{t('tarea.fechaProgramada')}</label>
          <input
            id="fechaProgramada"
            type="date"
            value={fechaProgramada}
            onChange={(e) => setFechaProgramada(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      )}

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
