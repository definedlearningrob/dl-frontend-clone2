import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';

import { cleanInjection } from '@shared/utils/cleanInjection';

StudentLessonVocabulary.propTypes = {
  vocabularies: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string,
      definition: PropTypes.string,
      id: PropTypes.string,
      term: PropTypes.string,
    })
  ),
};

function StudentLessonVocabulary({ vocabularies }) {
  const generatedUUID = vocabularies[0].__typename + vocabularies[0].id;
  const { t } = useTranslation();

  return (
    <Card
      data-testid='lesson-item-vocabulary'
      id={generatedUUID}
      title={t('student.lesson.items.vocabulary')}>
      {vocabularies.map(({ term, definition, id }) => (
        <div key={id} className='vacabulary-item' data-testid='vocabulary-item'>
          <p className='vacabulary-item__term'>{term}</p>
          <span> - </span>
          <p
            className='vacabulary-item__definition -reset-tree-margins embeded-content'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={cleanInjection(definition)}
          />
        </div>
      ))}
    </Card>
  );
}

export default StudentLessonVocabulary;
