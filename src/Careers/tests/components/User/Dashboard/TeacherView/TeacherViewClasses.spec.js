import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { screen, waitFor, within } from '@testing-library/react';

import { TeacherViewClasses } from '@dc/components/User/Dashboard/TeacherView/Classes/TeacherViewClasses';
import generateCourseReportMutation from '@dc/graphql/user/mutations/generateCourseReport';
import generatePlanReportMutation from '@dc/graphql/user/mutations/generatePlanReport';
import schoolClassPlansQuery from '@dc/graphql/user/queries/schoolClassPlans';
import { TEACHER_DASHBOARD } from '@dc/graphql/user/queries/teacherDashboardClassesStats';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { ReportLevels } from '@dc/resources/enums';
import { userInfoMock } from '@dc/tests/mocks/userMocks';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { ReportsProvider } from '@dc/hooks/useReports';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { FILE_TO_DOWNLOAD_KEY } from '@shared/resources/constants';
import { FileDownloadProvider } from '@shared/hooks/useFileDownload';

Element.prototype.getBoundingClientRect = () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

const classesMock = [
  {
    request: {
      query: TEACHER_DASHBOARD,
    },
    result: {
      data: {
        teacherDashboard: {
          schoolClasses: [
            {
              enrolledCoursesCount: 100,
              entityName: 'Harvard University',
              finishedAssessmentsCount: 200,
              finishedCoursesCount: 80,
              gradingNeeded: true,
              isDemo: true,
              schoolClassName: 'Class 1',
              schoolClassUuid: '1',
              settings: {
                assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
              },
              studentsCount: 30,
            },
            {
              enrolledCoursesCount: 25,
              entityName: 'Harvard University',
              finishedAssessmentsCount: 35,
              finishedCoursesCount: 15,
              gradingNeeded: false,
              isDemo: false,
              schoolClassName: 'Class 2',
              schoolClassUuid: '2',
              settings: {
                assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
              },
              studentsCount: 20,
            },
            {
              enrolledCoursesCount: 0,
              entityName: 'Harvard University',
              finishedAssessmentsCount: 0,
              finishedCoursesCount: 0,
              gradingNeeded: false,
              isDemo: false,
              schoolClassName: 'Class 3',
              schoolClassUuid: '3',
              settings: {
                assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
              },
              studentsCount: 1,
            },
          ],
          userId: '1',
        },
      },
    },
  },
  {
    request: {
      query: schoolClassPlansQuery,
      variables: { uuid: '1' },
    },
    result: {
      data: {
        schoolClass: {
          uuid: '1',
          entity: {
            uuid: '1',
            plans: [
              { id: '1', name: 'First Plan' },
              { id: '2', name: 'Second Plan' },
              { id: '3', name: 'Third Plan' },
            ],
          },
        },
      },
    },
  },
  userInfoMock,
];

const renderClasses = (mocks = []) =>
  renderWithRouterAndReduxProvider(
    <UserInfoProvider value={userInfoMock.result.data}>
      <FileDownloadProvider>
        <MockedProvider addTypename={false} mocks={[...classesMock, ...mocks]}>
          <NavigationContextProvider>
            <ReportsProvider>
              <>
                <div id='portal' />
                <TeacherViewClasses isManagementEnabled={false} />
              </>
            </ReportsProvider>
          </NavigationContextProvider>
        </MockedProvider>
      </FileDownloadProvider>
    </UserInfoProvider>,
    { initialState: { session: { user: { type: 'user' } } } }
  );

