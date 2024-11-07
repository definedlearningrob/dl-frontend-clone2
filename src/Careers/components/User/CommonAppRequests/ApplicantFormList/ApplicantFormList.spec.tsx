import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { merge, set } from 'lodash-es';
import { screen, within } from '@testing-library/dom';
import { Route } from 'react-router-dom';

import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import {
  CommonAppForm,
  COMMON_APP_FORM_TYPES,
} from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { COMMON_APP_FORM_STATUS, SYNC_STATUS } from '@dc/resources/enums';
import {
  StudentApplicationsData,
  STUDENT_APPLICATIONS_QUERY,
} from '@dc/graphql/user/queries/studentApplications';

import { Roles } from '@shared/resources/enums';

import { ApplicantFormList } from './ApplicantFormList';

const commonAppStudentApplicationResponse = {
  data: {
    studentApplications: [
      {
        forms: [
          {
            formType: COMMON_APP_FORM_TYPES.TEACHER_RECOMMENDATION,
            status: COMMON_APP_FORM_STATUS.NOT_STARTED,
          },
          {
            formType: COMMON_APP_FORM_TYPES.COUNSELOR_SECONDARY_REPORT,
            status: COMMON_APP_FORM_STATUS.NOT_STARTED,
          },
          {
            formType: COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT,
            status: COMMON_APP_FORM_STATUS.NOT_STARTED,
          },
          {
            formType: COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT_2,
            status: COMMON_APP_FORM_STATUS.NOT_STARTED,
          },
          {
            formType: COMMON_APP_FORM_TYPES.COUNSELOR_MIDYEAR_REPORT,
            status: COMMON_APP_FORM_STATUS.NOT_STARTED,
          },
          {
            formType: COMMON_APP_FORM_TYPES.COUNSELOR_FINAL_REPORT,
            status: COMMON_APP_FORM_STATUS.NOT_STARTED,
          },
        ],
        institution: {
          id: '2',
          name: 'University of Alabama at Birmingham',
        },
      },
    ],
  },
};
const commonAppStudentApplicationMock: MockedResponse<StudentApplicationsData> = {
  request: {
    query: STUDENT_APPLICATIONS_QUERY,
    variables: {
      studentUuid: '0123',
    },
  },
  result: commonAppStudentApplicationResponse,
};

const counselorForms = [
  {
    formType: COMMON_APP_FORM_TYPES.COUNSELOR_SECONDARY_REPORT,
    status: COMMON_APP_FORM_STATUS.NOT_STARTED,
    deadline: null,
  },
  {
    formType: COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT,
    status: COMMON_APP_FORM_STATUS.NOT_STARTED,
    deadline: null,
  },
  {
    formType: COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT_2,
    status: COMMON_APP_FORM_STATUS.NOT_STARTED,
    deadline: '2023-11-01T09:00:00Z',
  },
  {
    formType: COMMON_APP_FORM_TYPES.COUNSELOR_MIDYEAR_REPORT,
    status: COMMON_APP_FORM_STATUS.NOT_STARTED,
    deadline: '2023-11-02T12:00:00Z',
  },
  {
    formType: COMMON_APP_FORM_TYPES.COUNSELOR_FINAL_REPORT,
    status: COMMON_APP_FORM_STATUS.NOT_STARTED,
    deadline: null,
  },
  {
    formType: COMMON_APP_FORM_TYPES.COUNSELOR_RECOMMENDATION,
    status: COMMON_APP_FORM_STATUS.SUBMITTED,
    deadline: null,
  },
];
const teacherForms = [
  {
    formType: COMMON_APP_FORM_TYPES.TEACHER_RECOMMENDATION,
    status: COMMON_APP_FORM_STATUS.NOT_STARTED,
    deadline: '2023-11-12T04:00:00Z',
  },
];

const syncStatus = {
  status: SYNC_STATUS.COMPLETED,
  lastSyncedAt: '2021-08-09T12:00:00.000Z',
};

