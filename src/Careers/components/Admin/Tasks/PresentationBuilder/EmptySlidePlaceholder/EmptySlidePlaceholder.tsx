import React from 'react';
import { useTranslation } from 'react-i18next';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import styles from './EmptySlidePlaceholder.module.sass';

export const EmptySlidePlaceholder = () => {
  const { t } = useTranslation();
  const { taskId } = usePresentationBuilder();

  const placeholder = taskId
    ? t('admin.tasks.presentation.noSlideInCurrentPresentation')
    : t('admin.tasks.presentation.noSlideInSlideLibrary');

  return (
    <div className='content' data-testid='slides-content'>
      <div className={styles.slidePlaceholder}>{placeholder}</div>
    </div>
  );
};
