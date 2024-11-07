import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { waitFor, screen } from '@testing-library/dom';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ReportLevels, UploadReportStatuses } from '@dc/resources/enums';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { ASSESSMENT_REPORT_FILE } from '@dc/graphql/user/queries/assessmentReport';
import { GENERATE_ASSESSMENT_REPORT } from '@dc/graphql/user/mutations/generateAssessmentReport';

import { ProgressBox } from '@shared/components/ProgressBox/ProgressBox';
import { FILE_TO_DOWNLOAD_KEY } from '@shared/resources/constants';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { FileDownloadProvider } from '@shared/hooks/useFileDownload';

// @ts-ignore
delete window.location;
// @ts-ignore
window.location = { href: '' };

const renderProgressBox = (mocks: MockedResponse[] = []) =>
  renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <FileDownloadProvider>
        <UserInfoProvider
          value={{
            userInfo: { ...userInfoMock.result.data.userInfo, firstName: 'Test', lastName: 'Man' },
          }}>
          <NavigationContextProvider>
            <ProgressBox />
          </NavigationContextProvider>
        </UserInfoProvider>
      </FileDownloadProvider>
    </MockedProvider>,
    // @ts-ignore
    { route: '/', initialState: { session: { user: null } } }
  );

describe('UserReportProgressBox', () => {
  it('returns null when no item in localstorage', () => {
    const { container } = renderProgressBox();

    expect(container.childNodes).toHaveLength(0);
  });

  describe('courses report', () => {
    beforeEach(() => {
      localStorage.setItem(
        FILE_TO_DOWNLOAD_KEY,
        JSON.stringify({
          id: 'someid',
          variables: {
            level: ReportLevels.ENTITY,
            levelUuid: 'someuuid',
          },
        })
      );
    });

    afterEach(() => {
      localStorage.setItem(FILE_TO_DOWNLOAD_KEY, '');
    });

    it('closes and clear storage on close click', async () => {
      const { container } = renderProgressBox();
      expect(container).not.toBeEmptyDOMElement();
      const closeButton = await screen.findByTestId('icon-button');

      await userEvent.click(closeButton);

      await waitFor(() => expect(localStorage.getItem(FILE_TO_DOWNLOAD_KEY)).toEqual(null));
      expect(container).toBeEmptyDOMElement();
    });

    it('renders in progress state when upload status is NOT_STARTED', async () => {
      const courseReportMock = {
        request: {
          query: ASSESSMENT_REPORT_FILE,
          variables: { id: 'someid' },
        },
        result: {
          data: {
            assessmentReport: {
              id: 'someid',
              url: 'someurl',
              uploadStatus: UploadReportStatuses.NOT_STARTED,
            },
          },
        },
      };

      renderProgressBox([courseReportMock]);

      const title = await screen.findByText('Your file is being prepared');
      const progressText = screen.getByText(
        /This action can take a couple of minutes. You still can use the application./
      );

      expect(title).toBeInTheDocument();
      expect(progressText).toBeInTheDocument();
    });

    it('returns proper state when report IN_PROGRESS', async () => {
      const reportMock = {
        request: {
          query: ASSESSMENT_REPORT_FILE,
          variables: { id: 'someid' },
        },
        result: {
          data: {
            assessmentReport: {
              id: 'someid',
              url: 'someurl',
              uploadStatus: UploadReportStatuses.IN_PROGRESS,
            },
          },
        },
      };

      renderProgressBox([reportMock]);

      const title = await screen.findByText('Your file is being prepared');
      const progressText = screen.getByText(
        /This action can take a couple of minutes. You still can use the application./
      );

      expect(title).toBeInTheDocument();
      expect(progressText).toBeInTheDocument();
    });

    it('returns proper state when report COMPLETED', async () => {
      const reportMock = {
        request: {
          query: ASSESSMENT_REPORT_FILE,
          variables: { id: 'someid' },
        },
        result: {
          data: {
            assessmentReport: {
              id: 'someid',
              url: 'someurl',
              uploadStatus: UploadReportStatuses.COMPLETED,
            },
          },
        },
      };

      renderProgressBox([reportMock]);

      const downloadButton = await screen.findByRole('button', { name: 'Download' });
      const title = await screen.findByText('Ready for download');
      const progressText = screen.getByText(
        /Your file is ready! Click below to download it to your device./
      );

      expect(title).toBeInTheDocument();
      expect(progressText).toBeInTheDocument();
      expect(downloadButton).toBeInTheDocument();
    });

    it('returns proper state when report FAILED', async () => {
      const reportMock = {
        request: {
          query: ASSESSMENT_REPORT_FILE,
          variables: { id: 'someid' },
        },
        result: {
          data: {
            assessmentReport: {
              id: 'someid',
              url: 'someurl',
              uploadStatus: UploadReportStatuses.FAILED,
            },
          },
        },
      };

      renderProgressBox([reportMock]);

      const tryAgainButton = await screen.findByRole('button', { name: 'Try again' });

      expect(tryAgainButton).toBeInTheDocument();
      expect(
        screen.getByText(/The system was unable to prepare the file. Please try again./)
      ).toBeInTheDocument();
    });

    it('allows to download when report is COMPLETED', async () => {
      const reportMock = {
        request: {
          query: ASSESSMENT_REPORT_FILE,
          variables: { id: 'someid' },
        },
        result: {
          data: {
            assessmentReport: {
              id: 'someid',
              url: 'someurl',
              uploadStatus: UploadReportStatuses.COMPLETED,
            },
          },
        },
      };

      renderProgressBox([reportMock]);

      const downloadButton = await screen.findByRole('button', { name: 'Download' });

      await userEvent.click(downloadButton);

      expect(window.location.href).toEqual('someurl');
    });

    it('allows to retry when report is FAILED', async () => {
      const retrySpy = jest.fn();

      const reportMock = {
        request: {
          query: ASSESSMENT_REPORT_FILE,
          variables: { id: 'someid' },
        },
        result: {
          data: {
            assessmentReport: {
              id: 'someid',
              url: 'someurl',
              uploadStatus: UploadReportStatuses.FAILED,
            },
          },
        },
      };

      const retryMock = {
        request: {
          query: GENERATE_ASSESSMENT_REPORT,
          variables: {
            input: { level: ReportLevels.ENTITY, levelUuid: 'someuuid' },
          },
        },
        result() {
          retrySpy();

          return {
            data: {
              generateAssessmentReport: {
                assessmentReport: { id: '1' },
              },
            },
          };
        },
      };

      renderProgressBox([reportMock, retryMock]);

      const retryButton = await screen.findByRole('button', { name: 'Try again' });

      await userEvent.click(retryButton);

      await waitFor(() => expect(retrySpy).toHaveBeenCalledTimes(1));
    });
  });
});
