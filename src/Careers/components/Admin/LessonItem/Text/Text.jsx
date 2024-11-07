import { useParams } from 'react-router-dom';

import LessonItemWrapper from '@dc/components/Admin/LessonItem/Wrapper/Wrapper';
import Text from '@dc/components/Student/Lesson/Text/Text';
import textQuery from '@dc/graphql/user/queries/text';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function AdminLessonItemText() {
  const { id } = useParams();

  return (
    <LessonItemWrapper>
      <SharedDataLoader options={{ variables: { id } }} query={textQuery}>
        {({ text }) => <Text text={text} />}
      </SharedDataLoader>
    </LessonItemWrapper>
  );
}

export default AdminLessonItemText;
