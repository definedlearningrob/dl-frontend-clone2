/* eslint-disable react/no-danger */
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';
import createStudentItemMutation from '@dc/graphql/student/mutations/createStudentItem';
import { LESSON_ITEM_TYPES } from '@dc/resources/constants';

import { cleanInjection } from '@shared/utils/cleanInjection';

StudentLessonVideo.propTypes = {
  previewOnly: PropTypes.string,
  video: PropTypes.shape({
    __typename: PropTypes.string,
    description: PropTypes.string,
    displayName: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.string,
    url: PropTypes.string,
  }),
};

function StudentLessonVideo({
  video: { __typename, description, displayName, id, url },
  previewOnly,
}) {
  const generatedUUID = __typename + id;
  const [createItem] = useMutation(createStudentItemMutation, {
    variables: {
      input: {
        itemId: id,
        itemType: LESSON_ITEM_TYPES.VIDEO,
      },
    },
  });

  return (
    <Card data-testid='lesson-item-video' id={generatedUUID} title={displayName}>
      <div className='video-item'>
        <p
          className='video-item__description -reset-tree-margins embeded-content'
          dangerouslySetInnerHTML={cleanInjection(description)}
        />
        <div className='video-item__player-wrapper'>
          <ReactPlayer
            className='video-item__player'
            controls={true}
            url={url}
            onEnded={!previewOnly ? createItem : () => {}}
          />
        </div>
      </div>
    </Card>
  );
}

export default StudentLessonVideo;
