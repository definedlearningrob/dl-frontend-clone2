import { cx } from '@shared/utils/cx';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const EvidenceListItemSkeleton = () => (
  <div className='flex p-xs gap-sm font-bold leading-base text-xs border-b border-neutral-300 h-[92px] xxxl:h-[116px]'>
    <div className='w-full max-w-[148px] xxxl:max-w-[195px]'>
      <SkeletonRectangle height='full-height' radius='sm' />
    </div>
    <div className='basis-1/3 '>
      <SkeletonRectangle className='mb-sm' radius='sm' size='lg' />
      <SkeletonRectangle className='mb-sm' height='small' radius='sm' size='lg' />
    </div>
    <div className='basis-2/3 flex flex-col gap-xs'>
      <SkeletonRectangle radius='sm' />
      <SkeletonRectangle radius='sm' />
      <SkeletonRectangle radius='sm' />
    </div>
    <div className={cx('basis-[80px] shrink-0 text-center flex items-center justify-center')}>
      <SkeletonRectangle className='!w-sm' radius='none' size='sm' />
    </div>
  </div>
);
