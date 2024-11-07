import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ApplicantFormListScreen } from '@dc/screens/UserApp/CommonApp/ApplicantFormList/ApplicantFormListScreen';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { RECOMMENDATION_REQUEST_QUERY } from '@dc/graphql/user/queries/recommendationRequest';
import { APPLICATION_FORM_TYPE, SYNC_STATUS } from '@dc/resources/enums';
import {
  STUDENT_APPLICATIONS_QUERY,
  StudentApplicationsData,
} from '@dc/graphql/user/queries/studentApplications';
import {
  COMMON_APP_FORM_TYPES,
  CommonAppRequestData,
} from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import {
  UNSUBMIT_COMMON_APP_FORM_RESPONSES,
  UnsubmitCommonAppFormResponsesData,
} from '@dc/graphql/user/mutations/unsubmitCommonAppFormResponses';
import { COMMON_APP_FORM_STATUS } from '@dc/resources/enums';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const unsubmitResponseSpy = jest.fn();

jest.mock('@radix-ui/react-dropdown-menu', () => ({
  Root: jest.fn((props) => <div {...props} />),
  Trigger: jest.fn((props) => <button {...props} />),
  Portal: jest.fn((props) => <div {...props} />),
  Content: jest.fn((props) => <div {...props} />),
  Item: jest.fn((props) => <div {...props} />),
}));

const getCommonAppRecommendationsResponse = (status: COMMON_APP_FORM_STATUS) => ({
  data: {
    recommendationRequest: {
      applicant: {
        applicantId: '30404770',
        email: 'allison_a@example.org',
        firstName: 'Allison',
        lastName: 'Adams',
        uuid: '215b4d05-97d4-4867-8f70-xxxxxxx',
      },
      forms: [
        {
          formType: COMMON_APP_FORM_TYPES.TEACHER_RECOMMENDATION,
          status,
          previewUrl: '',
          deadline: '2021-10-10',
        },
        {
          formType: COMMON_APP_FORM_TYPES.COUNSELOR_SECONDARY_REPORT,
          status,
          previewUrl: '',
          deadline: '2021-10-10',
        },
        {
          formType: COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT,
          status,
          previewUrl: '',
          deadline: '2021-10-10',
        },
      ],
    },
  },
});

const commonAppRecommendationsMock: MockedResponse<CommonAppRequestData> = {
  request: {
    query: RECOMMENDATION_REQUEST_QUERY,
    variables: {
      studentUuid: '0123',
    },
  },
  result: getCommonAppRecommendationsResponse(COMMON_APP_FORM_STATUS.NOT_STARTED),
};

const submittedCommonAppRecommendationsMock: MockedResponse<CommonAppRequestData> = {
  request: {
    query: RECOMMENDATION_REQUEST_QUERY,
    variables: {
      studentUuid: '0123',
    },
  },
  result: getCommonAppRecommendationsResponse(COMMON_APP_FORM_STATUS.SUBMITTED),
};

const getCommonAppStudentApplicationResponse = (status: COMMON_APP_FORM_STATUS) => ({
  data: {
    studentApplications: [
      {
        forms: [
          {
            formType: COMMON_APP_FORM_TYPES.TEACHER_RECOMMENDATION,
            status,
          },
          {
            formType: COMMON_APP_FORM_TYPES.COUNSELOR_SECONDARY_REPORT,
            status,
          },
          {
            formType: COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT,
            status,
          },
        ],
        institution: {
          id: '2',
          name: 'University of Alabama at Birmingham',
          __typename: 'Institution',
        },
        __typename: 'StudentApplication',
      },
      {
        forms: [
          {
            formType: COMMON_APP_FORM_TYPES.TEACHER_RECOMMENDATION,
            status,
          },
          {
            formType: COMMON_APP_FORM_TYPES.COUNSELOR_SECONDARY_REPORT,
            status,
          },
          {
            formType: COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT,
            status,
          },
        ],
        institution: {
          id: '11',
          name: 'Auburn University',
          __typename: 'Institution',
        },
        __typename: 'StudentApplication',
      },
    ],
  },
});

const commonAppStudentApplicationMock: MockedResponse<StudentApplicationsData> = {
  request: {
    query: STUDENT_APPLICATIONS_QUERY,
    variables: {
      studentUuid: '0123',
    },
  },
  result: getCommonAppStudentApplicationResponse(COMMON_APP_FORM_STATUS.NOT_STARTED),
};

