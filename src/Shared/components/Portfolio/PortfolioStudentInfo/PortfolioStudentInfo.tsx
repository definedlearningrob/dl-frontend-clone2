import { isEmpty, isNull } from 'lodash-es';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { usePortfolioContext } from '@shared/components/Portfolio/helpers/usePortfolioContext';

import styles from './PortfolioStudentInfo.module.sass';

export const PortfolioStudentInfo = () => {
  const { studentInfo } = usePortfolioContext();
  const { firstName, lastName } = studentInfo;
  const studentName = `${firstName} ${lastName}`;

  if (isNull(firstName || lastName)) return null;
  if (isEmpty(firstName || lastName)) return <SharedLoadingSpinner size='small' />;

  return (
    <div className={styles.infoCard}>
      <SharedAvatar className={styles.infoAvatar} size='80' theme='base' user={studentInfo} />
      <h4 className={styles.infoHeading}>{studentName}</h4>
    </div>
  );
};
