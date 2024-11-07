import { useTranslation } from 'react-i18next';
import { MouseEvent } from 'react';

import Button from '@shared/components/Button/Button';
import { ReactComponent as DeleteIcon } from '@shared/assets/icons/delete_outlined.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { IconButton } from '@shared/components/IconButton/IconButton';

type Props = {
  buttonClassStyles: string;
  onClear: (e: MouseEvent<HTMLButtonElement>) => void;
  isSquare: boolean;
  isLandscape: boolean;
  iconSize: 'sm' | 'md' | 'lg';
};

export const DropableButtons = ({
  buttonClassStyles,
  onClear,
  isSquare,
  isLandscape,
  iconSize,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className={buttonClassStyles}>
      {isLandscape ? (
        <Button Icon={DeleteIcon} size={iconSize} variant='danger' onClick={onClear}>
          {t('common.actions.delete')}
        </Button>
      ) : (
        <Tooltip delayDuration={300} message={t('common.actions.delete')}>
          <IconButton
            Icon={DeleteIcon}
            circle={!isSquare}
            className='bg-white hover:bg-danger-500 hover:text-white'
            size={iconSize}
            variant='danger'
            onClick={onClear}
          />
        </Tooltip>
      )}
    </div>
  );
};
