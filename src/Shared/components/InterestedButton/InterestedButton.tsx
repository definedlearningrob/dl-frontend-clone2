import cx from 'classnames';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as HeartFillIcon } from '@shared/assets/icons/heart-fill.svg';
import { ReactComponent as HeartOutlineIcon } from '@shared/assets/icons/heart-outline.svg';
import SharedButton from '@shared/components/Button/Button';
import { IconButton } from '@shared/components/IconButton/IconButton';

import styles from './InterestedButton.module.sass';

type ButtonSize = 'sm' | 'md' | 'lg';

type Props = {
  className?: string;
  isSelected?: boolean;
  size?: ButtonSize;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  withLabel?: boolean;
  label?: string;
};

const iconSizeMap = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
} as const;

export const InterestedButton = ({
  isSelected,
  size = 'md',
  onClick,
  disabled,
  className,
  label,
  withLabel = false,
}: Props) => {
  const { t } = useTranslation();
  const FavoriteIcon = isSelected ? HeartFillIcon : HeartOutlineIcon;
  const iconButtonClasses = cx(
    styles.iconButton,
    className,
    'focus-visible:outline focus-visible:!outline-danger-600 focus-visible:!outline-1 focus-visible:!outline-offset-2',
    {
      [styles[size]]: size,
      [styles.disabled]: disabled,
    }
  );
  const buttonClasses = cx(
    styles.button,
    '!border-neutral-300 hover:!border-danger-600',
    'hover:!text-danger-600 hover:!bg-danger-100',
    'focus-visible:outline focus-visible:!outline-danger-600 focus-visible:!outline-1 focus-visible:!outline-offset-2',
    {
      '!text-danger-600 !border-danger-600': isSelected,
    }
  );

  if (withLabel) {
    return (
      <SharedButton
        Icon={FavoriteIcon}
        className={buttonClasses}
        disabled={disabled}
        iconClassName='text-danger-600'
        size={size}
        onClick={onClick}>
        {label ?? t('components.interestedButton.interested')}
      </SharedButton>
    );
  }

  return (
    <IconButton
      Icon={FavoriteIcon}
      className={iconButtonClasses}
      size={iconSizeMap[size]}
      onClick={onClick}
    />
  );
};
