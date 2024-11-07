import { fireEvent, waitFor, within, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import { UpdateEntityCatalogsDocument } from '@graphql/dc/users/hooks';
import { UpdateEntityPlansDocument } from '@graphql/dc/users/hooks';

import assignStandardSetToEntityMutation from '@dc/graphql/user/mutations/assignStandardSetToEntity';
import catalogQuery from '@dc/graphql/user/queries/catalog';
import catalogsQuery from '@dc/graphql/user/queries/catalogs';
import { AdminEntity } from '@dc/components/Admin/Entity/Entity';
import planQuery from '@dc/graphql/user/queries/plan';
import { PLANS_QUERY } from '@dc/graphql/user/queries/plans';
import standardSetQuery from '@dc/graphql/user/queries/standardSet';
import standardSetsQuery from '@dc/graphql/user/queries/standardSets';
import updateEntitySettingsMutation from '@dc/graphql/user/mutations/updateEntitySettings';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
const defaultMock = [
  {
    request: {
      query: planQuery,
      variables: { id: '11' },
    },
    result: {
      data: {
        plan: {
          archivedAt: null,
          description: 'Plan description',
          id: '11',
          name: 'Plan 1',
          groups: [
            {
              archivedAt: null,
              description: 'Group description',
              id: '3',
              displayName: 'First group displayName',
              name: 'First group name',
              step: 1,
              statements: [
                { id: '1', name: 'First statement', step: 1 },
                { id: '2', name: 'Second statement', step: 2 },
              ],
            },
            {
              archivedAt: null,
              description: 'Group description',
              id: '4',
              displayName: 'Second group displayName',
              name: 'Second group name',
              step: 2,
              statements: [
                { id: '3', name: 'Third statement', step: 1 },
                { id: '4', name: 'Fourth statement', step: 2 },
              ],
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: catalogQuery,
      variables: { id: '1' },
    },
    result: {
      data: {
        catalog: {
          description: 'Catalog description',
          displayName: 'Catalog display name',
          id: '1',
          name: 'Catalog name',
          imageUrl: 'someimg',
          thumbnailUrl: 'something',
          status: '',
          tracks: [
            {
              id: '1',
              name: 'First track name',
              imageUrl: 'someimg',
              step: 1,
              units: [
                { id: '1', name: 'First unit' },
                { id: '2', name: 'Second unit' },
              ],
            },
            {
              id: '2',
              name: 'Second track name',
              imageUrl: 'someimg',
              step: 2,
              units: [
                { id: '3', name: 'Third unit' },
                { id: '4', name: 'Fourth unit' },
              ],
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: PLANS_QUERY,
      variables: { perPage: 1000, filter: { nameCont: '' } },
    },
    result: {
      data: {
        plans: {
          nodesCount: 2,
          pagesCount: 1,
          nodes: [
            {
              archivedAt: null,
              description: '',
              id: '10',
              name: 'Assigning plan',
              groups: [
                {
                  id: '1',
                  name: 'First group plans',
                  statements: {
                    id: '1',
                    name: 'First statement plans',
                  },
                },
              ],
            },
            {
              archivedAt: null,
              description: '',
              id: '11',
              name: 'Assigning plan 2',
              groups: [
                {
                  id: '2',
                  name: 'Second group plans',
                  statements: {
                    id: '2',
                    name: 'Second statement plans',
                  },
                },
              ],
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: standardSetsQuery,
      variables: { perPage: 100, filter: { nameCont: '' } },
    },
    result: {
      data: {
        standardSets: {
          nodesCount: 4,
          pagesCount: 1,
          nodes: [
            {
              archivedAt: null,
              displayName: 'Random name',
              id: '1',
              name: 'Alabama',
              setId: 'AL',
              __typename: 'StandardSet',
            },
            {
              archivedAt: null,
              displayName: 'Best Standard',
              id: '2',
              name: 'Hawaii',
              setId: 'HA',
              __typename: 'StandardSet',
            },
            {
              archivedAt: null,
              displayName: null,
              id: '3',
              name: 'Kansas',
              setId: 'KA',
              __typename: 'StandardSet',
            },
            {
              archivedAt: null,
              displayName: null,
              id: '4',
              name: 'Ohio',
              setId: 'OH',
              __typename: 'StandardSet',
            },
            {
              archivedAt: null,
              displayName: null,
              id: '5',
              name: 'New York',
              setId: 'NY',
              __typename: 'StandardSet',
            },
          ],
          __typename: 'StandardSetPage',
        },
      },
    },
  },
  {
    request: {
      query: standardSetQuery,
      variables: { id: '1' },
    },
    result: {
      data: {
        standardSet: {
          archivedAt: null,
          displayName: 'Random name',
          id: '1',
          name: 'Alabama',
          setId: 'AL',
          __typename: 'StandardSet',
        },
      },
    },
  },
];

const catalogsMock = {
  request: {
    query: catalogsQuery,
    variables: {
      page: 1,
      perPage: 10,
      filter: {},
    },
  },
  result: {
    data: {
      catalogs: {
        nodesCount: 1,
        pagesCount: 1,
        nodes: [
          {
            archivedAt: null,
            description: 'Finance description more text about finance catalog',
            displayName: '',
            id: '10',
            imageUrl: 'finance.img',
            name: 'Financial Literacy',
            status: '',
            service: 'LEARNING',
            thumbnailUrl: 'finance-thumbnail-url',
            tracks: [
              {
                id: '1',
                name: 'First track name',
                imageUrl: 'someimg',
                step: 1,
                service: 'LEARNING',
                units: [
                  { id: '1', name: 'First unit', step: 1 },
                  { id: '2', name: 'Second unit', step: 2 },
                ],
              },
              {
                id: '2',
                name: 'Second track name',
                imageUrl: 'someimg',
                step: 2,
                service: 'LEARNING',
                units: [
                  { id: '3', name: 'Third unit', step: 1 },
                  { id: '4', name: 'Fourth unit', step: 2 },
                ],
              },
              {
                id: '3',
                name: 'Third track name',
                imageUrl: 'someimg',
                step: 3,
                service: 'LEARNING',
                units: [
                  { id: '5', name: 'Fifth unit', step: 1 },
                  { id: '6', name: 'Sixth unit', step: 2 },
                ],
              },
              {
                id: '4',
                name: 'Fourth track name',
                imageUrl: 'someimg',
                step: 4,
                service: 'CAREER',
                units: [
                  { id: '7', name: 'Seventh unit', step: 1 },
                  { id: '8', name: 'Eighth unit', step: 2 },
                ],
              },
            ],
          },
          {
            archivedAt: null,
            description: 'Yourself description more text about yourself catalog',
            displayName: '',
            id: '11',
            imageUrl: 'yourself.img',
            name: 'Understanding yourself',
            status: '',
            service: 'LEARNING',
            thumbnailUrl: 'tourself-thumbnail-url',
            tracks: [
              {
                id: '1',
                name: 'First track name',
                imageUrl: 'someimg',
                step: 1,
                service: 'LEARNING',
                units: [
                  { id: '1', name: 'First unit', step: 1 },
                  { id: '2', name: 'Second unit', step: 2 },
                ],
              },
              {
                id: '2',
                name: 'Second track name',
                imageUrl: 'someimg',
                step: 2,
                service: 'LEARNING',
                units: [
                  { id: '3', name: 'Third unit', step: 1 },
                  { id: '4', name: 'Fourth unit', step: 2 },
                ],
              },
              {
                id: '3',
                name: 'Third track name',
                imageUrl: 'someimg',
                step: 3,
                service: 'LEARNING',
                units: [
                  { id: '5', name: 'Fifth unit', step: 1 },
                  { id: '6', name: 'Sixth unit', step: 2 },
                ],
              },
              {
                id: '4',
                name: 'Fourth track name',
                imageUrl: 'someimg',
                step: 4,
                service: 'CAREER',
                units: [
                  { id: '7', name: 'Seventh unit', step: 1 },
                  { id: '8', name: 'Eighth unit', step: 2 },
                ],
              },
            ],
          },
          {
            archivedAt: null,
            description: 'Metro description more text about metro catalog',
            displayName: '',
            id: '12',
            imageUrl: 'metro.img',
            name: 'Cleveland Metro',
            status: '',
            service: 'LEARNING',
            thumbnailUrl: 'metro-thumbnail-url',
            tracks: [
              {
                id: '1',
                name: 'First track name',
                imageUrl: 'someimg',
                step: 1,
                service: 'LEARNING',
                units: [
                  { id: '1', name: 'First unit', step: 1 },
                  { id: '2', name: 'Second unit', step: 2 },
                ],
              },
              {
                id: '2',
                name: 'Second track name',
                imageUrl: 'someimg',
                step: 2,
                service: 'LEARNING',
                units: [
                  { id: '3', name: 'Third unit', step: 1 },
                  { id: '4', name: 'Fourth unit', step: 2 },
                ],
              },
              {
                id: '3',
                name: 'Third track name',
                imageUrl: 'someimg',
                step: 3,
                service: 'LEARNING',
                units: [
                  { id: '5', name: 'Fifth unit', step: 1 },
                  { id: '6', name: 'Sixth unit', step: 2 },
                ],
              },
              {
                id: '4',
                name: 'Fourth track name',
                imageUrl: 'someimg',
                step: 4,
                service: 'CAREER',
                units: [
                  { id: '7', name: 'Seventh unit', step: 1 },
                  { id: '8', name: 'Eighth unit', step: 2 },
                ],
              },
            ],
          },
        ],
      },
    },
  },
};

const plansMock = {
  request: {
    query: PLANS_QUERY,
    variables: {
      page: 1,
      perPage: 10,
    },
  },
  result: {
    data: {
      plans: {
        nodesCount: 1,
        pagesCount: 1,
        nodes: [
          {
            id: '1',
            name: 'Plan 1',
            archivedAt: null,
            description: 'Plan description',
            groups: [
              {
                id: '1',
                name: 'Group 1',
                statements: [
                  {
                    id: '1',
                    name: 'Statement 1',
                  },
                ],
              },
              {
                id: '2',
                name: 'Group 2',
                statements: [
                  {
                    id: '2',
                    name: 'Statement 2',
                  },
                ],
              },
            ],
          },
          {
            id: '2',
            name: 'Plan 2',
            archivedAt: null,
            description: 'Plan description',
            groups: [
              {
                id: '3',
                name: 'Group 3',
                statements: [
                  {
                    id: '1',
                    name: 'Statement 1',
                  },
                ],
              },
              {
                id: '4',
                name: 'Group 4',
                statements: [
                  {
                    id: '2',
                    name: 'Statement 2',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
};

const defaultSchoolYearStartDate = {
  day: 1,
  month: 7,
};

const defaultEntity = {
  name: 'Entity name',
  uuid: '1uuid',
  dcIconUrl: 'dcIconUrl',
  dcLogoUrl: 'dcLogoUrl',
  dlIconUrl: 'dlIconUrl',
  dlLogoUrl: 'dlLogoUrl',
  welcomeMessage: {
    dcStudent: 'dcStudentMessage',
    dcTeacher: 'dcTeacherMessage',
    dlStudent: 'dlStudentMessage',
    dlTeacher: 'dlTeacherMessage',
  },
  catalogs: [
    {
      archivedAt: null,
      description: 'Kankakee description',
      displayName: '',
      id: '12',
      imageUrl: 'Kankakee.img',
      name: 'Kankakee',
      status: '',
      service: 'LEARNING',
      thumbnailUrl: 'Kankakee-thumbnail-url',
      tracks: [
        {
          id: '1',
          name: 'First track name',
          imageUrl: 'someimg',
          step: 1,
          service: 'LEARNING',
          units: [
            { id: '1', name: 'First unit', step: 1 },
            { id: '2', name: 'Second unit', step: 2 },
          ],
        },
        {
          id: '2',
          name: 'Second track name',
          imageUrl: 'someimg',
          step: 2,
          service: 'LEARNING',
          units: [
            { id: '3', name: 'Third unit', step: 1 },
            { id: '4', name: 'Fourth unit', step: 2 },
          ],
        },
        {
          id: '3',
          name: 'Third track name',
          imageUrl: 'someimg',
          step: 3,
          service: 'LEARNING',
          units: [
            { id: '5', name: 'Fifth unit', step: 1 },
            { id: '6', name: 'Sixth unit', step: 2 },
          ],
        },
        {
          id: '4',
          name: 'Fourth track name',
          imageUrl: 'someimg',
          step: 4,
          service: 'CAREER',
          units: [
            { id: '7', name: 'Seventh unit', step: 1 },
            { id: '8', name: 'Eighth unit', step: 2 },
          ],
        },
      ],
    },
  ],
  plans: [
    {
      id: '11',
      name: 'First plan',
      step: 1,
    },
    {
      id: '12',
      name: 'Second plan',
      step: 2,
    },
    {
      id: '13',
      name: 'Third plan',
      step: 3,
    },
  ],
  settings: {
    assessmentEnabled: true,
    assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
    classManagementEnabled: true,
    onboardingEnabled: true,
    opportunitiesEnabled: true,
    selfEvaluationEnabled: true,
    postSecondaryApplicationsEnabled: true,
    schoolYearStartDate: defaultSchoolYearStartDate,
  },

  standardSets: [
    {
      id: '1',
      name: 'Alabama',
    },
    {
      id: '2',
      name: 'Hawaii',
    },
    {
      id: '3',
      name: 'Kansas',
    },
  ],
};

const renderEntity = (mocks = [], entity) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...defaultMock, ...mocks]}>
      <UserInfoProvider>
        <NavigationContextProvider>
          <AdminEntity entity={entity || defaultEntity} />
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

describe('AdminEntity', () => {
  it('displays list correctly', async () => {
    renderEntity([plansMock]);
    const plansTab = await screen.findByRole('tab', { name: 'Plans' });

    userEvent.click(plansTab);

    const allPlansTitle = await screen.findByRole('heading', { name: 'All Plans' });
    expect(allPlansTitle).toBeInTheDocument();
    const availablePlans = await screen.findAllByTestId(/available-item/);

    expect(availablePlans).toHaveLength(2);

    screen.getByRole('heading', { name: 'Selected (3)' });

    userEvent.click(within(availablePlans[0]).getByTestId(/add-item/));

    const selectedPlansHeading = screen.getByRole('heading', { name: 'Selected (4)' });
    expect(selectedPlansHeading).toBeInTheDocument();

    const selectedPlans = await screen.findAllByTestId(/selected-item/);

    expect(selectedPlans).toHaveLength(4);
  });

  it('shows details properly', async () => {
    renderEntity([plansMock]);

    const plansTab = await screen.findByRole('tab', { name: 'Plans' });
    userEvent.click(plansTab);

    const firstPlanDetailsButton = screen.getByRole('button', { name: 'Show First plan' });
    userEvent.click(firstPlanDetailsButton);

    const planModal = await screen.findByRole('dialog');
    const modalName = within(planModal).getByText('Plan details');

    expect(modalName).toBeVisible();

    const planName = await within(planModal).findByTestId(/plan-name/);
    expect(planName).toHaveTextContent('Plan 1');

    const planDescription = await within(planModal).findByTestId('plan-description');
    expect(planDescription).toHaveTextContent('Plan description');
  });

  it('opens and close assign modal properly', async () => {
    renderEntity([plansMock]);

    const plansTab = await screen.findByRole('tab', { name: 'Plans' });
    userEvent.click(plansTab);

    const availablePlans = await screen.findAllByTestId(/available-item/);
    userEvent.click(within(availablePlans[0]).getByTestId(/add-item/));

    const assignButton = await screen.findByTestId(/assign-plan-button/);
    userEvent.click(assignButton);

    expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();

    userEvent.click(await screen.findByTestId(/modal-close-button/));

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
    });
  });

  it('assigns new correctly without hierarchy checkbox', async () => {
    const assignSpy = jest.fn();
    const setEntityPlans = {
      setEntityPlans: {
        entity: {
          uuid: '1uuid',
          name: 'as',
        },
      },
    };
    const assignMutationMock = {
      request: {
        query: UpdateEntityPlansDocument,
        variables: {
          input: {
            plans: [
              { planId: '11', step: 1 },
              { planId: '12', step: 2 },
              { planId: '13', step: 3 },
              { planId: '1', step: 4 },
            ],
            uuid: '1uuid',
            applyToHierarchy: false,
          },
        },
      },
      result() {
        assignSpy();

        return {
          data: setEntityPlans,
        };
      },
    };

    renderEntity([plansMock, assignMutationMock]);

    const plansTab = await screen.findByRole('tab', { name: 'Plans' });
    userEvent.click(plansTab);

    const allPlansTitle = await screen.findByText(/All Plans/);
    expect(allPlansTitle).toBeInTheDocument();

    const availablePlans = await screen.findAllByTestId(/available-item/);
    expect(availablePlans).toHaveLength(2);

    userEvent.click(within(availablePlans[0]).getByTestId(/add-item/));

    const selectedPlansTitle = await screen.findByText(/Selected/);
    expect(selectedPlansTitle).toBeInTheDocument();

    const selectedPlans = await screen.findAllByTestId(/selected-item/);
    expect(selectedPlans).toHaveLength(4);

    userEvent.click(await screen.findByRole('button', { name: /Save/ }));

    expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
    expect(await screen.findByTestId(/modal-header/)).toHaveTextContent('Assign Plan');
    expect(await screen.findByTestId(/assign-plan-checkbox/)).not.toBeChecked();

    userEvent.click(await screen.findByTestId(/assign-modal-button/));

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(assignSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('assigns new correctly with hierarchy checkbox', async () => {
    const assignSpy = jest.fn();

    const assignMutationMock = {
      request: {
        query: UpdateEntityPlansDocument,
        variables: {
          input: {
            plans: [
              { planId: '11', step: 1 },
              { planId: '12', step: 2 },
              { planId: '13', step: 3 },
              { planId: '1', step: 4 },
            ],
            uuid: '1uuid',
            applyToHierarchy: true,
          },
        },
      },
      result() {
        assignSpy();

        return {
          data: {
            setEntityPlans: {
              entity: {
                uuid: '1uuid',
                name: 'as',
              },
            },
          },
        };
      },
    };

    renderEntity([plansMock, assignMutationMock]);

    const plansTab = await screen.findByRole('tab', { name: 'Plans' });
    userEvent.click(plansTab);

    const allPlansTitle = await screen.findByText(/All Plans/);
    expect(allPlansTitle).toBeInTheDocument();

    const availablePlans = await screen.findAllByTestId(/available-item/);
    expect(availablePlans).toHaveLength(2);

    userEvent.click(within(availablePlans[0]).getByTestId(/add-item/));

    const selectedPlansTitle = await screen.findByText(/Selected/);
    expect(selectedPlansTitle).toBeInTheDocument();

    const selectedPlans = await screen.findAllByTestId(/selected-item/);
    expect(selectedPlans).toHaveLength(4);

    userEvent.click(await screen.findByRole('button', { name: /Save/ }));

    expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
    expect(await screen.findByTestId(/modal-header/)).toHaveTextContent('Assign Plan');

    const assignToChildrenEntity = await screen.findByTestId(/assign-plan-checkbox/);
    userEvent.click(assignToChildrenEntity);

    expect(assignToChildrenEntity).toBeChecked();

    userEvent.click(await screen.findByTestId(/assign-modal-button/));

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
    });

    await waitFor(() => {
      assignMutationMock.request.variables.input.applyToHierarchy = false;
      expect(assignSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('unassigns correctly without hierarchy checkbox', async () => {
    const assignSpy = jest.fn();

    const assignMutationMock = {
      request: {
        query: UpdateEntityPlansDocument,
        variables: {
          input: {
            plans: [
              { planId: '12', step: 1 },
              { planId: '13', step: 2 },
            ],
            uuid: '1uuid',
            applyToHierarchy: false,
          },
        },
      },
      result() {
        assignSpy();

        return {
          data: {
            setEntityPlans: {
              entity: {
                uuid: '1uuid',
                name: 'as',
              },
            },
          },
        };
      },
    };

    renderEntity([plansMock, assignMutationMock]);
    const plansTab = await screen.findByRole('tab', { name: 'Plans' });
    userEvent.click(plansTab);

    const allPlansTitle = await screen.findByText(/All Plans/);
    expect(allPlansTitle).toBeInTheDocument();
    const availablePlans = await screen.findAllByTestId(/available-item/);

    expect(availablePlans).toHaveLength(2);

    const selectedPlansTitle = await screen.findByText(/Selected/);
    expect(selectedPlansTitle).toBeInTheDocument();
    const selectedPlans = await screen.findAllByTestId(/selected-item/);
    userEvent.click(within(selectedPlans[0]).getByTestId(/remove-item/));
    expect(selectedPlans).toHaveLength(3);

    userEvent.click(await screen.findByRole('button', { name: /Save/ }));

    expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
    expect(await screen.findByTestId(/modal-header/)).toHaveTextContent('Assign Plan');
    const assignToChildrenEntity = await screen.findByTestId(/assign-plan-checkbox/);
    expect(assignToChildrenEntity).not.toBeChecked();

    userEvent.click(await screen.findByTestId(/assign-modal-button/));

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(assignSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('unassigns correctly with hierarchy checkbox', async () => {
    const assignSpy = jest.fn();

    const assignMutationMock = {
      request: {
        query: UpdateEntityPlansDocument,
        variables: {
          input: {
            plans: [
              { planId: '12', step: 1 },
              { planId: '13', step: 2 },
            ],
            uuid: '1uuid',
            applyToHierarchy: true,
          },
        },
      },
      result() {
        assignSpy();

        return {
          data: {
            setEntityPlans: {
              entity: {
                uuid: '1uuid',
                name: 'as',
              },
            },
          },
        };
      },
    };

    renderEntity([plansMock, assignMutationMock]);

    const plansTab = await screen.findByRole('tab', { name: 'Plans' });
    userEvent.click(plansTab);

    const allPlansTitle = await screen.findByText(/All Plans/);
    expect(allPlansTitle).toBeInTheDocument();

    const availablePlans = await screen.findAllByTestId(/available-item/);
    expect(availablePlans).toHaveLength(2);

    const selectedPlansTitle = await screen.findByText(/Selected/);
    expect(selectedPlansTitle).toBeInTheDocument();

    const selectedPlans = await screen.findAllByTestId(/selected-item/);
    userEvent.click(within(selectedPlans[0]).getByTestId(/remove-item/));

    expect(selectedPlans).toHaveLength(3);

    userEvent.click(await screen.findByRole('button', { name: /Save/ }));

    expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
    expect(await screen.findByTestId(/modal-header/)).toHaveTextContent('Assign Plan');

    const assignToChildrenEntity = await screen.findByTestId(/assign-plan-checkbox/);
    userEvent.click(assignToChildrenEntity);

    expect(assignToChildrenEntity).toBeChecked();

    userEvent.click(await screen.findByTestId(/assign-modal-button/));

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(assignSpy).toHaveBeenCalledTimes(1);
    });
  });
  // LINK
  describe('standard sets', () => {
    it('displays list correctly', async () => {
      renderEntity();
      const plansTab = await screen.findByRole('tab', { name: 'Standard Sets' });

      userEvent.click(plansTab);

      const standardSets = await screen.findAllByTestId(/standard-set-list-item/);

      expect(standardSets).toHaveLength(3);
      expect(standardSets[0]).toHaveTextContent('Alabama');
      expect(standardSets[1]).toHaveTextContent('Hawaii');
      expect(standardSets[2]).toHaveTextContent('Kansas');
    });

    it('shows details properly', async () => {
      renderEntity();
      const plansTab = await screen.findByRole('tab', { name: 'Standard Sets' });
      userEvent.click(plansTab);

      const standardSets = await screen.findAllByTestId(/standard-set-list-item/);
      userEvent.click(standardSets[0]);

      expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
      expect(await screen.findByTestId(/modal-header/)).toHaveTextContent('Standard Set Details');
      expect(await screen.findByTestId(/standard-set-details-name/)).toHaveTextContent('Alabama');
      expect(await screen.findByTestId(/standard-set-details-displayname/)).toHaveTextContent(
        'Random name'
      );
      expect(await screen.findByTestId(/standard-set-details-setid/)).toHaveTextContent('AL');
    });

    it('opens and closes assign modal properly', async () => {
      renderEntity();
      const plansTab = await screen.findByRole('tab', { name: 'Standard Sets' });
      userEvent.click(plansTab);

      userEvent.click(await screen.findByTestId(/assign-standard-set-button/));

      expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();

      fireEvent.click(await screen.findByTestId(/modal-close-button/));

      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
      });
    });

    it('assigns new correctly without hierarchy checkbox', async () => {
      const assignSpy = jest.fn();

      const assignMutationMock = {
        request: {
          query: assignStandardSetToEntityMutation,
          variables: {
            input: {
              standardSetId: '5',
              entityUuid: '1uuid',
              assignToHierarchy: false,
            },
          },
        },
        result() {
          assignSpy();

          return {
            data: {
              assignStandardSetToEntity: {
                standardSet: {
                  id: '5',
                  entities: {
                    nodes: [
                      {
                        uuid: '1uuid',
                        standardSets: [
                          {
                            id: '1',
                          },
                          {
                            id: '2',
                          },
                          {
                            id: '3',
                          },
                          {
                            id: '4',
                          },
                          {
                            id: '5',
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          };
        },
      };

      renderEntity([assignMutationMock]);

      const plansTab = await screen.findByRole('tab', { name: 'Standard Sets' });
      userEvent.click(plansTab);

      userEvent.click(await screen.findByTestId(/assign-standard-set-button/));

      const select = screen.getByRole('combobox');
      userEvent.click(select);

      const standardSetOption = await screen.findByText('New York');
      expect(standardSetOption).toBeInTheDocument();

      userEvent.type(select, '{arrowdown}{enter}');

      userEvent.click(await screen.findByTestId(/assign-modal-button/));

      await waitFor(() => {
        expect(assignSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('assigns new correctly with hierarchy checkbox', async () => {
      const assignSpy = jest.fn();

      const assignMutationMock = {
        request: {
          query: assignStandardSetToEntityMutation,
          variables: {
            input: {
              standardSetId: '5',
              entityUuid: '1uuid',
              assignToHierarchy: true,
            },
          },
        },
        result() {
          assignSpy();

          return {
            data: {
              assignStandardSetToEntity: {
                standardSet: {
                  id: '5',
                  entities: {
                    nodes: [
                      {
                        uuid: '1uuid',
                        standardSets: [
                          {
                            id: '1',
                          },
                          {
                            id: '2',
                          },
                          {
                            id: '3',
                          },
                          {
                            id: '4',
                          },
                          {
                            id: '5',
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          };
        },
      };

      renderEntity([assignMutationMock]);

      const plansTab = await screen.findByRole('tab', { name: 'Standard Sets' });
      userEvent.click(plansTab);

      userEvent.click(await screen.findByTestId(/assign-standard-set-button/));

      const select = screen.getByRole('combobox');
      userEvent.click(select);

      const standardSetOption = await screen.findByText('New York');
      expect(standardSetOption).toBeInTheDocument();

      userEvent.type(select, '{arrowdown}{enter}');

      userEvent.click(await screen.findByTestId(/assign-standard-set-checkbox/));

      userEvent.click(await screen.findByTestId(/assign-modal-button/));

      await waitFor(() => {
        expect(assignSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('opens and closes unassign modal properly', async () => {
      renderEntity();
      const plansTab = await screen.findByRole('tab', { name: 'Standard Sets' });
      userEvent.click(plansTab);
      const unassignButton = await screen.findAllByTestId(/standard-set-unassign-button/);

      userEvent.click(unassignButton[0]);

      expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();

      userEvent.click(await screen.findByTestId(/modal-close-button/));

      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
      });
    });
  });

  describe('catalogs', () => {
    it('displays list correctly', async () => {
      renderEntity([catalogsMock]);
      const plansTab = await screen.findByRole('tab', { name: 'Catalogs' });

      userEvent.click(plansTab);

      const allCatalogsTitle = await screen.findByText(/All Catalogs/);
      expect(allCatalogsTitle).toBeInTheDocument();
      const availableCatalogs = await screen.findAllByTestId(/available-item/);

      expect(availableCatalogs).toHaveLength(2);

      userEvent.click(within(availableCatalogs[0]).getByTestId(/add-item/));

      const selectedCatalogsTitle = await screen.findByText(/Selected/);
      expect(selectedCatalogsTitle).toBeInTheDocument();
      const selectedCatalogs = await screen.findAllByTestId(/selected-item/);

      expect(selectedCatalogs).toHaveLength(2);
    });

    it('shows details properly', async () => {
      renderEntity([catalogsMock]);
      const plansTab = await screen.findByRole('tab', { name: 'Catalogs' });
      userEvent.click(plansTab);

      const firstCatalog = await screen.findAllByTestId(/item-more-info/);

      userEvent.click(firstCatalog[0]);

      const trackModal = await screen.findByRole('dialog');
      const modalName = within(trackModal).getByText('Catalog details');
      expect(modalName).toBeVisible();
      expect(await within(trackModal).findAllByRole('listitem')).toHaveLength(8);
      const catalogName = await within(trackModal).findByTestId(/catalog-name/);
      expect(catalogName).toHaveTextContent('Kankakee');
      const catalogDescription = await within(trackModal).findByTestId(/catalog-description/);
      expect(catalogDescription).toHaveTextContent('Kankakee description');
    });

    it('opens and close assign modal properly', async () => {
      renderEntity([catalogsMock]);

      const plansTab = await screen.findByRole('tab', { name: 'Catalogs' });
      userEvent.click(plansTab);

      const availableCatalogs = await screen.findAllByTestId(/available-item/);
      userEvent.click(within(availableCatalogs[0]).getByTestId(/add-item/));

      const assignButton = await screen.findByTestId(/assign-catalog-button/);
      userEvent.click(assignButton);

      expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();

      userEvent.click(await screen.findByTestId(/modal-close-button/));

      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
      });
    });

    it('assigns new correctly without hierarchy checkbox', async () => {
      const assignSpy = jest.fn();
      const setEntityCatalogs = {
        setEntityCatalogs: {
          entity: {
            uuid: '1uuid',
            name: 'as',
          },
        },
      };
      const assignMutationMock = {
        request: {
          query: UpdateEntityCatalogsDocument,
          variables: {
            input: {
              catalogs: [
                { catalogId: '12', step: 1 },
                { catalogId: '10', step: 2 },
              ],
              uuid: '1uuid',
              applyToHierarchy: false,
            },
          },
        },
        result() {
          assignSpy();

          return {
            data: setEntityCatalogs,
          };
        },
      };

      renderEntity([catalogsMock, assignMutationMock]);
      const plansTab = await screen.findByRole('tab', { name: 'Catalogs' });
      userEvent.click(plansTab);

      const allCatalogsTitle = await screen.findByText(/All Catalogs/);
      expect(allCatalogsTitle).toBeInTheDocument();
      const availableCatalogs = await screen.findAllByTestId(/available-item/);

      expect(availableCatalogs).toHaveLength(2);

      userEvent.click(within(availableCatalogs[0]).getByTestId(/add-item/));

      const selectedCatalogsTitle = await screen.findByText(/Selected/);
      expect(selectedCatalogsTitle).toBeInTheDocument();
      const selectedCatalogs = await screen.findAllByTestId(/selected-item/);

      expect(selectedCatalogs).toHaveLength(2);

      userEvent.click(await screen.findByRole('button', { name: /Save/ }));

      expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
      expect(await screen.findByTestId(/modal-header/)).toHaveTextContent('Assign Catalog');
      expect(await screen.findByTestId(/assign-catalog-checkbox/)).not.toBeChecked();
      userEvent.click(await screen.findByTestId(/assign-modal-button/));
      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(assignSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('assigns new correctly with hierarchy checkbox', async () => {
      const assignSpy = jest.fn();
      const applyToHierarchy = {
        catalogs: [
          { catalogId: '12', step: 1 },
          { catalogId: '10', step: 2 },
        ],
        uuid: '1uuid',
        applyToHierarchy: true,
      };
      const setEntityCatalogs = {
        setEntityCatalogs: {
          entity: {
            uuid: '1uuid',
            name: 'as',
          },
        },
      };
      const assignMutationMock = {
        request: {
          query: UpdateEntityCatalogsDocument,
          variables: {
            input: applyToHierarchy,
          },
        },
        result() {
          assignSpy();

          return {
            data: setEntityCatalogs,
          };
        },
      };

      renderEntity([catalogsMock, assignMutationMock]);
      const plansTab = await screen.findByRole('tab', { name: 'Catalogs' });
      userEvent.click(plansTab);

      const allCatalogsTitle = await screen.findByText(/All Catalogs/);
      expect(allCatalogsTitle).toBeInTheDocument();
      const availableCatalogs = await screen.findAllByTestId(/available-item/);

      expect(availableCatalogs).toHaveLength(2);

      userEvent.click(within(availableCatalogs[0]).getByTestId(/add-item/));

      const selectedCatalogsTitle = await screen.findByText(/Selected/);
      expect(selectedCatalogsTitle).toBeInTheDocument();
      const selectedCatalogs = await screen.findAllByTestId(/selected-item/);

      expect(selectedCatalogs).toHaveLength(2);

      userEvent.click(await screen.findByRole('button', { name: /Save/ }));

      expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
      expect(await screen.findByTestId(/modal-header/)).toHaveTextContent('Assign Catalog');
      const assignToChildrenEntity = await screen.findByTestId(/assign-catalog-checkbox/);
      userEvent.click(assignToChildrenEntity);
      expect(assignToChildrenEntity).toBeChecked();

      userEvent.click(await screen.findByTestId(/assign-modal-button/));

      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
      });

      await waitFor(() => {
        assignMutationMock.request.variables.input.applyToHierarchy = false;
        expect(assignSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('unassigns correctly without hierarchy checkbox', async () => {
      const assignSpy = jest.fn();
      const applyToHierarchy = {
        catalogs: [],
        uuid: '1uuid',
        applyToHierarchy: false,
      };
      const setEntityCatalogs = {
        setEntityCatalogs: {
          entity: {
            uuid: '1uuid',
            name: 'as',
          },
        },
      };
      const assignMutationMock = {
        request: {
          query: UpdateEntityCatalogsDocument,
          variables: {
            input: applyToHierarchy,
          },
        },
        result() {
          assignSpy();

          return {
            data: setEntityCatalogs,
          };
        },
      };

      renderEntity([catalogsMock, assignMutationMock]);
      const plansTab = await screen.findByRole('tab', { name: 'Catalogs' });
      userEvent.click(plansTab);

      const allCatalogsTitle = await screen.findByText(/All Catalogs/);
      expect(allCatalogsTitle).toBeInTheDocument();
      const availableCatalogs = await screen.findAllByTestId(/available-item/);

      expect(availableCatalogs).toHaveLength(2);

      const selectedCatalogsTitle = await screen.findByText(/Selected/);
      expect(selectedCatalogsTitle).toBeInTheDocument();
      const selectedCatalogs = await screen.findAllByTestId(/selected-item/);
      userEvent.click(within(selectedCatalogs[0]).getByTestId(/remove-item/));
      expect(selectedCatalogs).toHaveLength(1);

      userEvent.click(await screen.findByRole('button', { name: /Save/ }));

      expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
      expect(await screen.findByTestId(/modal-header/)).toHaveTextContent('Assign Catalog');
      const assignToChildrenEntity = await screen.findByTestId(/assign-catalog-checkbox/);
      expect(assignToChildrenEntity).not.toBeChecked();

      userEvent.click(await screen.findByTestId(/assign-modal-button/));

      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(assignSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('unassigns correctly with hierarchy checkbox', async () => {
      const assignSpy = jest.fn();
      const applyToHierarchy = {
        catalogs: [],
        uuid: '1uuid',
        applyToHierarchy: true,
      };
      const setEntityCatalogs = {
        setEntityCatalogs: {
          entity: {
            uuid: '1uuid',
            name: 'as',
          },
        },
      };
      const assignMutationMock = {
        request: {
          query: UpdateEntityCatalogsDocument,
          variables: {
            input: applyToHierarchy,
          },
        },
        result() {
          assignSpy();

          return {
            data: setEntityCatalogs,
          };
        },
      };

      renderEntity([catalogsMock, assignMutationMock]);
      const plansTab = await screen.findByRole('tab', { name: 'Catalogs' });
      userEvent.click(plansTab);

      const allCatalogsTitle = await screen.findByText(/All Catalogs/);
      expect(allCatalogsTitle).toBeInTheDocument();
      const availableCatalogs = await screen.findAllByTestId(/available-item/);

      expect(availableCatalogs).toHaveLength(2);

      const selectedCatalogsTitle = await screen.findByText(/Selected/);
      expect(selectedCatalogsTitle).toBeInTheDocument();
      const selectedCatalogs = await screen.findAllByTestId(/selected-item/);
      userEvent.click(within(selectedCatalogs[0]).getByTestId(/remove-item/));
      expect(selectedCatalogs).toHaveLength(1);

      userEvent.click(await screen.findByRole('button', { name: /Save/ }));

      expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
      expect(await screen.findByTestId(/modal-header/)).toHaveTextContent('Assign Catalog');
      const assignToChildrenEntity = await screen.findByTestId(/assign-catalog-checkbox/);
      userEvent.click(assignToChildrenEntity);
      expect(assignToChildrenEntity).toBeChecked();

      userEvent.click(await screen.findByTestId(/assign-modal-button/));

      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
      });

      await waitFor(() => {
        assignMutationMock.request.variables.input.applyToHierarchy = false;
        expect(assignSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('settings', () => {
    describe('assessment', () => {
      it('assessment switch have proper value based on settings', async () => {
        renderEntity();

        expect(await screen.findByTestId(/assessmentEnabled-switch/)).toBeChecked();
      });

      it('opens and closes modal on assessment switch properly', async () => {
        renderEntity([], {
          uuid: '1uuid',
          plans: [],
          catalogs: [],
          dcIconUrl: '',
          dcLogoUrl: '',
          dlIconUrl: '',
          dlLogoUrl: '',
          welcomeMessage: {
            dcStudent: '',
            dcTeacher: '',
            dlStudent: '',
            dlTeacher: '',
          },
          settings: {
            onboardingEnabled: false,
            assessmentEnabled: false,
            opportunitiesEnabled: false,
            schoolYearStartDate: defaultSchoolYearStartDate,
          },
          standardSets: [],
        });

        userEvent.click(await screen.findByTestId(/assessmentEnabled-switch/));

        expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();

        userEvent.click(await screen.findByTestId(/modal-close-button/));

        await waitFor(() => {
          expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
        });
      });

      it('switches assessment with hierarchy properly', async () => {
        const updateSettingsSpy = jest.fn();

        const updateSettingsMock = {
          request: {
            query: updateEntitySettingsMutation,
            variables: {
              input: {
                uuid: '1uuid',
                settings: {
                  assessmentEnabled: { value: true, applyToHierarchy: true, force: false },
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateEntitySettings: {
                  entity: {
                    settings: {
                      assessmentEnabled: true,
                      assessmentType: 'type',
                      onboardingEnabled: false,
                      selfEvaluationEnabled: true,
                      postSecondaryApplicationsEnabled: true,
                      opportunitiesEnabled: true,
                      classManagementEnabled: true,
                      schoolYearStartDate: defaultSchoolYearStartDate,
                    },
                    schoolClasses: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: 'type',
                          },
                          students: {
                            nodes: [
                              {
                                settings: {
                                  assessmentEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                  assessmentType: {
                                    origin: '',
                                    value: '',
                                  },
                                  onboardingEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                },
                                uuid: 'uud',
                              },
                            ],
                          },
                          uuid: 'uud',
                        },
                      ],
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        renderEntity([updateSettingsMock], {
          uuid: '1uuid',
          dcIconUrl: 'dcIconUrl',
          dcLogoUrl: 'dcLogoUrl',
          dlIconUrl: 'dlIconUrl',
          dlLogoUrl: 'dlLogoUrl',
          welcomeMessage: {
            dcStudent: 'dcStudent Message',
            dcTeacher: 'dcTeacher Message',
            dlStudent: 'dlStudent Message',
            dlTeacher: 'dlTeacher Message',
          },
          plans: [],
          catalogs: [],
          settings: {
            onboardingEnabled: false,
            assessmentEnabled: false,
            schoolYearStartDate: defaultSchoolYearStartDate,
          },
          standardSets: [],
        });

        userEvent.click(await screen.findByTestId(/assessmentEnabled-switch/));
        userEvent.click(await screen.findByTestId(/hierarchy-checkbox/));
        userEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('switches assessment without hierarchy properly', async () => {
        const updateSettingsSpy = jest.fn();

        const updateSettingsMock = {
          request: {
            query: updateEntitySettingsMutation,
            variables: {
              input: {
                uuid: '1uuid',
                settings: {
                  assessmentEnabled: { value: true, applyToHierarchy: false, force: false },
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateEntitySettings: {
                  entity: {
                    settings: {
                      assessmentEnabled: true,
                      assessmentType: 'type',
                      onboardingEnabled: false,
                      selfEvaluationEnabled: true,
                      opportunitiesEnabled: true,
                      postSecondaryApplicationsEnabled: true,
                      classManagementEnabled: true,
                      schoolYearStartDate: defaultSchoolYearStartDate,
                    },
                    schoolClasses: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: 'type',
                          },
                          students: {
                            nodes: [
                              {
                                settings: {
                                  assessmentEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                  assessmentType: {
                                    origin: '',
                                    value: '',
                                  },
                                  onboardingEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                },
                                uuid: 'uud',
                              },
                            ],
                          },
                          uuid: 'uud',
                        },
                      ],
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        renderEntity([updateSettingsMock], {
          uuid: '1uuid',
          dcIconUrl: 'dcIconUrl',
          dcLogoUrl: 'cdLogoUrl',
          dlIconUrl: 'dlIconUrl',
          dlLogoUrl: 'dlLogoUrl',
          welcomeMessage: {
            dcStudent: 'dcStudent Message',
            dcTeacher: 'dcTeacher Message',
            dlStudent: 'dlStudent Message',
            dlTeacher: 'dlTeacher Message',
          },
          plans: [],
          catalogs: [],
          settings: {
            onboardingEnabled: false,
            assessmentEnabled: false,
            schoolYearStartDate: defaultSchoolYearStartDate,
          },
          standardSets: [],
        });

        userEvent.click(await screen.findByTestId(/assessmentEnabled-switch/));

        userEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('switches onboarding off with assessment when turning off', async () => {
        const updateSettingsSpy = jest.fn();

        const updateSettingsMock = {
          request: {
            query: updateEntitySettingsMutation,
            variables: {
              input: {
                uuid: '1uuid',
                settings: {
                  assessmentEnabled: { value: false, applyToHierarchy: false, force: false },
                  onboardingEnabled: { value: false, applyToHierarchy: false, force: false },
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateEntitySettings: {
                  entity: {
                    settings: {
                      assessmentEnabled: false,
                      assessmentType: 'type',
                      onboardingEnabled: false,
                      selfEvaluationEnabled: true,
                      opportunitiesEnabled: true,
                      postSecondaryApplicationsEnabled: true,
                      classManagementEnabled: true,
                      schoolYearStartDate: defaultSchoolYearStartDate,
                    },
                    schoolClasses: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: 'type',
                          },
                          students: {
                            nodes: [
                              {
                                settings: {
                                  assessmentEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                  assessmentType: {
                                    origin: '',
                                    value: '',
                                  },
                                  onboardingEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                },
                                uuid: 'uud',
                              },
                            ],
                          },
                          uuid: 'uud',
                        },
                      ],
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        renderEntity([updateSettingsMock], {
          uuid: '1uuid',
          plans: [],
          catalogs: [],
          dcIconUrl: 'dcIconUrl',
          dcLogoUrl: 'cdLogoUrl',
          dlIconUrl: 'dlIconUrl',
          dlLogoUrl: 'dlLogoUrl',
          welcomeMessage: {
            dcStudent: 'dcStudent Message',
            dcTeacher: 'dcTeacher Message',
            dlStudent: 'dlStudent Message',
            dlTeacher: 'dlTeacher Message',
          },
          settings: {
            onboardingEnabled: true,
            assessmentEnabled: true,
            schoolYearStartDate: defaultSchoolYearStartDate,
          },
          standardSets: [],
        });

        userEvent.click(await screen.findByTestId(/assessmentEnabled-switch/));

        userEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('onboarding', () => {
      it('onboarding switch have proper value based on settings', async () => {
        renderEntity();

        expect(await screen.findByTestId(/onboardingEnabled-switch/)).toBeChecked();
      });

      it('opens and closes modal on onboarding switch properly', async () => {
        renderEntity();

        userEvent.click(await screen.findByTestId(/onboardingEnabled-switch/));

        expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();

        userEvent.click(await screen.findByTestId(/modal-close-button/));

        await waitFor(() => {
          expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
        });
      });

      it('switches onboarding with hierarchy properly', async () => {
        const updateSettingsSpy = jest.fn();

        const updateSettingsMock = {
          request: {
            query: updateEntitySettingsMutation,
            variables: {
              input: {
                uuid: '1uuid',
                settings: {
                  onboardingEnabled: { value: false, applyToHierarchy: true, force: false },
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateEntitySettings: {
                  entity: {
                    settings: {
                      assessmentEnabled: true,
                      assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                      onboardingEnabled: false,
                      selfEvaluationEnabled: true,
                      opportunitiesEnabled: true,
                      postSecondaryApplicationsEnabled: true,
                      classManagementEnabled: true,
                      schoolYearStartDate: defaultSchoolYearStartDate,
                    },
                    schoolClasses: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: 'type',
                          },
                          students: {
                            nodes: [
                              {
                                settings: {
                                  assessmentEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                  assessmentType: {
                                    origin: '',
                                    value: '',
                                  },
                                  onboardingEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                },
                                uuid: 'uud',
                              },
                            ],
                          },
                          uuid: 'uud',
                        },
                      ],
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        renderEntity([updateSettingsMock]);

        userEvent.click(await screen.findByTestId(/onboardingEnabled-switch/));

        userEvent.click(await screen.findByTestId(/hierarchy-checkbox/));
        userEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('switches onboarding without hierarchy properly', async () => {
        const updateSettingsSpy = jest.fn();

        const updateSettingsMock = {
          request: {
            query: updateEntitySettingsMutation,
            variables: {
              input: {
                uuid: '1uuid',
                settings: {
                  onboardingEnabled: { value: false, applyToHierarchy: false, force: false },
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateEntitySettings: {
                  entity: {
                    settings: {
                      assessmentEnabled: true,
                      assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                      onboardingEnabled: false,
                      selfEvaluationEnabled: true,
                      opportunitiesEnabled: true,
                      postSecondaryApplicationsEnabled: true,
                      classManagementEnabled: true,
                      schoolYearStartDate: defaultSchoolYearStartDate,
                    },
                    schoolClasses: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: 'type',
                          },
                          students: {
                            nodes: [
                              {
                                settings: {
                                  assessmentEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                  assessmentType: {
                                    origin: '',
                                    value: '',
                                  },
                                  onboardingEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                },
                                uuid: 'uud',
                              },
                            ],
                          },
                          uuid: 'uud',
                        },
                      ],
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        renderEntity([updateSettingsMock]);
        userEvent.click(await screen.findByTestId(/onboardingEnabled-switch/));

        userEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('switches assessment on with onboarding when turning on', async () => {
        const updateSettingsSpy = jest.fn();

        const updateSettingsMock = {
          request: {
            query: updateEntitySettingsMutation,
            variables: {
              input: {
                uuid: '1uuid',
                settings: {
                  assessmentEnabled: { value: false, applyToHierarchy: false, force: false },
                  onboardingEnabled: { value: false, applyToHierarchy: false, force: false },
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateEntitySettings: {
                  entity: {
                    settings: {
                      assessmentEnabled: true,
                      assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                      onboardingEnabled: true,
                      selfEvaluationEnabled: true,
                      opportunitiesEnabled: true,
                      postSecondaryApplicationsEnabled: true,
                      classManagementEnabled: true,
                      schoolYearStartDate: defaultSchoolYearStartDate,
                    },
                    schoolClasses: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: 'type',
                          },
                          students: {
                            nodes: [
                              {
                                settings: {
                                  assessmentEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                  assessmentType: {
                                    origin: '',
                                    value: '',
                                  },
                                  onboardingEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                },
                                uuid: 'uud',
                              },
                            ],
                          },
                          uuid: 'uud',
                        },
                      ],
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        renderEntity([updateSettingsMock], {
          uuid: '1uuid',
          plans: [],
          catalogs: [],
          dcIconUrl: 'dcIconUrl',
          dcLogoUrl: 'cdLogoUrl',
          dlIconUrl: 'dlIconUrl',
          dlLogoUrl: 'dlLogoUrl',
          welcomeMessage: {
            dcStudent: 'dcStudent Message',
            dcTeacher: 'dcTeacher Message',
            dlStudent: 'dlStudent Message',
            dlTeacher: 'dlTeacher Message',
          },
          settings: {
            onboardingEnabled: true,
            assessmentEnabled: true,
            schoolYearStartDate: defaultSchoolYearStartDate,
          },
          standardSets: [],
        });

        userEvent.click(await screen.findByTestId(/assessmentEnabled-switch/));
        userEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('Assessment Type', () => {
      it('Assessment Type switch have proper value based on settings', async () => {
        renderEntity();

        expect(await screen.findByTestId(/assessmentType-switch/)).not.toBeChecked();
      });

      it('opens and closes modal on Assessment Type switch properly', async () => {
        renderEntity();

        userEvent.click(await screen.findByTestId(/assessmentType-switch/));

        expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();

        userEvent.click(await screen.findByTestId(/modal-close-button/));

        await waitFor(() => {
          expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
        });
      });

      it('switches Assessment Type setting with hierarchy and without overwrite individual students settings', async () => {
        const updateSettingsSpy = jest.fn();

        const updateSettingsMock = {
          request: {
            query: updateEntitySettingsMutation,
            variables: {
              input: {
                uuid: '1uuid',
                settings: {
                  assessmentType: {
                    value: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                    applyToHierarchy: true,
                    force: false,
                  },
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateEntitySettings: {
                  entity: {
                    settings: {
                      assessmentEnabled: true,
                      assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
                      onboardingEnabled: false,
                      selfEvaluationEnabled: true,
                      opportunitiesEnabled: true,
                      postSecondaryApplicationsEnabled: true,
                      classManagementEnabled: true,
                      schoolYearStartDate: defaultSchoolYearStartDate,
                    },
                    schoolClasses: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: 'type',
                          },
                          students: {
                            nodes: [
                              {
                                settings: {
                                  assessmentEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                  assessmentType: {
                                    origin: '',
                                    value: '',
                                  },
                                  onboardingEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                },
                                uuid: 'uud',
                              },
                            ],
                          },
                          uuid: 'uud',
                        },
                      ],
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        renderEntity([updateSettingsMock]);

        userEvent.click(await screen.findByTestId(/assessmentType-switch/));

        userEvent.click(await screen.findByTestId(/hierarchy-checkbox/));
        userEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('switches Assessment Type setting with hierarchy and overwrite individual students settings', async () => {
        const updateSettingsSpy = jest.fn();

        const updateSettingsMock = {
          request: {
            query: updateEntitySettingsMutation,
            variables: {
              input: {
                uuid: '1uuid',
                settings: {
                  assessmentType: {
                    value: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                    applyToHierarchy: true,
                    force: true,
                  },
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateEntitySettings: {
                  entity: {
                    settings: {
                      assessmentEnabled: true,
                      assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                      onboardingEnabled: false,
                      selfEvaluationEnabled: true,
                      opportunitiesEnabled: true,
                      postSecondaryApplicationsEnabled: true,
                      classManagementEnabled: true,
                      schoolYearStartDate: defaultSchoolYearStartDate,
                    },
                    schoolClasses: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: 'type',
                          },
                          students: {
                            nodes: [
                              {
                                settings: {
                                  assessmentEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                  assessmentType: {
                                    origin: '',
                                    value: '',
                                  },
                                  onboardingEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                },
                                uuid: 'uud',
                              },
                            ],
                          },
                          uuid: 'uud',
                        },
                      ],
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        renderEntity([updateSettingsMock]);
        userEvent.click(await screen.findByTestId(/assessmentType-switch/));

        userEvent.click(await screen.findByTestId(/hierarchy-checkbox/));
        userEvent.click(await screen.findByTestId(/overwrite-checkbox/));
        userEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('self evaluation', () => {
      it('self evaluation switch have proper value based on settings', async () => {
        renderEntity();

        expect(await screen.findByTestId(/selfEvaluationEnabled-switch/)).toBeChecked();
      });

      it('opens and closes modal on self evaluation switch properly', async () => {
        renderEntity();

        userEvent.click(await screen.findByTestId(/selfEvaluationEnabled-switch/));

        expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();

        userEvent.click(await screen.findByTestId(/modal-close-button/));

        await waitFor(() => {
          expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
        });
      });

      it('switches self evaluation setting with hierarchy and without overwrite individual students settings', async () => {
        const updateSettingsSpy = jest.fn();

        const updateSettingsMock = {
          request: {
            query: updateEntitySettingsMutation,
            variables: {
              input: {
                uuid: '1uuid',
                settings: {
                  selfEvaluationEnabled: { value: false, applyToHierarchy: true, force: false },
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateEntitySettings: {
                  entity: {
                    settings: {
                      assessmentEnabled: true,
                      assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                      onboardingEnabled: false,
                      selfEvaluationEnabled: false,
                      opportunitiesEnabled: true,
                      postSecondaryApplicationsEnabled: true,
                      classManagementEnabled: true,
                      schoolYearStartDate: defaultSchoolYearStartDate,
                    },
                    schoolClasses: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: 'type',
                          },
                          students: {
                            nodes: [
                              {
                                settings: {
                                  assessmentEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                  assessmentType: {
                                    origin: '',
                                    value: '',
                                  },
                                  onboardingEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                },
                                uuid: 'uud',
                              },
                            ],
                          },
                          uuid: 'uud',
                        },
                      ],
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        renderEntity([updateSettingsMock]);
        userEvent.click(await screen.findByTestId(/selfEvaluationEnabled-switch/));

        userEvent.click(await screen.findByTestId(/hierarchy-checkbox/));
        userEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('switches self evaluation setting with hierarchy and overwrite individual students settings', async () => {
        const updateSettingsSpy = jest.fn();

        const updateSettingsMock = {
          request: {
            query: updateEntitySettingsMutation,
            variables: {
              input: {
                uuid: '1uuid',
                settings: {
                  selfEvaluationEnabled: { value: false, applyToHierarchy: true, force: true },
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateEntitySettings: {
                  entity: {
                    settings: {
                      assessmentEnabled: true,
                      assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                      onboardingEnabled: false,
                      selfEvaluationEnabled: false,
                      opportunitiesEnabled: true,
                      postSecondaryApplicationsEnabled: true,
                      classManagementEnabled: true,
                      schoolYearStartDate: defaultSchoolYearStartDate,
                    },
                    schoolClasses: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: 'type',
                          },
                          students: {
                            nodes: [
                              {
                                settings: {
                                  assessmentEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                  assessmentType: {
                                    origin: '',
                                    value: '',
                                  },
                                  onboardingEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                },
                                uuid: 'uud',
                              },
                            ],
                          },
                          uuid: 'uud',
                        },
                      ],
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        renderEntity([updateSettingsMock]);

        userEvent.click(await screen.findByTestId(/selfEvaluationEnabled-switch/));

        userEvent.click(await screen.findByTestId(/hierarchy-checkbox/));
        userEvent.click(await screen.findByTestId(/overwrite-checkbox/));
        userEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('opportunities', () => {
      it('opportunities switch have proper value based on settings', async () => {
        renderEntity();

        const opportunitiesSwitch = await screen.findByTestId(/opportunities/);

        expect(opportunitiesSwitch).toBeChecked();
      });

      it('opens and closes modal on self evaluation switch properly', async () => {
        renderEntity();
        const opportunitiesSwitch = await screen.findByTestId(/opportunities/);

        userEvent.click(opportunitiesSwitch);

        expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();

        userEvent.click(await screen.findByTestId(/modal-close-button/));

        await waitFor(() => {
          expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
        });
      });

      it('switches opportunities setting with hierarchy and without overwrite individual students settings', async () => {
        const updateSettingsSpy = jest.fn();

        const updateSettingsMock = {
          request: {
            query: updateEntitySettingsMutation,
            variables: {
              input: {
                uuid: '1uuid',
                settings: {
                  opportunitiesEnabled: { value: false, applyToHierarchy: true, force: false },
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateEntitySettings: {
                  entity: {
                    settings: {
                      assessmentEnabled: true,
                      assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                      onboardingEnabled: false,
                      opportunitiesEnabled: false,
                      postSecondaryApplicationsEnabled: false,
                      selfEvaluationEnabled: false,
                      classManagementEnabled: true,
                      schoolYearStartDate: defaultSchoolYearStartDate,
                    },
                    schoolClasses: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: 'type',
                          },
                          students: {
                            nodes: [
                              {
                                settings: {
                                  assessmentEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                  assessmentType: {
                                    origin: '',
                                    value: '',
                                  },
                                  onboardingEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                },
                                uuid: 'uud',
                              },
                            ],
                          },
                          uuid: 'uud',
                        },
                      ],
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        renderEntity([updateSettingsMock]);
        const switchInput = await screen.findByTestId(/opportunities/);

        expect(switchInput).toBeChecked();

        fireEvent.click(await screen.findByTestId(/opportunities/));

        fireEvent.click(await screen.findByTestId(/hierarchy-checkbox/));

        fireEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('switches opportunities setting with hierarchy and overwrite individual students settings', async () => {
        const updateSettingsSpy = jest.fn();

        const updateSettingsMock = {
          request: {
            query: updateEntitySettingsMutation,
            variables: {
              input: {
                uuid: '1uuid',
                settings: {
                  opportunitiesEnabled: { value: false, applyToHierarchy: true, force: true },
                },
              },
            },
          },
          result() {
            updateSettingsSpy();

            return {
              data: {
                updateEntitySettings: {
                  entity: {
                    settings: {
                      assessmentEnabled: true,
                      assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                      onboardingEnabled: false,
                      opportunitiesEnabled: false,
                      selfEvaluationEnabled: false,
                      postSecondaryApplicationsEnabled: true,
                      classManagementEnabled: true,
                      schoolYearStartDate: defaultSchoolYearStartDate,
                    },
                    schoolClasses: {
                      nodes: [
                        {
                          settings: {
                            assessmentType: 'type',
                          },
                          students: {
                            nodes: [
                              {
                                settings: {
                                  assessmentEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                  assessmentType: {
                                    origin: '',
                                    value: '',
                                  },
                                  onboardingEnabled: {
                                    origin: '',
                                    value: '',
                                  },
                                },
                                uuid: 'uud',
                              },
                            ],
                          },
                          uuid: 'uud',
                        },
                      ],
                    },
                    uuid: '1uuid',
                  },
                },
              },
            };
          },
        };

        renderEntity([updateSettingsMock]);

        fireEvent.click(await screen.findByTestId(/opportunities/));

        fireEvent.click(await screen.findByTestId(/hierarchy-checkbox/));

        fireEvent.click(await screen.findByTestId(/overwrite-checkbox/));

        fireEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('postSecondary', () => {
      it('switch have proper value based on settings', async () => {
        renderEntity();

        const postSecondarySwitch = await screen.findByTestId(/postSecondaryApplicationsEnabled/);

        expect(postSecondarySwitch).toBeChecked();
      });

      it('switch opens modal & modal are closed after clicking Close button', async () => {
        renderEntity();

        const postSecondarySwitch = await screen.findByTestId(/postSecondaryApplicationsEnabled/);

        userEvent.click(postSecondarySwitch);

        expect(await screen.findByRole('dialog', { name: 'Modal' })).toBeInTheDocument();

        userEvent.click(await screen.findByTestId(/modal-close-button/));

        await waitFor(() => {
          expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
        });
      });

      const updateSettingsMock = (settingsMock, responseSpy) => ({
        request: {
          query: updateEntitySettingsMutation,
          variables: {
            input: {
              uuid: '1uuid',
              settings: settingsMock,
            },
          },
        },
        result() {
          responseSpy();

          return {
            data: {
              updateEntitySettings: {
                entity: {
                  settings: {
                    assessmentEnabled: true,
                    assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                    onboardingEnabled: false,
                    opportunitiesEnabled: false,
                    postSecondaryApplicationsEnabled: false,
                    selfEvaluationEnabled: false,
                    classManagementEnabled: true,
                    schoolYearStartDate: defaultSchoolYearStartDate,
                  },
                  schoolClasses: {
                    nodes: [
                      {
                        settings: {
                          assessmentType: 'type',
                        },
                        students: {
                          nodes: [
                            {
                              settings: {
                                assessmentEnabled: {
                                  origin: '',
                                  value: '',
                                },
                                assessmentType: {
                                  origin: '',
                                  value: '',
                                },
                                onboardingEnabled: {
                                  origin: '',
                                  value: '',
                                },
                              },
                              uuid: 'uud',
                            },
                          ],
                        },
                        uuid: 'uud',
                      },
                    ],
                  },
                  uuid: '1uuid',
                },
              },
            },
          };
        },
      });
      it('switches post secondary setting without applying to hierarchy', async () => {
        const updateSettingsSpy = jest.fn();

        const mock = {
          postSecondaryApplicationsEnabled: {
            value: false,
            applyToHierarchy: false,
            force: false,
          },
        };

        renderEntity([updateSettingsMock(mock, updateSettingsSpy)]);

        const postSecondarySwitch = await screen.findByTestId(/postSecondaryApplicationsEnabled/);

        expect(postSecondarySwitch).toBeChecked();

        userEvent.click(postSecondarySwitch);

        userEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('switches post secondary setting with applying to hierarchy', async () => {
        const updateSettingsSpy = jest.fn();

        const mock = {
          postSecondaryApplicationsEnabled: {
            value: false,
            applyToHierarchy: true,
            force: false,
          },
        };

        renderEntity([updateSettingsMock(mock, updateSettingsSpy)]);

        const postSecondarySwitch = await screen.findByTestId(/postSecondaryApplicationsEnabled/);

        expect(postSecondarySwitch).toBeChecked();

        userEvent.click(postSecondarySwitch);

        userEvent.click(await screen.findByTestId(/hierarchy-checkbox/));

        userEvent.click(await screen.findByTestId(/save-settings-button/));

        await waitFor(() => {
          expect(updateSettingsSpy).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
