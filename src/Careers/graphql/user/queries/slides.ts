import { gql } from '@apollo/client';

import { TCheckInGroup, TCheckInQuestion, TProduct } from '@pbl/components/Project/types';

import { TTaskPresentationImageStyle } from './taskPresentation';

export default gql`
  query Slides {
    slides(perPage: 100) {
      nodes {
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
        slideBackgroundImages {
          id
          thumbnailUrl
          url
        }
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
        }
        template
      }
    }
  }
`;

export type TSlideTemplate =
  | 'basicText'
  | 'title'
  | 'imageText'
  | 'iframe'
  | 'video'
  | 'twoProductChoice'
  | 'threeProductChoice'
  | 'product'
  | 'fourProductChoice'
  | 'fiveProductChoice'
  | 'checkInQuestion'
  | 'checkInGroup';

export type TSlideContentVideo = {
  contentId: string;
  id: string;
  url?: string;
  videoUrl?: string;
  filename?: string;
};
export type TSlideContentImage = {
  contentId: string;
  id: string;
  url: string;
  style: TTaskPresentationImageStyle;
  thumbnailUrl: string;
};

export type TSlideContentLink = {
  contentId: string;
  targetId: string;
  targetName: string;
  text: string;
};

export type TSlideContentText = {
  type: 'text' | 'header';
  contentId: string;
  value: string;
  style: string;
};

export type TSlideContent = {
  id: string;
  images: TSlideContentImage[];
  links: TSlideContentLink[];
  texts: TSlideContentText[];
  videos: TSlideContentVideo[];
};

export type TSlideBackgroundImage = {
  id: string;
  thumbnailUrl: string;
  url: string;
};

export type TSlide = {
  backgroundColor: string;
  backgroundImage: string;
  content: TSlideContent;
  slideBackgroundImages: TSlideBackgroundImage[];
  description: string;
  id: string;
  iframeUrl: string;
  isShared: boolean;
  name: string;
  notes: string;
  step: number;
  template: TSlideTemplate;
  subslides: TSlide[];
  products: TProduct[];
  checkInQuestions: TCheckInQuestion[];
  checkInGroups: TCheckInGroup[];
};

export type TSlidesData = {
  slides: {
    nodes: TSlide[];
  };
};
