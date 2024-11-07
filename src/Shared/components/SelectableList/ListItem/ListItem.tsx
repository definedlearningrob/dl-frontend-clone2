import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { FC, SVGProps } from 'react';

import { ReactComponent as Search } from '@shared/svg/search.svg';
import { ReactComponent as FileIcon } from '@shared/svg/file.svg';
import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { ReactComponent as RemoveIcon } from '@shared/svg/remove.svg';
import { ReactComponent as AddIcon } from '@shared/svg/add.svg';
import SharedImage from '@shared/components/Image/Image';
import { Badge, BadgeType } from '@shared/components/Badge/Badge';
import { Kicker, KickerVariant } from '@shared/components/Kicker';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Tooltip } from '@shared/components/Tooltip';
import { IconButton } from '@shared/components/IconButton/IconButton';

type Props = {
  className?: string;
  name: string;
  imageUrl?: string | null;
  dataTestId?: string;
  badge?: {
    text: string;
    type: BadgeType;
    tooltip?: string;
  };
  kicker?: {
    text: string;
    variant: KickerVariant;
  };
  onDetailsClick?: () => void;
  onChange: () => void;
  onEditClick?: () => void;
  isSelected?: boolean;
  isDisabled?: boolean;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  asListItem?: boolean;
  preserveImageAspectRatio?: boolean;
  isTooltipDisabled?: boolean;
  tooltipMessage?: string;
};

export const ListItem = ({
  className,
  name,
  imageUrl,
  badge,
  kicker,
  onDetailsClick,
  isDisabled,
  isSelected = false,
  onChange,
  onEditClick,
  Icon = FileIcon,
  asListItem = true,
  preserveImageAspectRatio = false,
  tooltipMessage,
}: Props) => {
  const { t } = useTranslation();
  const actionButtonClassnames = cx('!text-white', {
    '!bg-danger-500': isSelected,
    '!bg-success-500': !isSelected,
  });

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const listItemClasses = cx(
    'flex flex-1 items-center gap-xs text-xxs xxxl:text-xs rounded-sm p-xs hover:bg-neutral-200 group',
    { 'opacity-50': isDisabled },
    className
  );

  const Component = asListItem ? 'li' : 'div';
  const dataTestId = isSelected ? 'selected-item' : 'available-item';
  const iconSize = isFullHD ? 'md' : 'sm';
  const actionTranslationKey = isSelected ? 'common.actions.remove' : 'common.actions.add';

  return (
    <Component className={listItemClasses} data-testid={dataTestId}>
      {imageUrl && (
        <div className='w-[54px] h-md flex-grow-0'>
          <SharedImage
            alt={t('admin.lessons.imageAlt')}
            className={cx('object-cover h-full w-full rounded-xs', {
              '!w-auto mx-auto': preserveImageAspectRatio,
            })}
            data-testid='admin-lesson-thumbnail'
            src={imageUrl}
          />
        </div>
      )}
      {!imageUrl && (
        <IconContainer
          Icon={Icon}
          className='bg-neutral-200 text-neutral-800 rounded-sm group-hover:bg-white'
          paddingSize='xs'
          size='sm'
        />
      )}
      <div className='flex-1 leading-lg'>
        {kicker && (
          <Kicker className='!mb-xxs' size='sm' variant={kicker.variant}>
            {kicker.text}
          </Kicker>
        )}
        <Tooltip disabled={!isDisabled} message={tooltipMessage}>
          {name}
        </Tooltip>
      </div>
      {badge && (
        <Tooltip delayDuration={500} disabled={!badge.tooltip} message={badge.tooltip}>
          <Badge
            className='group-hover:!bg-white'
            size={isFullHD ? 'base' : 'small'}
            type={badge.type}>
            {badge.text}
          </Badge>
        </Tooltip>
      )}

      <div className='flex gap-xs'>
        {onDetailsClick && (
          <IconButton
            Icon={Search}
            aria-label={`${t('common.actions.show')} ${name}`}
            className='text-neutral-700'
            data-testid='item-more-info'
            disabled={isDisabled}
            size={iconSize}
            onClick={onDetailsClick}
          />
        )}
        {onEditClick && (
          <IconButton
            Icon={EditIcon}
            aria-label={`${t('common.actions.edit')} ${name}`}
            className='text-neutral-700'
            data-testid='edit-button'
            disabled={isDisabled}
            size={iconSize}
            onClick={onEditClick}
          />
        )}
        <IconButton
          Icon={isSelected ? RemoveIcon : AddIcon}
          aria-label={`${t(actionTranslationKey)} ${name}`}
          className={actionButtonClassnames}
          data-testid={isSelected ? 'remove-item' : 'add-item'}
          disabled={isDisabled}
          size={iconSize}
          onClick={onChange}
        />
      </div>
    </Component>
  );
};
