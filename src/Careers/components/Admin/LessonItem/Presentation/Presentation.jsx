import { useParams } from 'react-router-dom';

import LessonItemWrapper from '@dc/components/Admin/LessonItem/Wrapper/Wrapper';
import Presentation from '@dc/components/Student/Lesson/ExternalPresentation/ExternalPresentation';
import { EXTERNAL_PRESENTATION_QUERY } from '@dc/graphql/user/queries/externalPresentation';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function AdminLessonItemPresentation() {
  const { id } = useParams();

  return (
    <LessonItemWrapper>
      <SharedDataLoader options={{ variables: { id } }} query={EXTERNAL_PRESENTATION_QUERY}>
        {({ externalPresentation: presentation }) => <Presentation presentation={presentation} />}
      </SharedDataLoader>
    </LessonItemWrapper>
  );
}

export default AdminLessonItemPresentation;
