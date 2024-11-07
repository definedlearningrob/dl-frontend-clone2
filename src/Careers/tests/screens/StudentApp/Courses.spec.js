import { MockedProvider } from '@apollo/client/testing';
import { waitFor, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import allCoursesQuery from '@dc/graphql/student/queries/allCourses';
import clustersQuery from '@dc/graphql/shared/queries/clusters';
import currentCoursesQuery from '@dc/graphql/student/queries/currentCourses';
import enrollInCourseMutation from '@dc/graphql/student/mutations/enrollInCourse';
import StudentCourses from '@dc/screens/StudentApp/Courses/Courses';
import { COURSE_TYPES, PUBLISHING_STATUSES } from '@dc/resources/constants';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { COLLECTIONS_QUERY } from '@dc/graphql/shared/queries/collections';

const sampleCurrentCourse = {
  id: '1',
  imageUrl: 'someUrl',
  collection: { id: '1', name: 'Career' },
  thumbnailUrl: 'someThumbnailUrl',
  name: 'Course 1',
  pathway: {
    name: 'Pathway 1',
  },
  progress: {
    total: 5,
    submitted: 0,
  },
  status: PUBLISHING_STATUSES.PUBLISHED,
  type: COURSE_TYPES.HIGH_SCHOOL,
  isEnrolled: true,
  isRecommended: true,
  __typename: 'Course',
};

const sampleCurrentCourse2 = {
  id: '2',
  imageUrl: 'someUrl',
  collection: { id: '1', name: 'Career' },
  thumbnailUrl: 'someThumbnailUrl',
  name: 'Course 2',
  pathway: {
    name: 'Pathway 2',
  },
  progress: {
    total: 5,
    submitted: 2,
  },
  status: PUBLISHING_STATUSES.PUBLISHED,
  type: COURSE_TYPES.HIGH_SCHOOL,
  isEnrolled: true,
  isRecommended: true,
  __typename: 'Course',
};

const sampleCurrentCourse3 = {
  id: '3',
  imageUrl: 'someUrl',
  collection: { id: '1', name: 'Career' },
  thumbnailUrl: 'someThumbnailUrl',
  name: 'Course 3',
  pathway: {
    name: 'Pathway 2',
  },
  progress: {
    total: 5,
    submitted: 5,
  },
  status: PUBLISHING_STATUSES.PUBLISHED,
  type: COURSE_TYPES.HIGH_SCHOOL,
  isEnrolled: true,
  isRecommended: false,
  __typename: 'Course',
};

const sampleAllCourse1 = {
  id: '1',
  imageUrl: 'someUrl',
  thumbnailUrl: 'someThumbnailUrl',
  match: 95,
  name: 'Course 1',
  pathway: {
    name: 'Pathway 1',
  },
  metadata: {
    alternativeTitles: 'Some titles',
    averageSalary: '50 $',
    jobZone: '1',
    onetCode: 'code',
    outlook: 'bright',
  },
  type: COURSE_TYPES.HIGH_SCHOOL,
  collection: {
    id: '1',
    name: 'Career',
  },
  isEnrolled: true,
  isRecommended: true,
  __typename: 'Course',
};

const sampleAllCourse2 = {
  id: '7',
  imageUrl: 'someUrl',
  thumbnailUrl: 'someThumbnailUrl',
  match: 90,
  name: 'Course 7',
  pathway: {
    name: 'Pathway 1',
  },
  metadata: {
    alternativeTitles: 'Some titles',
    averageSalary: '50 $',
    jobZone: '1',
    onetCode: 'code',
    outlook: 'bright',
  },
  type: COURSE_TYPES.HIGH_SCHOOL,
  collection: {
    id: '1',
    name: 'Career',
  },
  isEnrolled: false,
  isRecommended: true,
  __typename: 'Course',
};

const sampleAllCourse3 = {
  id: '8',
  imageUrl: 'someUrl',
  thumbnailUrl: 'someThumbnailUrl',
  match: 85,
  name: 'Course 8',
  pathway: {
    name: 'Pathway 1',
  },
  metadata: {
    alternativeTitles: 'Some titles',
    averageSalary: '50 $',
    jobZone: '1',
    onetCode: 'code',
    outlook: 'bright',
  },
  type: COURSE_TYPES.HIGH_SCHOOL,
  collection: {
    id: '1',
    name: 'Career',
  },
  isEnrolled: false,
  isRecommended: false,
  __typename: 'Course',
};

const defaultMocks = [
  {
    request: {
      query: currentCoursesQuery,
    },
    result: {
      data: {
        currentCourses: [sampleCurrentCourse, sampleCurrentCourse2, sampleCurrentCourse3],
      },
    },
  },
  {
    request: {
      query: allCoursesQuery,
      variables: {
        page: 1,
        perPage: 24,
        filter: { pathwayIdIn: [], collectionIdIn: [], searchableColumnsCont: '' },
        infiniteScroll: true,
      },
    },
    result: {
      data: {
        allCourses: {
          nodes: [sampleAllCourse1, sampleAllCourse2, sampleAllCourse3],
          pagesCount: 1,
        },
      },
    },
  },
  {
    request: { query: clustersQuery },
    result: {
      data: {
        clusters: [
          {
            id: '1',
            name: 'Cluster 1',
            pathways: [
              { id: '1', name: 'Pathway 1' },
              { id: '2', name: 'Pathway 2' },
              { id: '3', name: 'Pathway 3' },
            ],
          },
          {
            id: '2',
            name: 'Cluster 2',
            pathways: [
              { id: '4', name: 'Pathway 4' },
              { id: '5', name: 'Pathway 5' },
              { id: '6', name: 'Pathway 6' },
            ],
          },
          {
            id: '3',
            name: 'Cluster 3',
            pathways: [
              { id: '7', name: 'Pathway 7' },
              { id: '8', name: 'Pathway 8' },
              { id: '9', name: 'Pathway 9' },
            ],
          },
        ],
      },
    },
  },
  {
    request: {
      query: COLLECTIONS_QUERY,
    },
    result: {
      data: {
        collections: [
          {
            id: '1',
            name: 'Career',
          },
          {
            id: '2',
            name: 'Financial Literacy',
          },
          {
            id: '4',
            name: 'Postsecondary Preparation',
          },
          {
            id: '3',
            name: 'Soft Skills',
          },
        ],
      },
    },
  },
  studentInfoMock,
];

const filteredCoursesSpy = jest.fn();

const getFilteredCoursesMock = (filter) => ({
  request: {
    query: allCoursesQuery,
    variables: {
      perPage: 24,
      filter,
      page: 1,
      infiniteScroll: true,
    },
  },
  result: () => {
    filteredCoursesSpy(filter);

    return {
      data: {
        allCourses: {
          nodes: [sampleAllCourse1, sampleAllCourse2, sampleAllCourse3],
          pagesCount: 1,
        },
      },
    };
  },
});

const renderStudentCourses = (mocks) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks || defaultMocks}>
      <UserInfoProvider
        value={{
          userInfo: {
            hasCompletedAssessment: true,
            hasCompletedOnboarding: true,
            settings: {
              assessmentEnabled: true,
              onboardingEnabled: true,
            },
          },
        }}>
        <StudentCourses />
      </UserInfoProvider>
    </MockedProvider>,
    { initialState: { session: { user: { type: 'student' } } } }
  );

