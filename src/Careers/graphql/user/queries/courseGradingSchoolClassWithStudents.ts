import { gql } from '@apollo/client';

export default gql(`
  query CourseGradingSchoolClassWithStudents($uuid: ID!, $courseId: ID!) {
    schoolClass(uuid: $uuid) {
      gradingNeededStudents: studentsEnrolledInCourse(courseId: $courseId, gradingNeeded: true) {
        nodes {
          course(id: $courseId) {
            id,
            name
          },
          firstName,
          lastName,
          settings {
            assessmentType {
              value
            }
          },
          uuid
        }
      },
      name,
      parentName,
      uuid,
      withoutGradingNeededStudents: studentsEnrolledInCourse(courseId: $courseId, gradingNeeded: false) {
        nodes {
          course(id: $courseId) {
            id,
            name
          },
          firstName,
          lastName,
          settings {
            assessmentType {
              value
            }
          },
          uuid
        }
      }
    }
  }
`);
