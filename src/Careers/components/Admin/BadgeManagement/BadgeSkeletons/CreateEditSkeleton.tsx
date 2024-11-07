import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import Card from '@shared/components/Card/Card';

export const CreateEditSkeleton = () => (
  <>
    <div className='flex flex-col'>
      <Card className='flex gap-base min-h-[235px]'>
        <div className='w-[180px] xxxl:w-[240px] h-[180px]'>
          <SkeletonRectangle height='full-height' />
        </div>
        <div className='w-3/4 flex flex-col gap-sm'>
          <div className='flex flex-col gap-xs'>
            <SkeletonRectangle height='extra-small' radius='sm' size='sm' />
            <SkeletonRectangle height='base' radius='sm' />
          </div>
          <div className='flex flex-col gap-xs'>
            <SkeletonRectangle height='extra-small' radius='sm' size='sm' />
            <SkeletonRectangle height='large' radius='sm' />
          </div>
        </div>
      </Card>
      <div className='flex justify-end gap-base'>
        <div className='w-1/2 flex pt-base gap-md'>
          <SkeletonRectangle height='base' radius='sm' />
          <SkeletonRectangle height='base' radius='sm' />
        </div>
      </div>
    </div>
  </>
);
