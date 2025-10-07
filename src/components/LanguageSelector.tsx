import { Language, LanguageConfig } from '@/types/banking';
import { Button } from '@/components/ui/button';

const LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
];

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector = ({ currentLanguage, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <div className="flex gap-2">
      {LANGUAGES.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? 'default' : 'outline'}
          size="sm"
          onClick={() => onLanguageChange(lang.code)}
          className="gap-2"
        >
          <span className="text-lg">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;
