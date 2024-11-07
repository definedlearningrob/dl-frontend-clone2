import Rectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './ResultSkeleton.module.sass';

type Props = {
  count?: number;
};

const DEFAULT_ITEMS_COUNT = 4;

export const ResultSkeleton = ({ count = DEFAULT_ITEMS_COUNT }: Props) => (
  <div className={styles.skeletonContainer}>
    {Array.from({ length: count }, (_, index) => (
      <Rectangle
        key={index}
        className={styles.skeletonWrapper}
        color='darker'
        radius='sm'
        size='full-width'
        withoutAnimation={false}
      />
    ))}
  </div>
);
