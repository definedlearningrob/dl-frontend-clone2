import { waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import SchoolClasses from '@dc/screens/AdminApp/SchoolClasses/SchoolClasses';
import schoolClassesQuery from '@dc/graphql/user/queries/schoolClasses';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const mocks = [
  {
    request: {
      query: schoolClassesQuery,
      variables: {
        filter: { isDemoEq: null },
        page: 1,
        perPage: 10,
      },
    },
    result: {
      data: {
        schoolClasses: {
          nodes: [
            {
              name: 'Class 1',
              uuid: '1',
              entity: {
                uuid: '1',
                name: 'Columbia University',
                __typename: 'Entity',
              },
              __typename: 'SchoolClass',
            },
            {
              name: 'Class 4',
              uuid: '2',
              entity: {
                uuid: '2',
                name: 'Michigan State University',
                __typename: 'Entity',
              },
              __typename: 'SchoolClass',
            },
            {
              name: 'Class 5',
              uuid: '3',
              entity: {
                uuid: '3',
                name: 'University of Arizona',
                __typename: 'Entity',
              },
              __typename: 'SchoolClass',
            },
          ],
          nodesCount: 3,
          pagesCount: 1,
          __typename: 'SchoolClassPage',
        },
      },
    },
  },
];

const renderSchoolClasses = () =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <UserInfoProvider>
        <NavigationContextProvider>
          <SchoolClasses />
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

describe('AdminAppSchoolClasses', () => {
  it('renders list of school classes correctly', async () => {
    const { getAllByTestId } = renderSchoolClasses();

    await waitFor(() => {
      const schoolClassesNames = getAllByTestId(/school-class-item-name/);
      const schoolClassesEntitiesNames = getAllByTestId(/school-class-item-entity-name/);
      const schoolClassesActionButtons = getAllByTestId(/school-class-item-show-btn/);

      expect(schoolClassesNames).toHaveLength(3);
      expect(schoolClassesEntitiesNames).toHaveLength(3);
      expect(schoolClassesActionButtons).toHaveLength(3);
      expect(schoolClassesNames[0]).toHaveTextContent('Class 1');
      expect(schoolClassesNames[1]).toHaveTextContent('Class 4');
      expect(schoolClassesNames[2]).toHaveTextContent('Class 5');
      expect(schoolClassesEntitiesNames[0]).toHaveTextContent('Columbia University');
      expect(schoolClassesEntitiesNames[1]).toHaveTextContent('Michigan State University');
      expect(schoolClassesEntitiesNames[2]).toHaveTextContent('University of Arizona');
    });
  });

  it('renders school class and entity search input with correct placeholder', async () => {
    const { getByPlaceholderText } = renderSchoolClasses();

    await waitFor(() => {
      expect(getByPlaceholderText(/Search by name.../i)).toBeInTheDocument();
      expect(getByPlaceholderText(/Search by entity.../i)).toBeInTheDocument();
    });
  });
});