const submittedCommonAppStudentApplicationMock: MockedResponse<StudentApplicationsData> = {
  request: {
    query: STUDENT_APPLICATIONS_QUERY,
    variables: {
      studentUuid: '0123',
    },
  },
  result: getCommonAppStudentApplicationResponse(COMMON_APP_FORM_STATUS.SUBMITTED),
};

const commonAppStudentApplicationUnsubmittedResponse = {
  data: {
    unsubmitCommonAppFormResponses: {
      status: COMMON_APP_FORM_STATUS.NOT_STARTED,
    },
  },
};

const commonAppStudentApplicationUnsubmittedMock: MockedResponse<UnsubmitCommonAppFormResponsesData> =
  {
    request: {
      query: UNSUBMIT_COMMON_APP_FORM_RESPONSES,
      variables: {
        input: { type: COMMON_APP_FORM_TYPES.TEACHER_RECOMMENDATION, studentUuid: '0123' },
      },
    },
    result() {
      unsubmitResponseSpy();

      return commonAppStudentApplicationUnsubmittedResponse;
    },
  };

const syncStatus = {
  status: SYNC_STATUS.COMPLETED,
  lastSyncedAt: '2021-08-09T12:00:00.000Z',
};

const userCommonappData = {
  hasRecommenderInvitation: true,
  hasTeacherInvitation: true,
  hasCounselorInvitation: true,
  hasCounselorProfileFormCompleted: true,
  hasTeacherProfileFormCompleted: true,
  syncStatus,
};

const renderComponent = (customMocks: MockedResponse[] = []) =>
  renderWithRouterAndReduxProvider(
    <NavigationContextProvider>
      <MockedProvider mocks={[...customMocks]}>
        <Route path='/post-secondary/commonapp-requests/:studentUuid'>
          <UserInfoProvider
            value={{
              userInfo: { ...userInfoMock.result.data.userInfo, commonAppData: userCommonappData },
            }}>
            <ApplicantFormListScreen />
          </UserInfoProvider>
        </Route>
      </MockedProvider>
    </NavigationContextProvider>,
    { route: '/post-secondary/commonapp-requests/0123' }
  );

describe('ApplicantFormListScreen', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2021, 10, 1, 12, 0, 0));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', async () => {
    const { container } = renderComponent([
      commonAppStudentApplicationMock,
      commonAppRecommendationsMock,
      userInfoMock,
    ]);

    const userName = await screen.findByText('Allison Adams forms');
    const tableRows = await screen.findAllByTestId('list-item');
    const [firstRow, secondRow] = tableRows;
    expect(within(firstRow).getByText('Teacher recommendation')).toBeInTheDocument();
    expect(within(firstRow).getByText('Not started')).toBeInTheDocument();
    expect(within(secondRow).getByText('Counselor secondary report')).toBeInTheDocument();
    expect(within(secondRow).getByText('Not started')).toBeInTheDocument();
    expect(tableRows).toHaveLength(3);

    expect(userName).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should allow unsubmitting a form ', async () => {
    renderComponent([
      submittedCommonAppStudentApplicationMock,
      submittedCommonAppRecommendationsMock,
      userInfoMock,
    ]);

    const tableRows = await screen.findAllByTestId('list-item');
    const { forms } = getCommonAppRecommendationsResponse(COMMON_APP_FORM_STATUS.SUBMITTED).data
      .recommendationRequest;

    expect(
      within(tableRows[0]).getByText(APPLICATION_FORM_TYPE[forms[0].formType])
    ).toBeInTheDocument();
    const unsubmitButton = within(tableRows[0]).getByRole('button', { name: 'Unsubmit' });
    expect(unsubmitButton).toBeInTheDocument();
  });

  it('should send request when "unsubmit" is clicked', async () => {
    renderComponent([
      submittedCommonAppStudentApplicationMock,
      submittedCommonAppRecommendationsMock,
      commonAppStudentApplicationUnsubmittedMock,
      userInfoMock,
      submittedCommonAppRecommendationsMock,
      submittedCommonAppStudentApplicationMock,
    ]);

    const tableRows = await screen.findAllByTestId('list-item');

    const unsubmitButton = within(tableRows[0]).getByRole('button', { name: 'Unsubmit' });

    fireEvent.click(unsubmitButton);
    await waitFor(() => {
      expect(unsubmitResponseSpy).toHaveBeenCalledTimes(1);
    });
  });
});
