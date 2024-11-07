import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, waitFor } from '@testing-library/react';

import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { GENERATE_ASSESSMENT_REPORT } from '@dc/graphql/user/mutations/generateAssessmentReport';

import { useReportGenerator } from '@shared/hooks/useReportGenerator';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { FileDownloadProvider } from '@shared/hooks/useFileDownload';

const getGenerateReportMock = (spy?: () => void) => ({
  request: {
    query: GENERATE_ASSESSMENT_REPORT,
    variables: {
      input: {},
    },
  },
  result() {
    spy && spy();

    return {
      data: {
        generateAssessmentReport: {
          assessmentReport: {
            id: 'someid',
          },
        },
      },
    };
  },
});

// eslint-disable-next-line no-undef
const renderWithProviders = (TesterComponent: () => JSX.Element, mocks: MockedResponse[] = []) =>
  renderWithRouterAndReduxProvider(
    <UserInfoProvider value={userInfoMock.result.data}>
      <MockedProvider mocks={[...mocks, userInfoMock]}>
        <NavigationContextProvider>
          <FileDownloadProvider>
            <ExpandSidebarProvider>
              <TesterComponent />
            </ExpandSidebarProvider>
          </FileDownloadProvider>
        </NavigationContextProvider>
      </MockedProvider>
    </UserInfoProvider>
  );

describe('useReportGenerator', () => {
  it('calls generate report when "generateReport" is called', async () => {
    const generateReportSpy = jest.fn();
    const generateReportMock = getGenerateReportMock(generateReportSpy);

    function TesterComponent() {
      const { generateReport } = useReportGenerator();

      return <button onClick={generateReport} />;
    }

    renderWithProviders(TesterComponent, [generateReportMock, userInfoMock]);

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(generateReportSpy).toHaveBeenCalledTimes(1));
  });
});
