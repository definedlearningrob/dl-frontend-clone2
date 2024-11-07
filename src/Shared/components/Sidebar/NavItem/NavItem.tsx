import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
import { isEmpty } from 'lodash-es';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { Tooltip } from '@shared/components/Tooltip';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { useToggle } from '@shared/hooks/useToggle';

import styles from './NavItem.module.sass';

export type SidebarNavItemProps = {
  icon: ReactNode;
  hidden?: boolean;
  id: string;
  needsAttention?: boolean;
  path: string;
  text: string;
  childrenItems?: SidebarNavItemProps[];
};

export const SidebarNavItem = ({
  icon,
  hidden,
  id,
  needsAttention,
  path,
  text,
  childrenItems,
}: SidebarNavItemProps) => {
  const { isExpanded } = useNavigation();
  const history = useHistory();
  const { t } = useTranslation();

  const visibleChildrenItems = childrenItems?.filter((child) => !child.hidden) || [];

  const hasChildren = childrenItems && !isEmpty(visibleChildrenItems);

  const hasActiveChild =
    hasChildren && childrenItems.some((child) => child.path === history.location.pathname);

  const navItemClasses = cx(
    'flex items-center gap-xs',
    'pr-xs py-0 pl-sm',
    'text-xs text-neutral-700 no-underline',
    'pointer',
    'relative',
    styles.item,
    {
      hidden,
      ['text-primary-500 bg-primary-200']: hasActiveChild,
      [styles.hasChildren]: hasChildren && !isExpanded,
    }
  );

  const childNavItemClasses = cx(
    'flex items-center gap-xs',
    'px-sm py-xs',
    'text-xs text-neutral-800 no-underline leading-lg',
    'pointer',
    'hover:bg-primary-200',
    styles.childItem
  );

  const [isDropdownOpen, toggleDropdownOpen] = useToggle(false);

  const textClasses = cx('font-medium truncate', styles.text, {
    'opacity-0': !isExpanded,
    'me-auto': hasChildren,
  });

  const childTextClasses = cx('truncate', styles.text, {
    'me-auto': hasChildren,
  });

  const dropdownWrapperClassName = cx(
    'transition-[right] duration-300 ease-in-out',
    'absolute top-sm',
    {
      'right-xs': isExpanded,
      'right-[-20px]': !isExpanded,
    }
  );

  const dropdownContentClassName = cx(
    'bg-white rounded-sm border border-neutral-300 py-xxs shadow-200'
  );

  const needsAttentionClassName =
    'bg-secondary-500 w-xs h-xs rounded-full absolute top-[18px] left-[28px]';

  const chevronClassName = cx(
    'bg-white text-primary-500 rounded-full',
    'outline outline-transparent',
    'transition-[outline-color] ease-linear duration-200',
    {
      '!outline-primary-500': isDropdownOpen,
    }
  );

  const triggerClassName = cx({ 'relative right-xs': !isExpanded });

  const testId = `navigation-item-${id}`;

  const baseTooltipOffset = 5;

  return (
    <div className='relative'>
      <Tooltip
        delayDuration={500}
        disabled={isExpanded}
        message={text}
        side='right'
        sideOffset={baseTooltipOffset + 12}>
        <NavLink
          activeClassName='text-primary-500 bg-primary-200'
          className={navItemClasses}
          data-testid={testId}
          exact={true}
          hidden={hidden}
          to={path}>
          {needsAttention && <div className={needsAttentionClassName} />}
          <SharedIcon icon={icon} size='xs' />
          <span className={textClasses}>{text}</span>
        </NavLink>
      </Tooltip>
      {hasChildren && (
        <div className={dropdownWrapperClassName}>
          <DropdownMenu.Root modal={false} open={isDropdownOpen} onOpenChange={toggleDropdownOpen}>
            <DropdownMenu.Trigger asChild={true}>
              <div className={triggerClassName}>
                <Tooltip
                  delayDuration={500}
                  disabled={isDropdownOpen && isExpanded}
                  message={t('student.navigation.showMore')}
                  side='right'
                  sideOffset={baseTooltipOffset}>
                  <IconContainer
                    Icon={ChevronRightIcon}
                    className={chevronClassName}
                    paddingSize='xxs'
                    size='sm'
                  />
                </Tooltip>
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align='start'
                alignOffset={-12}
                className={dropdownContentClassName}
                data-testid='dropdown-content'
                side='right'
                sideOffset={isExpanded ? 16 : 8}>
                {childrenItems && (
                  <nav>
                    {visibleChildrenItems.map((navItem, index) => (
                      <NavLink
                        key={`${navItem.id}-${index}`}
                        activeClassName='text-primary-500'
                        className={childNavItemClasses}
                        data-testid={testId}
                        exact={true}
                        hidden={navItem.hidden}
                        to={navItem.path}
                        onClick={toggleDropdownOpen}>
                        {navItem.needsAttention && <div className={needsAttentionClassName} />}
                        <SharedIcon icon={navItem.icon} size='xs' />
                        <span className={childTextClasses}>{navItem.text}</span>
                      </NavLink>
                    ))}
                  </nav>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      )}
    </div>
  );
};
