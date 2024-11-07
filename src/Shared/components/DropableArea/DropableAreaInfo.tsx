import { Trans, useTranslation } from 'react-i18next';
import React from 'react';
import cx from 'classnames';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as ClearIcon } from '@shared/assets/icons/clear_circle_outlined.svg';

type Props = {
  isDragActive: boolean;
  textWrapperStyles: string;
  dropText?: string;
  linkStyles?: string;
  IconToRender: React.FC;
  iconStyles?: string;
  error?: string;
};

export const DropableAreaInfo = ({
  error,
  isDragActive,
  textWrapperStyles,
  dropText,
  linkStyles,
  IconToRender,
  iconStyles,
}: Props) => {
  const { t } = useTranslation();

  if (error) {
    return (
      <>
        <IconContainer Icon={ClearIcon} className={iconStyles} paddingSize='sm' size='base' />
        <p className={cx('input-error-message', textWrapperStyles)}>{error}</p>
      </>
    );
  }

  return (
    <>
      <IconContainer Icon={IconToRender} className={iconStyles} paddingSize='sm' size='base' />
      {isDragActive ? (
        <p className={textWrapperStyles}>{t('dropableArea.drop')}</p>
      ) : (
        <p className={textWrapperStyles}>
          <Trans i18nKey={dropText ? dropText : 'dropableArea.text'}>
            mock<span className={linkStyles}>mock</span>mock
          </Trans>
        </p>
      )}
    </>
  );
};
