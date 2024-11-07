import { useParams } from 'react-router-dom';

import GET_STUDENT_LESSON_EXTENSION_FIELDS, {
  type TLessonExtensionsData,
  type TLessonEtensionsVariables,
  type TLessonExtensionsLesson,
} from '@dc/graphql/student/queries/lessonExtensions';
import GET_USER_LESSON_EXTENSION_FIELDS, {
  type TUserLessonExtensionsData,
  type TUserLessonEtensionsVariables,
} from '@dc/graphql/user/queries/lessonExtensions';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

import ExtensionFieldItem from './ExtensionFieldItem/ExtensionFieldItem';

const LessonExtensionFields = () => {
  const { lessonId, courseId } = useParams<{ lessonId: string; courseId: string | undefined }>();

  const isUserPage = courseId === undefined;

  const renderExtensionFields = (lesson: TLessonExtensionsLesson) =>
    lesson.extensionFields.map((extensionField, index) => (
      <ExtensionFieldItem key={index} extensionField={extensionField} isUser={isUserPage} />
    ));

  const renderProperDataLoader = () =>
    isUserPage ? (
      <SharedDataLoader<TUserLessonExtensionsData, TUserLessonEtensionsVariables>
        options={{
          variables: {
            lessonId,
          },
        }}
        query={GET_USER_LESSON_EXTENSION_FIELDS}>
        {({ lesson }) => renderExtensionFields(lesson)}
      </SharedDataLoader>
    ) : (
      <SharedDataLoader<TLessonExtensionsData, TLessonEtensionsVariables>
        options={{
          variables: {
            lessonId,
            courseId,
            track: false,
          },
        }}
        query={GET_STUDENT_LESSON_EXTENSION_FIELDS}>
        {({ course: { lesson } }) => renderExtensionFields(lesson)}
      </SharedDataLoader>
    );

  return renderProperDataLoader();
};

export default LessonExtensionFields;
