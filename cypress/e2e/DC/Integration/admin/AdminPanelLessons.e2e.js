import '@percy/cypress';

import { adminUserInfo } from '@dc/mocks/adminUserInfo';
import { lessonsUser } from '@dc/mocks/lessonsUser';
import { lessonUser } from '@dc/mocks/lessonUser';
import { checkinsStepsInLesson } from '@dc/mocks/checkinsStepsInLesson';

import { mockResponse } from '../../../../utils/graphql-test-utils';

describe('snapshots | AdminPanelLessons', () => {
  it('should go to admin panel', () => {
    cy.intercept('POST', 'api/users/graphql', (req) => {
      mockResponse(req, 'UserInfo', {
        data: adminUserInfo,
      });

      mockResponse(req, 'Lessons', {
        data: lessonsUser,
      });

      mockResponse(req, 'Lesson', {
        data: lessonUser,
      });

      mockResponse(req, 'CheckinsStepsInLesson', {
        data: checkinsStepsInLesson,
      });

      mockResponse(req, 'CheckinQuestions', {
        data: {
          checkInQuestions: {
            nodesCount: 1,
            pagesCount: 1,
            nodes: [
              {
                archivedAt: false,
                answer: null,
                id: '1',
                question:
                  'Would you consider this career cluster a match for your interests and skills? Why or why not?',
                __typename: 'CheckInQuestion',
              },
            ],
            __typename: 'CheckInQuestionPage',
          },
        },
      });

      mockResponse(req, 'CheckinGroups', {
        data: {
          checkInGroups: {
            nodesCount: 1,
            pagesCount: 1,
            nodes: [
              {
                archivedAt: null,
                displayName: null,
                id: '2',
                name: 'Pathway',
                questions: [
                  {
                    id: '3',
                    question: 'What would you like best about working in this pathway and why?',
                    step: 1,
                    __typename: 'CheckInQuestion',
                  },
                ],
                __typename: 'CheckInGroup',
              },
            ],
            __typename: 'CheckInGroupPage',
          },
        },
      });

      mockResponse(req, 'LessonCourses', {
        data: {
          lesson: {
            courses: [
              {
                id: '1014',
                name: 'Test course 1',
                __typename: 'Course',
              },
            ],
            __typename: 'Lesson',
          },
        },
      });

      mockResponse(req, 'Assignments', {
        data: {
          assignments: {
            nodesCount: 1,
            pagesCount: 1,
            nodes: [
              {
                archivedAt: null,
                assetName: 'test',
                description: '',
                displayName: 'test',
                id: '1',
                rubrics: [
                  {
                    id: '1',
                    name: 'test',
                    description: '',
                    __typename: 'Rubric',
                  },
                ],
                __typename: 'Assignment',
              },
            ],
            __typename: 'AssignmentPage',
          },
        },
      });
    });

    cy.adminLogin();
    cy.visit('/admin/lessons');
    cy.findByTestId('lessons-list-item-name').should('exist');
    cy.percySnapshot('AndminPanelLessons');

    //go to lesson details
    cy.findByTestId('lessons-show-button').click();
    cy.findByTestId('attachment-file-link').should('exist');
    cy.percySnapshot('AdminPanelLessonsDetails');

    //go to edit lesson
    cy.findByRole('button', { name: 'Back' }).click();
    cy.findByRole('button', { name: 'Edit' }).click();
    cy.findByTestId('affected-resources').should('exist');
    cy.percySnapshot('AdminPanelEditLesson');
    cy.findByRole('button', { name: 'Cancel' }).click();

    //create new lesson
    cy.findByTestId('admin-list-new-button').click();
    cy.findByText('New lesson').should('exist');
    cy.percySnapshot('AdminPnaelNewLesson');
  });
});
