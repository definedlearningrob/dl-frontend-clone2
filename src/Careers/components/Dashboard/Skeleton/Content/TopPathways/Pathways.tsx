import { useTranslation } from 'react-i18next';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

function DashboardViewTopPathwaysSkeleton() {
  const { t } = useTranslation();

  return (
    <div>
      <h4 className='text-base mb-base'>{t('user.dashboard.topPathwaysEnrolled.heading')}</h4>
      <div className='p-base border border-neutral-300 rounded-sm'>
        <div className='mt-xxxs mb-sm'>
          <SkeletonRectangle className='mb-x' size='lg' />
          <SkeletonRectangle size='full-width' />
        </div>
        <div className='mb-sm'>
          <SkeletonRectangle className='mb-x' size='md' />
          <SkeletonRectangle size='lg' />
        </div>
        <div className='mb-sm'>
          <SkeletonRectangle className='mb-x' size='sm' />
          <SkeletonRectangle size='md' />
        </div>
        <div>
          <SkeletonRectangle className='mb-x' size='md' />
          <SkeletonRectangle size='md' />
        </div>
      </div>
    </div>
  );
}

export default DashboardViewTopPathwaysSkeleton;
