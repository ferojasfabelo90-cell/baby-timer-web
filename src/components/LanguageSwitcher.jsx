import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher({ style }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher" style={style}>
      <button
        className={language === 'es' ? 'lang-btn lang-btn-active' : 'lang-btn'}
        onClick={() => setLanguage('es')}
        aria-label="Español"
      >
        ES
      </button>
      <button
        className={language === 'en' ? 'lang-btn lang-btn-active' : 'lang-btn'}
        onClick={() => setLanguage('en')}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
