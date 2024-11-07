import { TStudentMyClassesData } from '@pbl/graphql/student/queries/myClasses';

import { ReactComponent as ClassIcon } from '@shared/svg/class.svg';
import SharedIcon from '@shared/components/Icon/Icon';

import styles from './MyClassesItem.module.sass';

type MyClassesItemProps = {
  schoolClass: TStudentMyClassesData['myClasses'][0];
};

const MyClassesItem = ({ schoolClass }: MyClassesItemProps) => (
  <li className={styles.item}>
    <SharedIcon className={styles.icon} icon={<ClassIcon className={styles.svg} />} />
    <div>
      {/*@ts-ignore*/}
      <h4 className={styles.subTitle}>{schoolClass.teacher || ''}</h4>
      <h3 className={styles.title}>{schoolClass.name}</h3>
    </div>
  </li>
);

export default MyClassesItem;
