import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { waitFor, screen } from '@testing-library/dom';

import generateCourseReportMutation from '@dc/graphql/user/mutations/generateCourseReport';
import UserReportModal from '@dc/components/User/Report/Modal/Modal';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ReportLevels } from '@dc/resources/enums';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { ReportsProvider } from '@dc/hooks/useReports';

import { FILE_TO_DOWNLOAD_KEY } from '@shared/resources/constants';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { FileDownloadProvider } from '@shared/hooks/useFileDownload';

type Props = {
  level: ReportLevels;
  levelUuid: string;
  onClose: () => void;
  self?: boolean;
};

const getGenerateCourseReportMock = (spy?: () => void) => ({
  request: {
    query: generateCourseReportMutation,
    variables: { input: { level: ReportLevels.ENTITY, levelUuid: 'leveluuid', startYear: 2020 } },
  },
  result() {
    spy && spy();

    return {
      data: {
        generateCourseReport: {
          courseReport: {
            id: 'someid',
          },
        },
      },
    };
  },
  userInfoMock,
});

const renderReportModal = (props: Props, mocks: MockedResponse[] = []) =>
  renderWithRouterAndReduxProvider(
    <UserInfoProvider value={userInfoMock.result.data}>
      <MockedProvider mocks={[...mocks, userInfoMock]}>
        <NavigationContextProvider>
          <ReportsProvider>
            <FileDownloadProvider>
              <UserReportModal {...props} />
            </FileDownloadProvider>
          </ReportsProvider>
        </NavigationContextProvider>
      </MockedProvider>
    </UserInfoProvider>
  );

describe('UserReportModal', () => {
  beforeEach(() => localStorage.setItem(FILE_TO_DOWNLOAD_KEY, ''));

  it('disable button when no report type choosen', () => {
    renderReportModal({
      level: ReportLevels.ENTITY,
      levelUuid: 'leveluuid',
      onClose: () => {},
    });

    expect(screen.getByRole('button', { name: 'Generate' })).toBeDisabled();
  });

  it('calls on close method on close click', () => {
    const closeSpy = jest.fn();
    renderReportModal({
      level: ReportLevels.ENTITY,
      levelUuid: 'leveluuid',
      onClose: closeSpy,
    });

    userEvent.click(screen.getByTestId('modal-close-button'));

    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  describe('courses report', () => {
    it('calls generate report mutation with proper params', async () => {
      const generateSpy = jest.fn();
      const generateMock = getGenerateCourseReportMock(generateSpy);

      renderReportModal(
        {
          level: ReportLevels.ENTITY,
          levelUuid: 'leveluuid',
          onClose: () => {},
        },
        [generateMock]
      );

      userEvent.click(screen.getByRole('radio', { name: 'Courses Report' }));
      userEvent.click(screen.getByRole('button', { name: 'Generate' }));

      await waitFor(() => expect(generateSpy).toHaveBeenCalledTimes(1));
    });

    it('updates local storage properly after successfull generate', async () => {
      const generateMock = getGenerateCourseReportMock();

      renderReportModal(
        {
          level: ReportLevels.ENTITY,
          levelUuid: 'leveluuid',
          onClose: () => {},
        },
        [generateMock]
      );

      userEvent.click(screen.getByRole('radio', { name: 'Courses Report' }));
      userEvent.click(screen.getByRole('button', { name: 'Generate' }));

      await waitFor(() =>
        expect(JSON.parse(localStorage.getItem(FILE_TO_DOWNLOAD_KEY) || '')).toMatchObject({
          id: 'someid',
          variables: {
            levelUuid: 'leveluuid',
            level: ReportLevels.ENTITY,
          },
        })
      );
    });

    it('calls on close after successfull generate', async () => {
      const closeSpy = jest.fn();
      const generateMock = getGenerateCourseReportMock();

      renderReportModal(
        {
          level: ReportLevels.ENTITY,
          levelUuid: 'leveluuid',
          onClose: closeSpy,
        },
        [generateMock]
      );

      userEvent.click(screen.getByRole('radio', { name: 'Courses Report' }));
      userEvent.click(screen.getByRole('button', { name: 'Generate' }));

      await waitFor(() => expect(closeSpy).toHaveBeenCalledTimes(1));
    });
  });
});
