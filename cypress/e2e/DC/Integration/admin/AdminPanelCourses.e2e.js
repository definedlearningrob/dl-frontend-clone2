import '@percy/cypress';

import { adminUserInfo } from '@dc/mocks/adminUserInfo';
import { lessonsUser } from '@dc/mocks/lessonsUser';
import { lessonUser } from '@dc/mocks/lessonUser';
import { checkinsStepsInLesson } from '@dc/mocks/checkinsStepsInLesson';

import { mockResponse } from '../../../../utils/graphql-test-utils';

describe('snapshots | AdminPanelCourses', () => {
  it('should go to admin panel', () => {
    cy.intercept('POST', 'api/users/graphql', (req) => {
      mockResponse(req, 'UserInfo', {
        data: adminUserInfo,
      });

      mockResponse(req, 'Courses', {
        data: {
          courses: {
            nodesCount: 2,
            pagesCount: 1,
            nodes: [
              {
                metadata: {
                  alternativeTitles: '',
                  averageSalary: '123',
                  jobZone: null,
                  onetCode: '',
                  outlook: '',
                  __typename: 'CourseMetadata',
                },
                archivedAt: null,
                id: '111',
                description: '',
                imageUrl: '',
                lessons: [
                  {
                    id: '1',
                    imageUrl: '',
                    name: 'first lesson',
                    step: 1,
                    type: 'career',
                    __typename: 'Lesson',
                  },
                ],
                name: 'first course',
                pathway: {
                  id: '1',
                  name: 'systems',
                  __typename: 'Pathway',
                },
                status: 'PUBLISHED',
                thumbnailUrl: '',
                type: 'DEFAULT',
                __typename: 'Course',
              },
            ],
            __typename: 'CoursePage',
          },
        },
      });

      mockResponse(req, 'CareerReviewSurveyLesson', {
        data: {
          careerReviewSurveyLesson: {
            archivedAt: null,
            id: '1',
            imageUrl: '',
            name: 'Career Review Survey',
            type: 'careers',
            __typename: 'SurveyLesson',
          },
        },
      });

      mockResponse(req, 'Pathways', {
        data: {
          pathways: [
            {
              id: '1',
              name: 'career',
              __typename: 'Pathways',
            },
          ],
        },
      });

      mockResponse(req, 'Lessons', {
        data: lessonsUser,
      });

      mockResponse(req, 'Course', {
        data: {
          course: {
            description: '',
            id: '1',
            imageUrl: '',
            thumbnailUrl: '',
            lessons: [
              {
                id: '1',
                imageUrl: '',
                name: 'First Lesson',
                step: 1,
                thumbnailUrl: '',
                type: 'pathway',
                __typename: 'Lesson',
              },
            ],
            metadata: {
              alternativeTitles: '',
              averageSalary: '',
              jobZone: null,
              onetCode: '',
              outlook: '',
              __typename: 'CourseMetadata',
            },
            name: 'Test Course',
            status: 'PUBLISHED',
            pathway: {
              id: '1',
              name: 'career',
              __typename: 'Pathway',
            },
            type: 'DEFAULT',
            __typename: 'Course',
          },
        },
      });

      mockResponse(req, 'Lesson', {
        data: lessonUser,
      });

      mockResponse(req, 'CheckinsStepsInLesson', {
        data: checkinsStepsInLesson,
      });
    });

    cy.adminLogin();
    cy.visit('/admin/courses');

    //go to list of courses
    cy.percySnapshot('AdminPanelCourses');

    //showing course details
    cy.findByTestId('button').should('exist');
    cy.percySnapshot('AdminPanelCourseDetails');
    cy.findByText('Show').click();
    cy.findByText('Show').click();
    cy.findByText('Overview').should('exist');
    cy.findByText('Research Link').should('exist');
    cy.percySnapshot('AdminPanelLessonDetails');
    cy.findByRole('button', { name: 'Back' }).click();
    cy.findByRole('button', { name: 'Back' }).click();
  });
});
