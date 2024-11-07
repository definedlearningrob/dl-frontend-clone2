import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { act, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';
import { STUDENT_APPLICATIONS_QUERY } from '@dc/graphql/user/queries/studentApplications';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';
import { COMMON_APP_FORM_STATUS } from '@dc/resources/enums';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { ReportType } from '@shared/resources/enums';

import { GET_QUESTIONS, SAVE_QUESTIONS, SUBMIT_QUESTIONS } from '../commonAppQueries';

import { CounselorFinalReportScreen } from './CounselorFinalReport';

const defaultMocks = [
  {
    request: {
      query: GET_QUESTIONS,
      variables: {
        type: COMMON_APP_FORM_TYPES.COUNSELOR_FINAL_REPORT,
        studentUuid: undefined,
      },
    },
    result: {
      data: {
        commonAppForm: {
          id: '1',
          type: 'COUNSELOR_FINAL_REPORT',
          responses: [
            {
              questionId: '1',
              response: 'response',
              filename: null,
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: STUDENT_APPLICATIONS_QUERY,
      variables: { studentUuid: undefined },
    },
    result: {
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
              {
                formType: COMMON_APP_FORM_TYPES.COUNSELOR_RECOMMENDATION,
                status: COMMON_APP_FORM_STATUS.NOT_STARTED,
              },
            ],
            institution: { id: '2951', name: 'University of Scranton', __typename: 'Institution' },
            __typename: 'StudentApplication',
          },
          {
            forms: [
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
              {
                formType: COMMON_APP_FORM_TYPES.COUNSELOR_RECOMMENDATION,
                status: COMMON_APP_FORM_STATUS.NOT_STARTED,
              },
            ],
            institution: { id: '3208', name: 'Baylor University', __typename: 'Institution' },
            __typename: 'StudentApplication',
          },
        ],
      },
    },
  },
  {
    request: {
      query: SAVE_QUESTIONS,
      variables: {
        input: {
          studentUuid: undefined,
          type: 'COUNSELOR_FINAL_REPORT',
          responses: [
            { questionId: 1048, response: '1' },
            { questionId: 1363, response: '5' },
            { questionId: 1372, response: '1' },
            { questionId: 1380, response: 'Zmlyc3RfZmlsZQ==', filename: 'first_file.pdf' },
            { questionId: 1381, response: '0' },
            { questionId: 1382, response: '1' },
            { questionId: 1385, response: '1' },
          ],
        },
      },
    },
    result: {
      data: {
        saveCommonAppFormResponses: {
          form: {
            responses: [
              { questionId: 1372, filename: null, response: '1', __typename: 'FormResponse' },
              {
                questionId: 1380,
                response: 'Zmlyc3RfZmlsZQ==',
                filename: 'first_file.pdf',

                __typename: 'FormResponse',
              },
              { questionId: 1381, response: '0', filename: null, __typename: 'FormResponse' },
              { questionId: 1382, response: '1', filename: null, __typename: 'FormResponse' },
              { questionId: 1385, response: '1', filename: null, __typename: 'FormResponse' },
              { questionId: 1048, response: '1', filename: null, __typename: 'FormResponse' },
              { questionId: 1363, response: '5', filename: null, __typename: 'FormResponse' },
            ],
            __typename: 'Form',
          },
          errorCode: null,
          errorMessage: null,
          incompleteResponses: [],
          invalidResponses: [],
          validResponses: ['1048', '1363', '1372', '1381', '1382', '1385', '1380'],
          __typename: 'SaveCommonAppFormResponsesMutationPayload',
        },
      },
    },
  },
  {
    request: {
      query: GET_QUESTIONS,
      variables: {
        type: COMMON_APP_FORM_TYPES.COUNSELOR_FINAL_REPORT,
        studentUuid: undefined,
      },
    },
    result: {
      data: {
        commonAppForm: {
          id: '1',
          type: 'COUNSELOR_FINAL_REPORT',
          responses: [
            { questionId: 1372, filename: null, response: '1', __typename: 'FormResponse' },
            {
              questionId: 1380,
              response: 'Zmlyc3RfZmlsZQ==',
              filename: 'first_file.pdf',
              __typename: 'FormResponse',
            },
            { questionId: 1381, response: '0', filename: null, __typename: 'FormResponse' },
            { questionId: 1382, response: '1', filename: null, __typename: 'FormResponse' },
            { questionId: 1385, response: '1', filename: null, __typename: 'FormResponse' },
            { questionId: 1048, response: '1', filename: null, __typename: 'FormResponse' },
            { questionId: 1363, response: '5', filename: null, __typename: 'FormResponse' },
          ],
        },
      },
    },
  },
  {
    request: {
      query: SUBMIT_QUESTIONS,
      variables: {
        input: {
          type: 'COUNSELOR_FINAL_REPORT',
          studentUuid: undefined,
          institutionId: '2951',
        },
      },
    },
    result: {
      data: {
        submitCommonAppFormResponses: {
          status: 'SUCCESS',
        },
      },
    },
  },
];

const render = ({ mocks }: { mocks: MockedResponse[] }) =>
  renderWithRouterAndReduxProvider(
    <NavigationContextProvider>
      <MockedProvider mocks={[...defaultMocks, userInfoMock, ...mocks]}>
        <UserInfoProvider
          value={{
            userInfo: {
              ...userInfoMock.result.data.userInfo,
              uuid: '1',
              entities: {
                nodes: [
                  {
                    uuid: 'entityuuid',
                    settings: {
                      classManagementEnabled: false,
                      postSecondaryApplicationsEnabled: false,
                      schoolYearStartDate: { day: 7, month: 7 },
                    },
                    reportTypes: [ReportType.ASSESSMENT],
                  },
                ],
              },
            },
          }}>
          <ExpandSidebarProvider>
            <CounselorFinalReportScreen />
          </ExpandSidebarProvider>
        </UserInfoProvider>
      </MockedProvider>
    </NavigationContextProvider>
  );

describe('CounselorFinalForm', () => {
  it('renders the form', async () => {
    render({ mocks: [] });

    expect(await screen.findByRole('heading', { name: 'Counselor Final Report' })).toBeVisible();
    expect(await screen.findByRole('heading', { name: 'Summary' })).toBeVisible();
    expect(await screen.findByRole('heading', { name: 'Class Rank' })).toBeVisible();
    expect(await screen.findByRole('heading', { name: 'GPA' })).toBeVisible();
    expect(await screen.findByRole('heading', { name: 'Transcripts' })).toBeVisible();
    expect(await screen.findByRole('button', { name: 'Submit' })).toBeVisible();
    expect(await screen.findByRole('button', { name: 'Save' })).toBeVisible();
  });
  it('provides ability to select student institution', async () => {
    render({ mocks: [] });

    expect(await screen.findByRole('heading', { name: 'Counselor Final Report' })).toBeVisible();

    const institutionSelect = screen.getByLabelText(/Select Institution/);
    userEvent.type(institutionSelect, 'Scranton{enter}');

    expect(screen.getByText('University of Scranton')).toBeVisible();
  });

  it('Conditionally shows fields inside Summary section', async () => {
    render({ mocks: [] });

    expect(await screen.findByRole('heading', { name: 'Summary' })).toBeVisible();

    // should show conditional field
    const firstQuestion = await screen.findByRole('radiogroup', {
      name: '* Have there been any changes to the senior year courses sent with the original School Report',
    });
    const yesRadio = within(firstQuestion).getByRole('radio', { name: 'Yes' });
    const noRadio = within(firstQuestion).getByRole('radio', { name: 'No' });

    expect(yesRadio).not.toBeChecked();
    expect(
      screen.queryByText(
        'Since you answered yes to one of the preceding questions, please attach an explanation.'
      )
    ).not.toBeTruthy();

    userEvent.click(yesRadio);

    await waitFor(() => {
      expect(yesRadio).toBeChecked();
    });

    expect(
      screen.getByText(
        'Since you answered yes to one of the preceding questions, please attach an explanation.'
      )
    ).toBeVisible();

    userEvent.click(noRadio);

    await waitFor(() => {
      expect(noRadio).toBeChecked();
    });

    expect(
      screen.queryByText(
        'Since you answered yes to one of the preceding questions, please attach an explanation.'
      )
    ).not.toBeTruthy();

    // shouldnt show conditional field
    const secondQuestion = await screen.findByRole('radiogroup', {
      name: '* Did or will the student graduate as anticipated this year?',
    });
    const yesRadio2 = within(secondQuestion).getByRole('radio', { name: 'Yes' });
    const noRadio2 = within(secondQuestion).getByRole('radio', { name: 'No' });

    expect(yesRadio2).not.toBeChecked();
    expect(
      screen.queryByText(
        'Since you answered yes to one of the preceding questions, please attach an explanation.'
      )
    ).not.toBeTruthy();

    userEvent.click(yesRadio2);

    await waitFor(() => {
      expect(yesRadio2).toBeChecked();
    });

    expect(
      screen.queryByText(
        'Since you answered yes to one of the preceding questions, please attach an explanation.'
      )
    ).not.toBeTruthy();

    userEvent.click(noRadio2);

    await waitFor(() => {
      expect(noRadio2).toBeChecked();
    });

    expect(
      screen.queryByText(
        'Since you answered yes to one of the preceding questions, please attach an explanation.'
      )
    ).not.toBeTruthy();

    // should show conditional field
    const thirdQuestion = await screen.findByRole('radiogroup', {
      name: '* Do you wish to update your original evaluation of this applicant?',
    });
    const yesRadio3 = within(thirdQuestion).getByRole('radio', { name: 'Yes' });
    const noRadio3 = within(thirdQuestion).getByRole('radio', { name: 'No' });

    expect(yesRadio3).not.toBeChecked();
    expect(
      screen.queryByText(
        'Since you answered yes to one of the preceding questions, please attach an explanation.'
      )
    ).not.toBeTruthy();

    userEvent.click(yesRadio3);

    await waitFor(() => {
      expect(yesRadio3).toBeChecked();
    });

    expect(
      screen.getByText(
        'Since you answered yes to one of the preceding questions, please attach an explanation.'
      )
    ).toBeVisible();

    userEvent.click(noRadio3);

    await waitFor(() => {
      expect(noRadio3).toBeChecked();
    });

    expect(
      screen.queryByText(
        'Since you answered yes to one of the preceding questions, please attach an explanation.'
      )
    ).not.toBeTruthy();
  });
  it('Conditionally shows fields inside Class Rank section', async () => {
    render({ mocks: [] });

    expect(await screen.findByRole('heading', { name: 'Class Rank' })).toBeVisible();

    const rankingSelect = screen.getByLabelText(/How do you report class rank?/);

    expect(screen.queryByLabelText("Applicant's class rank")).not.toBeTruthy();

    userEvent.type(rankingSelect, 'Exact{enter}');

    expect(await screen.findByLabelText(/Applicant's class rank/)).toBeVisible();

    userEvent.type(rankingSelect, 'Decile{enter}');

    expect(screen.queryByLabelText(/Applicant's class rank/)).not.toBeTruthy();
    expect(await screen.findByLabelText(/Applicant's decile rank/)).toBeVisible();

    userEvent.type(rankingSelect, 'Quintile{enter}');

    expect(screen.queryByLabelText("Applicant's decile rank*")).not.toBeTruthy();
    expect(await screen.findByLabelText(/Applicant's quintile rank/)).toBeVisible();

    userEvent.type(rankingSelect, 'Quartile{enter}');

    expect(screen.queryByLabelText(/Applicant's quintile rank/)).not.toBeTruthy();
    expect(await screen.findByLabelText(/Applicant's quartile rank/)).toBeVisible();
  });

  it('Conditionally shows fields inside GPA section', async () => {
    render({ mocks: [] });

    expect(await screen.findByRole('heading', { name: 'GPA' })).toBeVisible();

    const question = await screen.findByRole('radiogroup', {
      name: '* Do you report GPA (Grade Point Average)?',
    });

    const yesRadio = within(question).getByRole('radio', { name: 'Yes' });
    const noRadio = within(question).getByRole('radio', { name: 'No' });

    expect(screen.queryByLabelText(/Cumulative GPA/)).not.toBeTruthy();

    userEvent.click(yesRadio);

    await waitFor(() => {
      expect(yesRadio).toBeChecked();
      expect(screen.getByLabelText(/Cumulative GPA/)).toBeVisible();
    });

    userEvent.click(noRadio);

    await waitFor(() => {
      expect(noRadio).toBeChecked();
      expect(screen.queryByLabelText(/Cumulative GPA/)).not.toBeTruthy();
    });
  });

  it('can finish the form', async () => {
    render({ mocks: [] });

    expect(await screen.findByRole('heading', { name: 'Counselor Final Report' })).toBeVisible();

    const institutionSelect = screen.getByLabelText(/Select Institution/);
    userEvent.type(institutionSelect, 'Scranton{enter}');

    expect(screen.getByText('University of Scranton')).toBeVisible();

    const firstQuestion = await screen.findByRole('radiogroup', {
      name: '* Have there been any changes to the senior year courses sent with the original School Report',
    });
    const noRadio = within(firstQuestion).getByRole('radio', { name: 'No' });

    const secondQuestion = await screen.findByRole('radiogroup', {
      name: '* Did or will the student graduate as anticipated this year?',
    });
    const noRadio2 = within(secondQuestion).getByRole('radio', { name: 'No' });

    const thirdQuestion = await screen.findByRole('radiogroup', {
      name: '* Do you wish to update your original evaluation of this applicant?',
    });
    const noRadio3 = within(thirdQuestion).getByRole('radio', { name: 'No' });

    userEvent.click(noRadio);
    userEvent.click(noRadio2);
    userEvent.click(noRadio3);

    const rankingSelect = screen.getByLabelText(/How do you report class rank?/);

    userEvent.type(rankingSelect, 'None{enter}');

    const question = await screen.findByRole('radiogroup', {
      name: '* Do you report GPA (Grade Point Average)?',
    });

    const noRadio4 = within(question).getByRole('radio', { name: 'No' });

    userEvent.click(noRadio4);

    const dropZone = await screen.findByTestId('drop-zone-input');

    global.URL.createObjectURL = jest.fn(() => 'test_url');

    await act(async () => {
      userEvent.upload(
        dropZone,
        new File(['first_file'], 'first_file.pdf', { type: 'application/pdf' })
      );

      // JsonForm has overhead to its onChange so we need to wait for it to settle
      await wait(1000);
    });

    const checkbox = screen.getByLabelText(
      'I affirm that I have uploaded a transcript to this Final Report. I understand that failure to do so (by, for example, uploading a blank document or uploading a document promising to mail the transcript at a later time) will result in my Common App Online account being closed.'
    );

    userEvent.click(checkbox);

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
  });
});
