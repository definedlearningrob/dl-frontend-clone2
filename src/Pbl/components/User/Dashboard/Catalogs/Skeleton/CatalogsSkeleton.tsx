import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

import styles from './CatalogsSkeleton.module.sass';
import '@pbl/components/User/Dashboard/Catalogs/Catalogs.module.sass';

const NAV_COUNT = 3;

function CatalogsSkeleton() {
  return (
    <>
      {Array.from({ length: NAV_COUNT }, (_, index) => (
        <SkeletonRectangle
          key={index}
          className={styles.skeletonItem}
          color='darker'
          size='full-width'
        />
      ))}
    </>
  );
}

export default CatalogsSkeleton;
