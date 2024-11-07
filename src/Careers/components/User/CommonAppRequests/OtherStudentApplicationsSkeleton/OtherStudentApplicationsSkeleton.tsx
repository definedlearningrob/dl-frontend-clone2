import { useTranslation } from 'react-i18next';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './OtherStudentApplicationsSkeleton.module.sass';

export const OtherStudentApplicationsSkeleton = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.headSection}>
        <h4 className='text-base'>
          {t('user.postSecondary.commonAppRequests.applicationFormList.otherStudentApplications')}
        </h4>
      </div>
      <div className={styles.bodySection}>
        <SkeletonRectangle className={styles.titleRectangle} radius='none' size='lg' />
        <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
        <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
        <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
        <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
      </div>
      <div className={styles.bodySection}>
        <SkeletonRectangle className={styles.titleRectangle} radius='none' size='lg' />
        <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
        <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
        <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
        <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
      </div>
      <div className={styles.bodySection}>
        <SkeletonRectangle className={styles.titleRectangle} radius='none' size='lg' />
        <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
        <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
        <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
        <SkeletonRectangle className={styles.rectangle} radius='none' size='md' />
      </div>
    </div>
  );
};
