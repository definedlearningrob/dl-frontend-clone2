import { MockedProvider } from '@apollo/client/testing';
import { waitFor } from '@testing-library/react';

import CourseEdit from '@dc/screens/AdminApp/Course/Edit';
import courseQuery from '@dc/graphql/user/queries/course';
import lessonsQuery from '@dc/graphql/user/queries/lessons';
import pathwaysQuery from '@dc/graphql/user/queries/pathways';
import { PAGING } from '@dc/resources/constants';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

const mocks = [
  {
    request: {
      query: courseQuery,
      variables: {
        id: undefined,
        track: false,
      },
    },
    result: () => ({
      data: {
        course: {
          __typename: 'Course',
          badges: [],
          sharedResource: null,
          description: 'some desc',
          displayName: 'First course display name',
          thumbnailUrl: 'thumbnail-url',
          metadata: {
            alternativeTitles: 'Some titles',
            averageSalary: '50 $',
            jobZone: '1',
            onetCode: 'code',
            outlook: 'bright',
          },
          archivedAt: null,
          id: '1',
          isGlobal: true,
          imageUrl: 'first-image-url',
          lessons: [],
          name: 'First course',
          status: 'draft',
          type: 'Survey',
          pathway: {
            id: '1',
            name: 'some pathway',
          },
          collection: {
            id: '1',
            name: 'Career',
          },
        },
      },
    }),
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
      query: pathwaysQuery,
    },
    result: () => ({
      data: { pathways: [] },
    }),
  },
];

const renderAdminAppCourseEdit = () => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <CourseEdit />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminAppCourseEdit', () => {
  it('renders with returned course data', async () => {
    const { getByTestId } = renderAdminAppCourseEdit();

    await waitFor(() => {
      expect(getByTestId('courses-form')).toBeInTheDocument();
      expect(getByTestId(/courses-name-input/).value).toEqual('First course');
      expect(getByTestId(/courses-displayName-input/).value).toEqual('First course display name');
    });
  });
});
