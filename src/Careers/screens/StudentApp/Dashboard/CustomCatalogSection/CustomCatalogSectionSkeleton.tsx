import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const CustomCatalogSectionSkeleton = () => (
  <div className='bg-white p-sm xxxl:p-md h-full rounded-sm flex flex-col'>
    <div className='h-[116px] xxxl:h-[186px] mb-sm shrink-0'>
      <SkeletonRectangle height='full-height' radius='sm' />
    </div>
    <div className='mb-xs xxxl:mb-sm'>
      <SkeletonRectangle height='tiny' radius='sm' />
    </div>
    <div className='h-full mb-sm xxxl:mb-base'>
      <SkeletonRectangle height='full-height' radius='sm' />
    </div>
    <div>
      <SkeletonRectangle height='base' radius='sm' />
    </div>
  </div>
);
