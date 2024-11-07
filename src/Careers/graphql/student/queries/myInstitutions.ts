import { gql, TypedDocumentNode } from '@apollo/client';

import { TInstitution as TMyBaseInstitution } from '@dc/resources/types';

export const MY_INSTITUTIONS_QUERY: TypedDocumentNode<TMyInstitutionsData> = gql`
  query MyInstitutions($page: Int, $perPage: Int) {
    myInstitutions(page: $page, perPage: $perPage) {
      nodes {
        type
        sizeType
        sizeDescription
        cost
        thumbnailUrl
        commonAppEnabled
        id
        isFavorite
        imageUrl
        name
        address {
          city
          stateCode
        }
      }
      pagesCount
    }
  }
`;

export type TMyInstitution = Pick<
  TMyBaseInstitution,
  | 'type'
  | 'sizeType'
  | 'sizeDescription'
  | 'cost'
  | 'thumbnailUrl'
  | 'id'
  | 'isFavorite'
  | 'imageUrl'
  | 'commonAppEnabled'
  | 'name'
> & { address: Pick<TMyBaseInstitution['address'], 'city' | 'stateCode'> };

export type TMyInstitutionsData = {
  myInstitutions: {
    nodes: TMyInstitution[];
    pageCount: number;
  };
};
