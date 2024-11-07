import { gql } from '@apollo/client';
import { PresentationTypes } from '@graphql/shared/users/types';

import { TTaskPresentation } from '../queries/taskPresentation';

export default gql`
  mutation UpdatePresentation($input: UpdatePresentationMutationInput!) {
    updatePresentation(input: $input) {
      presentation {
        color
        description
        displayName
        id
        name
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
        }
        status
        transition
        typography
        type
      }
    }
  }
`;

export type UpdatePresentationMutationData = {
  updatePresentation: {
    presentation: TTaskPresentation;
  };
};

export type UpdatePresentationMutationInput = {
  input: {
    id: string;
    displayName?: string;
    name?: string;
    description?: string;
    color?: string;
    typography?: string;
    transition?: string;
    status?: 'DRAFT' | 'PUBLISHED';
    presentationSlides?: {
      slideId: string;
      step: number;
      subslides?: {
        slideId: string;
        step: number;
      }[];
    }[];
    type?: PresentationTypes;
  };
};
