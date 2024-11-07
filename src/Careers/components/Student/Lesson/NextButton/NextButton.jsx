import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ArrowIcon } from '@shared/svg/arrow_forward.svg';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';

StudentLessonNextButton.propTypes = {
  lessons: PropTypes.arrayOf(
    PropTypes.shape({
      careerReviewSurvey: PropTypes.shape({
        performed: PropTypes.bool,
      }),
      id: PropTypes.string,
      step: PropTypes.number,
    })
  ),
};

function StudentLessonNextButton({ lessons }) {
  const { lessonId, courseId } = useParams();
  const { t } = useTranslation();
  const sortedLessons = [...lessons].sort((a, b) => a.step - b.step);
  const currentLessonStep = sortedLessons.find(({ id }) => id === lessonId)?.step;
  const nextLesson = sortedLessons.find(({ step }) => step > currentLessonStep);

  const backToCourseConfig = {
    text: t('student.lesson.nextButton.backToCourse'),
    path: `/courses/${courseId}`,
  };

  const nextLessonConfig = {
    text: t('student.lesson.nextButton.next'),
    path: `/courses/${courseId}/lessons/${nextLesson?.id}`,
  };

  const surveyConfig = {
    text: t('student.lesson.nextButton.goToSurvey'),
    path: `/courses/${courseId}/lessons/${nextLesson?.id}`,
  };

  const getNextButtonValues = useCallback(() => {
    const isNextLessonSurvey = nextLesson?.careerReviewSurvey;

    if (isNextLessonSurvey) {
      if (!nextLesson) {
        return backToCourseConfig;
      }

      return surveyConfig;
    }
    if (!nextLesson) {
      return backToCourseConfig;
    }

    return nextLessonConfig;
  }, [courseId, lessonId, lessons, t]);

  const { text, path } = getNextButtonValues();

  return (
    <div>
      <Link className='block ml-auto w-fit' to={path}>
        <SharedButton className='lesson__next' size='md' variant='primary'>
          {text}
          <SharedIcon icon={<ArrowIcon />} size='sm' />
        </SharedButton>
      </Link>
    </div>
  );
}

export default StudentLessonNextButton;
