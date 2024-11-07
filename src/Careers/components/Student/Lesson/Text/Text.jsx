/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';

import { cleanInjection } from '@shared/utils/cleanInjection';

StudentLessonText.propTypes = {
  text: PropTypes.shape({
    __typename: PropTypes.string,
    content: PropTypes.string,
    displayName: PropTypes.string,
    id: PropTypes.string,
  }),
};

function StudentLessonText({ text: { __typename, content, displayName, id } }) {
  const generatedUUID = __typename + id;

  return (
    <Card data-testid='lesson-item-text' id={generatedUUID} title={displayName}>
      <div className='text-item'>
        <p
          className='text-item__content embeded-content'
          dangerouslySetInnerHTML={cleanInjection(content)}
        />
      </div>
    </Card>
  );
}

export default StudentLessonText;
