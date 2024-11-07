import cx from 'classnames';
import PropTypes from 'prop-types';

import { PROGRESS_STATUS } from '@dc/components/Student/Lesson/TableOfContent/TableOfContent.jsx';

import { ReactComponent as InProgressIcon } from '@shared/svg/play.svg';
import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import Icon from '@shared/components/Icon/Icon';

StudentLessonTableOfContentLessonStep.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
  id: PropTypes.string,
  isActive: PropTypes.bool,
  name: PropTypes.string,
  setActive: PropTypes.func,
  status: PropTypes.oneOf(['not_started', 'in_progress', 'done']),
};

function StudentLessonTableOfContentLessonStep({
  children,
  id,
  isActive,
  name,
  setActive,
  status,
}) {
  const iconWrapperClasses = cx('table-of-content-lesson-step__icon-wrapper', {
    'not-started': status === PROGRESS_STATUS.NOT_STARTED,
    'in-progress': status === PROGRESS_STATUS.IN_PROGRESS,
    done: status === PROGRESS_STATUS.DONE,
  });

  const contentClasses = cx('table-of-content-lesson-step__content', { '-active': isActive });

  const getExpanded = () => setActive(id);

  return (
    <div className='table-of-content-lesson-step' data-testid='lesson-step'>
      <button className='table-of-content-lesson-step__button' onClick={getExpanded}>
        <div className={iconWrapperClasses}>
          {status === PROGRESS_STATUS.DONE ? (
            <Icon icon={<DoneIcon />} size='sm' />
          ) : (
            <Icon icon={<InProgressIcon />} size='sm' />
          )}
        </div>
        <span className='table-of-content-lesson-step__title'>{name}</span>
      </button>
      <div className={contentClasses}>{children}</div>
    </div>
  );
}

export default StudentLessonTableOfContentLessonStep;
