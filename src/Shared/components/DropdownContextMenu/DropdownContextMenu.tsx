import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import { FC, SVGProps } from 'react';
import { defaultTo, isEmpty } from 'lodash-es';
import { useToggle } from 'react-use';
import { t } from 'i18next';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as DotsIcon } from '@shared/svg/three_dots.svg';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { Tooltip } from '@shared/components/Tooltip';

import styles from './DropdownContextMenu.module.sass';

type Props = {
  dataTestId?: string;
  triggerClassName?: string;
  ariaLabel?: string;
  items: {
    Icon: FC<SVGProps<SVGSVGElement>>;
    action: () => void;
    iconClassName?: string;
    show?: boolean;
    text: string;
    itemClassName?: string;
    itemTestId?: string;
  }[];
};

export const DropdownContextMenu = ({
  dataTestId,
  items,
  triggerClassName,
  ariaLabel = t('components.dropdownContextMenu.triggerLabel'),
}: Props) => {
  const [dropdownIsOpen, toggleDropdownIsOpen] = useToggle(false);

  if (isEmpty(items)) return null;

  const dropdownMenuContentClasses = cx(
    styles.DropdownMenuContent,
    'bg-white rounded-sm border border-solid border-neutral-300 w-full py-xxs',
    'text-font-primary text-xs font-regular leading-lg'
  );

  const dropdownTriggerClassname = cx(
    'bg-white rounded-xs',
    {
      invisible: !dropdownIsOpen,
    },
    triggerClassName
  );

  const triggerIconClassname = cx('rounded-sm transition-colors', dropdownTriggerClassname, {
    '!border-primary-500': dropdownIsOpen,
  });

  const getDropdownItemClassname = (itemClassname?: string) =>
    cx(
      'flex items-center cursor-pointer py-xs px-sm',
      'focus-visible:bg-primary-200 focus-visible:!outline-0 hover:bg-primary-200 hover:text-primary-500',
      'gap-xs !rounded-none',
      itemClassname
    );

  const itemsToRender = items.filter(({ show }) => defaultTo(show, true));

  if (itemsToRender.length === 1) {
    const [singleDropdownItem] = itemsToRender;
    const dataTestId = singleDropdownItem.itemTestId
      ? singleDropdownItem.itemTestId
      : 'dropdown-menu-item';

    return (
      <Tooltip className={dropdownTriggerClassname} message={singleDropdownItem.text}>
        <IconButton
          Icon={singleDropdownItem.Icon}
          aria-label={singleDropdownItem.text}
          className={singleDropdownItem.iconClassName}
          data-testid={dataTestId}
          size='md'
          onClick={(e) => {
            e.stopPropagation();
            singleDropdownItem.action();
          }}
        />
      </Tooltip>
    );
  }

  return (
    <DropdownMenu.Root open={dropdownIsOpen} onOpenChange={toggleDropdownIsOpen}>
      <DropdownMenu.Trigger
        aria-label={ariaLabel}
        asChild={true}
        className={dropdownTriggerClassname}
        data-testid={dataTestId}
        id='radix-trigger'>
        <IconButton Icon={DotsIcon} className={triggerIconClassname} size='md' />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align='end' className={dropdownMenuContentClasses} sideOffset={8}>
          {itemsToRender.map((item, index) => (
            <DropdownMenu.Item
              key={index}
              className={getDropdownItemClassname(item.itemClassName)}
              data-testid={item.itemTestId || 'dropdown-menu-item'}
              onClick={(event) => {
                event.stopPropagation();
                item.action();
              }}>
              <IconContainer
                Icon={item.Icon}
                aria-label={item.text}
                className={item.iconClassName}
                paddingSize='none'
                size='sm'
              />
              <span>{item.text}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
