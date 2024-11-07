import { gql, TypedDocumentNode } from '@apollo/client';

import { TInstitution as TBaseInstitution } from '@dc/resources/types';
import { COST_RANGES, INSTITUTION_TYPES, SIZE_TYPES, US_STATES } from '@dc/resources/enums';

export const USER_INSTITUTIONS_QUERY: TypedDocumentNode<
  TInstitutionsData,
  TInstitutionsVariables
> = gql`
  query UserInstitutions($page: Int, $perPage: Int, $filter: UserInstitutionFilter) {
    institutions(page: $page, perPage: $perPage, filter: $filter) {
      nodes {
        type
        sizeType
        sizeDescription
        commonAppEnabled
        cost
        thumbnailUrl
        id
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

export type TInstitution = Pick<
  TBaseInstitution,
  | 'type'
  | 'sizeType'
  | 'sizeDescription'
  | 'cost'
  | 'thumbnailUrl'
  | 'id'
  | 'isFavorite'
  | 'commonAppEnabled'
  | 'imageUrl'
  | 'name'
> & {
  address: Pick<TBaseInstitution['address'], 'city' | 'stateCode'>;
};

export type TInstitutionsData = {
  institutions: {
    nodes: TInstitution[];
    pagesCount: number;
  };
};

export type TInstitutionsVariables = {
  page?: number;
  perPage?: number;
  filter?: UserInstitutionFilter;
};

export type UserInstitutionFilter = {
  searchableColumnsCont?: string;
  stateIn?: (keyof typeof US_STATES)[];
  typeIn?: (keyof typeof INSTITUTION_TYPES)[];
  sizeTypeIn?: (keyof typeof SIZE_TYPES)[];
  costRange?: (keyof typeof COST_RANGES)[];
};
