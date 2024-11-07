import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { InstitutionApplicationActions } from '@dc/components/PostSecondary/InstitutionSummaryCard/InstitutionApplicationActions';
import {
  INSTITUTION_APPLICATIONS,
  TInstitutionApplicationsData,
} from '@dc/graphql/student/queries/institutionApplications';
import { APPLICATIONS_TYPE, INSTITUTION_APPLICATION_STATUS } from '@dc/resources/enums';
import {
  INSTITUTION_APPLICATION_QUERY,
  TInstitutionApplicationData,
  TInstitutionApplicationVariables,
} from '@dc/graphql/student/queries/institutionApplication';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import {
  DELETE_INSTITUTION_APPLICATION,
  TDeleteInstitutionApplicationData,
} from '@dc/graphql/student/mutations/deleteInstitutionApplication';
import INSTITUTION_QUERY from '@dc/graphql/student/queries/institution';

const institutionMock = {
  request: {
    query: INSTITUTION_QUERY,
    variables: { id: '1' },
  },
  result: {
    data: {
      institution: {
        hasApplied: false,
        id: '1',
        type: 'Private not-for-profit, 4-year or above',
        isIpeds: true,
        name: 'Aurora University',
        size: null,
        sizeType: null,
        commonAppApplicationUrl: null,
        sizeDescription: null,
        cost: null,
        imageUrl: 'https://images.definedlearning.com/ipeds/177834.jpg',
        isFavorite: false,
        thumbnailUrl: 'https://images.definedlearning.com/ipeds/177834.jpg',
        address: {
          street: '800 W Jefferson',
          city: 'Kirksville',
          zip: '63501',
          state: 'Missouri',
          stateCode: 'MO',
          area: { kind: 'remote', type: 'town' },
        },
        admissionRate: null,
        satMathMin: null,
        satMathMax: null,
        satReadingMin: null,
        satReadingMax: null,
        actMin: null,
        actMax: null,
        studentFacultyRatio: null,
        commonAppEnabled: false,
        applicationType: null,
        applicationId: null,
        dates: [
          {
            deadlineDate: '2023-03-30',
            decisionType: 'Early Decision',
            term: 'Spring',
          },
          {
            deadlineDate: '2023-04-09',
            decisionType: 'Early Action',
            term: 'Spring',
          },
          {
            deadlineDate: '2023-04-19',
            decisionType: 'Regular Decision',
            term: 'Spring',
          },
        ],
        degrees: ['certificates', "master's degrees", 'doctoral degrees'],
        contact: {
          phone: '6606262121',
          urlAdmissions: 'www.atsu.edu/',
          urlApplications: 'www.atsu.edu/',
          urlFinancialAid: 'www.atsu.edu/department-of-student-affairs/enrollment-services',
          urlNetPriceCalculator: null,
          urlGeneral: 'www.atsu.edu/',
        },
        maxTeacherEval: 4,
        minTeacherEval: 1,
      },
    },
  },
};

const applicationMock = {
  id: '1',
  name: 'Test name',
  deadline: null,
  appliedAt: '2023-06-10T13:34:59Z',
  type: APPLICATIONS_TYPE.COMMON_APP,
  acceptsTeacherRecommendation: false,
  status: INSTITUTION_APPLICATION_STATUS.NOT_STARTED,
  recommenders: [],
  institution: {
    id: '1',
    commonAppApplicationUrl: null,
    minTeacherEval: null,
    commonAppEnabled: false,
  },
};

const institutionApplicationsMock: MockedResponse<TInstitutionApplicationsData> = {
  request: {
    query: INSTITUTION_APPLICATIONS,
  },
  result: {
    data: {
      institutionApplications: {
        nodes: [applicationMock],
      },
    },
  },
};

const institutionApplicationMock: MockedResponse<
  TInstitutionApplicationData,
  TInstitutionApplicationVariables
> = {
  request: {
    query: INSTITUTION_APPLICATION_QUERY,
    variables: { id: '1' },
  },
  result: {
    data: {
      institutionApplication: applicationMock,
    },
  },
};

const deleteApplicationSpy = jest.fn();

const deleteInstitutionApplicationMock: MockedResponse<TDeleteInstitutionApplicationData> = {
  request: {
    query: DELETE_INSTITUTION_APPLICATION,
    variables: { input: { institutionApplicationId: '1' } },
  },
  result() {
    deleteApplicationSpy();

    return {
      data: {
        deleteInstitutionApplication: {
          status: 'ok',
        },
      },
    };
  },
};

