import Rectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './ListSkeleton.module.sass';

type Props = {
  count?: number;
};

export const ListSkeleton = ({ count = 4 }: Props) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <li key={index} className={styles.skeleton}>
        <Rectangle
          color='darker'
          height='full-height'
          radius='sm'
          size='full-width'
          withoutAnimation={false}
        />
      </li>
    ))}
  </>
);
