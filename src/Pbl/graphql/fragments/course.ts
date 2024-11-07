import { gql } from '@apollo/client';

export default gql`
  fragment CourseDetails on Course {
    thumbnailUrl
    name
    pathwayName
    onetData {
      code
      title
      alsoCalled
      whatTheyDo
      education
      onTheJob
      education
      personality {
        title
        elements
      }
      jobOutlook {
        salaryMedian
        outlook {
          category
          description
        }
        brightOutlook {
          category
          description
        }
      }
      knowledge {
        title
        elements
      }
      skills {
        title
        elements
      }
      abilities {
        title
        elements
      }
      technology {
        title
        elements
      }
      alignedCourses {
        id
        name
      }
    }
  }
`;

export type TCourseData = {
  exploreMoreAvailable?: boolean;
  thumbnailUrl: string;
  name: string;
  pathwayName: string;
  onetData: TCourseOnetData | null;
};

export type TListWithTitle = {
  title: string;
  elements: string[] | null;
};

export type TCourseOnetData = {
  code: string;
  title: string;
  whatTheyDo: string;
  education: string[];
  alsoCalled: string[];
  onTheJob: string[];
  knowledge: TListWithTitle[];
  skills: TListWithTitle[];
  abilities: TListWithTitle[];
  personality: TListWithTitle | null;
  technology: TListWithTitle[];
  jobOutlook: TJobOutlookData | null;
  alignedCourses: TAlignedCoursesData;
};

export type TJobOutlookData = {
  outlook: {
    description: string;
    category: string;
  };
  brightOutlook: {
    description: string;
    category: string[];
  } | null;
  salaryMedian: number;
};

export type TAlignedCoursesData = {
  id: string;
  name: string;
}[];
