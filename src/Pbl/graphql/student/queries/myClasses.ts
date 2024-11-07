import { gql } from '@apollo/client';

export default gql`
  query StudentMyClasses {
    myClasses {
      name
      uuid
    }
  }
`;

export type TStudentMyClassesData = {
  myClasses: TSchoolClass[];
};

type TSchoolClass = {
  name: string;
  uuid: string;
};
