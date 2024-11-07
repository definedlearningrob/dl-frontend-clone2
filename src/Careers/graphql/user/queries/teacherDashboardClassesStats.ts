import { gql, TypedDocumentNode } from '@apollo/client';

export const TEACHER_DASHBOARD: TypedDocumentNode<
  TTeacherDashboardData,
  TTeacherDashboardVariables
> = gql`
  query TeacherDashboardClassesStats($userUuid: ID) {
    teacherDashboard(userUuid: $userUuid) {
      schoolClasses {
        enrolledCoursesCount
        entityName
        finishedAssessmentsCount
        finishedCoursesCount
        gradingNeeded
        isDemo
        schoolClassName
        schoolClassUuid
        settings {
          assessmentType
        }
        studentsCount
      }
      userId
    }
  }
`;

export type TSchoolClassSettings = {
  assessmentType: string;
};

export type TSchoolClass = {
  enrolledCoursesCount: number;
  entityName: string;
  finishedAssessmentsCount: number;
  finishedCoursesCount: number;
  gradingNeeded: boolean;
  isDemo?: boolean;
  schoolClassName: string;
  schoolClassUuid: string;
  settings: TSchoolClassSettings;
  studentsCount: number;
};

export type TTeacherDashboardVariables = {
  userUuid: string;
};

export type TTeacherDashboardData = {
  teacherDashboard: {
    schoolClasses: TSchoolClass[];
    userId: string;
  };
};
