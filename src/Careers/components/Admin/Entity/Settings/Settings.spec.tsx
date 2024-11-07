import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { renderWithRouter } from '@dc/utils/test';
import Settings from '@dc/components/Admin/Entity/Settings/Settings';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import entityQuery, { TEntity } from '@dc/graphql/user/queries/entity';
import updateEntitySettingsMutation from '@dc/graphql/user/mutations/updateEntitySettings';

const defaultMocks = [
  {
    request: {
      query: entityQuery,
      variables: {
        entityUuid: 'e5',
      },
    },
    result: {
      data: {
        entity: {
          uuid: 'e5',
          name: 'Clever Certification ISD',
          settings: {
            assessmentEnabled: true,
            assessmentType: 'HIGH_SCHOOL',
            onboardingEnabled: true,
            opportunitiesEnabled: true,
            postSecondaryApplicationsEnabled: true,
            selfEvaluationEnabled: true,
            classManagementEnabled: false,
            schoolYearStartDate: {
              day: 1,
              month: 7,
            },
          },
        },
      },
    },
  },
];

const entitySettings: TEntity = {
  tags: [],
  catalogs: [],
  name: 'Clever Certification ISD',
  parent: {
    name: 'Clever Certification ISD',
    uuid: 'e1',
  },
  contracts: [],
  plans: [],
  reportTypes: [],
  settings: {
    assessmentEnabled: true,
    assessmentType: 'HIGH_SCHOOL',
    onboardingEnabled: true,
    opportunitiesEnabled: true,
    postSecondaryApplicationsEnabled: true,
    selfEvaluationEnabled: true,
    classManagementEnabled: false,
    schoolYearStartDate: {
      day: 1,
      month: 7,
    },
  },
  standardSets: [],
  regionName: 'ILLINOIS',
  uuid: 'e5',
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
};

const updateEntitySettingsMock = {
  request: {
    query: updateEntitySettingsMutation,
    variables: {
      input: {
        uuid: 'e5',
        settings: {
          assessmentEnabled: { value: false, applyToHierarchy: false, force: false },
          onboardingEnabled: { value: false, applyToHierarchy: false, force: false },
        },
      },
    },
  },
  result: {
    data: {
      updateEntitySettings: {
        entity: {
          uuid: 'e5',
          settings: {
            assessmentEnabled: false,
            assessmentType: 'HIGH_SCHOOL',
            onboardingEnabled: false,
            opportunitiesEnabled: true,
            postSecondaryApplicationsEnabled: true,
            selfEvaluationEnabled: true,
            classManagementEnabled: false,
            schoolYearStartDate: {
              day: 1,
              month: 7,
            },
          },
        },
      },
    },
  },
};

const renderEntitySettings = (mocks: MockedResponse[] = []) =>
  renderWithRouter(
    <MockedProvider mocks={[...mocks, ...defaultMocks]}>
      <UserInfoProvider value={userInfoMock.result.data}>
        <Settings entity={entitySettings} />
      </UserInfoProvider>
    </MockedProvider>
  );

describe('Admin Panel Entity Settings', () => {
  it('should render correctly', async () => {
    const { container } = renderEntitySettings();

    const settings = await screen.findAllByRole('switch');
    expect(settings).toHaveLength(7);
    expect(container).toMatchSnapshot();
  });

  it('should open Assessment modal and save data', async () => {
    renderEntitySettings([updateEntitySettingsMock]);
    const assessmentSwitch = screen.getByTestId('assessmentEnabled-switch');
    userEvent.click(assessmentSwitch);
    expect(assessmentSwitch).toBeChecked();

    const assessmentModal = screen.getByRole('dialog');
    expect(assessmentModal).toHaveTextContent('Assessment');

    const saveButton = screen.getByRole('button', { name: 'Save' });
    userEvent.click(saveButton);
    expect(assessmentModal).not.toBeChecked();
  });
});
