import { gql } from '@apollo/client';

import { LESSON_TYPES } from '@dc/resources/constants';

import { type ToStringLiteral } from '@shared/utils/types';

export default gql`
  query CourseTableOfContent($id: ID!, $track: Boolean) {
    course(id: $id, track: $track) {
      content {
        id
        name
        items {
          id
          name
          type
          completed
        }
        checkIns {
          id
          name
          type
          completed
        }
        extensionFields {
          name
          id
        }
        type
        surveyPerformed
      }
    }
  }
`;

export type TCourseTableOfContentData = {
  course: {
    content: TCourseContent[];
  };
};

type TCourseContent = {
  id: string;
  name: string;
  items: TCourseItem[];
  checkIns: TCourseCheckin[];
  extensionFields: TCourseExtensionField[];
  type: ToStringLiteral<typeof LESSON_TYPES>;
  surveyPerformed: boolean | null;
};

type TCourseItem = {
  id: string;
  name: string;
  type: TCourseItemType;
  completed: boolean;
};
type TCourseCheckin = {
  id: string;
  name: string;
  type: TCheckinType;
  completed: boolean;
};

type TCourseExtensionField = {
  id: string;
  name: string;
};

type TCourseItemType =
  | 'Assignment'
  | 'Attachment'
  | 'ExternalPresentation'
  | 'ResearchLink'
  | 'Text'
  | 'Video'
  | 'Vocabulary';

type TCheckinType = 'CheckInGroup' | 'CheckInQuestion';
