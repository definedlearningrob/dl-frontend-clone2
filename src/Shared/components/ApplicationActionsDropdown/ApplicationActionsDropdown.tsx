import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import { useState } from 'react';
import { FC, SVGProps } from 'react';

import { formatExternalLink } from '@shared/utils/formatExternalLink';
import { ReactComponent as DotsIcon } from '@shared/svg/three_dots.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import Link from '@shared/components/Link';

type Item = {
  Icon?: FC<SVGProps<SVGSVGElement>>;
  action?: () => void;
  hide?: boolean;
  link?: string | null;
  text: string;
  additionalClassName?: string;
};

type Props = {
  dataTestId?: string;
  items: Item[];
};
const commonClasses = cx(
  '!font-regular hover:!bg-primary-200 focus-visible:!outline-none',
  'w-full !justify-start',
  'first:rounded-t-xxs last:rounded-b-xxs'
);

const dropdownMenuContentClasses = cx(
  'py-xxs bg-white rounded-sm w-full shadow-200',
  'border border-solid border-neutral-300',
  'text-font-primary text-xs font-regular leading-lg'
);

const listItemClasses = cx(
  commonClasses,
  'text-xs px-sm py-xs cursor-pointer',
  'transition-[background-color] duration-300',
  'flex items-center gap-xs'
);

type DropdownLinkItemProps = {
  item: Item;
};

type DropdownItemProps = {
  item: Item;
};

const DropdownLinkItem = ({ item }: DropdownLinkItemProps) => {
  if (!item.link) return null;

  const isExternalLink = item.link.startsWith('http');

  const { Icon } = item;

  const linkTo = isExternalLink ? { pathname: formatExternalLink(item.link) } : item.link;

  return (
    <DropdownMenu.Item asChild={true}>
      <li className={cx(commonClasses, 'flex items-center gap-xxs')}>
        <Link
          className={commonClasses}
          {...(isExternalLink && { target: '_blank' })}
          Icon={Icon}
          linkClassName='w-full'
          size='sm'
          to={linkTo}
          variant='default'>
          <span>{item.text}</span>
        </Link>
      </li>
    </DropdownMenu.Item>
  );
};

const DropdownItem = ({ item }: DropdownItemProps) => (
  <DropdownMenu.Item asChild={true} data-testid='dropdown-menu-item' onClick={item.action}>
    <li className={cx(listItemClasses, item.additionalClassName)}>
      {item.Icon && <IconContainer Icon={item.Icon} paddingSize='none' size='sm' />}
      {item.text}
    </li>
  </DropdownMenu.Item>
);

export const ApplicationActionsDropdown = ({ dataTestId, items }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger
        className='bg-white rounded-xs'
        data-testid={dataTestId}
        id='radix-trigger'>
        <IconContainer Icon={DotsIcon} size='sm' />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align='end' className={dropdownMenuContentClasses} sideOffset={8}>
          <ul>
            {items.map((item, index) => {
              const DropdownComponent = item.link ? DropdownLinkItem : DropdownItem;

              return <DropdownComponent key={index} item={item} />;
            })}
          </ul>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
