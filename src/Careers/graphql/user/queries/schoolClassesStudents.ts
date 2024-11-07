import { gql, TypedDocumentNode } from '@apollo/client';

export const SCHOOL_CLASSES_STUDENTS_QUERY: TypedDocumentNode<TSchoolClassesStudentsData> = gql`
  query SchoolClassesStudents {
    schoolClasses(page: 1, perPage: 1000) {
      nodes {
        uuid
        name
        students(page: 1, perPage: 1000) {
          nodes {
            uuid
            fullName
          }
        }
      }
    }
  }
`;

export type TSchoolClassesStudentsData = {
  schoolClasses: {
    nodes: {
      uuid: string;
      name: string;
      students: {
        nodes: {
          uuid: string;
          fullName: string;
        }[];
      };
    }[];
  };
};
