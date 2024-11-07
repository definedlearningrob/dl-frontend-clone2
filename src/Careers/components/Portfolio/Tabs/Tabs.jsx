import cx from 'classnames';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';

import './Tabs.sass';

SharedTabs.propTypes = {
  children: PropTypes.object,
  defaultProjectTabId: PropTypes.string,
  defaultTabId: PropTypes.string,
  projectTabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  studentId: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  transparent: PropTypes.bool,
};

export const TabsContext = createContext({});

function SharedTabs({
  children,
  defaultProjectTabId,
  defaultTabId,
  projectTabs = [],
  studentId,
  tabs = [],
  transparent,
}) {
  const defaultProjectTab = defaultProjectTabId
    ? projectTabs.find(({ id }) => id === defaultProjectTabId)
    : projectTabs[0];
  const defaultTab = defaultTabId ? tabs.find(({ id }) => id === defaultTabId) : tabs[0];
  const [projectTab, setProjectTab] = useState(defaultProjectTab);
  const [tab, setTab] = useState(defaultTab);
  const [personalProjectState, setPersonalProjectState] = useState({
    editedProject: {},
    projectId: null,
    showCreatePersonalProjectModal: false,
    showDeletePersonalProjectModal: false,
    showEditPersonalProjectModal: false,
  });

  useEffect(() => {
    const selectedTab = tabs.find(({ id }) => id === tab.id);

    if (!selectedTab) {
      setTab(tabs[0]);
    }
  }, [tab, tabs]);

  useEffect(() => {
    const selectedProjectTab = projectTabs.find(({ id }) => id === projectTab.id);

    if (!selectedProjectTab) {
      setProjectTab(projectTabs[0]);
    }
  }, [projectTab, projectTabs]);

  return (
    <TabsContext.Provider
      value={{
        personalProjectState,
        projectTab,
        projectTabs,
        setPersonalProjectState,
        setProjectTab,
        setTab,
        studentId,
        tab,
        tabs,
        transparent,
      }}>
      {children}
    </TabsContext.Provider>
  );
}

SharedTabs.Tabs = function () {
  const { setTab, tab, transparent, tabs } = useContext(TabsContext);

  const tabsClasses = cx('tabs', {
    '-transparent': transparent,
  });

  const getTabClasses = (passedTab) =>
    cx('tabs__tab', {
      '-selected': tab.id === passedTab.id,
      '-single': tabs.length === 1,
    });

  const selectTab = (tab) => () => setTab(tab);

  return (
    <ul className={tabsClasses}>
      {tabs.map((tab) => (
        <DeprecatedTooltip
          key={tab.id}
          disabled={tab.id === 'showcase' ? true : false}
          message={tab.label}
          variant='dark'>
          <li className={getTabClasses(tab)} data-testid={`tab-${tab.id}`} onClick={selectTab(tab)}>
            {tab.label}
          </li>
        </DeprecatedTooltip>
      ))}
    </ul>
  );
};

export default SharedTabs;
