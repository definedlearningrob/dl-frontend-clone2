import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

const StudentViewSkeletonProgressStep = () => (
  <div className='overall-progress__step -done'>
    <div className='overall-progress__step-label skeleton-dashboard-student__progress-icon-wrapper'>
      <SharedIcon
        icon={<DoneIcon className='skeleton-dashboard-student__progress-icon' />}
        size='sm'
      />
    </div>
    <div className='overall-progress__step-text skeleton-dashboard-student__progress-item'>
      <SkeletonRectangle className='skeleton-dashboard-student__progress-item-header' size='lg' />
      <SkeletonRectangle
        className='skeleton-dashboard-student__progress-item-description'
        size='md'
      />
    </div>
  </div>
);

export default StudentViewSkeletonProgressStep;
