import { useTranslation } from 'react-i18next';

import { TCheckInProject } from '@pbl/graphql/user/queries/checkInQuestion';

import Item from './Item/Item';
import styles from './List.module.sass';
type AssignedInListProps = {
  projects?: TCheckInProject[];
};

const AssginedInList = ({ projects }: AssignedInListProps) => {
  const { t } = useTranslation();

  if (!projects || !projects.length) {
    return <div>{t('user.library.checkins.details.noProjects')}</div>;
  }

  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <Item key={project.id} project={project} />
      ))}
    </ul>
  );
};

export default AssginedInList;
