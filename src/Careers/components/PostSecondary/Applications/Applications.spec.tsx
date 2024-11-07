import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { Applications } from '@dc/components/PostSecondary';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { INSTITUTION_APPLICATIONS } from '@dc/graphql/student/queries/institutionApplications';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { INSTITUTION_APPLICATION_STATUS } from '@dc/resources/enums';
import { UPDATE_INSTITUTION_APPLICATION } from '@dc/graphql/student/mutations/updateInstitutionApplication';

const institutionApplicationsMockDirectToCommonApp = {
  request: {
    query: INSTITUTION_APPLICATIONS,
    variables: {
      page: 1,
      perPage: 100,
    },
  },
  result: {
    data: {
      institutionApplications: {
        nodes: [
          {
            id: '64',
            name: 'Harvard direct application to Common ',
            type: 'DIRECT',
            status: 'NOT_STARTED',
            institution: {
              commonAppApplicationUrl: 'https://test2.com',
              id: '444',
              minTeacherEval: 1,
              commonAppEnabled: true,
            },
            appliedAt: null,
            acceptsTeacherRecommendation: true,
            recommenders: [
              {
                email: 'alonzorockteach@cleverdemo.com',
                firstName: 'Alonzo',
                lastName: 'Rockteach',
                type: 'COUNSELOR',
              },
            ],
          },
        ],
      },
    },
  },
};

const institutionApplicationsMock = {
  request: {
    query: INSTITUTION_APPLICATIONS,
    variables: {
      page: 1,
      perPage: 100,
    },
  },
  result: {
    data: {
      institutionApplications: {
        nodes: [
          {
            id: '1',
            name: 'Texas Christian University',
            type: 'COMMON_APP',
            status: 'IN_PROGRESS',
            institution: {
              commonAppApplicationUrl: 'https://test.com',
              id: '111',
              minTeacherEval: 1,
              commonAppEnabled: true,
            },
            appliedAt: '2023-06-29T06:44:18Z',
            acceptsTeacherRecommendation: true,
            recommenders: [
              {
                email: 'alonzorockteach@cleverdemo.com',
                firstName: 'Alonzo',
                lastName: 'Rockteach',
                type: 'COUNSELOR',
              },
            ],
          },
          {
            id: '3',
            name: 'Yale University',
            type: 'COMMON_APP',
            status: 'IN_PROGRESS',
            institution: {
              commonAppApplicationUrl: 'https://test.com',
              id: '222',
              minTeacherEval: 2,
              commonAppEnabled: true,
            },
            appliedAt: '2023-07-06T07:40:13Z',
            acceptsTeacherRecommendation: true,
            recommenders: [
              {
                email: 'alonzorockteach@cleverdemo.com',
                firstName: 'Alonzo',
                lastName: 'Rockteach',
                type: 'COUNSELOR',
              },
            ],
          },
          {
            id: '63',
            name: 'Test direct application',
            type: 'DIRECT',
            status: 'NOT_STARTED',
            institution: {
              commonAppApplicationUrl: null,
              id: '333',
              minTeacherEval: 0,
              commonAppEnabled: false,
            },
            appliedAt: null,
            acceptsTeacherRecommendation: false,
            recommenders: [],
          },
          {
            id: '64',
            name: 'Harvard direct application to Common ',
            type: 'DIRECT',
            status: 'IN_PROGRESS',
            institution: {
              commonAppApplicationUrl: 'https://test2.com',
              id: '444',
              minTeacherEval: 1,
              commonAppEnabled: true,
            },
            appliedAt: null,
            acceptsTeacherRecommendation: true,
            recommenders: [
              {
                email: 'alonzorockteach@cleverdemo.com',
                firstName: 'Alonzo',
                lastName: 'Rockteach',
                type: 'COUNSELOR',
              },
            ],
          },
        ],
      },
    },
  },
};

const getDirectApplicationMock = (initialStatus: INSTITUTION_APPLICATION_STATUS) => ({
  request: {
    query: INSTITUTION_APPLICATIONS,
    variables: {
      username: undefined,
      page: 1,
      perPage: 100,
    },
  },
  result: {
    data: {
      institutionApplications: {
        nodes: [
          {
            id: '63',
            name: 'Test direct application',
            type: 'DIRECT',
            status: initialStatus,
            institution: {
              commonAppApplicationUrl: null,
              id: '1034',
              minTeacherEval: 0,
              commonAppEnabled: false,
              __typename: 'Institution',
            },
            appliedAt: null,
            acceptsTeacherRecommendation: false,
            recommenders: [],
            __typename: 'InstitutionApplication',
          },
        ],
      },
    },
  },
});

const updateInstitutionSpy = jest.fn();

const getUpdateInstitutionApplicationMock = (status: INSTITUTION_APPLICATION_STATUS) => ({
  request: {
    query: UPDATE_INSTITUTION_APPLICATION,
    variables: {
      input: { institutionApplicationId: '63', status: status },
    },
  },
  result() {
    updateInstitutionSpy();

    return {
      data: {
        updateInstitutionApplication: {
          institutionApplication: {
            status: status,
            name: 'Test direct application',
          },
        },
      },
    };
  },
});

const renderApplications = (mocks: MockedResponse[] = [], hasAccountConnected = true) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <UserInfoProvider
        value={{
          userInfo: {
            ...studentInfoMock.result.data.userInfo,
            commonAppData: {
              ...studentInfoMock.result.data.userInfo.commonAppData,
              hasAccountConnected,
            },
          },
        }}>
        <Applications />
      </UserInfoProvider>
    </MockedProvider>
  );

