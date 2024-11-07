import { gql } from '@apollo/client';
import { PresentationTypes } from '@graphql/shared/shared/types';

import {
  TCheckInGroup,
  TCheckInQuestion,
  TDefinedCareer,
  TProduct,
} from '@pbl/components/Project/types';

import { ContentStatusesTypes } from '@shared/resources/enums';

export default gql`
  query PublicProject($shareId: ID!, $code: String!, $trackPresentation: Boolean) {
    project: task(shareId: $shareId, code: $code, track: true) {
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
      checkInQuestions {
        id
        question
        step
      }
      courses {
        id
        name
        thumbnailUrl
        pathwayName
      }
      description
      displayName
      files {
        description
        displayName
        filename
        id
        step
        url
      }
      id
      introduction
      presentation(track: $trackPresentation) {
        color
        description
        displayName
        id
        name
        slides {
          backgroundColor
          backgroundImage
          checkInQuestions {
            id
            question
            step
          }
          checkInGroups {
            displayName
            id
            name
            step
            questions {
              id
              question
              step
            }
          }
          content {
            id
            images {
              contentId
              id
              url
              style
              thumbnailUrl
              position
            }
            links {
              targetId
              targetName
              text
              contentId
            }
            texts {
              contentId
              type
              value
              style
            }
            videos {
              id
              contentId
              url
              filename
              videoUrl
            }
          }
          description
          id
          iframeUrl
          name
          notes
          step
          template
          subslides {
            backgroundColor
            backgroundImage
            content {
              id
              images {
                contentId
                id
                url
                style
                position
              }
              links {
                targetId
                targetName
                text
                contentId
              }
              texts {
                contentId
                type
                value
                style
              }
              videos {
                id
                contentId
                url
                filename
                videoUrl
              }
            }
            description
            id
            iframeUrl
            name
            notes
            step
            template
          }
          products {
            description
            displayName
            id
            name
            rubricsUrl
            rubrics {
              description
              displayName
              id
              name
              uuid
              criterias {
                id
                rubricCriteriaLabelId
                rubricHeadingId
                text
                uuid
              }
              headings {
                id
                multiplier
                name
                uuid
              }
              criteriaLabels {
                displayName
                id
                score
                uuid
              }
            }
            step
          }
        }

        status
        transition
        typography
        type
      }
      presentationUrl
      standard
      studentResources
      teachingResources
      units {
        displayName
        id
      }
    }
  }
`;

export type TProject = {
  checkInGroups: TCheckInGroup[];
  checkInQuestions: TCheckInQuestion[];
  courses: TDefinedCareer[];
  description: string;
  displayName: string;
  files: TFile[];
  id: string;
  introduction: string;
  presentation: TProjectPresentation;
  presentationUrl: string;
  standard: string;
  studentResources: string;
  teachingResources: string;
  units: TUnit[];
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
  checkInQuestions: TCheckInQuestion[];
  checkInGroups: TCheckInGroup[];
  products: TProduct[];
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

export type TUnit = {
  displayName: string;
  id: string;
};

export type TFile = {
  description: string;
  displayName: string;
  id: string;
  url: string;
  step: string;
  filename: string;
};

export type TProjectData = {
  project: TProject;
};

export type TProjectVariables = {
  trackPresentation: boolean;
  shareId: string;
  code: string;
};
