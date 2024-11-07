import { gql } from '@apollo/client';

export default gql`
  fragment CourseMetadata on Course {
    metadata {
      alternativeTitles
      averageSalary
      jobZone
      onetCode
      outlook
    }
  }
`;

export type TCourseMetaData = {
  alternativeTitles: string | null;
  averageSalary: string | null;
  jobZone: string | null;
  onetCode: string | null;
  outlook: string | null;
};
