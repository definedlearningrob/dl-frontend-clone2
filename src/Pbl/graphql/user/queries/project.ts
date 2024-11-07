import { gql } from '@apollo/client';
import { PresentationTypes } from '@graphql/dc/shared/types';

import ProjectData from '@pbl/graphql/user/fragments/projectFragment';
import { TASK_STATUS } from '@pbl/resources/enums';
import {
  TCheckInGroup,
  TCheckInQuestion,
  TDefinedCareer,
  TProduct,
} from '@pbl/components/Project/types';

import { ContentStatusesTypes } from '@shared/resources/enums';

export default gql`
  query UserProject($id: ID!, $code: String, $track: Boolean, $trackPresentation: Boolean) {
    project: task(id: $id, code: $code, track: $track) {
      ...ProjectData
    }
  }
  ${ProjectData}
`;

export type TProjectData = {
  project: TProject;
};

export type TProjectVariables = {
  code?: string;
  id: string;
  track?: boolean;
  trackPresentation: boolean;
};

export type TProject = {
  assignedStudentsCount: number;
  checkInGroups: TCheckInGroup[];
  checkInQuestions: TCheckInQuestion[];
  checkInsGradingNeededCount: number;
  copies: TProjectCopy[];
  courses: TDefinedCareer[];
  description: string;
  displayName: string;
  files: TFile[];
  id: string;
  introduction: string;
  owner: {
    uuid: string;
  };
  presentation: TProjectPresentation;
  presentationUrl: string;
  sharedResource: TSharedResource;
  status: TASK_STATUS;
  standard: string;
  studentResources: string;
  submissionsGradingNeededCount: number;
  teachingResources: string;
  units: TUnit[];
  thumbnailUrl: string;
};

export type TUnit = {
  displayName: string;
  id: string;
};

export type TSharedResource = {
  allowLogin: boolean;
  code: string;
};

export type TFile = {
  description: string;
  displayName: string;
  filename: string;
  id: string;
  step: string;
  url: string;
};

type TProjectCopy = {
  id: string;
};

export type TProjectPresentationSlideTemplate =
  | 'basicText'
  | 'title'
  | 'imageText'
  | 'iframe'
  | 'video'
  | 'twoProductChoice'
  | 'threeProductChoice'
  | 'fourProductChoice'
  | 'fiveProductChoice'
  | 'product'
  | 'checkInQuestion'
  | 'checkInGroup';

export type TProjectPresentationSlideTransition =
  | 'none'
  | 'fade'
  | 'slide'
  | 'convex'
  | 'concave'
  | 'zoom';

export type TProjectPresentationImageStyle = 'fill' | 'contain';
export type TTaskPresentationImagePosition = 'center' | 'left' | 'right';
export type TProjectPresentationTypography = 'lora' | 'roboto' | 'cabinSketch' | 'montserrat';

export type TProjectPresentationVideo = {
  contentId: string;
  id: string;
  url?: string;
  videoUrl?: string;
  filename?: string;
};
export type TProjectPresentationImage = {
  contentId: string;
  id: string;
  url: string;
  style: TProjectPresentationImageStyle;
  thumbnailUrl: string;
  position?: TTaskPresentationImagePosition;
};

export type TProjectPresentationLink = {
  contentId: string;
  targetId: string;
  targetName: string;
  text: string;
};

export type TProjectPresentationText = {
  type: 'text' | 'header';
  contentId: string;
  value: string;
  style: string;
};

export type TProjectPresentationSlideContent = {
  id: string;
  images: TProjectPresentationImage[];
  links: TProjectPresentationLink[];
  texts: TProjectPresentationText[];
  videos: TProjectPresentationVideo[];
};

export type TProjectPresentationSlide = {
  backgroundColor: string;
  backgroundImage: string;
  content: TProjectPresentationSlideContent;
  description: string;
  id: string;
  iframeUrl: string;
  isShared: boolean;
  name: string;
  notes: string;
  step: number;
  template: TProjectPresentationSlideTemplate;
  subslides: TProjectPresentationSlide[];
  products: TProduct[];
  checkInQuestions: TCheckInQuestion[];
  checkInGroups: TCheckInGroup[];
};

export type TSlideBackgroundImage = {
  id: string;
  thumbnailUrl: string;
  url: string;
};

export type TProjectPresentation = {
  color: string;
  description: string;
  displayName: string;
  id: string;
  name: string;
  slideBackgroundImages: TSlideBackgroundImage[];
  status: ContentStatusesTypes;
  slides: TProjectPresentationSlide[];
  transition: TProjectPresentationSlideTransition;
  typography: TProjectPresentationTypography;
  type: PresentationTypes;
};
