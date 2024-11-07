import cx from 'classnames';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ReactComponent as Previous } from '@dc/svg/previous.svg';

import SharedButton from '@shared/components/Button/Button';

StudentLessonTableOfContentNavigationButton.propTypes = {
  direction: PropTypes.oneOf(['previous', 'next']),
  lessons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      step: PropTypes.number,
    })
  ),
};

function StudentLessonTableOfContentNavigationButton({ direction, lessons }) {
  const [isDisabled, setDisabled] = useState(false);
  const [location, setLocation] = useState(null);
  const { lessonId, courseId } = useParams();
  const history = useHistory();
  const { t } = useTranslation();

  const buttonClasses = cx('table-of-content-nav-button', { '-next': direction === 'next' });

  useEffect(() => {
    direction === 'next' ? getNextAction() : getPreviousAction();
  }, [direction]);

  const getNextAction = useCallback(() => {
    const currentLessonStep = lessons.findIndex(({ id }) => id === lessonId);
    const nextLesson = lessons.find((_, index) => index > currentLessonStep);
    const isSurveyPerformed = nextLesson?.surveyPerformed;

    if (!nextLesson || isSurveyPerformed) return setDisabled(true);

    setLocation(`/courses/${courseId}/lessons/${nextLesson.id}`);
  }, [courseId, lessonId, lessons]);

  const getPreviousAction = useCallback(() => {
    const currentLessonStep = lessons.findIndex(({ id }) => id === lessonId);
    const previousLesson = lessons.find((_, index) => index === currentLessonStep - 1);

    if (!previousLesson) return setDisabled(true);

    setLocation(`/courses/${courseId}/lessons/${previousLesson.id}`);
  }, [courseId, lessonId, lessons]);

  const handleAction = () => history.push(location);

  return (
    <SharedButton
      className={buttonClasses}
      data-testid={`${direction}-button`}
      disabled={isDisabled}
      icon={<Previous />}
      variant='primary-outlined'
      onClick={handleAction}>
      {t(`course.tableOfContent.${direction}`)}
    </SharedButton>
  );
}

export default StudentLessonTableOfContentNavigationButton;
