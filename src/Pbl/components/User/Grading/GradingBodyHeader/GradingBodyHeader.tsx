import { useTranslation } from 'react-i18next';

import { parseCreatedDate } from '../helpers/parseCreatedOnDate';

import styles from './GradingBodyHeader.module.sass';

type Props = {
  studentName?: string;
  submittedOn?: string;
};

const GradingBodyHeader = ({ studentName, submittedOn }: Props) => {
  const { t } = useTranslation();

  const date = submittedOn
    ? t('user.grading.submittedOn', {
        date: parseCreatedDate(submittedOn),
      })
    : t('user.grading.didNotSubmit');

  return (
    <div className={styles.bodyHeader}>
      <span className='me-auto'>{studentName || t('common.roles.student')}</span>
      <span className={styles.submissionDate}>{date}</span>
    </div>
  );
};

export default GradingBodyHeader;
