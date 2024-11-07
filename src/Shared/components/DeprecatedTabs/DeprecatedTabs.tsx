import cx from 'classnames';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import styles from './DeprecatedTabs.module.sass';

type Props = {
  children: ReactNode | ReactNode[];
  defaultTabId?: string;
  tabs: Tab[];
  transparent?: boolean;
};

export type Tab = {
  id: string;
  label: string;
};

type ContextProps = {
  resetTabs: () => void;
  setTab: (tab: Tab) => void;
  tab?: Tab;
  tabs?: Tab[];
  transparent?: boolean;
};

export const TabsContext = createContext<ContextProps>({
  resetTabs: () => {},
  setTab: () => {},
});

function SharedTabs({ children, defaultTabId, tabs, transparent }: Props) {
  const defaultTab = defaultTabId ? tabs.find(({ id }) => id === defaultTabId) : tabs[0];
  const [tab, setTab] = useState(defaultTab);

  useEffect(() => {
    const selectedTab = tabs.find(({ id }) => id === tab?.id);

    if (!selectedTab) {
      setTab(tabs[0]);
    }
  }, [tab, tabs]);

  const resetTabs = () => {
    setTab(defaultTab);
  };

  return (
    <TabsContext.Provider value={{ resetTabs, tab, setTab, tabs, transparent }}>
      {children}
    </TabsContext.Provider>
  );
}

type TabsProps = {
  className?: string;
  tabClassName?: string;
  selectedTabClassName?: string;
  withPadding?: boolean;
  fullWidth?: boolean;
};

SharedTabs.Tabs = function ({
  className,
  tabClassName,
  selectedTabClassName,
  withPadding = true,
  fullWidth = true,
}: TabsProps) {
  const { setTab, tab, transparent, tabs } = useContext<ContextProps>(TabsContext);

  const tabsClasses = cx(styles.tabs, className, {
    [styles.transparent]: transparent,
    [styles.withPadding]: withPadding,
    [styles.fullWidth]: fullWidth,
  });

  const getTabClasses = (passedTab: Tab) =>
    cx(
      styles.tab,
      {
        [styles.singleTab]: tabs?.length === 1,
        [styles.tabSelected]: tab?.id === passedTab.id,
        ...(selectedTabClassName && { [selectedTabClassName]: tab?.id === passedTab.id }),
      },
      tabClassName
    );

  const selectTab = (tab: Tab) => () => setTab(tab);

  return (
    <div className={styles.tabsWrapper}>
      <ul className={tabsClasses}>
        {tabs &&
          tabs.map((tab) => (
            <li
              key={tab.id}
              className={getTabClasses(tab)}
              data-testid={`tab-${tab.id}`}
              role='tab'
              onClick={selectTab(tab)}>
              {tab.label}
            </li>
          ))}
      </ul>
    </div>
  );
};

export const useTabsContext = () => useContext(TabsContext);

export default SharedTabs;
