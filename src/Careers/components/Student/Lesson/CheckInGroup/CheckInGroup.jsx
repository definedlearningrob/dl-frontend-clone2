import PropTypes from 'prop-types';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';

import QuestionItem from './QuestionItem/QuestionItem';

StudentLessonCheckInGroup.propTypes = {
  checkInGroup: PropTypes.shape({
    __typename: PropTypes.string,
    displayName: PropTypes.string,
    id: PropTypes.string,
    questions: PropTypes.array,
    step: PropTypes.number,
  }),
  previewOnly: PropTypes.bool,
};

function StudentLessonCheckInGroup({
  checkInGroup: { displayName, questions, __typename, id },
  previewOnly,
}) {
  return (
    <Card
      className='student-check-in-question'
      data-testid='lesson-item-check-in-question'
      id={__typename + id}
      title={displayName}>
      {questions.map((question) => (
        <QuestionItem key={question.id} checkInQuestion={question} previewOnly={previewOnly} />
      ))}
    </Card>
  );
}

export default StudentLessonCheckInGroup;
