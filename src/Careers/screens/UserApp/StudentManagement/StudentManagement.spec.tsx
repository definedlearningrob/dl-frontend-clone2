import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor, within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { COUNSELORS, TCounselorsData } from '@dc/graphql/user/queries/counselors';
import {
  EntitiesWithChildrenData,
  ENTITIES_WITH_CHILDREN,
} from '@dc/graphql/user/queries/entitiesWithChildrens';
import { STUDENT_MANAGEMENT_QUERY } from '@dc/graphql/user/queries/studentManagement';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ArchivableStatusTypes, Roles } from '@dc/resources/enums';
import { TOGGLE_POST_SECONDARY_APPLICATIONS_FOR_STUDENTS_MUTATION } from '@dc/graphql/user/mutations/togglePostSecondaryApplicationsForStudents';
import { RESET_POST_SECONDARY_APPLICATIONS_FOR_STUDENT_MUTATION } from '@dc/graphql/user/mutations/resetPostSecondaryApplicationsForStudent';
import { ASSIGN_STUDENTS_TO_COUNSELOR } from '@dc/graphql/user/mutations/assignStudentsToCounselor';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { USER_ROLE, UserRoleData } from '@shared/graphql/user/query/userRole';

import { StudentManagement } from './StudentManagement';

const counselorsResponse = {
  data: {
    counselors: {
      pagesCount: 1,
      nodesCount: 3,
      nodes: [
        {
          uuid: '012',
          firstName: 'John',
          lastName: 'Willson',
          fullName: 'John Willson',
        },
        {
          uuid: '123',
          firstName: 'Bruce',
          lastName: 'Wayne',
          fullName: 'Bruce Wayne',
        },
        {
          uuid: '234',
          firstName: 'Kendall',
          lastName: 'Roy',
          fullName: 'Kendall Roy',
        },
      ],
    },
  },
};

const counselorsQueryMock: MockedResponse<TCounselorsData> = {
  request: {
    query: COUNSELORS,
  },
  result: counselorsResponse,
};

const entitiesResponse = {
  data: {
    entities: {
      pagesCount: 1,
      nodesCount: 3,
      nodes: [
        {
          uuid: 'firstRootUuid',
          name: 'First Root Entity',
          children: {
            nodes: [
              {
                uuid: 'firstChildUuid',
                name: 'First Child Entity',
                children: {
                  nodes: [],
                },
              },
            ],
          },
        },
        {
          uuid: 'secondaRootUuid',
          name: 'Second Root Entity',
          children: {
            nodes: [],
          },
        },
      ],
    },
  },
};

const entitiesQueryMock: MockedResponse<EntitiesWithChildrenData> = {
  request: {
    query: ENTITIES_WITH_CHILDREN,
    variables: { perPage: 100 },
  },
  result: entitiesResponse,
};

