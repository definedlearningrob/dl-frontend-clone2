import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './OpportunitiesSkeletonLastApplications.module.sass';

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'full-width';
};
export const OpportunitiesSkeletonLastApplications = ({ size }: Props) => (
  <div className={styles.wrapper}>
    <div className={styles.rectangleHead}>
      <SkeletonRectangle height='base' radius='sm' size='full-width' />
    </div>
    <div className={styles.rectangleBody}>
      <SkeletonRectangle height='base' radius='sm' size={size} />
    </div>
    <div className={styles.rectangleFooter}>
      <SkeletonRectangle radius='sm' size='full-width' />
    </div>
  </div>
);