describe('InstitutionApplicationActions', () => {
  describe('with commonApp enabled', () => {
    const commonAppEnabled = true;

    describe('with is applied as false', () => {
      const isApplied = false;

      it('should render correctly', async () => {
        const { container } = renderWithRouterAndReduxProvider(
          <MockedProvider mocks={[institutionMock, institutionApplicationsMock, studentInfoMock]}>
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
              <Route path='institution/:id'>
                <InstitutionApplicationActions
                  applicationId={null}
                  applicationType={null}
                  commonAppApplicationUrl={null}
                  commonAppEnabled={commonAppEnabled}
                  directApplicationURL={null}
                  hasApplied={isApplied}
                />
              </Route>
            </UserInfoProvider>
          </MockedProvider>,
          {
            route: 'institution/1',
            initialState: { session: { loginError: {}, user: { type: 'student' } } },
          }
        );

        const applyButton = screen.getByRole('button', { name: 'Direct application' });

        expect(applyButton).toBeInTheDocument();
        expect(applyButton).toBeEnabled();
        expect(container).toMatchSnapshot();
      });
    });

    describe('with is applied as true', () => {
      const isApplied = true;

      it('should render correctly', async () => {
        const { container } = renderWithRouterAndReduxProvider(
          <MockedProvider mocks={[institutionApplicationsMock, institutionApplicationMock]}>
            <Route path='institution/:id'>
              <InstitutionApplicationActions
                applicationId='1'
                applicationType={APPLICATIONS_TYPE.COMMON_APP}
                commonAppApplicationUrl={null}
                commonAppEnabled={commonAppEnabled}
                directApplicationURL={null}
                hasApplied={isApplied}
              />
            </Route>
          </MockedProvider>,
          { route: 'institution/1' }
        );

        const infoElement = await screen.findByText(
          'You have added this institution to your application list.'
        );
        const detailsButton = await screen.findByRole('button', { name: 'See progress' });
        expect(infoElement).toBeInTheDocument();
        expect(detailsButton).toBeInTheDocument();
        expect(container).toMatchSnapshot();
      });

      it("should open an application detail modal on 'See progress' button click", async () => {
        renderWithRouterAndReduxProvider(
          <MockedProvider mocks={[institutionApplicationsMock, institutionApplicationMock]}>
            <Route path='institution/:id'>
              <InstitutionApplicationActions
                applicationId='1'
                applicationType={APPLICATIONS_TYPE.COMMON_APP}
                commonAppApplicationUrl={null}
                commonAppEnabled={commonAppEnabled}
                directApplicationURL={null}
                hasApplied={isApplied}
              />
            </Route>
          </MockedProvider>,
          { route: 'institution/1' }
        );

        const detailsButton = await screen.findByRole('button', { name: 'See progress' });
        userEvent.click(detailsButton);

        const modal = await screen.findByRole('dialog');
        expect(modal).toBeInTheDocument();
      });
    });
  });

  describe('with commonApp disabled', () => {
    const commonAppEnabled = false;

    it('should remove direct application if already created', async () => {
      const { container } = renderWithRouterAndReduxProvider(
        <MockedProvider
          mocks={[
            institutionMock,
            institutionApplicationsMock,
            institutionApplicationMock,
            studentInfoMock,
            deleteInstitutionApplicationMock,
          ]}>
          <UserInfoProvider value={{ userInfo: studentInfoMock.result.data.userInfo }}>
            <Route path='institution/:id'>
              <InstitutionApplicationActions
                applicationId='1'
                applicationType={APPLICATIONS_TYPE.DIRECT}
                commonAppApplicationUrl={null}
                commonAppEnabled={commonAppEnabled}
                directApplicationURL={null}
                hasApplied={true}
              />
            </Route>
          </UserInfoProvider>
        </MockedProvider>,
        {
          route: 'institution/1',
          initialState: { session: { loginError: {}, user: { type: 'student' } } },
        }
      );

      const removeApplicationButton = screen.getByRole('button', { name: 'Remove application' });
      expect(container).toMatchSnapshot();

      userEvent.click(removeApplicationButton);
      await waitFor(() => {
        expect(deleteApplicationSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
