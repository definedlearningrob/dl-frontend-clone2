import SharedAvatar from '@shared/components/Avatar/Avatar';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

function SkeletonAppHeader() {
  const user = {
    firstName: 'Defined',
    lastName: 'Careers',
  };

  return (
    <>
      <div className='flex justify-end h-[theme(variables.headerHeight)] px-base py-xs xxxl:px-md'>
        <div className='flex items-center gap-xs'>
          <SharedAvatar size='40' theme='light' user={user} />
          <div className='grid gap-xxs grid-rows-2'>
            <SkeletonRectangle className='!w-[100px] !p-xxs' color='darker' />
            <SkeletonRectangle className='!w-[100px] !p-xxs' color='darker' />
          </div>
        </div>
      </div>
    </>
  );
}
export default SkeletonAppHeader;
