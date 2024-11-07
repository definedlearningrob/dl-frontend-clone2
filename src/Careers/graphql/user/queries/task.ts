import { gql } from '@apollo/client';

import { ContentStatusesTypes } from '@shared/resources/enums';

export default gql`
  query Task($id: ID!) {
    task(id: $id) {
      badges {
        id
        name
        imageUrl
      }
      archivedAt
      checkInQuestions {
        id
        question
        step
      }
      courses {
        name
        id
      }
      checkInGroups {
        displayName
        id
        name
        questions {
          id
          question
          step
        }
        step
      }
      description
      displayName
      id
      imageUrl
      introduction
      name
      presentationUrl
      pathways {
        id
        name
      }
      standard
      status
      studentResources
      teachingResources
      thumbnailUrl
      files {
        description
        displayName
        filename
        id
        step
        task {
          id
        }
        url
      }
      products {
        id
        name
        displayName
        description
        rubricsUrl
        status
        step
        owner {
          uuid
          name
        }
      }
      presentation {
        id
        status
      }
    }
  }
`;

export type TTaskProduct = {
  id: string;
  name: string;
  displayName: string;
  description: string;
  rubricsUrl: string;
  status: ContentStatusesTypes;
  step: number;
};

export type TTaskFile = {
  description: string;
  displayName: string;
  filename: string;
  id: string;
  step: number;
  task: {
    id: string;
  };
  url: string;
};

export type TTaskCheckInGroupQuestion = {
  id: string;
  question: string;
  step: number;
};

export type TTaskCheckInGroup = {
  displayName: string;
  id: string;
  name: string;
  questions: TTaskCheckInGroupQuestion[];
  step: number;
};

export type TTaskCheckInQuestion = {
  id: string;
  question: string;
  step: number;
};

export type TTaskPresentation = {
  id: string;
};

export type TTaskPathway = {
  id: string;
  name: string;
};

export type TTask = {
  badges: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
  archivedAt: string;
  checkInQuestions: TTaskCheckInQuestion[];
  checkInGroups: TTaskCheckInGroup[];
  description: string;
  displayName: string;
  id: string;
  imageUrl: string;
  introduction: string;
  name: string;
  presentationUrl: string;
  pathways: TTaskPathway[];
  standard: string;
  status: ContentStatusesTypes;
  studentResources: string;
  teachingResources: string;
  thumbnailUrl: string;
  files: TTaskFile[];
  presentation: TTaskPresentation;
  products: TTaskProduct[];
};

export type TTaskVariables = {
  id: string;
};

export type TTaskData = {
  task: TTask;
};
