import { gql } from '@apollo/client';
import { PresentationTypes } from '@graphql/dc/shared/types';

import {
  TCheckInGroup,
  TCheckInQuestion,
  TDefinedCareer,
  TProduct,
} from '@pbl/components/Project/types';
import checkInQuestionFragment from '@pbl/graphql/student/fragments/checkInQuestion';

import { ContentStatusesTypes } from '@shared/resources/enums';

export default gql`
  fragment ProjectFragmentData on Task {
    assignedAt
    checkInGroups {
      displayName
      id
      name
      questions {
        ...CheckInQuestion
      }
      step
    }
    checkInQuestions {
      ...CheckInQuestion
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
      type
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
          step
          submission {
            canSubmit
            createdAt
            id
            name
            productId
            status
            updatedAt
            grade {
              createdAt
              id
              pointsAvailable
              pointsScored
              updatedAt
              lastGradedBy {
                firstName
                lastName
                uuid
                fullName
              }
              results {
                criteriaId
                trait
              }
            }
            files {
              createdAt
              filename
              googleWeblink
              id
              source
              url
              submitter {
                email
                firstName
                fullName
                lastName
                username
                uuid
              }
            }
          }
          rubrics {
            description
            displayName
            hasAlignedStatements
            id
            name
            uuid
            criteriaLabels {
              displayName
              id
              score
              uuid
            }
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
          }
        }
        checkInQuestions {
          id
          question
          answer {
            answer
            createdAt
            id
            name
            updatedAt
            grade {
              createdAt
              id
              status
              updatedAt
              lastGradedBy {
                email
                firstName
                fullName
                lastName
                name
                username
                uuid
                owner {
                  email
                  name
                  username
                  uuid
                }
              }
            }
          }
          step
          teamSubmission {
            canSubmit
            id
            name
            answers {
              answer
              id
              updatedAt
              student {
                email
                firstName
                fullName
                gradYear
                lastName
                name
                sisId
                username
                uuid
              }
            }
            grade {
              createdAt
              id
              status
              updatedAt
              lastGradedBy {
                email
                firstName
                fullName
                lastName
                name
                username
                uuid
              }
            }
          }
        }
        checkInGroups {
          id
          name
          displayName
          questions {
            id
            question
            step
            answer {
              answer
              createdAt
              id
              name
              updatedAt
              grade {
                createdAt
                id
                status
                updatedAt
                lastGradedBy {
                  email
                  firstName
                  fullName
                  lastName
                  name
                  username
                  uuid
                }
              }
            }
            teamSubmission {
              canSubmit
              id
              name
              answers {
                answer
                id
                updatedAt
                student {
                  email
                  firstName
                  fullName
                  gradYear
                  lastName
                  name
                  sisId
                  username
                  uuid
                }
              }
              grade {
                createdAt
                id
                status
                updatedAt
                lastGradedBy {
                  email
                  firstName
                  fullName
                  lastName
                  name
                  username
                  uuid
                }
              }
            }
          }
        }
      }
      status
      transition
      typography
    }
    presentationUrl
    standard
    studentResources
    units {
      displayName
      id
    }
  }
  ${checkInQuestionFragment}
`;

export type TTeam = {
  id: string;
  uuid: string;
  name: string;
};

export type TProject = {
  assignedAt: string | null;
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
  team?: TTeam;
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
  type: PresentationTypes;
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
  filename: string;
  step: string;
};
