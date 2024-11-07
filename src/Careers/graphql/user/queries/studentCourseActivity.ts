import { gql, TypedDocumentNode } from '@apollo/client';

export const STUDENT_COURSE_ACTIVITY: TypedDocumentNode<
  TStudentCourseActivityData,
  TStudentCourseActivityVariables
> = gql`
  query StudentCourseActivity($uuid: ID!, $courseId: ID!) {
    student(uuid: $uuid) {
      uuid
      course(id: $courseId) {
        id
        lessons {
          id
          step
          name
          assignments {
            id
            step
            description
            displayName
            submission {
              id
              files {
                id
                attachmentUrl: url(options: { responseContentDisposition: "attachment" })
                previewUrl: url
                filename
              }
              rubricGrade {
                pointsAvailable
                pointsScored
                lastGradedBy {
                  uuid
                  firstName
                  lastName
                }
                results {
                  criteriaId
                  trait
                }
                updatedAt
              }
              grade: acceptanceGrade {
                id
                lastGradedBy {
                  uuid
                  firstName
                  lastName
                }
                updatedAt
                status
              }
              updatedAt
            }
            rubrics {
              pointsAvailable
              criteriaLabels {
                displayName
                id
                score
              }
              criterias {
                id
                rubricCriteriaLabelId
                rubricHeadingId
                text
              }
              description
              headings {
                id
                multiplier
                name
              }
              id
              name
              description
            }
          }
          checkInQuestions {
            id
            answer {
              id
              grade {
                id
                lastGradedBy {
                  uuid
                  firstName
                  lastName
                }
                updatedAt
                status
              }
              updatedAt
              answer
            }
            question
            step
          }
          checkInGroups {
            displayName
            id
            questions {
              answer {
                id
                grade {
                  id
                  lastGradedBy {
                    uuid
                    firstName
                    lastName
                  }
                  updatedAt
                  status
                }
                updatedAt
                answer
              }
              id
              question
              step
            }
            step
          }
        }
      }
    }
  }
`;

type TLastGradedBy = {
  uuid: string;
  firstName: string;
  lastName: string;
};

type TFile = {
  id: string;
  attachmentUrl: string;
  previewUrl: string;
  filename: string;
};

export type TRubricGrade = {
  pointsAvailable: number;
  pointsScored: number;
  lastGradedBy: TLastGradedBy;
  updatedAt: string;
  results: TRubricResult[];
};

export type TGrade = {
  id: string;
  lastGradedBy: TLastGradedBy;
  updatedAt: string;
  status: string;
};

export type TSubmission = {
  id: string;
  files: TFile[];
  rubricGrade: TRubricGrade;
  grade: TGrade;
  updatedAt: string;
};

type TRubricCriteriaLabel = {
  displayName: string;
  id: string;
  score: number;
};

type TCriteria = {
  id: string;
  rubricCriteriaLabelId: string;
  rubricHeadingId: string;
  text: string;
};

type THeading = {
  id: string;
  multiplier: number;
  name: string;
};

type TRubric = {
  pointsAvailable: number;
  criteriaLabels: TRubricCriteriaLabel[];
  criterias: TCriteria[];
  description: string;
  headings: THeading[];
  id: string;
  name: string;
};

export type TRubricResult = {
  criteriaId: string;
  trait?: string;
};

type TAnswer = {
  id: string;
  grade: TGrade;
  updatedAt: string;
  answer: string;
};

type TCheckInQuestion = {
  id: string;
  answer: TAnswer;
  question: string;
  step: number;
};

type TQuestion = {
  answer: TAnswer;
  id: string;
  question: string;
  step: number;
};

type TCheckInGroup = {
  displayName: string;
  id: string;
  questions: TQuestion[];
  step: number;
};

type TAssignment = {
  id: string;
  step: number;
  description: string;
  displayName: string;
  submission: TSubmission;
  rubrics: TRubric[];
};

type TLesson = {
  id: string;
  step: number;
  name: string;
  assignments: TAssignment[];
  checkInQuestions: TCheckInQuestion[];
  checkInGroups: TCheckInGroup[];
};

type TCourse = {
  id: string;
  lessons: TLesson[];
};

type TStudent = {
  uuid: string;
  course: TCourse;
};

export type TStudentCourseActivityData = {
  student: TStudent;
};

export type TStudentCourseActivityVariables = {
  uuid: string;
  courseId: string;
};
