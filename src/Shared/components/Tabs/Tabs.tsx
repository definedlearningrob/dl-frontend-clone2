import { ReactNode } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import cx from 'classnames';

import { TabsSkeleton } from '@shared/components/Tabs/TabsSkeleton';
import useQueryParams from '@shared/hooks/useQueryParams';

import styles from './Tabs.module.sass';

type Props = {
  children: ReactNode | ReactNode[];
  defaultTabId?: string;
  defaultSubTabId?: string;
  className?: string;
};

export type Tab = {
  tabId: string;
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
};

export const Tabs = ({ defaultTabId, children, className }: Props) => {
  const {
    params: { tabId },
  } = useQueryParams<{ tabId: string }>();

  return (
    <RadixTabs.Root className={className} defaultValue={tabId || defaultTabId}>
      {children}
    </RadixTabs.Root>
  );
};

type ListProps = {
  withPadding?: boolean;
  fullWidth?: boolean;
  className?: string;
  tabs: Tab[];
  loading?: boolean;
  withQueryParams?: boolean;
  skeletonCount?: number;
  onTabsChange?: (tab: Tab) => void;
};

Tabs.List = ({
  withPadding = true,
  withQueryParams = true,
  fullWidth = true,
  className,
  tabs,
  loading,
  skeletonCount = 2,
  onTabsChange,
}: ListProps) => {
  const triggerListClasses = cx(styles.triggerList, className, {
    [styles.withPadding]: withPadding,
    [styles.fullWidth]: fullWidth,
  });

  const { updateQueryParams } = useQueryParams();

  const handleTabChange = (tab: Tab) => {
    onTabsChange && onTabsChange(tab);
    tab.onClick && tab.onClick();
    withQueryParams && updateQueryParams({ tabId: tab.tabId }, { withPush: false });
  };

  return (
    <div className={styles.triggerListContainer}>
      <RadixTabs.List className={triggerListClasses}>
        {loading && <TabsSkeleton count={skeletonCount} />}
        {!loading &&
          tabs.map((tab) => (
            <RadixTabs.Trigger
              key={tab.tabId}
              className={styles.triggerListItem}
              value={tab.tabId}
              onClick={() => handleTabChange(tab)}>
              {tab.leftIcon}
              {tab.label}
              {tab.rightIcon}
            </RadixTabs.Trigger>
          ))}
      </RadixTabs.List>
    </div>
  );
};

Tabs.Content = ({ tabId, children }: { tabId: string; children: ReactNode }) => (
  <RadixTabs.Content asChild={true} className='min-h-0' value={tabId}>
    {children}
  </RadixTabs.Content>
);
