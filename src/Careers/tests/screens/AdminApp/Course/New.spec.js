import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CAREER_REVIEW_SURVEY_LESSON } from '@dc/graphql/user/queries/careerReviewSurveyLesson';
import createcourseMutation from '@dc/graphql/user/mutations/createCourse';
import CourseNew from '@dc/screens/AdminApp/Course/New';
import lessonsQuery from '@dc/graphql/user/queries/lessons';
import pathwaysQuery from '@dc/graphql/user/queries/pathways';
import { PAGING } from '@dc/resources/constants';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

let createCourseCalled = false;

const mocks = [
  {
    request: {
      query: CAREER_REVIEW_SURVEY_LESSON,
    },
    result: {
      data: {
        careerReviewSurveyLesson: {
          archivedAt: null,
          id: '1',
          imageUrl: '',
          name: 'First course',
          type: 'career_review_survey',
        },
      },
    },
  },
  {
    request: {
      query: lessonsQuery,
      variables: {
        filter: {},
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
      },
    },
    result: {
      data: {
        lessons: {
          pagesCount: 1,
          nodesCount: 0,
          nodes: [],
        },
      },
    },
  },
  {
    request: {
      query: createcourseMutation,
      variables: {
        input: {},
      },
    },
    result: () => {
      createCourseCalled = true;

      return { data: {} };
    },
  },
  {
    request: {
      query: pathwaysQuery,
    },
    result: () => ({
      data: { pathways: [] },
    }),
  },
];

const renderAdminAppCourseNew = () => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <CourseNew />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminAppCourseNew', () => {
  beforeEach(() => {
    createCourseCalled = false;
  });

  it('renders with empty data', async () => {
    const { container } = renderAdminAppCourseNew();

    const nameInput = await screen.findByRole('textbox', { name: 'Name' });

    expect(nameInput.value).toEqual('');
    expect(container).toMatchSnapshot();
  });

  it('does not call create course mutation when form is not fully filled', async () => {
    renderAdminAppCourseNew();
    const fileToUpload = new File(['hello'], 'hello.png', { type: 'image/png' });

    const saveButton = await screen.findByRole('button', { name: 'Save' });
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(createCourseCalled).toBe(false);
    });

    userEvent.upload(screen.getByTestId(/courses-image-input/), fileToUpload);

    userEvent.click(saveButton);

    await waitFor(() => {
      expect(createCourseCalled).toBe(false);
    });

    await waitFor(async () => {
      fireEvent.keyPress(screen.getByTestId(/courses-name-input/));
    });

    userEvent.click(saveButton);

    await waitFor(() => {
      expect(createCourseCalled).toBe(false);
    });
  });
});
