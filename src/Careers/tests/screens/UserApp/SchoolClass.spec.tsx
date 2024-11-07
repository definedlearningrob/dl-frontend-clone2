import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router';

import generateCourseReportMutation from '@dc/graphql/user/mutations/generateCourseReport';
import generatePlanReportMutation from '@dc/graphql/user/mutations/generatePlanReport';
import schoolClassPlansQuery from '@dc/graphql/user/queries/schoolClassPlans';
import schoolClassQuery from '@dc/graphql/user/queries/schoolClass';
import schoolClassWithStudentsQuery from '@dc/graphql/user/queries/schoolClassWithStudents';
import UserAppSchoolClass from '@dc/screens/UserApp/SchoolClass/SchoolClass';
import { ASSESSMENT_TYPES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ReportLevels, Roles } from '@dc/resources/enums';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { ReportsProvider } from '@dc/hooks/useReports';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { FileDownloadProvider } from '@shared/hooks/useFileDownload';
import { FILE_TO_DOWNLOAD_KEY } from '@shared/resources/constants';

const getCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          schoolClass: {
            merge: true,
          },
        },
      },
    },
  });

Element.prototype.getBoundingClientRect = () =>
  ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  } as any);

const defaultMocks = [
  {
    request: {
      query: schoolClassQuery,
      variables: { uuid: 'someuuid' },
    },
    result() {
      return {
        data: {
          schoolClass: {
            isDemo: false,
            name: 'some class name',
            uuid: 'someuuid',
            entity: {
              name: 'some entity name',
              uuid: 'entity uuid',
            },
            settings: {
              assessmentType: ASSESSMENT_TYPES.HIGH_SCHOOL,
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: schoolClassQuery,
      variables: { uuid: 'someuuid' },
    },
    result() {
      return {
        data: {
          schoolClass: {
            isDemo: false,
            name: 'some class name',
            uuid: 'someuuid',
            entity: {
              name: 'some entity name',
              uuid: 'entity uuid',
            },
            settings: {
              assessmentType: ASSESSMENT_TYPES.HIGH_SCHOOL,
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: schoolClassWithStudentsQuery,
      variables: { uuid: 'someuuid' },
    },
    result() {
      return {
        data: {
          schoolClass: {
            name: 'some class name',
            uuid: 'someuuid',
            students: { nodes: [], pagesCount: 1 },
          },
        },
      };
    },
  },
  {
    request: {
      query: schoolClassWithStudentsQuery,
      variables: { page: 1, perPage: 35, filter: {}, uuid: 'someuuid', scope: 'ALL' },
    },
    result() {
      return {
        data: {
          schoolClass: {
            name: 'some class name',
            uuid: 'someuuid',
            students: { nodes: [], pagesCount: 1 },
          },
        },
      };
    },
  },
  {
    request: {
      query: schoolClassPlansQuery,
      variables: { uuid: 'someuuid' },
    },
    result: {
      data: {
        schoolClass: {
          uuid: 'someuuid',
          entity: {
            uuid: '1',
            plans: [
              { id: '1', name: 'First Plan' },
              { id: '2', name: 'Second Plan' },
              { id: '3', name: 'Third Plan' },
            ],
          },
        },
      },
    },
  },
];

const renderClasses = (mocks: MockedResponse[] = []) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider cache={getCache()} mocks={[...defaultMocks, ...mocks]}>
      <UserInfoProvider
        value={{ userInfo: { ...userInfoMock.result.data.userInfo, role: Roles.SYSTEM_ADMIN } }}>
        <NavigationContextProvider>
          <ReportsProvider>
            <FileDownloadProvider>
              <Route path='/route/:uuid'>
                <div id='portal' />
                <UserAppSchoolClass />
              </Route>
            </FileDownloadProvider>
          </ReportsProvider>
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    {
      route: '/route/someuuid',
      initialState: {
        session: {
          // @ts-ignore
          user: null,
        },
      },
    }
  );

describe('UserAppSchoolClass', () => {
  afterEach(() => {
    localStorage.setItem(FILE_TO_DOWNLOAD_KEY, '');
  });

  it('generates course report properly', async () => {
    const spy = jest.fn();
    const generateReportMock = {
      request: {
        query: generateCourseReportMutation,
        variables: {
          input: { level: ReportLevels.SCHOOL_CLASS, levelUuid: 'someuuid', startYear: 2020 },
        },
      },
      result() {
        spy();

        return {
          data: {
            generateCourseReport: {
              courseReport: {
                id: 'someid',
              },
            },
          },
        };
      },
    };
    renderClasses([generateReportMock]);

    const generateReportOption = await screen.findByText('Generate Report');

    userEvent.click(generateReportOption);

    expect(screen.queryByText('Courses Report')).toBeInTheDocument();

    userEvent.click(screen.getByRole('radio', { name: 'Courses Report' }));
    userEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));

    expect(JSON.parse(localStorage.getItem(FILE_TO_DOWNLOAD_KEY)!)).toMatchObject({
      variables: {
        levelUuid: 'someuuid',
        level: 'SCHOOL_CLASS',
        startYear: 2020,
      },
    });

    expect(screen.queryByText('Courses Report')).not.toBeInTheDocument();
  });

  it('generates plan report properly', async () => {
    const spy = jest.fn();
    const generateReportMock = {
      request: {
        query: generatePlanReportMutation,
        variables: {
          input: {
            level: ReportLevels.SCHOOL_CLASS,
            levelUuid: 'someuuid',
            planId: '2',
            startYear: 2020,
          },
        },
      },
      result() {
        spy();

        return {
          data: {
            generatePlanReport: {
              planReport: {
                id: 'someid',
              },
            },
          },
        };
      },
    };
    renderClasses([generateReportMock]);
    const moreButton = await screen.findByRole('button', { name: 'More' });
    userEvent.click(moreButton);

    const generateReportOption = await screen.findByText('Generate Report');
    userEvent.click(generateReportOption);

    await waitFor(() => expect(screen.queryByText('First Plan')).toBeInTheDocument());

    userEvent.click(screen.getByRole('radio', { name: 'Second Plan' }));
    userEvent.click(screen.getByRole('button', { name: 'Generate' }));
    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });

    expect(JSON.parse(localStorage.getItem(FILE_TO_DOWNLOAD_KEY)!)).toMatchObject({
      id: 'someid',
      variables: {
        planId: '2',
        level: ReportLevels.SCHOOL_CLASS,
        levelUuid: 'someuuid',
      },
    });
    expect(screen.queryByText('First Plan')).not.toBeInTheDocument();
  });
});
