import { gql } from '@apollo/client';

import courseMetadataFragment from '@dc/graphql/fragments/courseMetadata';
import { EducationalSettingTypes } from '@dc/resources/enums';
import { TSharedResource } from '@dc/graphql/user/mutations/shareResource';
import { TCollection } from '@dc/resources/types';

import { ContentStatusesTypes } from '@shared/resources/enums';

export default gql`
  query UserCourse($id: ID!, $track: Boolean) {
    course(id: $id, track: $track) {
      description
      displayName
      badges {
        id
        imageUrl
        name
      }
      id
      imageUrl
      isGlobal
      thumbnailUrl
      lessons {
        id
        imageUrl
        name
        step
        thumbnailUrl
        type
      }
      name
      sharedResource {
        allowLogin
        code
      }
      status
      pathway {
        id
        name
      }
      type
      collection {
        id
        name
      }
      ...CourseMetadata
    }
  }
  ${courseMetadataFragment}
`;

export type TCourseLesson = {
  id: string;
  imageUrl: string;
  name: string;
  step: number;
  thumbnailUrl: string;
  type: string;
};

export type TCoursePathway = {
  id: string;
  name: string;
};

export type TCourse = {
  description: string;
  displayName: string;
  id: string;
  imageUrl: string;
  isGlobal: boolean;
  thumbnailUrl: string;
  lessons: TCourseLesson[];
  name: string;
  status: ContentStatusesTypes;
  pathway: TCoursePathway;
  type: EducationalSettingTypes;
  sharedResource: TSharedResource;
  collection: TCollection;
};

export type TCourseVariables = {
  id: string;
  track: boolean;
};

export type TCourseData = {
  course: TCourse;
};
