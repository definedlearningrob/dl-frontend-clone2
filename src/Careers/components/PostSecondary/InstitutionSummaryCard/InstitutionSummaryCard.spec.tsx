import { MockedProvider } from '@apollo/client/testing';
import { screen } from '@testing-library/react';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { InstitutionSummaryCard } from '@dc/components/PostSecondary/InstitutionSummaryCard/InstitutionSummaryCard';
import { INSTITUTION_TYPES } from '@dc/resources/enums';
import cacheConfig from '@dc/graphql/cacheConfig';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

const institution = {
  id: '861',
  type: INSTITUTION_TYPES.PUB_4,
  name: 'University of Idaho',
  size: 'medium',
  sizeType: 'MEDIUM' as const,
  sizeDescription: 'MORE_THAN_10000' as const,
  cost: null,
  description: '',
  hasApplied: false,
  applicationType: null,
  applicationId: null,
  commonAppApplicationUrl: 'url-for-application',
  imageUrl: 'image-url',
  isFavorite: true,
  maxTeacherEval: 0,
  minTeacherEval: 5,
  thumbnailUrl: 'thumbnail-url',
  address: {
    street: '875 Perimeter Drive MS 2282',
    city: 'Moscow',
    zip: '83844-2282',
    state: 'Idaho',
    stateCode: 'ID',
    area: {
      kind: 'distant',
      type: 'town',
    },
  },
  admissionRate: 0.8138373751783167,
  satMathMin: 490,
  satMathMax: 600,
  satReadingMin: 500,
  satReadingMax: 620,
  actMin: 20,
  actMax: 28,
  studentFacultyRatio: 16,
  commonAppEnabled: true,
  dates: [
    {
      deadlineDate: '2023-03-28',
      decisionType: 'Early Decision',
      term: 'Spring',
    },
    {
      deadlineDate: '2023-04-07',
      decisionType: 'Early Action',
      term: 'Spring',
    },
    {
      deadlineDate: '2023-04-17',
      decisionType: 'Regular Decision',
      term: 'Spring',
    },
    {
      deadlineDate: '2023-10-17',
      decisionType: 'Regular Decision',
      term: 'Fall',
    },
  ],
  degrees: ['certificates', "bachelor's degrees", "master's degrees", 'doctoral degrees'],
  contact: {
    phone: '8888843246',
    urlAdmissions: 'www.uidaho.edu/admissions',
    urlApplications: 'www.uidaho.edu/admissions/apply',
    urlFinancialAid: 'www.uidaho.edu/financialaid',
    urlNetPriceCalculator: null,
    urlGeneral: 'www.uidaho.edu/',
  },
  isIpeds: true,
};

const commonAppEnabledUserInfo = {
  ...studentInfoMock.result.data.userInfo,
  postSecondaryApplicationsEnabled: true,
  commonAppData: {
    ...studentInfoMock.result.data.userInfo.commonAppData,
    hasAccountConnected: true,
  },
};

describe('InstitutionSummaryCard', () => {
  it('should render correctly', () => {
    const { container } = renderWithRouterAndReduxProvider(
      <UserInfoProvider
        value={{
          userInfo: commonAppEnabledUserInfo,
        }}>
        <MockedProvider
          cache={cacheConfig}
          mocks={[
            {
              ...studentInfoMock,
              result: {
                data: {
                  userInfo: commonAppEnabledUserInfo,
                },
              },
            },
          ]}>
          <InstitutionSummaryCard institution={institution} />
        </MockedProvider>
      </UserInfoProvider>,
      {
        initialState: { session: { loginError: {}, user: { type: 'student' } } },
      }
    );

    expect(screen.getByText('University of Idaho')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should always display apply buttons', () => {
    renderWithRouterAndReduxProvider(
      <UserInfoProvider
        value={{
          userInfo: {
            ...studentInfoMock.result.data.userInfo,
            postSecondaryApplicationsEnabled: false,
          },
        }}>
        <MockedProvider mocks={[studentInfoMock]}>
          <InstitutionSummaryCard institution={institution} />
        </MockedProvider>
      </UserInfoProvider>,
      {
        initialState: { session: { loginError: {}, user: { type: 'student' } } },
      }
    );

    expect(screen.queryByText('Direct application')).toBeInTheDocument();
    expect(screen.queryByText('Common App application')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
    expect(buttons).toMatchSnapshot();
  });
});
