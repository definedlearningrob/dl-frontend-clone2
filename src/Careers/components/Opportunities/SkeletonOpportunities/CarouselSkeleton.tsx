import Rectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './CarouselSkeleton.module.sass';

type Props = {
  count?: number;
};

export const CarouselSkeleton = ({ count = 4 }: Props) => (
  <div className={styles.skeletonContainer}>
    {Array.from({ length: count }, (_, index) => (
      <Rectangle
        key={index}
        className={styles.skeleton}
        color='darker'
        radius='sm'
        withoutAnimation={false}
      />
    ))}
  </div>
);
