import { useTranslation } from 'react-i18next';

import { ClassList } from '../ClassList';

import styles from './TeacherClass.module.sass';

type Props = {
  teacherName: string;
};

export const TeacherClass = ({ teacherName }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h3 className={styles.tableHeading}>
        {t('user.myClasses.teacherClasses', { name: teacherName })}
      </h3>
      <ClassList />
    </div>
  );
};