describe('UserDashboardTeacherViewClasses', () => {
  it('display educational label on school class item when its assessment type is set to Middle School', async () => {
    renderClasses([userInfoMock]);

    const [firstClass, secondClass] = await screen.findAllByRole('listitem');

    const firstClassStageIcon = within(firstClass).getAllByTestId('icon')[0];
    userEvent.hover(firstClassStageIcon);

    const firstClassStageTooltip = await screen.findByRole('tooltip', { hidden: true });
    expect(firstClassStageTooltip).toHaveTextContent('Middle School class');
    userEvent.unhover(firstClassStageIcon);

    const secondClassStageIcon = within(secondClass).getAllByTestId('icon')[0];
    userEvent.hover(secondClassStageIcon);

    const secondClassStageTooltip = await screen.findByRole('tooltip', { hidden: true });

    expect(secondClassStageTooltip).toHaveTextContent('High School class');
  });

  it('display demo label on school class item when demo class', async () => {
    const { getAllByTestId } = renderClasses();

    await waitFor(() => {
      const classItems = getAllByTestId(/teacher-dashboard-schoolclass$/);

      expect(within(classItems[0]).getByTestId(/demo-label/)).toBeInTheDocument();
      expect(within(classItems[1]).queryByTestId(/demo-label/)).not.toBeInTheDocument();
      expect(within(classItems[2]).queryByTestId(/demo-label/)).not.toBeInTheDocument();
    });
  });

  it('displays data of each school class correctly', async () => {
    const { getAllByTestId } = renderClasses();

    await waitFor(() => {
      const classItems = getAllByTestId(/teacher-dashboard-schoolclass$/);

      expect(classItems).toHaveLength(3);
      expect(classItems[0]).toHaveTextContent('Class 1');
      expect(classItems[1]).toHaveTextContent('Class 2');
      expect(classItems[2]).toHaveTextContent('Class 3');

      expect(
        within(classItems[0]).getByTestId(/teacher-dashboard-schoolclass-students/)
      ).toHaveTextContent('30');
      expect(
        within(classItems[0]).getByTestId(/teacher-dashboard-schoolclass-assessments/)
      ).toHaveTextContent('200');
      expect(
        within(classItems[0]).getByTestId(/teacher-dashboard-schoolclass-courses/)
      ).toHaveTextContent('80/100');

      expect(
        within(classItems[1]).getByTestId(/teacher-dashboard-schoolclass-students/)
      ).toHaveTextContent('20');
      expect(
        within(classItems[1]).getByTestId(/teacher-dashboard-schoolclass-assessments/)
      ).toHaveTextContent('35');
      expect(
        within(classItems[1]).getByTestId(/teacher-dashboard-schoolclass-courses/)
      ).toHaveTextContent('15/25');

      expect(
        within(classItems[2]).getByTestId(/teacher-dashboard-schoolclass-students/)
      ).toHaveTextContent('1');
      expect(
        within(classItems[2]).getByTestId(/teacher-dashboard-schoolclass-assessments/)
      ).toHaveTextContent('0');
      expect(
        within(classItems[2]).getByTestId(/teacher-dashboard-schoolclass-courses/)
      ).toHaveTextContent('0/0');
    });
  });

  it('displays Middle School label if school class has "isMiddleSchool" assessment type', async () => {
    renderClasses();

    const [firstClass] = await screen.findAllByRole('listitem');

    const firstClassStageIcon = within(firstClass).getAllByTestId('icon')[0];
    userEvent.hover(firstClassStageIcon);

    const firstClassStageTooltip = await screen.findByRole('tooltip', { hidden: true });
    expect(firstClassStageTooltip).toHaveTextContent('Middle School class');
  });

  it('displays "needs review" badge when something requires a teacher\'s review within a school class', async () => {
    const { getAllByTestId } = renderClasses();

    await waitFor(() => {
      const classItems = getAllByTestId(/teacher-dashboard-schoolclass$/);
      const reviewIndicators = getAllByTestId(/review-indicator/);

      expect(reviewIndicators).toHaveLength(1);
      expect(classItems[0]).toHaveTextContent(/needs review/i);
      expect(classItems[1]).not.toHaveTextContent(/needs review/i);
      expect(classItems[2]).not.toHaveTextContent(/needs review/i);
    });
  });

  it('opens announcement modal window on click "Make Announcement" button on a school class list item', async () => {
    renderClasses();

    const annoncementOptions = await screen.findAllByText('Make Announcement');

    userEvent.click(annoncementOptions[0]);

    await waitFor(() => expect(screen.getByText(/Create Announcement/i)).toBeInTheDocument());
  });

  it('generates course report for class properly', async () => {
    const spy = jest.fn();
    const generateReportMock = {
      request: {
        query: generateCourseReportMutation,
        variables: { input: { level: ReportLevels.SCHOOL_CLASS, levelUuid: '1', startYear: 2020 } },
      },
      result() {
        spy();

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
    };
    renderClasses([generateReportMock]);

    const generateReportOptions = await screen.findAllByText('Generate Report');

    userEvent.click(generateReportOptions[0]);

    expect(screen.queryByText('Courses Report')).toBeInTheDocument();

    userEvent.click(screen.getByRole('radio', { name: 'Courses Report' }));
    userEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));

    expect(JSON.parse(localStorage.getItem(FILE_TO_DOWNLOAD_KEY))).toMatchObject({
      id: 'someid',
      variables: {
        levelUuid: '1',
        level: ReportLevels.SCHOOL_CLASS,
        startYear: 2020,
      },
    });

    await waitFor(() => expect(screen.queryByText('Courses Report')).not.toBeInTheDocument());
  });

  it('generates plan report for class properly', async () => {
    const spy = jest.fn();
    const generateReportMock = {
      request: {
        query: generatePlanReportMutation,
        variables: {
          input: {
            level: ReportLevels.SCHOOL_CLASS,
            levelUuid: '1',
            planId: '2',
            startYear: 2020,
          },
        },
      },
      result() {
        spy();

        return {
          data: {
            generatePlanReport: {
              planReport: {
                id: 'someid',
              },
            },
          },
        };
      },
    };

    renderClasses([generateReportMock]);

    const generateReportOptions = await screen.findAllByText('Generate Report');

    userEvent.click(generateReportOptions[0]);

    expect(await screen.findByText('First Plan')).toBeInTheDocument();

    userEvent.click(screen.getByRole('radio', { name: 'Second Plan' }));
    userEvent.click(screen.getByRole('button', { name: 'Generate' }));

    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));

    expect(JSON.parse(localStorage.getItem(FILE_TO_DOWNLOAD_KEY))).toMatchObject({
      id: 'someid',
      variables: {
        level: ReportLevels.SCHOOL_CLASS,
        levelUuid: '1',
        planId: '2',
        startYear: 2020,
      },
    });

    await waitFor(() => expect(screen.queryByText('Second Plan')).not.toBeInTheDocument());
  });
});
