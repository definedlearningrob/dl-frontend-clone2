import { gql, TypedDocumentNode } from '@apollo/client';

import { COST_RANGES, INSTITUTION_TYPES, SIZE_TYPES, US_STATES } from '@dc/resources/enums';
import { TInstitution as TBaseInstitution } from '@dc/resources/types';

export const INSTITUTIONS_QUERY: TypedDocumentNode<TInstitutionsData, TInstitutionsVariables> = gql`
  query StudentInstitutions(
    $page: Int
    $perPage: Int
    $filter: StudentInstitutionFilter
    $track: Boolean
  ) {
    institutions(page: $page, perPage: $perPage, filter: $filter, track: $track) {
      nodes {
        type
        sizeType
        sizeDescription
        cost
        commonAppEnabled
        thumbnailUrl
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

export type TInstitution = Pick<
  TBaseInstitution,
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
  filter?: StudentInstitutionFilter;
  track?: boolean;
};

export type StudentInstitutionFilter = {
  searchableColumnsCont?: string;
  typeIn?: (keyof typeof INSTITUTION_TYPES)[];
  stateIn?: (keyof typeof US_STATES)[];
  sizeTypeIn?: (keyof typeof SIZE_TYPES)[];
  costRange?: (keyof typeof COST_RANGES)[];
};