describe('Applications', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { container } = renderApplications([studentInfoMock, institutionApplicationsMock]);

    const firstRow = await screen.findByText('Texas Christian University');

    expect(firstRow).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  describe('DIRECT applications', () => {
    it('should render opened dropdown menu correctly ', async () => {
      const { baseElement } = renderApplications([
        studentInfoMock,
        getDirectApplicationMock(INSTITUTION_APPLICATION_STATUS.NOT_STARTED),
      ]);

      const firstInstitution = await screen.findByText('Test direct application');

      expect(firstInstitution).toBeInTheDocument();

      const statusBadge = screen.getByRole('button', { name: 'Not Started' });

      //workaround for Radix Dropdown.Trigger
      userEvent.type(statusBadge, '{enter}');

      expect(screen.getByRole('button', { name: 'In Progress' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument();

      expect(baseElement).toMatchSnapshot();
    });

    describe('should render dropdown menu with', function () {
      const testCases = [
        ['In Progress', 'Completed', INSTITUTION_APPLICATION_STATUS.NOT_STARTED, 'Not Started'],
        ['Not Started', 'Completed', INSTITUTION_APPLICATION_STATUS.IN_PROGRESS, 'In Progress'],
        ['Not Started', 'In Progress', INSTITUTION_APPLICATION_STATUS.SUBMITTED, 'Completed'],
      ];

      it.each(testCases)(
        '%s & %s items',
        async (firstExpectedBadge, secondExpectedBadge, initialStatus, initialBadge) => {
          renderApplications([
            studentInfoMock,
            getDirectApplicationMock(initialStatus as INSTITUTION_APPLICATION_STATUS),
          ]);

          const firstInstitution = await screen.findByText('Test direct application');

          expect(firstInstitution).toBeInTheDocument();

          const statusBadge = screen.getByRole('button', { name: initialBadge });

          // workaround for Radix Dropdown.Trigger
          await userEvent.type(statusBadge, '{arrowdown}');

          expect(screen.getByRole('button', { name: firstExpectedBadge })).toBeInTheDocument();
          expect(screen.getByRole('button', { name: secondExpectedBadge })).toBeInTheDocument();
        }
      );
    });

    describe('should change application status', () => {
      const testCases = [
        [
          'Not Started',
          'In Progress',
          INSTITUTION_APPLICATION_STATUS.NOT_STARTED,
          INSTITUTION_APPLICATION_STATUS.IN_PROGRESS,
        ],
        [
          'Not Started',
          'Completed',
          INSTITUTION_APPLICATION_STATUS.NOT_STARTED,
          INSTITUTION_APPLICATION_STATUS.SUBMITTED,
        ],
        [
          'In Progress',
          'Completed',
          INSTITUTION_APPLICATION_STATUS.IN_PROGRESS,
          INSTITUTION_APPLICATION_STATUS.SUBMITTED,
        ],
        [
          'In Progress',
          'Not Started',
          INSTITUTION_APPLICATION_STATUS.IN_PROGRESS,
          INSTITUTION_APPLICATION_STATUS.NOT_STARTED,
        ],
        [
          'Completed',
          'Not Started',
          INSTITUTION_APPLICATION_STATUS.SUBMITTED,
          INSTITUTION_APPLICATION_STATUS.NOT_STARTED,
        ],
        [
          'Completed',
          'In Progress',
          INSTITUTION_APPLICATION_STATUS.SUBMITTED,
          INSTITUTION_APPLICATION_STATUS.IN_PROGRESS,
        ],
      ];

      it.each(testCases)(
        'from %s to %s',
        async (initialBadge, expectedBadge, initialStatus, expectedStatus) => {
          renderApplications([
            studentInfoMock,
            getDirectApplicationMock(initialStatus as INSTITUTION_APPLICATION_STATUS),
            getUpdateInstitutionApplicationMock(expectedStatus as INSTITUTION_APPLICATION_STATUS),
          ]);

          const firstRow = await screen.findByText('Test direct application');

          expect(firstRow).toBeInTheDocument();

          const statusBadge = screen.getByRole('button', { name: initialBadge });

          // workaround for Radix Dropdown.Trigger
          userEvent.type(statusBadge, '{enter}');

          const dropdownMenu = screen.getByRole('menu', { name: initialBadge });

          expect(dropdownMenu).toBeInTheDocument();

          const statusToSet = screen.getByRole('button', { name: expectedBadge });

          expect(statusToSet).toBeInTheDocument();

          userEvent.click(statusToSet);

          await waitFor(() => {
            expect(updateInstitutionSpy).toHaveBeenCalledTimes(1);
          });
        }
      );
    });

    describe('should render action dropdown menu', () => {
      it('action context show on mouse enter', async () => {
        renderWithRouterAndReduxProvider(
          <MockedProvider mocks={[institutionApplicationsMockDirectToCommonApp]}>
            <UserInfoProvider
              value={{
                userInfo: {
                  ...studentInfoMock.result.data.userInfo,
                  commonAppData: {
                    ...studentInfoMock.result.data.userInfo.commonAppData,
                    hasAccountConnected: true,
                  },
                },
              }}>
              <Applications />
            </UserInfoProvider>
          </MockedProvider>
        );

        const firstRow = await screen.findByText('Harvard direct application to Common');

        userEvent.hover(firstRow);

        const contextMenuTrigger = await screen.findByTestId('application-context-menu');

        userEvent.type(contextMenuTrigger, '{enter}');

        const dropDownStatus = await screen.findByRole('link', { name: 'Change to Common App' });
        expect(dropDownStatus).toBeInTheDocument();

        userEvent.click(dropDownStatus);
        expect(window.location.pathname).toBe('/');
      });
    });
  });
});
