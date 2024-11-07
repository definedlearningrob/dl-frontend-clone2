import { useParams } from 'react-router-dom';

import LessonItemWrapper from '@dc/components/Admin/LessonItem/Wrapper/Wrapper';
import Vocabulary from '@dc/components/Student/Lesson/Vocabulary/Vocabulary';
import vocabularyQuery from '@dc/graphql/user/queries/vocabulary';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

function AdminLessonItemVocabulary() {
  const { id } = useParams();

  return (
    <LessonItemWrapper>
      <SharedDataLoader options={{ variables: { id } }} query={vocabularyQuery}>
        {({ vocabulary }) => <Vocabulary vocabularies={[vocabulary]} />}
      </SharedDataLoader>
    </LessonItemWrapper>
  );
}

export default AdminLessonItemVocabulary;
