import { useContext } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { TabsContext } from '@dc/components/Portfolio/Tabs/Tabs';

import { ReactComponent as AddIcon } from '@shared/svg/add.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

const ProjectTabs = () => {
  const { t } = useTranslation();
  const {
    projectTab,
    projectTabs,
    setPersonalProjectState,
    setProjectTab,
    studentId,
    transparent,
  } = useContext(TabsContext);
  const projectTabsClasses = cx('portfolio-projects__heading', {
    '-transparent': transparent,
  });

  const getProjectTabClasses = (passedTab) =>
    cx('portfolio-projects__heading-type', {
      '-selected': projectTab.id === passedTab.id,
      '-single': projectTabs.length === 1,
    });

  const selectTab = (projectTab) => () => setProjectTab(projectTab);

  const openCreatePersonalProjectModal = () => {
    setPersonalProjectState({
      showCreatePersonalProjectModal: true,
    });
  };

  const showCreatePersonalProjectButton = () => {
    const noPersonalTab = !projectTabs.filter((tab) => tab.id === 'personal').length;

    return (studentId && projectTab.id === 'personal') || noPersonalTab;
  };

  return (
    <div className='portfolio-projects__nav'>
      <ul className={projectTabsClasses}>
        {projectTabs.map((projectTab) => (
          <li
            key={projectTab.id}
            className={getProjectTabClasses(projectTab)}
            data-testid={`tab-${projectTab.id}`}
            onClick={selectTab(projectTab)}>
            {projectTab.label}
          </li>
        ))}
      </ul>
      {showCreatePersonalProjectButton() ? (
        <DeprecatedIconButton
          className='portfolio-projects__action'
          data-testid='create-new-project'
          icon={<AddIcon />}
          size='sm'
          type='submit'
          value='createProject'
          variant='primary'
          onClick={openCreatePersonalProjectModal}>
          <span className='portfolio-projects__action-text'>
            {t('portfolio.projects.createNewProject')}
          </span>
        </DeprecatedIconButton>
      ) : null}
    </div>
  );
};

export default ProjectTabs;
