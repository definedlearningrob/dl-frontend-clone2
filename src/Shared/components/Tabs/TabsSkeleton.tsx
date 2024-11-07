import cx from 'classnames';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './Tabs.module.sass';

type Props = {
  count: number;
};

export const TabsSkeleton = ({ count }: Props) => {
  const loadingTriggerListClasses = cx(styles.triggerListItem, styles.triggerSkeleton);

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonRectangle key={index} className={loadingTriggerListClasses} color='darker' />
      ))}
    </>
  );
};
