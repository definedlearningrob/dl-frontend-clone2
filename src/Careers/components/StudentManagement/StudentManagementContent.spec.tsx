import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen } from '@testing-library/react';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { StudentManagementContent } from '@dc/components/StudentManagement/StudentManagementContent';
import { ArchivableStatusTypes, Roles, SYNC_STATUS } from '@dc/resources/enums';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { counselorsMock } from '@dc/tests/mocks/counselors';
import { STUDENT_MANAGEMENT_QUERY } from '@dc/graphql/user/queries/studentManagement';
import { ENTITIES_WITH_CHILDREN } from '@dc/graphql/user/queries/entitiesWithChildrens';
import userInfoQuery from '@dc/graphql/user/queries/userInfo';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';

import { ReportType } from '@shared/resources/enums';

export const studentsCounselorManagementMock = {
  request: {
    query: STUDENT_MANAGEMENT_QUERY,
    variables: {
      perPage: 25,
      scope: ArchivableStatusTypes.ACTIVE,
      fullNameSortOrder: 'ASC',
      filter: {
        counselorUuidEq: 'test-counselor-id',
      },
    },
  },
  result: {
    data: {
      students: {
        pagesCount: 1,
        nodesCount: 3,
        nodes: [
          {
            gradYear: 2020,
            uuid: '6c3381cc-77d5-4a02-aa83-d06d546d6d9a',
            firstName: 'Don',
            canPostSecondarySettingBeChanged: true,
            postSecondaryApplicationsStatus: {
              isEnabled: false,
              isOverridden: false,
            },
            fullName: 'Don Ankunding',
            counselor: null,
            lastName: 'Ankunding',
            email: 'don.a@example.org',
            entity: {
              uuid: 'e5c5f202-8019-4eb9-a1c8-fb32666c4625',
              name: 'Clever Certification ISD',
              __typename: 'Entity',
            },
            sisId: null,
            __typename: 'Student',
            plans: [{ id: 1 }],
          },
          {
            gradYear: 2021,
            uuid: '5145ddd4-52ea-488f-9a76-9876f952df65',
            firstName: 'Ana',
            canPostSecondarySettingBeChanged: true,
            postSecondaryApplicationsStatus: {
              isEnabled: true,
              isOverridden: true,
            },
            fullName: 'Ana Barton',
            counselor: null,
            lastName: 'Barton',
            email: 'b_ana@example.org',
            entity: {
              uuid: 'e5c5f202-8019-4eb9-a1c8-fb32666c4625',
              name: 'Clever Certification ISD',
              __typename: 'Entity',
            },
            sisId: null,
            __typename: 'Student',
            plans: [{ id: 1 }],
          },
        ],
        __typename: 'UserPage',
      },
    },
  },
};
export const emptyStudentsCounselorManagementMock = {
  request: {
    query: STUDENT_MANAGEMENT_QUERY,
    variables: {
      perPage: 25,
      fullNameSortOrder: 'ASC',
      filter: {
        counselorUuidEq: 'test-counselor-id',
      },
      scope: ArchivableStatusTypes.ACTIVE,
    },
  },
  result: {
    data: {
      students: {
        pagesCount: 1,
        nodesCount: 0,
        nodes: [],
      },
    },
  },
};

export const entitiesMock = {
  request: {
    query: ENTITIES_WITH_CHILDREN,
    variables: {
      perPage: 100,
    },
  },
  result: {
    data: {
      entities: {
        pagesCount: 1,
        nodesCount: 5,
        nodes: [
          {
            uuid: 'test-entity-uuid',
            name: 'Test Middle School',
            children: {
              nodes: [],
            },
          },
        ],
      },
    },
  },
};

