import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, screen, within } from '@testing-library/react';
import { InMemoryCache } from '@apollo/client';
import userEvent from '@testing-library/user-event';

import allCoursesQuery from '@dc/graphql/user/queries/studentAllCourses';
import assignStudentToCourseMutation from '@dc/graphql/user/mutations/assignStudentToCourse';
import clustersQuery from '@dc/graphql/shared/queries/clusters';
import currentCoursesQuery from '@dc/graphql/user/queries/studentCurrentCourses';
import StudentCourses from '@dc/screens/UserApp/StudentCourses/StudentCourses';
import { COURSE_TYPES, PUBLISHING_STATUSES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { COLLECTIONS_QUERY } from '@dc/graphql/shared/queries/collections';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const getCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          student: {
            merge: true,
          },
        },
      },
      Student: {
        keyFields: ['uuid'],
      },
    },
  });

const sampleCurrentCourse = {
  id: '1',
  imageUrl: 'someUrl',
  thumbnailUrl: 'someUrl',
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
  isRecommended: true,
  isEnrolled: true,
  __typename: 'Course',
};

const sampleCurrentCourse2 = {
  id: '2',
  imageUrl: 'someUrl',
  thumbnailUrl: 'someUrl',
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
  isRecommended: true,
  isEnrolled: true,
  __typename: 'Course',
};

const sampleCurrentCourse3 = {
  id: '3',
  imageUrl: 'someUrl',
  thumbnailUrl: 'someUrl',
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
  isRecommended: false,
  isEnrolled: true,
  __typename: 'Course',
};

const sampleAllCourse1 = {
  id: '1',
  imageUrl: 'someUrl',
  thumbnailUrl: 'someUrl',
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
  isRecommended: true,
  isEnrolled: true,
  __typename: 'Course',
};

const sampleAllCourse2 = {
  id: '7',
  imageUrl: 'someUrl',
  thumbnailUrl: 'someUrl',
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
  isRecommended: true,
  isEnrolled: false,
  __typename: 'Course',
};

const sampleAllCourse3 = {
  id: '8',
  imageUrl: 'someUrl',
  thumbnailUrl: 'someUrl',
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
  isRecommended: true,
  isEnrolled: false,
  __typename: 'Course',
};

const defaultMocks = [
  {
    request: {
      query: currentCoursesQuery,
      variables: { uuid: undefined },
    },
    result: {
      data: {
        student: {
          uuid: '1',
          assessmentCompleted: true,
          currentCourses: [sampleCurrentCourse, sampleCurrentCourse2, sampleCurrentCourse3],
        },
      },
    },
  },
  {
    request: {
      query: allCoursesQuery,
      variables: {
        page: 1,
        perPage: 24,
        filter: { pathwayIdIn: [], collectionIdIn: [], typeEq: null, searchableColumnsCont: '' },
        infiniteScroll: true,
      },
    },
    result: {
      data: {
        student: {
          uuid: '1',
          assessmentCompleted: true,
          allCourses: {
            nodes: [sampleAllCourse1, sampleAllCourse2, sampleAllCourse3],
            pagesCount: 1,
          },
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
  userInfoMock,
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
      uuid: undefined,
    },
  },
  result: () => {
    filteredCoursesSpy(filter);

    return {
      data: {
        student: {
          uuid: '1',
          assessmentCompleted: true,
          allCourses: {
            nodes: [sampleAllCourse1, sampleAllCourse2],
            pagesCount: 1,
          },
        },
      },
    };
  },
});

const renderStudentCourses = (mocks) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={getCache()} mocks={mocks || defaultMocks}>
      <UserInfoProvider value={{ userInfo: { settings: {} } }}>
        <NavigationContextProvider>
          <StudentCourses />
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    {
      initialState: { session: { loginError: {}, user: { type: 'user' } } },
    }
  );