describe('StudentAppCourses', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders current list properly with proper progress based on response', async () => {
    const { container } = renderStudentCourses();

    const currentCoursesSectionHeading = await screen.findByText(/Current Career Courses/);

    const currentCoursesSection = currentCoursesSectionHeading.parentElement.parentElement;

    const currentCourses = await within(currentCoursesSection).findAllByLabelText(/Course/);

    expect(currentCourses).toHaveLength(3);

    expect(currentCourses[0]).toHaveTextContent(/Course 1/);
    expect(currentCourses[0]).toHaveTextContent(/Pathway 1/);
    expect(within(currentCourses[0]).getByRole('img')).toHaveAttribute('src', 'someThumbnailUrl');

    expect(currentCourses[1]).toHaveTextContent(/Course 2/);
    expect(currentCourses[1]).toHaveTextContent(/Pathway 2/);
    expect(within(currentCourses[1]).getByRole('img')).toHaveAttribute('src', 'someThumbnailUrl');

    expect(currentCourses[2]).toHaveTextContent(/Course 3/);
    expect(currentCourses[2]).toHaveTextContent(/Pathway 2/);
    expect(within(currentCourses[2]).getByRole('img')).toHaveAttribute('src', 'someThumbnailUrl');

    expect(container).toMatchSnapshot();
  });

  it('renders recommended courses on all courses list', async () => {
    const { container } = renderStudentCourses();

    const allCoursesSectionHeading = await screen.findByRole('heading', {
      name: 'All available courses within Defined Careers',
    });

    const allCoursesSection = allCoursesSectionHeading.parentElement.parentElement;

    const allCourses = await within(allCoursesSection).findAllByLabelText(/Course/);

    expect(allCourses).toHaveLength(3);

    expect(allCourses[0]).toHaveTextContent(/Course 1/);
    expect(allCourses[0]).toHaveTextContent(/Pathway 1/);
    expect(allCourses[0]).toHaveTextContent(/Recommended/);
    expect(allCourses[0]).toHaveTextContent(/95% match/);
    expect(within(allCourses[0]).getByRole('img')).toHaveAttribute('src', 'someThumbnailUrl');

    expect(allCourses[1]).toHaveTextContent(/Course 7/);
    expect(allCourses[1]).toHaveTextContent(/Pathway 1/);
    expect(allCourses[1]).toHaveTextContent(/Recommended/);
    expect(allCourses[1]).toHaveTextContent(/90% match/);
    expect(within(allCourses[1]).getByRole('img')).toHaveAttribute('src', 'someThumbnailUrl');

    expect(allCourses[2]).toHaveTextContent(/Course 8/);
    expect(allCourses[2]).toHaveTextContent(/Pathway 1/);
    expect(allCourses[2]).toHaveTextContent(/85% match/);
    expect(within(allCourses[2]).getByRole('img')).toHaveAttribute('src', 'someThumbnailUrl');

    expect(container).toMatchSnapshot();
  });

  it('calls enroll in course mutation on modal enroll click for recommended courses with refetches', async () => {
    const spy = jest.fn();

    const mocks = [
      ...defaultMocks,
      {
        request: {
          query: enrollInCourseMutation,
          variables: { input: { courseId: '7' } },
        },
        result: () => {
          spy();

          return {
            data: {
              enrollInCourse: {
                course: {
                  id: '7',
                  name: 'Course 7',
                  imageUrl: 'someUrl',
                  progress: {
                    submitted: 2,
                    total: 5,
                  },
                  status: 'ok',
                  pathway: {
                    name: 'test',
                  },
                },
              },
            },
          };
        },
      },
    ];
    renderStudentCourses(mocks);

    const allCoursesSectionHeading = await screen.findByRole('heading', {
      name: 'All available courses within Defined Careers',
    });

    const allCoursesSection = allCoursesSectionHeading.parentElement.parentElement;

    const courseToEnroll = await within(allCoursesSection).findByRole('button', {
      name: 'Course 7',
    });

    userEvent.click(courseToEnroll);

    userEvent.click(screen.getByTestId(/enroll-in-course/));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('all courses', () => {
    it('calls query with all list proper filter', async () => {
      const filterMock = getFilteredCoursesMock({
        searchableColumnsCont: 'fancy',
        pathwayIdIn: [],
        collectionIdIn: [],
      });

      // Not sure why there was need to pass 2 times this particular mock
      const mocks = [...defaultMocks, filterMock, filterMock];

      renderStudentCourses(mocks);

      const searchInput = await screen.findByRole('textbox', { name: 'Search:' });
      userEvent.paste(searchInput, 'fancy');

      await waitFor(() => {
        expect(filteredCoursesSpy).toHaveBeenCalledTimes(1);
        expect(filteredCoursesSpy).toHaveBeenCalledWith({
          searchableColumnsCont: 'fancy',
          pathwayIdIn: [],
          collectionIdIn: [],
        });
      });
    });

    it('selects pathways properly and call query with proper ids', async () => {
      const filterMock = getFilteredCoursesMock({
        pathwayIdIn: ['1', '2', '3', '5', '6', '9'],
        collectionIdIn: [],
        searchableColumnsCont: '',
      });

      const mocks = [...defaultMocks, filterMock, filterMock];

      renderStudentCourses(mocks);

      const clustersSelect = await screen.findByTestId('clusters-select');
      const clustersSelectInput = await screen.findByRole('combobox', {
        name: 'Cluster and pathway: Show All',
      });

      userEvent.click(clustersSelectInput);
      userEvent.click(within(clustersSelect).getByText('Cluster 1'));
      userEvent.click(within(clustersSelect).getByText('Cluster 2'));

      const expandButtons = within(clustersSelect).getAllByRole('button', { name: 'Expand' });
      userEvent.click(expandButtons[1]);

      // deselecting option
      userEvent.click(within(clustersSelect).getByText('Pathway 4'));

      userEvent.click(expandButtons[2]);
      userEvent.click(within(clustersSelect).getByText('Pathway 9'));

      await waitFor(() => {
        expect(filteredCoursesSpy).toHaveBeenCalledTimes(1);
        expect(filteredCoursesSpy).toHaveBeenCalledWith({
          pathwayIdIn: ['1', '2', '3', '5', '6', '9'],
          collectionIdIn: [],
          searchableColumnsCont: '',
        });
      });
    });

    it('resets course filters properly', async () => {
      const mocks = [
        ...defaultMocks,
        getFilteredCoursesMock({
          pathwayIdIn: [],
          collectionIdIn: [],
          searchableColumnsCont: 'fancy',
        }),
        getFilteredCoursesMock({
          pathwayIdIn: ['1', '2', '3'],
          collectionIdIn: [],
          searchableColumnsCont: 'fancy',
        }),
        getFilteredCoursesMock({ pathwayIdIn: [], collectionIdIn: [], searchableColumnsCont: '' }),
      ];

      renderStudentCourses(mocks);

      const searchInput = await screen.findByRole('textbox', { name: 'Search:' });
      userEvent.paste(searchInput, 'fancy');

      const clustersSelect = await screen.findByTestId('clusters-select');
      const clustersSelectInput = await screen.findByRole('combobox', {
        name: 'Cluster and pathway: Show All',
      });

      userEvent.click(clustersSelectInput);
      userEvent.click(within(clustersSelect).getByText('Cluster 1'));

      filteredCoursesSpy.mockClear();

      const clearFiltersButton = screen.getByRole('button', { name: 'Clear all' });
      userEvent.click(clearFiltersButton);

      await waitFor(() => {
        expect(filteredCoursesSpy).toHaveBeenCalledTimes(1);
        expect(filteredCoursesSpy).toHaveBeenCalledWith({
          pathwayIdIn: [],
          collectionIdIn: [],
          searchableColumnsCont: '',
        });
      });
    });

    it('shows enroll modal on enroll in course click and close on close', async () => {
      const { getByTestId, queryByTestId } = renderStudentCourses();

      const allCoursesSectionHeading = await screen.findByRole('heading', {
        name: 'All available courses within Defined Careers',
      });

      const allCoursesSection = allCoursesSectionHeading.parentElement.parentElement;

      const courseToEnroll = await within(allCoursesSection).findByRole('button', {
        name: 'Course 7',
      });

      userEvent.click(courseToEnroll);

      await waitFor(() => {
        expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
      });

      userEvent.click(getByTestId(/close-modal/));

      await waitFor(() => {
        expect(queryByTestId(/course-modal/)).not.toBeInTheDocument();
      });
    });

    it('calls enroll in course mutation on modal enroll click', async () => {
      const spy = jest.fn();

      const mocks = [
        ...defaultMocks,
        {
          request: {
            query: enrollInCourseMutation,
            variables: { input: { courseId: '7' } },
          },
          result: () => {
            spy();

            return {
              data: {
                enrollInCourse: {
                  course: {
                    id: '7',
                    name: 'Course 4',
                    imageUrl: 'someUrl',
                    progress: {
                      submitted: 2,
                      total: 5,
                    },
                    status: 'ok',
                    pathway: {
                      name: 'test',
                    },
                  },
                },
              },
            };
          },
        },
      ];

      renderStudentCourses(mocks);

      const allCoursesSectionHeading = await screen.findByRole('heading', {
        name: 'All available courses within Defined Careers',
      });

      const allCoursesSection = allCoursesSectionHeading.parentElement.parentElement;

      const courseToEnroll = await within(allCoursesSection).findByRole('button', {
        name: 'Course 7',
      });

      userEvent.click(courseToEnroll);

      userEvent.click(screen.getByTestId(/enroll-in-course/));

      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
