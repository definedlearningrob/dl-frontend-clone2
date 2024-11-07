import { useTranslation } from 'react-i18next';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import { cx } from '@shared/utils/cx';

import styles from './PresentationSettings.module.sass';

const FONTS = [
  { id: 'cabinSketch', label: 'Cabin Sketch' },
  { id: 'montserrat', label: 'Montserrat' },
  { id: 'lora', label: 'Lora' },
  { id: 'roboto', label: 'Roboto Mono' },
];

export const TypographySelector = () => {
  const { currentPresentation, handleUpdatePresentation } = usePresentationBuilder();
  const { t } = useTranslation();

  const getFontClasses = (font: string) =>
    cx(styles.font, styles[font], {
      [styles.selectedFont]: currentPresentation.typography === font,
    });

  const handleFontChange = (font: string) => handleUpdatePresentation({ typography: font });

  return (
    <div>
      <div className='text-xs mb-xs'>{t('admin.tasks.presentation.typography')}</div>
      <div className='flex flex-wrap gap-xs justify-start items-center'>
        {FONTS.map(({ id }) => (
          <div
            key={id}
            className={getFontClasses(id)}
            data-testid='font-option'
            onClick={() => handleFontChange(id)}>
            <p className={styles.fontTitle}>{t('admin.tasks.presentation.fontTitle')}</p>
            <p className={styles.fontDescription}>
              {t('admin.tasks.presentation.fontDescription')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
