import { TypedDocumentNode, gql } from '@apollo/client';

import { TInstitution as TBaseInstitution } from '@dc/resources/types';

export const INSTITUTION_PROGRAMS_QUERY: TypedDocumentNode<
  TInstitutionProgramsData,
  TInstitutionProgramsVariables
> = gql`
  query InstitutionPrograms($id: ID!, $page: Int, $perPage: Int, $filter: ProgramFilter) {
    institution(id: $id) {
      id
      programs(page: $page, perPage: $perPage, filter: $filter) {
        nodes {
          title
          degrees
        }
        nodesCount
        pagesCount
      }
    }
  }
`;

export type TInstitutionProgramsVariables = {
  id: string;
  page?: number;
  perPage?: number;
  filter?: TProgramFilter;
  // FE only variable for easier pagination
  infiniteScroll?: boolean;
};

type TProgramFilter = {
  degrees?: ProgramsDegree[];
  title?: string;
};

export enum ProgramsDegree {
  'BACHELORS_DEGREE' = 'BACHELORS_DEGREE',
  'MASTERS_DEGREE' = 'MASTERS_DEGREE',
  'DOCTORS_DEGREE' = 'DOCTORS_DEGREE',
  'CERTIFICATES' = 'CERTIFICATES',
  'ASSOCIATES_DEGREE' = 'ASSOCIATES_DEGREE',
  'POST_BACCALAUREATE_CERTIFICATE' = 'POST_BACCALAUREATE_CERTIFICATE',
}
export type TInstitutionProgramsData = {
  institution: Pick<TBaseInstitution, 'id'> & {
    programs: {
      nodes: TProgram[];
      nodesCount: number;
      pagesCount: number;
    };
  };
};

type TProgram = {
  degrees: string[];
  title: string;
};