const studentsResponse = {
  data: {
    students: {
      nodes: [
        {
          gradYear: 2026,
          uuid: '01234',
          firstName: 'Michael',
          canPostSecondarySettingBeChanged: true,
          postSecondaryApplicationsStatus: {
            isEnabled: false,
            isOverridden: false,
          },
          fullName: 'Michael Adams',
          counselor: {
            uuid: '123',
            fullName: 'Bruce Wayne',
          },
          lastName: 'Adams',
          email: 'madams@cleverdemo.com',
          entity: {
            uuid: 'firstRootUuid',
            name: 'First Root Entity',
          },
          sisId: '12345',
          plans: [
            {
              id: 1,
            },
          ],
        },
        {
          gradYear: null,
          uuid: '12345',
          firstName: 'Anne',
          canPostSecondarySettingBeChanged: true,
          postSecondaryApplicationsStatus: {
            isEnabled: false,
            isOverridden: true,
          },
          fullName: 'Anne Bauch',
          counselor: {
            uuid: '123',
            fullName: 'Bruce Wayne',
          },
          lastName: 'Bauch',
          email: 'b_anne@example.org',
          entity: {
            uuid: 'firstRootUuid',
            name: 'First Root Entity',
          },
          sisId: null,
          plans: [
            {
              id: 2,
            },
          ],
        },
        {
          gradYear: 2024,
          uuid: '23456',
          firstName: 'Bryan',
          canPostSecondarySettingBeChanged: true,
          postSecondaryApplicationsStatus: {
            isEnabled: true,
            isOverridden: false,
          },
          fullName: 'Bryan Erdman',
          counselor: {
            uuid: '123',
            fullName: 'Bruce Wayne',
          },
          lastName: 'Erdman',
          email: 'bryan_e@example.com',
          entity: {
            uuid: 'secondaRootUuid',
            name: 'Second Root Entity',
          },
          sisId: '23456',
          plans: [
            {
              id: 3,
            },
          ],
        },
        {
          gradYear: 2023,
          uuid: '34567',
          firstName: 'Dillon',
          canPostSecondarySettingBeChanged: false,
          postSecondaryApplicationsStatus: {
            isEnabled: false,
            isOverridden: false,
          },
          fullName: 'Dillon Johnson',
          counselor: {
            uuid: '123',
            fullName: 'Bruce Wayne',
          },
          lastName: 'Johnson',
          email: 'j_dillon@example.com',
          entity: {
            uuid: 'firstRootUuid',
            name: 'First Root Entity',
          },
          sisId: null,
          plans: [
            {
              id: 4,
            },
          ],
        },
        {
          gradYear: null,
          uuid: '45678',
          firstName: 'Lando',
          canPostSecondarySettingBeChanged: false,
          postSecondaryApplicationsStatus: {
            isEnabled: false,
            isOverridden: false,
          },
          fullName: 'Lando Norris',
          counselor: {
            uuid: '012',
            fullName: 'John Willson',
          },
          lastName: 'Norris',
          email: 'l_norris@example.com',
          entity: {
            uuid: 'firstRootUuid',
            name: 'First Root Entity',
          },
          sisId: null,
          plans: [
            {
              id: 1,
            },
          ],
        },
      ],
      nodesCount: 5,
      pagesCount: 1,
    },
  },
};

const studentsQueryMock: MockedResponse = {
  request: {
    query: STUDENT_MANAGEMENT_QUERY,
    variables: {
      perPage: 25,
      fullNameSortOrder: 'ASC',
      scope: ArchivableStatusTypes.ACTIVE,
    },
  },
  result: studentsResponse,
};

const getStudentsWithCounselorQueryMock = (counselorUuidEq?: string): MockedResponse => ({
  request: {
    query: STUDENT_MANAGEMENT_QUERY,
    variables: {
      perPage: 25,
      fullNameSortOrder: 'ASC',
      filter: { counselorUuidEq },
      scope: ArchivableStatusTypes.ACTIVE,
    },
  },
  result: studentsResponse,
});

const filteredStudentsQuerySpy = jest.fn();

const getStudentsWithFiltersQueryMock = (filter: {
  counselorUuidEq: string;
  searchableColumnsCont: string;
  entityUuidIn: string[] | undefined;
  gradYearIn: number[] | undefined;
}): MockedResponse => ({
  request: {
    query: STUDENT_MANAGEMENT_QUERY,
    variables: {
      page: 1,
      perPage: 25,
      fullNameSortOrder: 'ASC',
      filter,
      scope: ArchivableStatusTypes.ACTIVE,
    },
  },
  result() {
    filteredStudentsQuerySpy();

    return studentsResponse;
  },
});

const getUserRoleQueryMock = (role: Roles): MockedResponse<UserRoleData> => ({
  request: {
    query: USER_ROLE,
  },
  result: { data: { userInfo: { role, username: 'brucewayne', uuid: '123' } } },
});

