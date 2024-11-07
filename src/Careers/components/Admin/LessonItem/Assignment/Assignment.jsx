import { useParams } from 'react-router-dom';

import Assignment from '@dc/components/Student/Lesson/Assignment/Assignment';
import { ASSIGNMENT_QUERY } from '@dc/graphql/user/queries/assignment';
import LessonItemWrapper from '@dc/components/Admin/LessonItem/Wrapper/Wrapper';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function AdminLessonItemAssignment() {
  const { id } = useParams();

  return (
    <LessonItemWrapper>
      <SharedDataLoader options={{ variables: { id } }} query={ASSIGNMENT_QUERY}>
        {({ assignment }) => <Assignment assignment={assignment} previewOnly={true} />}
      </SharedDataLoader>
    </LessonItemWrapper>
  );
}

export default AdminLessonItemAssignment;
