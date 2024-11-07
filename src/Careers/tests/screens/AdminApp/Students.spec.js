import { waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import Students from '@dc/screens/AdminApp/Students/Students';
import studentsQuery from '@dc/graphql/user/queries/students';
import { ArchivableStatusTypes } from '@dc/resources/enums';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const mocks = [
  {
    request: {
      query: studentsQuery,
      variables: {
        filter: {},
        page: 1,
        perPage: 10,
        scope: ArchivableStatusTypes.ACTIVE,
      },
    },
    result: {
      data: {
        students: {
          nodes: [
            {
              archivedAt: '',
              uuid: '1',
              firstName: 'Carolina',
              lastName: 'Pelosi',
              entity: {
                uuid: '1',
                name: 'Hogwart University',
                __typename: 'Entity',
              },
              __typename: 'Student',
            },
            {
              archivedAt: '',
              uuid: '2',
              firstName: 'Danial',
              lastName: 'Trump',
              entity: {
                uuid: '2',
                name: 'Colorado University',
                __typename: 'Entity',
              },
              __typename: 'Student',
            },
            {
              archivedAt: '',
              uuid: '3',
              firstName: 'Hank',
              lastName: 'Obama',
              entity: {
                uuid: '3',
                name: 'Yale University',
                __typename: 'Entity',
              },
              __typename: 'Student',
            },
          ],
          nodesCount: 3,
          pagesCount: 1,
          __typename: 'StudentPage',
        },
      },
    },
  },
];

const renderStudent = () =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <UserInfoProvider>
        <NavigationContextProvider>
          <Students />
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

describe('AdminAppStudents', () => {
  it('renders list of students correctly', async () => {
    const { getAllByTestId } = renderStudent();

    await waitFor(() => {
      const listItemsStudentNames = getAllByTestId(/student-item-name/);
      const listItemsStudentEntitites = getAllByTestId(/student-item-entity-name/);
      const listItemsActionButtons = getAllByTestId(/student-item-show-btn/);

      expect(listItemsStudentNames).toHaveLength(3);
      expect(listItemsStudentEntitites).toHaveLength(3);
      expect(listItemsActionButtons).toHaveLength(6);
      expect(listItemsStudentNames[0]).toHaveTextContent('Carolina Pelosi');
      expect(listItemsStudentNames[1]).toHaveTextContent('Danial Trump');
      expect(listItemsStudentNames[2]).toHaveTextContent('Hank Obama');
      expect(listItemsStudentEntitites[0]).toHaveTextContent('Hogwart University');
      expect(listItemsStudentEntitites[1]).toHaveTextContent('Colorado University');
      expect(listItemsStudentEntitites[2]).toHaveTextContent('Yale University');
    });
  });

  it('renders students search input with correct placeholder', async () => {
    const { getByPlaceholderText } = renderStudent();

    await waitFor(() => {
      expect(getByPlaceholderText(/Search by name.../i)).toBeInTheDocument();
    });
  });
});
