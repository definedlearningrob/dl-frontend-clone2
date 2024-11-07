import { gql } from '@apollo/client';

import { CHECK_IN_ITEM_TYPES } from '@pbl/resources/enums';

import { TTaskPresentationSlide } from '../queries/taskPresentation';

export default gql`
  mutation UpdateSlide($input: UpdateSlideMutationInput!) {
    updateSlide(input: $input) {
      slide {
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
            videoUrl
          }
        }
        description
        id
        iframeUrl
        isShared
        name
        notes
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
              thumbnailUrl
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
        }
        template
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
        }
        products {
          id
          description
          displayName
          id
          name
        }
      }
    }
  }
`;

export type UpdateSlideMutationInput = {
  input: {
    id: string;
    name?: string;
    template?: string;
    description?: string;
    notes?: string;
    iframeUrl?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    isShared?: boolean;
    textItems?: {
      contentId: string;
      type: string;
      value: string;
      style: string;
    }[];
    links?: {
      targetId: string;
      targetName: string;
      text: string;
      contentId: string;
    }[];
    subslides?: {
      slideId: string;
      step: number;
    }[];
    checkInItems?: { itemId: string; itemType: CHECK_IN_ITEM_TYPES; step?: number }[];
    products?: {
      id: string;
      step?: string;
    }[];
  };
};

export type UpdateSlideMutationData = {
  updateSlide: {
    slide: TTaskPresentationSlide;
  };
};
