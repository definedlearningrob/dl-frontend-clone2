import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

export const TextWithSkeleton = ({ text, loading }: { text?: string; loading: boolean }) => (
  <div className='mb-0 text-neutral-700'>
    {loading && (
      <div className='w-lg'>
        <SkeletonRectangle size='full-width' />
      </div>
    )}
    {!loading && text}
  </div>
);
