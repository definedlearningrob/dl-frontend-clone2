import { gql, TypedDocumentNode } from '@apollo/client';

import { TagTypes } from '@dc/resources/enums';

export const TAG: TypedDocumentNode<TTagData, TTagVariables> = gql`
  query Tag($id: ID!) {
    tag(id: $id) {
      hasRubricHeadings
      id
      name
      isDefault
      rubricHeadings {
        nodes {
          id
          name
          multiplier
          rubric {
            id
            name
          }
          uuid
        }
        nodesCount
        pagesCount
      }
      type
    }
  }
`;

type TRubric = {
  id: string;
  name: string;
};

type THeading = {
  id: string;
  multiplier: number;
  name: string;
  rubric: TRubric;
};

type TRubricHeading = {
  nodes: THeading[];
  nodesCount: number;
  pagesCount: number;
};

export type TTag = {
  hasRubricHeadings: boolean;
  id: string;
  isDefault: boolean;
  name: string;
  rubricHeadings: TRubricHeading;
  type: TagTypes;
};

export type TTagVariables = {
  id: string;
};

export type TTagData = {
  tag: TTag;
};
