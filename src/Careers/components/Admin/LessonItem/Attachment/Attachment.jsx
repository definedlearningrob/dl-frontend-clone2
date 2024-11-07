import { useParams } from 'react-router-dom';

import Attachment from '@dc/components/Student/Lesson/Attachment/Attachment';
import attachmentQuery from '@dc/graphql/user/queries/attachment';
import LessonItemWrapper from '@dc/components/Admin/LessonItem/Wrapper/Wrapper';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function AdminLessonItemAttachment() {
  const { id } = useParams();

  return (
    <LessonItemWrapper>
      <SharedDataLoader options={{ variables: { id } }} query={attachmentQuery}>
        {({ attachment }) => <Attachment attachment={attachment} previewOnly={true} />}
      </SharedDataLoader>
    </LessonItemWrapper>
  );
}

export default AdminLessonItemAttachment;
