import React, { createContext, useContext, useEffect, useState } from 'react';
import cx from 'classnames';

import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';

import styles from './SharedTabs.module.sass';

export const SharedTabsContext = createContext<Props>({
  tabs: [],
  transparent: '',
  setTab: () => {},
  tab: { id: '', label: '' },
});

type DashboardTab = {
  id: string;
  label: string;
};

type Props = {
  tabs: DashboardTab[];
  tab?: DashboardTab;
  setTab?: React.Dispatch<React.SetStateAction<DashboardTab>>;
  children?: React.ReactNode;
  defaultTabId?: string;
  transparent?: string;
};

export const SharedTabs = ({ children, defaultTabId, tabs, transparent }: Props) => {
  const defaultTab = defaultTabId ? tabs.find(({ id }) => id === defaultTabId) : tabs[0];
  const [tab, setTab] = useState<DashboardTab>(defaultTab!);

  useEffect(() => {
    const selectedTab = tabs.find(({ id }) => id === tab?.id);

    if (!selectedTab) {
      setTab(tabs[0]);
    }
  }, [tab, tabs]);

  return (
    <SharedTabsContext.Provider
      value={{
        setTab,
        tab,
        tabs,
        transparent,
      }}>
      {children}
    </SharedTabsContext.Provider>
  );
};

SharedTabs.Tabs = function () {
  const { setTab, tab, transparent, tabs } = useContext(SharedTabsContext);

  const tabsClasses = cx(styles.tabs, {
    [styles.transparent]: transparent,
  });

  const getTabClasses = (passedTab: DashboardTab) =>
    cx(styles.tab, {
      [styles.selected]: tab?.id === passedTab.id,
      [styles.single]: tabs.length === 1,
    });

  return (
    <ul className={tabsClasses}>
      {tabs.map((tab: DashboardTab) => (
        <DeprecatedTooltip
          key={tab.id}
          disabled={tab.id === 'showcase' ? true : false}
          message={tab.label}
          variant='dark'>
          <li
            className={getTabClasses(tab)}
            data-testid={`tab-${tab.id}`}
            onClick={() => setTab!(tab)}>
            {tab.label}
          </li>
        </DeprecatedTooltip>
      ))}
    </ul>
  );
};
