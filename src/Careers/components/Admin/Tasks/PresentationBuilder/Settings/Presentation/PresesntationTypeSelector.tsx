import { PresentationTypes } from '@graphql/shared/shared/types';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import Switch from '@shared/components/Switch/Switch';

export const PresentationTypeSelector = () => {
  const { currentPresentation, handleUpdatePresentation } = usePresentationBuilder();
  const { t } = useTranslation();

  const onPresentationTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const shouldSetFullScreen = event.target.checked;

    handleUpdatePresentation({
      type: shouldSetFullScreen ? PresentationTypes.FULL_SCREEN : PresentationTypes.LEGACY,
    });
  };

  return (
    <div>
      <div className='text-xs mb-xs'>{t('admin.tasks.presentation.presentationType')}</div>
      <Switch
        additionalLabel={t('admin.tasks.presentation.classicPresentation')}
        label={t('admin.tasks.presentation.fullScreenPresentation')}
        value={currentPresentation.type === PresentationTypes.FULL_SCREEN}
        onChange={onPresentationTypeChange}
      />
    </div>
  );
};
