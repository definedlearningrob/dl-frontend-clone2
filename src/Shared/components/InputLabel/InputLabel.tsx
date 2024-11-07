import React, { ReactNode } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

type Props = {
  isSmall: boolean;
  children: ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
};

export const InputLabel = ({ isSmall, children, isRequired, isDisabled = false }: Props) => {
  const { t } = useTranslation();
  const labelClassNames = cx('text-font-primary leading-lg flex gap-xxxs', {
    'text-xxs': isSmall,
    'text-xs': !isSmall,
    '!text-font-secondary opacity-50': isDisabled,
  });

  return (
    <div className={labelClassNames}>
      {isRequired && <span className='text-danger-600 mr-xxs'>*</span>}
      {children}
      {isRequired === false && (
        <span className='text-font-secondary ml-xxxs'>{`(${t('common.labels.optional')})`}</span>
      )}
    </div>
  );
};