const renderComponent = (
  params: { customMocks?: MockedResponse[]; isCounselor?: boolean } = {}
) => {
  const { customMocks = [], isCounselor = true } = params;

  const counselorUuid = isCounselor ? '123' : undefined;
  const userRole = isCounselor ? Roles.TEACHER : Roles.ENTITY_ADMIN;

  const initialFiltersStudentsQueryMock = getStudentsWithFiltersQueryMock({
    counselorUuidEq: '123',
    searchableColumnsCont: '',
    entityUuidIn: undefined,
    gradYearIn: undefined,
  });

  return renderWithRouterAndReduxProvider(
    <MockedProvider
      mocks={[
        counselorsQueryMock,
        entitiesQueryMock,
        studentsQueryMock,
        initialFiltersStudentsQueryMock,
        { ...getStudentsWithCounselorQueryMock(counselorUuid) },
        getUserRoleQueryMock(userRole),
        ...customMocks,
      ]}>
      <UserInfoProvider
        value={{
          userInfo: {
            ...userInfoMock.result.data.userInfo,
            uuid: '123',
            role: userRole,
            permissions: {
              wblAdmin: false,
              counselor: isCounselor,
              canImpersonate: false,
              canBrowseReports: false,
            },
          },
        }}>
        <NavigationContextProvider>
          <StudentManagement />
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    { initialState: { session: { user: { type: 'user' }, loginError: {} } } }
  );
};