const userInfoMock = {
  request: {
    query: userInfoQuery,
    variables: { username: undefined },
  },
  result: {
    data: {
      userInfo: {
        availableReportTypes: [],
        hasAccessToPbl: true,
        commonAppData: {
          hasRecommenderInvitation: false,
          hasTeacherInvitation: false,
          hasCounselorInvitation: false,
          hasOpportunitiesEnabled: false,
          hasCounselorProfileFormCompleted: false,
          hasTeacherProfileFormCompleted: false,
          syncStatus: {
            lastSyncedAt: '2021-03-03T15:00:00.000Z',
            status: SYNC_STATUS.COMPLETED,
          },
        },
        settings: {
          assessmentEnabled: true,
          assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
          onboardingEnabled: true,
        },
        permissions: {
          wblAdmin: false,
          counselor: true,
          canImpersonate: false,
          canBrowseReports: false,
        },
        welcomeMessage: 'Welcome to Defined Learning!',
        email: 'june@schneider.com',
        currentSchoolYear: 2020,
        hasUnreadConversation: false,
        hasOpportunitiesEnabled: true,
        firstName: 'June',
        lastName: 'Schneider',
        isImpersonated: false,
        role: Roles.TEACHER,
        status: 'status',
        username: 'june.schneider',
        uuid: 'test-counselor-id',
        entities: {
          nodes: [
            {
              uuid: 'entityuuid',
              settings: {
                classManagementEnabled: false,
                postSecondaryApplicationsEnabled: false,
                schoolYearStartDate: { day: 7, month: 7 },
              },
              reportTypes: [ReportType.ASSESSMENT, ReportType.CAREER_PATHWAY],
            },
          ],
        },
      },
    },
  },
};

describe('StudentManagementContent', () => {
  const renderStudentManagementContent = (mocks: MockedResponse[] = []) =>
    renderWithRouterAndReduxProvider(
      <MockedProvider mocks={mocks}>
        <UserInfoProvider
          value={{
            userInfo: {
              ...userInfoMock.result.data.userInfo,
              uuid: 'test-counselor-id',
            },
          }}>
          <StudentManagementContent />
        </UserInfoProvider>
      </MockedProvider>
    );

  it('should render correctly', async () => {
    const { container } = renderStudentManagementContent([
      userInfoMock,
      counselorsMock,
      studentsCounselorManagementMock,
      entitiesMock,
    ]);

    const searchInput = await screen.findByPlaceholderText('Search by name');
    const entitySelect = screen.getByRole('combobox', { name: 'Entity Select entity' });
    const gradYearSelect = screen.getByRole('combobox', { name: 'Grad year Select grad year' });
    const counselorSelect = screen.getByRole('combobox', {
      name: 'Counselor June Schneider June Schneider',
    });

    const preselectedCounselorLabel = screen.getByText('June Schneider');

    const firstRow = screen.getByRole('row', {
      name: 'Ankunding, Don don.a@example.org 2020 Clever Certification ISD',
    });

    const secondRow = screen.getByRole('row', {
      name: 'Barton, Ana b_ana@example.org 2021 Clever Certification ISD',
    });

    const resultsSummary = screen.getByText('Results: 1 - 3 of 3');

    expect(searchInput).toBeInTheDocument();
    expect(entitySelect).toBeInTheDocument();
    expect(gradYearSelect).toBeInTheDocument();
    expect(counselorSelect).toBeInTheDocument();

    expect(preselectedCounselorLabel).toBeInTheDocument();

    expect(firstRow).toBeInTheDocument();
    expect(secondRow).toBeInTheDocument();

    expect(resultsSummary).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render with empty results', async () => {
    const { container } = renderStudentManagementContent([
      userInfoMock,
      counselorsMock,
      emptyStudentsCounselorManagementMock,
      entitiesMock,
    ]);

    const expectedTableHeaders = [
      '',
      'Name',
      'Email',
      'ID',
      'Grad year',
      'Entity',
      'Counselor',
      'Actions',
    ];

    const searchInput = await screen.findByPlaceholderText('Search by name');
    const resultsSummary = screen.getByText('Results: 0 - 0 of 0');
    const noResultsInfo = screen.getByText('No results found');

    const tableHeaders = screen.getAllByRole('columnheader');

    const tableHeadersText = tableHeaders.map((header) => header.textContent);

    expect(noResultsInfo).toBeInTheDocument();
    expect(resultsSummary).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();

    expect(tableHeadersText).toEqual(expectedTableHeaders);

    expect(container).toMatchSnapshot();
  });
});
