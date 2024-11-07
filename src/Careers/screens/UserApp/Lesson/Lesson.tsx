import { useEffect } from 'react';
import { useParams } from 'react-router';

import Lesson from '@dc/components/User/Lesson/Lesson';
import lessonQuery, { TLessonData, TLessonVariables } from '@dc/graphql/user/queries/lesson';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function UserAppLesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedDataLoader<TLessonData, TLessonVariables>
      options={{
        fetchPolicy: 'network-only',
        variables: {
          id: lessonId,
          track: true,
        },
      }}
      query={lessonQuery}>
      {({ lesson }) => <Lesson lesson={lesson} />}
    </SharedDataLoader>
  );
}

export default UserAppLesson;
