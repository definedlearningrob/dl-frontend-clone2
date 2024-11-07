import { useParams } from 'react-router-dom';

import LessonItemWrapper from '@dc/components/Admin/LessonItem/Wrapper/Wrapper';
import Video from '@dc/components/Student/Lesson/Video/Video';
import videoQuery from '@dc/graphql/user/queries/video';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function AdminLessonItemVideo() {
  const { id } = useParams();

  return (
    <LessonItemWrapper>
      <SharedDataLoader options={{ variables: { id } }} query={videoQuery}>
        {({ video }) => <Video previewOnly={true} video={video} />}
      </SharedDataLoader>
    </LessonItemWrapper>
  );
}

export default AdminLessonItemVideo;
