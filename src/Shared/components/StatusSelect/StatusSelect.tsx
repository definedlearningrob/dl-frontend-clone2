import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useToggle } from 'react-use';
import { FC, MouseEvent, SVGProps } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { Badge, BadgeType } from '@shared/components/Badge/Badge';
import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as SelectedIcon } from '@shared/svg/done.svg';

type Props<T extends string> = {
  currentStatus: T;
  options: {
    status: T;
    badgeType: BadgeType;
    label: string;
    Icon?: FC<SVGProps<SVGSVGElement>>;
  }[];
  onChange: (status: T) => void;
};

export const StatusSelect = <T extends string>({ options, onChange, currentStatus }: Props<T>) => {
  const { t } = useTranslation();
  const [isOpen, toggleIsOpen] = useToggle(false);

  const handleChange = (status: T, event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    onChange(status);
    toggleIsOpen(false);
  };

  const { badgeType, label, Icon } = options.find(({ status }) => status === currentStatus) ?? {};

  const ChevronIcon = isOpen ? ChevronUpIcon : ChevronDownIcon;

  const focusableElementClasses =
    'rounded-xs border border-solid border-transparent focus-visible:border-primary-500';

  const getIconClasses = (badgeType: BadgeType) =>
    cx({
      'text-neutral-700': badgeType === 'neutral',
      'text-danger-500': badgeType === 'danger',
      'text-secondary-500': badgeType === 'secondary',
      'text-success-500': badgeType === 'success',
    });

  return (
    <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={toggleIsOpen}>
      <DropdownMenu.Trigger asChild={true} onClick={(e) => e.stopPropagation()}>
        <button
          className={cx(
            'flex items-center text-font-primary hover:text-primary-500',
            focusableElementClasses
          )}>
          <Badge
            className='flex items-center gap-xxs group-hover/statement:bg-white'
            type={badgeType}>
            {Icon && <IconContainer Icon={Icon} paddingSize='none' size='sm' />}
            {label}
          </Badge>
          <IconContainer Icon={ChevronIcon} paddingSize='none' />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align='end'
          asChild={true}
          className='bg-white rounded-sm py-xxs border border-neutral-300 shadow-200 flex flex-col'
          sideOffset={12}>
          <ul className='p-xxs'>
            <span className='font-bold text-xs py-xs px-sm'>
              {t('components.statusSelect.changeTo')}
            </span>
            {options.map(({ Icon, status, label, badgeType }) => {
              const isSelected = currentStatus === status;

              return (
                <DropdownMenu.Item key={status} asChild={true}>
                  <li
                    className={cx(
                      'py-xs px-sm hover:bg-primary-200 focus-visible:!outline-none cursor-pointer',
                      focusableElementClasses,
                      { 'text-primary-500': isSelected }
                    )}
                    role='button'
                    onClick={(event) => handleChange(status, event)}>
                    <div className='flex items-center gap-xxs text-xs leading-lg'>
                      {Icon && (
                        <IconContainer
                          Icon={Icon}
                          className={getIconClasses(badgeType)}
                          paddingSize='none'
                          size='sm'
                        />
                      )}
                      {label}
                      {isSelected && (
                        <IconContainer Icon={SelectedIcon} paddingSize='none' size='sm' />
                      )}
                    </div>
                  </li>
                </DropdownMenu.Item>
              );
            })}
          </ul>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
