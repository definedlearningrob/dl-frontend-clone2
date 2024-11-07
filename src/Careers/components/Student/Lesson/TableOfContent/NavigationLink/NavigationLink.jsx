import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PROGRESS_STATUS } from '@dc/components/Student/Lesson/TableOfContent/TableOfContent.jsx';

import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';

const LESSON_ITEM_TYPE_TRANSLATIONS = {
  ASSIGNMENT: 'assignment',
  ATTACHMENT: 'attachment',
  CAREERREVIEWSURVEY: 'careerReviewSurvey',
  CHECKINQUESTION: 'checkInQuestion',
  EXTERNALPRESENTATION: 'externalPresentation',
  RESEARCHLINK: 'reseachLink',
  TEXT: 'text',
  VIDEO: 'video',
  VOCABULARY: 'vocabulary',
  INTRO: 'intro',
};

StudentLessonTableOfContentNavigationLink.propTypes = {
  courseProgress: PropTypes.shape({
    submitted: PropTypes.number,
    total: PropTypes.number,
  }),
  displayName: PropTypes.string,
  isLastItem: PropTypes.bool,
  isSurveyEnabled: PropTypes.bool,
  status: PropTypes.oneOf(['not_started', 'inactive', 'done']),
  to: PropTypes.object,
  typename: PropTypes.string,
};

function StudentLessonTableOfContentNavigationLink({
  displayName,
  isLastItem,
  status,
  to,
  typename,
}) {
  const { t } = useTranslation();

  const navigationLinkClasses = cx('table-of-content-navigation-link');

  const iconWrapperClasses = cx('table-of-content-navigation-link__icon-wrapper', {
    '-inactive': status === PROGRESS_STATUS.INACTIVE,
    '-without-connector-line': isLastItem,
  });

  const navItemText =
    displayName ||
    t(`course.tableOfContent.items.${LESSON_ITEM_TYPE_TRANSLATIONS[typename.toUpperCase()]}`);

  return (
    <Link
      className={navigationLinkClasses}
      data-testid={`lesson-item-link-${LESSON_ITEM_TYPE_TRANSLATIONS[typename.toUpperCase()]}`}
      to={to}>
      <div className={iconWrapperClasses}>{status === PROGRESS_STATUS.DONE && <DoneIcon />}</div>
      <span className='table-of-content-navigation-link__title'>{navItemText}</span>
    </Link>
  );
}

export default StudentLessonTableOfContentNavigationLink;
