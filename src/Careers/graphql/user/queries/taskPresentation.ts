import { gql } from '@apollo/client';
import { PresentationTypes } from '@graphql/shared/shared/types';

import { TCheckInGroup, TCheckInQuestion, TProduct } from '@pbl/components/Project/types';

import { ContentStatusesTypes } from '@shared/resources/enums';

export default gql`
  query TaskPresentation($id: ID!) {
    task(id: $id) {
      id
      presentation {
        color
        description
        displayName
        id
        name
        slideBackgroundImages {
          id
          thumbnailUrl
          url
        }
        slides {
          backgroundColor
          backgroundImage
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
          isShared
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
            isShared
            iframeUrl
            name
            notes
            step
            template
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
          checkInQuestions {
            id
            question
            step
          }
          products {
            description
            displayName
            id
            name
            rubricsUrl
            rubrics {
              canEdit
              description
              displayName
              hasAlignedStatements
              id
              name
              pointsAvailable
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
    }
  }
`;

export type TTaskPresentationSlideTemplate =
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

export type TTaskPresentationSlideTransition =
  | 'none'
  | 'fade'
  | 'slide'
  | 'convex'
  | 'concave'
  | 'zoom';

export type TTaskPresentationImageStyle = 'fill' | 'contain';

export type TTaskPresentationImagePosition = 'center' | 'left' | 'right';

export type TTaskPresentationTypography = 'lora' | 'roboto' | 'cabinSketch' | 'montserrat';

export type TTaskPresentationVideo = {
  contentId: string;
  id: string;
  url?: string;
  videoUrl?: string;
  filename?: string;
};

export type TTaskPresentationImage = {
  contentId: string;
  id: string;
  url: string;
  style: TTaskPresentationImageStyle;
  thumbnailUrl: string;
  position?: TTaskPresentationImagePosition;
};

export type TTaskPresentationLink = {
  contentId: string;
  targetId: string;
  targetName: string;
  text: string;
};

export type TTaskPresentationText = {
  type: 'text' | 'header';
  contentId: string;
  value: string;
  style: string;
};

export type TTaskPresentationSlideContent = {
  id: string;
  images: TTaskPresentationImage[];
  links: TTaskPresentationLink[];
  texts: TTaskPresentationText[];
  videos: TTaskPresentationVideo[];
};

export type TTaskPresentationSlide = {
  backgroundColor: string;
  backgroundImage: string;
  content: TTaskPresentationSlideContent;
  description: string;
  id: string;
  iframeUrl: string;
  isShared: boolean;
  name: string;
  notes: string;
  step: number;
  template: TTaskPresentationSlideTemplate;
  subslides: TTaskPresentationSlide[];
  products: TProduct[];
  checkInQuestions: TCheckInQuestion[];
  checkInGroups: TCheckInGroup[];
};

export type TSlideBackgroundImage = {
  id: string;
  thumbnailUrl: string;
  url: string;
};

export type TTaskPresentation = {
  color: string;
  description: string;
  displayName: string;
  id: string;
  name: string;
  slideBackgroundImages: TSlideBackgroundImage[];
  status: ContentStatusesTypes;
  slides: TTaskPresentationSlide[];
  transition: TTaskPresentationSlideTransition;
  typography: TTaskPresentationTypography;
  type: PresentationTypes;
};

export type TTask = {
  id: string;
  presentation: TTaskPresentation;
};

export type TTaskPresentationVariables = {
  id: string;
};

export type TTaskPresentationData = {
  task: TTask;
};