describe('UserAppStudentCourses', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders current courses list properly', async () => {
    const { container } = renderStudentCourses();

    const currentCoursesSectionHeading = await screen.findByRole('heading', {
      name: /Current Career Courses/,
    });

    const currentCoursesSection = currentCoursesSectionHeading.parentElement;

    const currentCourses = await within(currentCoursesSection).findAllByRole('button', {
      name: /Course/,
    });

    expect(currentCourses).toHaveLength(3);
    expect(currentCourses[0]).toHaveTextContent(/Pathway 1/);
    expect(currentCourses[0]).toHaveTextContent('Course 1');

    expect(currentCourses[1]).toHaveTextContent(/Pathway 2/);
    expect(currentCourses[1]).toHaveTextContent('Course 2');

    expect(currentCourses[2]).toHaveTextContent(/Pathway 2/);
    expect(currentCourses[2]).toHaveTextContent('Course 3');

    expect(container).toMatchSnapshot();
  });

  it('renders recommended courses list properly on all courses list', async () => {
    renderStudentCourses();

    const allAvailableSectionHeading = await screen.findByRole('heading', {
      name: /All available courses within Defined Careers/,
    });

    const allAvailableSection = allAvailableSectionHeading.parentElement.parentElement;

    const recommendedCourses = await within(allAvailableSection).findAllByLabelText(/Course/);

    expect(recommendedCourses).toHaveLength(3);
    expect(recommendedCourses[0]).toHaveTextContent(/Course 1/);
    expect(recommendedCourses[0]).toHaveTextContent(/Recommended/);
    expect(recommendedCourses[0]).toHaveTextContent(/95% match/);

    expect(recommendedCourses[1]).toHaveTextContent(/Course 7/);
    expect(recommendedCourses[1]).toHaveTextContent(/Recommended/);
    expect(recommendedCourses[1]).toHaveTextContent(/90% match/);

    expect(recommendedCourses[2]).toHaveTextContent(/Course 8/);
    expect(recommendedCourses[2]).toHaveTextContent(/Recommended/);
    expect(recommendedCourses[2]).toHaveTextContent(/85% match/);
  });

  it('calls assign to course mutation on modal invite click for recommended courses', async () => {
    const spy = jest.fn();

    const mocks = [
      ...defaultMocks,
      {
        request: {
          query: assignStudentToCourseMutation,
          variables: { input: { courseId: '8', studentUuid: undefined } },
        },
        result: () => {
          spy();

          return {
            data: {
              assignStudentToCourse: {
                course: {
                  id: '4',
                  imageUrl: '',
                  name: '',
                  progress: {
                    submitted: true,
                    total: 2,
                  },
                  status: 'ACTIVE',
                  pathway: {
                    name: '',
                  },
                },
              },
            },
          };
        },
      },
    ];
    renderStudentCourses(mocks);

    const allAvailableSectionHeading = await screen.findByRole('heading', {
      name: /All available courses within Defined Careers/,
    });

    const allAvailableSection = allAvailableSectionHeading.parentElement.parentElement;

    const enrollButtons = await within(allAvailableSection).findAllByRole('button', {
      name: /Course/,
    });

    userEvent.click(enrollButtons[1]);

    userEvent.click(screen.getByTestId(/enroll-in-course/));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('all courses', () => {
    it('renders list properly with proper already enrolled info', async () => {
      renderStudentCourses();

      const allAvailableSectionHeading = await screen.findByRole('heading', {
        name: /All available courses within Defined Careers/,
      });

      const allAvailableSection = allAvailableSectionHeading.parentElement.parentElement;

      const alreadyEnrolledCourseCard = await within(allAvailableSection).findByRole('link', {
        name: 'Course 1',
      });

      const notEnrolledCourseCard1 = await within(allAvailableSection).findByRole('button', {
        name: 'Course 7',
      });
      const notEnrolledCourseCard2 = await within(allAvailableSection).findByRole('button', {
        name: 'Course 7',
      });

      expect(alreadyEnrolledCourseCard).toBeInTheDocument();
      expect(notEnrolledCourseCard1).toBeInTheDocument();
      expect(notEnrolledCourseCard2).toBeInTheDocument();
    });

    it('calls query with all list proper filter', async () => {
      const filterMock = getFilteredCoursesMock({
        searchableColumnsCont: 'fancy',
        pathwayIdIn: [],
        collectionIdIn: [],
        typeEq: null,
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
          typeEq: null,
        });
      });
    });

    it('selects pathways properly and call query with proper ids', async () => {
      const filterMock = getFilteredCoursesMock({
        pathwayIdIn: ['1', '2', '3', '5', '6', '9'],
        collectionIdIn: [],
        typeEq: null,
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
          typeEq: null,
          searchableColumnsCont: '',
        });
      });
    });

    it('selects grade level correctly', async () => {
      const filterMock = getFilteredCoursesMock({
        pathwayIdIn: [],
        collectionIdIn: [],
        typeEq: COURSE_TYPES.MIDDLE_SCHOOL,
        searchableColumnsCont: '',
      });

      const mocks = [...defaultMocks, filterMock, filterMock];

      renderStudentCourses(mocks);

      const gradeLevelSelectInput = await screen.findByRole('combobox', {
        name: 'Grade level: Show All',
      });

      userEvent.click(gradeLevelSelectInput);
      userEvent.type(gradeLevelSelectInput, '{arrowdown}{enter}');

      await waitFor(() => {
        expect(filteredCoursesSpy).toHaveBeenCalledTimes(1);
        expect(filteredCoursesSpy).toHaveBeenCalledWith({
          pathwayIdIn: [],
          collectionIdIn: [],
          typeEq: COURSE_TYPES.MIDDLE_SCHOOL,
          searchableColumnsCont: '',
        });
      });
    });

    it('resets course filters properly', async () => {
      const mocks = [
        ...defaultMocks,
        getFilteredCoursesMock({
          pathwayIdIn: ['1', '2', '3'],
          collectionIdIn: [],
          searchableColumnsCont: '',
          typeEq: null,
        }),
        getFilteredCoursesMock({
          pathwayIdIn: ['1', '2', '3'],
          collectionIdIn: [],
          searchableColumnsCont: 'fancy',
          typeEq: null,
        }),
        getFilteredCoursesMock({
          pathwayIdIn: [],
          collectionIdIn: [],
          searchableColumnsCont: '',
          typeEq: null,
        }),
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

      await waitFor(async () => {
        const allAvailableSectionHeading = await screen.findByRole('heading', {
          name: /All available courses within Defined Careers/,
        });

        const allAvailableSection = allAvailableSectionHeading.parentElement.parentElement;

        const courseCards = await within(allAvailableSection).findAllByLabelText(/Course/);

        expect(courseCards).toHaveLength(2);
      });

      const clearFiltersButton = screen.getByRole('button', { name: 'Clear all' });

      userEvent.click(clearFiltersButton);

      const allAvailableSectionHeading = await screen.findByRole('heading', {
        name: /All available courses within Defined Careers/,
      });

      const allAvailableSection = allAvailableSectionHeading.parentElement.parentElement;

      const courseCards = await within(allAvailableSection).findAllByLabelText(/Course/);

      expect(courseCards).toHaveLength(3);
    });

    it('shows enroll modal on enroll in course click and close on close', async () => {
      renderStudentCourses();

      const allAvailableSectionHeading = await screen.findByRole('heading', {
        name: /All available courses within Defined Careers/,
      });

      const allAvailableSection = allAvailableSectionHeading.parentElement.parentElement;

      const enrollButtons = await within(allAvailableSection).findByRole('button', {
        name: 'Course 7',
      });

      userEvent.click(enrollButtons);

      expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();

      userEvent.click(screen.getByTestId(/close-modal/));

      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
      });
    });

    it('calls enroll in course mutation on modal enroll click', async () => {
      const spy = jest.fn();

      const mocks = [
        ...defaultMocks,
        {
          request: {
            query: assignStudentToCourseMutation,
            variables: { input: { courseId: '7', studentUuid: undefined } },
          },
          result: () => {
            spy();

            return {
              data: {
                assignStudentToCourse: {
                  course: {
                    id: '7',
                    imageUrl: '',
                    name: '',
                    progress: {
                      submitted: 2,
                      total: 5,
                    },
                    status: 'DONE',
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

      const allAvailableSectionHeading = await screen.findByRole('heading', {
        name: /All available courses within Defined Careers/,
      });

      const allAvailableSection = allAvailableSectionHeading.parentElement.parentElement;

      const enrollButton = await within(allAvailableSection).findByRole('button', {
        name: 'Course 7',
      });

      userEvent.click(enrollButton);

      await waitFor(() => {
        fireEvent.click(screen.getByTestId(/enroll-in-course/));
      });

      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