describe('StudentManagement', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 10, 1));
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('does not display "Assign to me" button when user is not a counselor', async () => {
    const { container } = renderComponent({ isCounselor: false });

    await screen.findByRole('heading', { name: 'Student Management' });
    await screen.findByPlaceholderText('Search by name');

    const assignToMeButton = screen.queryByRole('button', { name: 'Assign to me' });
    expect(assignToMeButton).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('initializes student management page correctly', async () => {
    const { container } = renderComponent();

    const enableApplicationsButton = await screen.findByRole('button', {
      name: 'Enable college applications',
    });
    const assignToMeButton = screen.getByRole('button', { name: 'Assign to me' });

    expect(enableApplicationsButton).toBeDisabled();
    expect(assignToMeButton).toBeDisabled();

    const counselorSelect = await screen.findByTestId('counselor-select');
    expect(counselorSelect).toHaveTextContent('Bruce Wayne');

    const [, ...tableBodyRows] = screen.getAllByRole('row');
    expect(tableBodyRows).toHaveLength(5);

    expect(tableBodyRows[0]).toHaveTextContent('Adams, Michael');
    expect(tableBodyRows[0]).toHaveTextContent('Assigned to me');
    expect(tableBodyRows[4]).toHaveTextContent('Norris, Lando');
    expect(tableBodyRows[4]).not.toHaveTextContent('Assigned to me');

    expect(container).toMatchSnapshot();
  });

  describe('when updating filters', () => {
    it('sends query with correct search value', async () => {
      renderComponent({
        customMocks: [
          getStudentsWithFiltersQueryMock({
            counselorUuidEq: '123',
            searchableColumnsCont: 'John Doe',
            entityUuidIn: undefined,
            gradYearIn: undefined,
          }),
        ],
      });

      const searchInput = await screen.findByRole('textbox', { name: 'Search' });

      userEvent.paste(searchInput, 'John Doe');

      await waitFor(() => {
        expect(filteredStudentsQuerySpy).toHaveBeenCalledTimes(1);
      });
    });

    it('sends query with selected entity', async () => {
      renderComponent({
        customMocks: [
          getStudentsWithFiltersQueryMock({
            counselorUuidEq: '123',
            searchableColumnsCont: '',
            entityUuidIn: ['firstRootUuid'],
            gradYearIn: undefined,
          }),
        ],
      });

      const entitySelect = await screen.findByRole('combobox', { name: 'Entity Select entity' });
      userEvent.type(entitySelect, 'First Root Entity{enter}');

      await waitFor(() => {
        expect(filteredStudentsQuerySpy).toHaveBeenCalledTimes(1);
      });
    });

    it('sends query with selected grad year', async () => {
      renderComponent({
        customMocks: [
          getStudentsWithFiltersQueryMock({
            counselorUuidEq: '123',
            searchableColumnsCont: '',
            entityUuidIn: undefined,
            gradYearIn: [2024],
          }),
        ],
      });

      const gradYearSelect = await screen.findByRole('combobox', {
        name: 'Grad year Select grad year',
      });
      userEvent.type(gradYearSelect, '2024{enter}');

      await waitFor(() => {
        expect(filteredStudentsQuerySpy).toHaveBeenCalledTimes(1);
      });
    });

    it('sends query with selected counselor', async () => {
      renderComponent({
        customMocks: [
          getStudentsWithFiltersQueryMock({
            counselorUuidEq: '012',
            searchableColumnsCont: '',
            entityUuidIn: undefined,
            gradYearIn: undefined,
          }),
        ],
      });

      const counselorSelect = await screen.findByLabelText(/Counselor/);
      userEvent.type(counselorSelect, 'John Willson{enter}');

      await waitFor(() => {
        expect(filteredStudentsQuerySpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when toggling college applications', () => {
    it('displays correct tooltip on toggle hover', async () => {
      renderComponent();

      const [, firstRow, secondRow, thirdRow, fourthRow] = await screen.findAllByRole('row');

      const firstRowToggle = within(firstRow).getByRole('switch');
      userEvent.hover(firstRowToggle);
      const firstRowTooltip = await screen.findByRole('tooltip');
      expect(firstRowTooltip).toHaveTextContent(
        "College applications are disabled based on the student's grad year."
      );
      userEvent.unhover(firstRowToggle);

      const secondRowToggle = within(secondRow).getByRole('switch');
      userEvent.hover(secondRowToggle);
      const secondRowTooltip = await screen.findByRole('tooltip');
      expect(secondRowTooltip).toHaveTextContent(
        'College applications have been manually disabled for this student.'
      );
      userEvent.unhover(secondRowToggle);

      const thirdRowToggle = within(thirdRow).getByRole('switch');
      userEvent.hover(thirdRowToggle);
      const thirdRowTooltip = await screen.findByRole('tooltip');
      expect(thirdRowTooltip).toHaveTextContent(
        "College applications are enabled based on the student's grad year."
      );
      userEvent.unhover(thirdRowToggle);

      // hidden toggle for students with applications disabled on the entity level
      const fourthRowToggle = within(fourthRow).queryByRole('switch');
      expect(fourthRowToggle).not.toBeInTheDocument();
    });

    it('toggles college applications for individual students', async () => {
      const toggleStudentApplicationsSpy = jest.fn();

      renderComponent({
        customMocks: [
          {
            request: {
              query: TOGGLE_POST_SECONDARY_APPLICATIONS_FOR_STUDENTS_MUTATION,
              variables: { input: { studentUuids: ['01234'], value: true } },
            },
            result() {
              toggleStudentApplicationsSpy();

              return {
                data: {
                  togglePostSecondaryApplicationsForStudents: {
                    students: [
                      {
                        uuid: '01234',
                        postSecondaryApplicationsStatus: {
                          isEnabled: true,
                          isOverridden: true,
                        },
                      },
                    ],
                  },
                },
              };
            },
          },
        ],
      });

      const [, firstRow] = await screen.findAllByRole('row');

      const collegeApplicationsToggle = within(firstRow).getByRole('switch');
      userEvent.click(collegeApplicationsToggle);

      await waitFor(() => {
        expect(toggleStudentApplicationsSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('resets to default college applications setting for individual students', async () => {
      const toggleStudentApplicationsSpy = jest.fn();

      renderComponent({
        customMocks: [
          {
            request: {
              query: RESET_POST_SECONDARY_APPLICATIONS_FOR_STUDENT_MUTATION,
              variables: { input: { studentUuid: '12345' } },
            },
            result() {
              toggleStudentApplicationsSpy();

              return {
                data: {
                  resetPostSecondaryApplicationsForStudent: {
                    student: {
                      uuid: '12345',
                      postSecondaryApplicationsStatus: {
                        isEnabled: false,
                        isOverridden: false,
                      },
                    },
                  },
                },
              };
            },
          },
        ],
      });

      const tableRows = await screen.findAllByRole('row');
      const secondBodyRow = tableRows[2];

      const resetToDefaultButton = within(secondBodyRow).getByRole('button', {
        name: 'Reset to default',
      });
      userEvent.click(resetToDefaultButton);

      await waitFor(() => {
        expect(toggleStudentApplicationsSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when selecting multiple students to perform bulk actions', () => {
    it('displays "Enable college applications" button in the correct state based on selected students', async () => {
      const toggleStudentApplicationsSpy = jest.fn();

      renderComponent({
        customMocks: [
          {
            request: {
              query: TOGGLE_POST_SECONDARY_APPLICATIONS_FOR_STUDENTS_MUTATION,
              variables: { input: { studentUuids: ['12345', '23456'], value: true } },
            },
            result() {
              toggleStudentApplicationsSpy();

              return {
                data: {
                  togglePostSecondaryApplicationsForStudents: {
                    students: [
                      {
                        uuid: '12345',
                        postSecondaryApplicationsStatus: {
                          isEnabled: true,
                          isOverridden: true,
                        },
                      },
                      {
                        uuid: '23456',
                        postSecondaryApplicationsStatus: {
                          isEnabled: true,
                          isOverridden: true,
                        },
                      },
                    ],
                  },
                },
              };
            },
          },
        ],
      });

      const [, , secondRow, thirdRow, fourthRow] = await screen.findAllByRole('row');

      // student with applications disabled on the entity level
      const fourthRowCheckbox = within(fourthRow).getByRole('checkbox');
      userEvent.click(fourthRowCheckbox);

      expect(screen.getByRole('button', { name: 'Enable college applications' })).toBeDisabled();

      // student with enabled applications
      const thirdRowCheckbox = within(thirdRow).getByRole('checkbox');
      userEvent.click(thirdRowCheckbox);

      expect(
        screen.queryByRole('button', { name: 'Enable college applications' })
      ).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Disable college applications' })).toBeEnabled();

      // student with disabled applications
      const secondRowCheckbox = within(secondRow).getByRole('checkbox');
      userEvent.click(secondRowCheckbox);

      const enableApplicationsButton = screen.getByRole('button', {
        name: 'Enable college applications',
      });
      expect(enableApplicationsButton).toBeEnabled();

      userEvent.click(enableApplicationsButton);

      await waitFor(() => {
        expect(toggleStudentApplicationsSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('assigns selected students to the counselor', async () => {
      const assignStudentsToCounselorSpy = jest.fn();
      const studentUuids = ['12345', '23456', '34567', '45678', '01234'];

      renderComponent({
        customMocks: [
          {
            request: {
              query: ASSIGN_STUDENTS_TO_COUNSELOR,
              variables: { input: { studentUuids } },
            },
            result() {
              assignStudentsToCounselorSpy();

              return {
                data: {
                  assignStudentsToCounselor: {
                    students: studentUuids.map((uuid) => ({
                      uuid,
                      counselor: { uuid: '012', fullName: 'Bruce Wayne' },
                    })),
                  },
                },
              };
            },
          },
        ],
      });

      const [tableHeader] = await screen.findAllByRole('row');

      const selectAllCheckbox = within(tableHeader).getByRole('checkbox');
      userEvent.click(selectAllCheckbox);

      const assignToMeButton = screen.getByRole('button', { name: 'Assign to me' });
      userEvent.click(assignToMeButton);

      await waitFor(() => {
        expect(assignStudentsToCounselorSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
