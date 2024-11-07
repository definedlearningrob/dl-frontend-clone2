import { useTranslation } from 'react-i18next';

import { useFilterContext } from '@shared/hooks/useFilterContext';

import styles from './AssignEmpty.module.sass';

type Props = {
  tab: 'Classes' | 'Teams' | 'Assigned';
};

const ProjectAssignEmpty = ({ tab }: Props) => {
  const { t } = useTranslation();
  //@ts-ignore
  const { clearFilter } = useFilterContext();

  const getText = () => {
    switch (tab) {
      case 'Classes':
        return t('user.project.assignment.empty.result', {
          emptyTab: 'classes',
          suggestedTab: 'teams',
        });
      case 'Teams':
        return t('user.project.assignment.empty.result', {
          emptyTab: 'teams',
          suggestedTab: 'classes',
        });
      case 'Assigned':
        return t('user.project.assignment.empty.assigned');
      default:
        return t('user.project.assignment.empty.default');
    }
  };

  return (
    <div className={styles.wrapper}>
      <p>{getText()}</p>
      <button className={styles.clearFilter} type='button' onClick={clearFilter}>
        {t('user.project.assignment.empty.back')}
      </button>
    </div>
  );
};

export default ProjectAssignEmpty;
