import { MockedProvider } from '@apollo/client/testing';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CAREER_COURSE_SETTINGS_TYPES, ROLES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { Extensions } from '@dc/components/EntityInfoExtensions';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { EntityProvider } from '@shared/hooks/useEntity';
import { EntityInfo } from '@shared/components/EntityInfo';

const entityProps = {
  catalogs: [
    {
      id: '1',
      name: 'Catalog 1',
    },
  ],
  extensionFields: [
    {
      id: '1',
      name: 'Extension Field 1',
    },
    {
      id: '2',
      name: 'Extension Field 2',
    },
    {
      id: '3',
      name: 'Extension Field 3',
    },
  ],
  hasChildren: false,
  hierarchyMetrics: {
    entitiesCount: 0,
    schoolClassesCount: 6,
    studentsCount: 20,
    teachersCount: 2,
  },
  name: 'Harvard University',
  plans: [
    {
      id: '1',
      name: 'Plan 1',
    },
    {
      id: '2',
      name: 'Plan 2',
    },
  ],
  settings: {
    assessmentEnabled: true,
    assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
    onboardingEnabled: true,
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
  uuid: '1',
};

const renderEntityInfo = (
  props = entityProps,
  userRole = ROLES.ENTITY_ADMIN,
  additionalContentComponent
) =>
  renderWithRouterAndReduxProvider(
    <EntityProvider entity={props} saveEntitySetting={jest.fn()}>
      <MockedProvider>
        <UserInfoProvider value={{ userInfo: { role: userRole } }}>
          <NavigationContextProvider>
            <EntityInfo additionalContent={additionalContentComponent} />
          </NavigationContextProvider>
        </UserInfoProvider>
      </MockedProvider>
    </EntityProvider>
  );

describe('UserDashboardEntityAdminViewInfo', () => {
  it('renders settings button when user role is system admin', async () => {
    const { getByTestId } = renderEntityInfo(entityProps, ROLES.SYSTEM_ADMIN);

    expect(getByTestId(/entity-settings-button/)).toBeInTheDocument();
  });

  it('displays entity name, entity metrics and current settings correctly', async () => {
    const { container } = renderEntityInfo();

    expect(container).toHaveTextContent(/harvard university/i);
    expect(container).toHaveTextContent(/entities:-/i);
    expect(container).toHaveTextContent(/teachers:2/i);
    expect(container).toHaveTextContent(/classes:6/i);
    expect(container).toHaveTextContent(/students:20/i);
    expect(container).toHaveTextContent(/assessment:enabled/i);
    expect(container).toHaveTextContent(/assessment type:Middle School/i);
    expect(container).toHaveTextContent(/onboarding:enabled/i);
  });

  it('displays entity name with Middle School label if entity has "Middle School" assessment type', async () => {
    const { container } = renderEntityInfo();

    const entityItemStageIcon = within(container).getAllByTestId('icon')[0];
    userEvent.hover(entityItemStageIcon);
    const entityStageTooltip = await screen.findByRole('tooltip', { hidden: true });
    expect(entityStageTooltip).toHaveTextContent('Middle School entity');
    userEvent.unhover(entityItemStageIcon);
  });

  it('displays extension fields list correctly', async () => {
    const { getAllByTestId } = renderEntityInfo(undefined, undefined, <Extensions />);

    const extensionsList = getAllByTestId(/entity-info-list$/)[0];

    expect(extensionsList).toHaveTextContent(/Extension Fields/i);
    expect(within(extensionsList).getAllByTestId(/entity-info-list-item/)).toHaveLength(3);
    expect(within(extensionsList).getByText(/Assign Extension/i)).toBeInTheDocument();
    expect(within(extensionsList).getAllByTestId(/entity-info-list-item/)[0]).toHaveTextContent(
      /Extension Field 1/i
    );
    expect(within(extensionsList).getAllByTestId(/entity-info-list-item/)[1]).toHaveTextContent(
      /Extension Field 2/i
    );
  });

  it('displays entity plans list correctly', async () => {
    renderEntityInfo();

    const plansListButton = screen.getByRole('button', { name: 'Plans' });

    const plansList = plansListButton.parentElement;
    expect(plansListButton).toHaveTextContent(/plans/i);
    expect(within(plansList).getAllByTestId(/entity-info-list-item/)).toHaveLength(2);
    expect(within(plansList).getAllByTestId(/entity-info-list-item/)[0]).toHaveTextContent(
      /plan 1/i
    );
    expect(within(plansList).getAllByTestId(/entity-info-list-item/)[1]).toHaveTextContent(
      /plan 2/i
    );
  });

  it('displays entity catalogs list correctly', async () => {
    renderEntityInfo();

    const catalogsListButton = screen.getByRole('button', { name: 'Catalogs' });

    const catalogsList = catalogsListButton.parentElement;

    expect(catalogsListButton).toHaveTextContent(/catalogs/i);
    expect(within(catalogsList).getAllByTestId(/entity-info-list-item/)).toHaveLength(1);
    expect(within(catalogsList).getAllByTestId(/entity-info-list-item/)[0]).toHaveTextContent(
      /catalog 1/i
    );
  });
});
