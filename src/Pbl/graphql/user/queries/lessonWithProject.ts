import { gql } from '@apollo/client';

import ProjectData from '@pbl/graphql/user/fragments/projectFragment';

import { TProject } from './project';

export default gql`
  query LessonWithProject(
    $lessonId: ID!
    $projectId: ID!
    $track: Boolean
    $trackPresentation: Boolean
  ) {
    lesson: unit(id: $lessonId) {
      displayName
      id
      project: task(id: $projectId, track: $track) {
        ...ProjectData
      }
      thumbnailUrl
    }
  }
  ${ProjectData}
`;

export type TLessonWithProjectVariables = {
  lessonId: string;
  projectId: string;
  track?: boolean;
  trackPresentation: boolean;
};

export type TLessonWithProjectData = {
  lesson: TLesson;
};

export type TUnit = {
  displayName: string;
  id: string;
};

export type TLesson = {
  displayName: string;
  id: string;
  project: TProject;
  thumbnailUrl: string;
};
