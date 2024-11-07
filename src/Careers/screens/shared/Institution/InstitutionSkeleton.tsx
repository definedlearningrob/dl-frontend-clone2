import SharedCard from '@shared/components/Card/Card';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './InstitutionSkeleton.module.sass';

type Props = {
  isTeacher?: boolean;
};

export const InstitutionSkeleton = ({ isTeacher }: Props) => (
  <>
    <SharedCard className='mb-md'>
      <div className='flex gap-base'>
        <div className={styles.imageWrapper}>
          <SkeletonRectangle height='full-height' radius='sm' />
        </div>
        <div className='flex-1 flex flex-col gap-xs'>
          <div className='flex justify-between'>
            <div className='flex-1'>
              <SkeletonRectangle className='mb-xs' size='sm' />
              <SkeletonRectangle height='small' size='md' />
            </div>
            <div className='flex gap-sm flex-1 justify-end'>
              {!isTeacher && (
                <SkeletonRectangle className={styles.button} height='base' radius='sm' />
              )}
              <SkeletonRectangle className={styles.button} height='base' radius='sm' />
            </div>
          </div>
          <SkeletonRectangle size='full-width' />
          <SkeletonRectangle size='full-width' />
          <SkeletonRectangle className='mb-base' size='lg' />
          {!isTeacher && <SkeletonRectangle height='base' radius='sm' size='sm' />}
        </div>
      </div>
    </SharedCard>
    <SharedCard className='flex gap-xs !p-xs mb-sm'>
      <SkeletonRectangle className={styles.tab} height='small' radius='sm' />
      <SkeletonRectangle className={styles.tab} height='small' radius='sm' />
      <SkeletonRectangle className={styles.tab} height='small' radius='sm' />
    </SharedCard>
    <SharedCard className='mb-md'>
      <SkeletonRectangle className='mb-sm' size='sm' />
      <div className='flex gap-sm mb-base'>
        <SkeletonRectangle className={styles.overviewCard} radius='sm' size='full-width' />
        <SkeletonRectangle className={styles.overviewCard} radius='sm' size='full-width' />
        <SkeletonRectangle className={styles.overviewCard} radius='sm' size='full-width' />
      </div>
      <SkeletonRectangle className='mb-base' size='sm' />
      <SkeletonRectangle className='!w-1/5' />
      <SkeletonRectangle className='mt-xs mb-base' size='md' />
      <SkeletonRectangle className='!w-1/5' />
      <SkeletonRectangle className='mt-xs mb-base' size='md' />
      <SkeletonRectangle className='!w-1/5' />
      <SkeletonRectangle className='mt-xs mb-base' size='md' />
    </SharedCard>
    <SharedCard>
      <SkeletonRectangle className='mb-base' size='sm' />
      <SkeletonRectangle className='mb-md' size='lg' />
      <SkeletonRectangle className='mb-sm' size='sm' />
      <SkeletonRectangle className={styles.button} height='big' radius='sm' size='sm' />
    </SharedCard>
  </>
);
