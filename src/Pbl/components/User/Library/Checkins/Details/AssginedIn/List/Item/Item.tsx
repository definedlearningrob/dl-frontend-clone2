import { useHistory } from 'react-router-dom';

import { type TCheckInProject } from '@pbl/graphql/user/queries/checkInQuestion';

import styles from './Item.module.sass';

type AssignedInItemProps = {
  project: TCheckInProject;
};

const AssignedInItem = ({ project }: AssignedInItemProps) => {
  const history = useHistory();

  const redirectToProject = () => {
    history.push(`/projects/${project.id}`);
  };

  return (
    <li className={styles.wrapper}>
      <button className={styles.textButton} onClick={redirectToProject}>
        {project.displayName}
      </button>
    </li>
  );
};

export default AssignedInItem;
