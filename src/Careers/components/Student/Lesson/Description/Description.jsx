import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';
import { LESSON_TYPES, LESSON_DESCRIPTION_TYPES } from '@dc/resources/constants';

import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

StudentLessonDescription.propTypes = {
  lesson: PropTypes.shape({
    description: PropTypes.shape({
      audience: PropTypes.string,
      goal: PropTypes.string,
      introduction: PropTypes.string,
      role: PropTypes.string,
      situation: PropTypes.string,
    }),
    hasPresentation: PropTypes.bool,
    type: PropTypes.string,
  }),
};

function StudentLessonDescription({
  lesson: {
    description: { audience, goal, introduction, role, situation },
    hasPresentation,
    type,
  },
}) {
  const { t } = useTranslation();

  if (hasPresentation || type !== LESSON_TYPES.PROJECT.toLowerCase()) return null;

  const descriptions = [
    { type: LESSON_DESCRIPTION_TYPES.INTRODUCTION, content: introduction },
    { type: LESSON_DESCRIPTION_TYPES.GOAL, content: goal },
    { type: LESSON_DESCRIPTION_TYPES.ROLE, content: role },
    { type: LESSON_DESCRIPTION_TYPES.AUDIENCE, content: audience },
    { type: LESSON_DESCRIPTION_TYPES.SITUATION, content: situation },
  ];

  const hasNoDescription = !audience && !goal && !introduction && !role && !situation;
  const renderDescriptionItem = (type, content) => (
    <div key={type} className='mb-sm xxxl:mb-base last-of-type:mb-0'>
      <h5 className='text-sm xxxl:text-base mb-xs xxxl:mb-sm leading-base'>
        {t(`student.lesson.description.${type}`)}
      </h5>
      <InjectedContent className='text-xs xxxl:text-sm leading-lg' content={content} />
    </div>
  );

  if (hasNoDescription)
    return (
      <Card id='intro'>
        {renderDescriptionItem(
          LESSON_DESCRIPTION_TYPES.INTRODUCTION,
          t(`student.lesson.description.missing`)
        )}
      </Card>
    );

  const descriptionItems = descriptions.map(({ type, content }) => {
    if (!content) {
      return null;
    }

    return renderDescriptionItem(type, content);
  });

  return <Card id='intro'>{descriptionItems}</Card>;
}

export default StudentLessonDescription;
