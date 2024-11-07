import { useTranslation } from 'react-i18next';

import MainContent from '@dc/shared/MainContent/MainContent';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './CourseSkeleton.module.sass';

export const CourseSkeleton = () => {
  const { t } = useTranslation();

  return (
    <MainContent className='!mt-xxxs'>
      <div className='mb-md'>
        <SkeletonRectangle className='mb-xs' size='sm' />
        <SkeletonRectangle height='base' radius='sm' size='sm' />
      </div>
      <div className='mb-md'>
        <SkeletonRectangle className='mb-xs' radius='sm' size='lg' />
        <SkeletonRectangle className='mb-xs' radius='sm' size='md' />
        <SkeletonRectangle className='mb-xs' radius='sm' size='sm' />
      </div>
      <h3>{t('course.lessons.heading')}</h3>
      <div className={styles.lessons}>
        <SkeletonRectangle height='card' radius='sm' />
        <SkeletonRectangle height='card' radius='sm' />
        <SkeletonRectangle height='card' radius='sm' />
        <SkeletonRectangle height='card' radius='sm' />
        <SkeletonRectangle height='card' radius='sm' />
      </div>
    </MainContent>
  );
};
