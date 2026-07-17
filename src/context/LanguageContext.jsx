import { createContext, useContext, useState, useCallback } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'babytimer_language';

function idiomaInicial() {
  const guardado = localStorage.getItem(STORAGE_KEY);
  if (guardado === 'es' || guardado === 'en') return guardado;
  // si el navegador está en español, arrancamos en español; si no, inglés
  return navigator.language?.startsWith('es') ? 'es' : 'en';
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(idiomaInicial);

  const setLanguage = useCallback((lang) => {
    localStorage.setItem(STORAGE_KEY, lang);
    setLanguageState(lang);
  }, []);

  // t('dashboard.aclaracionCuidador', { nombre: 'Sofía' })
  // reemplaza {{nombre}} dentro del texto encontrado.
  const t = useCallback(
    (key, variables) => {
      let texto = translations[language]?.[key] ?? translations.es[key] ?? key;
      if (variables) {
        Object.entries(variables).forEach(([nombreVar, valor]) => {
          texto = texto.replaceAll(`{{${nombreVar}}}`, valor);
        });
      }
      return texto;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage debe usarse dentro de un <LanguageProvider>');
  return ctx;
}
