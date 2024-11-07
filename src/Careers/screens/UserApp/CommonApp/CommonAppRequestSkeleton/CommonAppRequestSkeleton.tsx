import SharedMainContent from '@dc/shared/MainContent/MainContent';
import styles from '@dc/screens/UserApp/CommonApp/CommonAppRequests/CommonAppRequestsScreen.module.sass';

import SharedCard from '@shared/components/Card/Card';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const CommonAppRequestSkeleton = () => (
  <SharedMainContent>
    <SharedCard className={styles.card}>
      <SharedCard.Header className={styles.cardHeader}>
        <div className='flex w-full gap-base'>
          <div className='flex-none'>
            <SkeletonRectangle className={styles.icon} height='big' radius='sm' size='full-width' />
          </div>
          <div className='flex-auto w-2/3'>
            <h6 className='text-xs mb-xs font-bold'>
              <SkeletonRectangle
                className={styles.rectangle}
                height='small'
                radius='sm'
                size='md'
              />
            </h6>
            <div className='text-xs mb-0 font-regular text-neutral-700'>
              <SkeletonRectangle className={styles.rectangle} radius='sm' size='md' />
            </div>
          </div>
          <div className='flex-auto flex justify-end'>
            <SkeletonRectangle className={styles.rectangle} height='base' radius='sm' size='lg' />
          </div>
        </div>
      </SharedCard.Header>
    </SharedCard>
  </SharedMainContent>
);
