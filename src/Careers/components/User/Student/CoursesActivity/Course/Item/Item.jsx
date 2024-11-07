import { useMemo } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import useCourseActivity from '@dc/hooks/useCourseActivity';
import { CONVERSATION_CONTEXT_TYPES } from '@dc/resources/constants';
import { GRADE_STATUSES } from '@dc/resources/constants';
import { ReactComponent as MessagesIcon } from '@dc/svg/messages.svg';
import { ReactComponent as NewItemIcon } from '@dc/svg/remove.svg';
import { ReactComponent as NotAnsweredIcon } from '@dc/svg/hourglass_outlined.svg';
import { ReactComponent as RejectedIcon } from '@dc/svg/clear.svg';
import { ReactComponent as ReviewIcon } from '@dc/svg/review.svg';

import { ReactComponent as AcceptedIcon } from '@shared/svg/done.svg';
import { ReactComponent as ItemUpdatedIcon } from '@shared/svg/refresh.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { formatDateTime } from '@shared/utils/date';
import { Tooltip } from '@shared/components/Tooltip';
import { DropdownContextMenu } from '@shared/components/DropdownContextMenu';

UserStudentCoursesActivityItem.propTypes = {
  item: PropTypes.shape({
    __typename: PropTypes.string,
    answer: PropTypes.object,
    displayName: PropTypes.string,
    group: PropTypes.string,
    id: PropTypes.string,
    lesson: PropTypes.shape({
      name: PropTypes.string,
    }),
    question: PropTypes.string,
    submission: PropTypes.object,
  }),
  itemIndex: PropTypes.number,
  setupMessageModal: PropTypes.func,
};
// TODO use here HarmonicMenu component
function UserStudentCoursesActivityItem({ item, itemIndex, setupMessageModal }) {
  const { t } = useTranslation();
  const { setItemToGradeByIndex } = useCourseActivity();

  const studentInput = useMemo(() => item.submission || item.answer, [item]);

  const renderGroupBadge = () =>
    item.group && (
      <span className='user-student__courses-activity-list__list-item-group-badge'>
        {item.group}
      </span>
    );

  const status = useMemo(() => {
    if (!studentInput) {
      return 'not-answered';
    }
    const grade = studentInput.grade || studentInput.rubricGrade;

    if (isEmpty(grade)) {
      return 'not-graded';
    }

    const studentUpdateDate = dayjs(studentInput.updatedAt);
    const teacherGradeDate = dayjs(grade.updatedAt);

    if (teacherGradeDate.isBefore(studentUpdateDate)) {
      return 'updated';
    }

    if (grade.status === GRADE_STATUSES.NOT_ACCEPTED) return 'not-accepted';

    return (grade.status || GRADE_STATUSES.ACCEPTED).toLowerCase();
  }, [studentInput]);

  const icon = useMemo(
    () =>
      ({
        'not-answered': <SharedIcon icon={<NotAnsweredIcon />} size='sm' />,
        'not-graded': (
          <SharedIcon className='text-secondary-500' icon={<NewItemIcon />} size='sm' />
        ),
        updated: <SharedIcon className='text-secondary-500' icon={<ItemUpdatedIcon />} size='sm' />,
        accepted: <SharedIcon className='text-success-500' icon={<AcceptedIcon />} size='sm' />,
        'not-accepted': (
          <SharedIcon className='text-danger-500' icon={<RejectedIcon />} size='sm' />
        ),
      }[status]),
    [status]
  );
  const isAssignment = useMemo(() => item.__typename.toLowerCase() === 'assignment', [item]);
  const isConversational = useMemo(
    () => isAssignment || !!studentInput,
    [isAssignment, studentInput]
  );

  const forReview = useMemo(() => ['not-graded', 'updated'].includes(status), [status]);

  const itemClasses = useMemo(
    () =>
      cx(
        'user-student__courses-activity-list__items-list-item',
        'mt-sm hover:rounded-xs hover:!bg-neutral-200 flex px-xs py-sm text-primary-500 text-sm items-center group/item',
        {
          '-for-review': forReview,
        }
      ),
    [forReview]
  );

  const context = useMemo(
    () =>
      isAssignment
        ? {
            type: CONVERSATION_CONTEXT_TYPES.ASSIGNMENT,
            id: item.id,
            title: item.displayName,
          }
        : {
            type: CONVERSATION_CONTEXT_TYPES.CHECK_IN_ANSWER,
            id: item.answer?.id,
            title: item.question,
            subtitle: item.answer?.answer,
          },
    [isAssignment]
  );

  const setGradingItem = () => setItemToGradeByIndex(itemIndex);

  const setupModalWithContext = () => setupMessageModal(context);

  const dropdownItems = useMemo(
    () =>
      [
        {
          Icon: ReviewIcon,
          action: setGradingItem,
          itemTestId: isConversational ? 'review-option' : 'review-button',
          text: t('user.student.coursesActivity.review'),
        },
        {
          Icon: MessagesIcon,
          action: setupModalWithContext,
          itemTestId: 'message-option',
          hidden: !isConversational,
          text: t('messaging.message'),
        },
      ].filter((dropdownItem) => !dropdownItem.hidden),
    []
  );

  const label = `${item.lesson.name}: ${
    item.displayName || t('user.student.coursesActivity.checkIn')
  }`;

  return (
    <li aria-label={label} className={itemClasses} data-testid='activity-lesson-item'>
      <div className='mr-xs'>{icon}</div>
      {label}
      {renderGroupBadge()}
      <span className='user-student__courses-activity-list__list-item-date'>
        <div className='user-student__courses-activity-list__list-item-date-indicator' />
        {studentInput && (
          <Tooltip
            className='whitespace-nowrap'
            message={formatDateTime(studentInput.updatedAt, { withTime: true })}>
            {formatDateTime(studentInput.updatedAt)}
          </Tooltip>
        )}
      </span>
      <DropdownContextMenu
        items={dropdownItems}
        triggerClassName='group-hover/item:!visible hover:!bg-white ml-auto'
      />
    </li>
  );
}

export default UserStudentCoursesActivityItem;
