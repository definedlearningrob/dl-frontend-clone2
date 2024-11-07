import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

const itemsCount = 20;

const AllListSkeleton = () => (
  <>
    {Array.from({ length: itemsCount }, (_, index) => (
      <div key={index} className='h-[180px] xxxl:h-[268px]'>
        <SkeletonRectangle height='full-height' radius='sm' />
      </div>
    ))}
  </>
);

export default AllListSkeleton;
