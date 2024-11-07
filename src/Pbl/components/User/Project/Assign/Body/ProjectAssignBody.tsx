import { useTranslation } from 'react-i18next';

import SharedTabs from '@shared/components/DeprecatedTabs/DeprecatedTabs';
import FilterProvider from '@shared/hooks/useFilterContext';

import ProjectAssignSearch from './Search/AssignSearch';
import ProjectAssignLoader from './Loader/AssignLoader';
import styles from './ProjectAssignBody.module.sass';

export type TTabInfo = {
  id: 'project.assign.classes' | 'project.assign.teams' | 'project.assign.assigned';
  label: string;
};

export type TAssignTabs = TTabInfo[];

const ProjectAssignBody = () => {
  const { t } = useTranslation();
  const tabs: TAssignTabs = [
    {
      id: 'project.assign.classes',
      label: t('user.project.assignment.tabs.classes'),
    },
    {
      id: 'project.assign.teams',
      label: t('user.project.assignment.tabs.teams'),
    },
    {
      id: 'project.assign.assigned',
      label: t('user.project.assignment.tabs.assigned'),
    },
  ];

  return (
    <section className={styles.sectionWrapper}>
      <SharedTabs tabs={tabs}>
        <FilterProvider omitUrl={true}>
          <div className={styles.header}>
            <SharedTabs.Tabs />
            <div className='grow basis-1/2'>
              <ProjectAssignSearch />
            </div>
          </div>
          <ProjectAssignLoader />
        </FilterProvider>
      </SharedTabs>
    </section>
  );
};

export default ProjectAssignBody;
