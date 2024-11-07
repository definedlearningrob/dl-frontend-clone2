import { gql } from '@apollo/client';

export default gql`
  query LessonExtensions($lessonId: ID!, $track: Boolean) {
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
`;

export type TUserLessonExtensionsData = {
  lesson: TUserLessonExtensionsLesson;
};

export type TUserLessonEtensionsVariables = {
  lessonId: string;
  track?: boolean;
};

export type TUserLessonExtensionsLesson = {
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
