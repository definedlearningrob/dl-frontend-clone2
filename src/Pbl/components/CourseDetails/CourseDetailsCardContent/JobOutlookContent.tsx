import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { ReactComponent as BrightOutlook } from '@pbl/images/bright_outlook.svg';
import { TJobOutlookData } from '@pbl/graphql/fragments/course';

import styles from './CourseDetailsCardContent.module.sass';

export type Props = {
  data: TJobOutlookData;
  introduction?: string;
};

const JobOutlookContent = ({ data, introduction }: Props) => {
  const { t } = useTranslation();
  const { outlook, brightOutlook, salaryMedian } = data;

  return (
    <>
      {introduction && <p>{introduction}</p>}
      {outlook.category && (
        <div className={styles.outlookCategory}>
          {outlook.category === 'Bright' ? <BrightOutlook /> : outlook.category}
        </div>
      )}
      {outlook.description && <p className={styles.paragraph}>{outlook.description}</p>}
      {salaryMedian && (
        <div className={styles.listWithTitle}>
          <p className={styles.paragraph} id='median-salary'>
            {t('courseDetails.medianSalary')}
          </p>
          <ul aria-labelledby='median-salary' className={cx(styles.list, styles.outlookList)}>
            <li className={styles.outlookListItem}>
              {t('courseDetails.salaryAnnual', {
                salary: salaryMedian,
                maximumFractionDigits: 0,
              })}
            </li>
          </ul>
        </div>
      )}
      {brightOutlook && (
        <div className={styles.listWithTitle}>
          {brightOutlook.description && (
            <p className={styles.paragraph} id='bright-outlook'>
              {brightOutlook.description}
            </p>
          )}
          {!isEmpty(brightOutlook.category) && (
            <ul aria-labelledby='bright-outlook' className={cx(styles.list, styles.outlookList)}>
              {brightOutlook.category.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default JobOutlookContent;
