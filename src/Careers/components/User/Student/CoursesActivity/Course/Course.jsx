import cx from 'classnames';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import Item from '@dc/components/User/Student/CoursesActivity/Course/Item/Item';
import GradingModal from '@dc/components/User/Student/GradingModal/GradingModal';
import useCourseActivity from '@dc/hooks/useCourseActivity';
import { CONVERSATION_CONTEXT_TYPES } from '@dc/resources/constants';
import { ReactComponent as MessagesIcon } from '@dc/svg/messages.svg';
import { useClearGradingNeeded } from '@dc/hooks/useClearGradingNeeded';
import SharedReviewIndicator from '@dc/shared/ReviewIndicator/ReviewIndicator';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ArrowUp } from '@shared/svg/chevron_up.svg';
import { ReactComponent as ArrowDown } from '@shared/svg/chevron_down.svg';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

UserStudentCoursesActivityCourse.propTypes = {
  course: PropTypes.shape({
    enrolledSchoolClasses: PropTypes.shape({ nodes: PropTypes.array }),
    gradingNeeded: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  extended: PropTypes.bool,
  setupMessageModal: PropTypes.func,
};

function UserStudentCoursesActivityCourse({ course, extended, setupMessageModal }) {
  const [isExtended, setIsExtended] = useState(extended);
  const { itemsToGrade, itemToGrade, loading } = useCourseActivity({
    withQuery: isExtended,
  });

  const { id } = useParams();

  useClearGradingNeeded({ studentUuid: id, itemsToGrade, course });

  const ArrowIcon = isExtended ? ArrowUp : ArrowDown;
  const itemClasses = cx('user-student__courses-activity-list__item', {
    '-extended': isExtended,
  });

  const context = useMemo(
    () => ({
      type: CONVERSATION_CONTEXT_TYPES.COURSE,
      id: course.id,
      title: course.name,
    }),
    [course]
  );

  const toggleExtended = () => setIsExtended(!isExtended);

  const setupModalWithContext = (event) => {
    event.stopPropagation();
    setupMessageModal(context);
  };

  const needsReview = course.gradingNeeded;

  return (
    <li className={itemClasses} data-testid='activity-course-item'>
      <div
        className='user-student__courses-activity-list__label'
        data-testid='toggle-course'
        onClick={toggleExtended}>
        <div className='flex gap-xs'>
          <div className='flex gap-xs'>{course.name}</div>
          {needsReview && <SharedReviewIndicator />}
        </div>
        <div className='user-student__courses-activity-list__icons'>
          <div onClick={setupModalWithContext}>
            <SharedIcon
              className='user-student__courses-activity-list__send-icon'
              icon={<MessagesIcon />}
              size='sm'
            />
          </div>
          <SharedIcon icon={<ArrowIcon />} size='sm' />
        </div>
      </div>
      {loading && (
        <SharedLoadingSpinner
          className='user-student__courses-activity-list__loader'
          size='small'
        />
      )}

      {!loading && isExtended && (
        <ul data-testid='the-list'>
          {itemsToGrade.map((item, index) => (
            <Item key={index} item={item} itemIndex={index} setupMessageModal={setupMessageModal} />
          ))}
        </ul>
      )}
      {itemToGrade && <GradingModal />}
    </li>
  );
}

export default UserStudentCoursesActivityCourse;