const getCounselorUserInfo = (hasProfileCompleted: boolean = false) => ({
  permissions: { counselor: true, wblAdmin: false, canImpersonate: false, canBrowseReports: false },
  role: Roles.TEACHER,
  commonAppData: {
    hasRecommenderInvitation: true,
    hasTeacherInvitation: false,
    hasCounselorInvitation: true,
    hasCounselorProfileFormCompleted: hasProfileCompleted,
    hasTeacherProfileFormCompleted: true,
    syncStatus,
  },
});
const teacherUserInfo = {
  permissions: { counselor: true, wblAdmin: false, canImpersonate: false, canBrowseReports: false },
  role: Roles.TEACHER,
  commonAppData: {
    hasRecommenderInvitation: true,
    hasTeacherInvitation: true,
    hasCounselorInvitation: false,
    hasCounselorProfileFormCompleted: true,
    hasTeacherProfileFormCompleted: false,
    syncStatus,
  },
};

type UserInfo = Partial<TUserInfo>;
type Params = {
  userInfo: UserInfo;
  forms: CommonAppForm[];
};

jest.mock('@radix-ui/react-dropdown-menu', () => ({
  Root: jest.fn((props) => <div {...props} />),
  Trigger: jest.fn((props) => <button {...props} />),
  Portal: jest.fn((props) => <div {...props} />),
  Content: jest.fn((props) => <div {...props} />),
  Item: jest.fn((props) => <div {...props} />),
}));

const renderComponent = ({ userInfo, forms }: Params) => {
  const modifiedUserInfo = merge(userInfoMock.result.data.userInfo, userInfo);

  const modifiedUserInfoMock = { ...userInfoMock };

  set(modifiedUserInfoMock, 'result.data.userInfo', modifiedUserInfo);

  return renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[modifiedUserInfoMock, commonAppStudentApplicationMock]}>
      <UserInfoProvider value={{ userInfo: modifiedUserInfo }}>
        <Route path='/post-secondary/commonapp-requests/:studentUuid'>
          <ApplicantFormList forms={forms} />
        </Route>
      </UserInfoProvider>
    </MockedProvider>,
    {
      route: '/post-secondary/commonapp-requests/0123',
    }
  );
};

describe('ApplicantFormList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const { container } = renderComponent({
      userInfo: getCounselorUserInfo(),
      forms: counselorForms,
    });

    await screen.findByRole('table');

    expect(container).toMatchSnapshot();
  });

  it('displays locked status for teacher forms when teacher profile is not completed', async () => {
    const { history } = renderComponent({ userInfo: teacherUserInfo, forms: teacherForms });
    history.push = jest.fn();

    await screen.findByRole('table');

    const teacherRecommendationRow = screen.getByRole('row', {
      name: /Teacher recommendation/,
    });

    expect(
      within(teacherRecommendationRow).getByRole('cell', { name: 'Locked' })
    ).toBeInTheDocument();

    userEvent.click(teacherRecommendationRow);

    expect(history.push).toHaveBeenCalledTimes(0);
  });

  it('displays locked status for counselor forms when counselor profile is not completed', async () => {
    const { history } = renderComponent({
      userInfo: getCounselorUserInfo(),
      forms: counselorForms,
    });
    history.push = jest.fn();
    await screen.findByRole('table');

    const [, ...tableBodyRows] = screen.getAllByRole('row');

    tableBodyRows.forEach((tableRow) => {
      expect(within(tableRow).getByRole('cell', { name: 'Locked' })).toBeInTheDocument();
      userEvent.click(tableRow);
    });

    expect(history.push).toHaveBeenCalledTimes(0);
  });

  it.each([
    ['Not started', 'Counselor secondary report'],
    ['Locked', 'Counselor optional report'],
    ['Locked', 'Counselor optional report 2'],
    ['Locked', 'Counselor midyear report'],
    ['Locked', 'Counselor final report'],
    ['Submitted', 'Counselor recommendation'],
  ])(
    'displays "%s" status for "%s" when counselor secondary report is not completed',
    async (status, formName) => {
      const { history } = renderComponent({
        userInfo: getCounselorUserInfo(true),
        forms: counselorForms,
      });
      history.push = jest.fn();
      await screen.findByRole('table');

      const [reportRow] = screen.getAllByRole('row', {
        name: new RegExp(formName),
      });

      expect(within(reportRow).getByRole('cell', { name: status }));
      userEvent.click(reportRow);

      const numberOfHistoryCalls = status === 'Locked' ? 0 : 1;
      expect(history.push).toHaveBeenCalledTimes(numberOfHistoryCalls);
    }
  );
});
