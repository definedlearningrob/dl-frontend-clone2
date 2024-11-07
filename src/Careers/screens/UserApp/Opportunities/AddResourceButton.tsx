import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';

import { ReactComponent as OpportunityIcon } from '@dc/svg/match.svg';

import { ReactComponent as PartnerIcon } from '@shared/svg/flag_outlined.svg';
import Button from '@shared/components/Button/Button';
import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import Link from '@shared/components/Link';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

export const AddResourceButton = () => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [isOpen, toggleIsOpen] = useToggle(false);

  const dropdownLinkClasses = 'flex items-center gap-xs w-full !justify-start text-xs';
  const dropdownItemClasses = 'hover:outline-none';

  return (
    <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={toggleIsOpen}>
      <DropdownMenu.Trigger asChild={true}>
        <Button
          Icon={isOpen ? ChevronUpIcon : ChevronDownIcon}
          iconPlacement='end'
          size={isFullHD ? 'md' : 'sm'}
          variant='primary'>
          {t('opportunities.addNew')}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align='end'
          className='bg-white rounded-sm py-xxs border border-neutral-300 shadow-200 flex flex-col'
          sideOffset={8}>
          <ul>
            <DropdownMenu.Item asChild={true}>
              <li className={dropdownItemClasses}>
                <Link className={dropdownLinkClasses} to='/opportunities/new'>
                  <IconContainer Icon={OpportunityIcon} paddingSize='none' size='sm' />
                  {t('user.opportunities.opportunity')}
                </Link>
              </li>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild={true}>
              <li className={dropdownItemClasses}>
                <Link className={dropdownLinkClasses} to='/partner/new'>
                  <IconContainer Icon={PartnerIcon} paddingSize='none' size='sm' />
                  {t('user.opportunities.partner')}
                </Link>
              </li>
            </DropdownMenu.Item>
          </ul>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
