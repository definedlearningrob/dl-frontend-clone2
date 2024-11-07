import { useEffect, useState } from 'react';

export const useLocalize = () => {
  const [selectedLocale, setSelectedLocale] = useState('en');
  const [localesToSelect, setLocalesToSelect] = useState<string[]>([]);

  useEffect(() => {
    window.bablic?.widget.hide();

    if (window.bablic) {
      window.bablic.on('locale', () => {
        setSelectedLocale(window.bablic!.getLocale());
        setLocalesToSelect(window.bablic!.locales.map((lang) => lang.key));
      });
    }
  }, [window.bablic]);
  const setLanguage = (language: string) => window.bablic?.redirectTo(language);

  return { selectedLocale, localesToSelect, setLanguage };
};
