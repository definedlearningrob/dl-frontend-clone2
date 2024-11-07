import { gql } from '@apollo/client';

export default gql`
  query LessonInCourseExtensions($courseId: ID!, $lessonId: ID!, $track: Boolean) {
    course(id: $courseId) {
      id
      lesson(id: $lessonId, track: $track) {
        extensionFields {
          description
          files {
            id
            filename
            url(options: { responseContentDisposition: "attachment" })
          }
          id
          imageUrl
          links {
            name
            url
          }
          name
        }
      }
    }
  }
`;

export type TLessonExtensionsData = {
  course: {
    id: string;
    lesson: TLessonExtensionsLesson;
  };
};

export type TLessonEtensionsVariables = {
  courseId: string;
  lessonId: string;
  track: boolean;
};

export type TLessonExtensionsLesson = {
  extensionFields: TLessonsExtensionField[];
};

export type TLessonsExtensionField = {
  description: string;
  files: {
    id: string;
    filename: string;
    url: string;
  }[];
  id: string;
  imageUrl: string;
  links: {
    name: string;
    url: string;
  }[];
  name: string;
  __typename: string;
};
