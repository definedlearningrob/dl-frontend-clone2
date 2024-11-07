import { useParams } from 'react-router-dom';

import CoursesEdit from '@dc/components/Admin/Courses/Edit/Edit';
import courseQuery from '@dc/graphql/user/queries/course';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function EditCourse() {
  const { id } = useParams();

  return (
    <SharedMainContent>
      <SharedDataLoader
        options={{ fetchPolicy: 'network-only', variables: { id, track: false } }}
        query={courseQuery}>
        {({ course }) => <CoursesEdit course={course} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default EditCourse;
