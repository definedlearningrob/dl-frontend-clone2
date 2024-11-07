import { MockedProvider } from '@apollo/client/testing';
import { waitFor, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import courseGradingSchoolClassWithStudentsQuery from '@dc/graphql/user/queries/courseGradingSchoolClassWithStudents';
import GradingSchoolClass from '@dc/screens/UserApp/GradingSchoolClass/GradingSchoolClass';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const mocks = [
  {
    request: {
      query: courseGradingSchoolClassWithStudentsQuery,
      // courseId, schoolClassUuid are got from params
      variables: { uuid: undefined, courseId: undefined },
    },
    result: () => ({
      data: {
        schoolClass: {
          gradingNeededStudents: {
            nodes: [
              {
                course: {
                  id: '1',
                  name: 'Course 1',
                  __typename: 'Course',
                },
                firstName: 'Lanell',
                lastName: 'Renner',
                settings: {
                  assessmentType: {
                    value: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
                  },
                },
                uuid: '1',
                __typename: 'Student',
              },
            ],
            __typename: 'StudentPage',
          },
          name: 'Class 1',
          parentName: 'Harvard University',
          uuid: '1',
          withoutGradingNeededStudents: {
            nodes: [
              {
                course: {
                  id: '1',
                  name: 'Course 1',
                  __typename: 'Course',
                },
                firstName: 'Michel',
                lastName: 'Jenkins',
                settings: {
                  assessmentType: {
                    value: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                  },
                },
                uuid: '2',
                __typename: 'Student',
              },
              {
                course: {
                  id: '1',
                  name: 'Course 1',
                  __typename: 'Course',
                },
                firstName: 'Marguerite',
                lastName: 'Friesen',
                settings: {
                  assessmentType: {
                    value: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
                  },
                },
                uuid: '3',
                __typename: 'Student',
              },
            ],
            __typename: 'StudentPage',
          },
          __typename: 'SchoolClass',
        },
      },
    }),
  },
];

const renderUserAppGradingSchoolClass = () => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <UserInfoProvider>
        <NavigationContextProvider>
          <GradingSchoolClass />
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

  return { ...utils };
};

describe('UserAppGradingSchoolClass', () => {
  it('renders school, school class heading and list of students correctly', async () => {
    const { getAllByTestId, container } = renderUserAppGradingSchoolClass();
    await waitFor(() => {
      const studentItems = getAllByTestId(/grading-student-item-header/);

      expect(container).toHaveTextContent('Course 1 - Grading');
      expect(container).toHaveTextContent('Harvard University');
      expect(container).toHaveTextContent('Class 1');

      expect(studentItems).toHaveLength(3);
    });
  });

  it('renders student list item with student full name correctly', async () => {
    const { getAllByTestId } = renderUserAppGradingSchoolClass();
    await waitFor(() => {
      const studentItems = getAllByTestId(/grading-student-item-header/);

      expect(studentItems[0]).toHaveTextContent('Lanell Renner');
      expect(studentItems[1]).toHaveTextContent('Michel Jenkins');
      expect(studentItems[2]).toHaveTextContent('Marguerite Friesen');
    });
  });

  it('displays middle school/high school label on student item', async () => {
    renderUserAppGradingSchoolClass();
    const [firstGrading, secondGrading, thirdGreading] = await screen.findAllByTestId(
      /grading-student-item-header/
    );

    const firstStudentGradingStageIcon = within(firstGrading).getAllByTestId('icon')[0];
    userEvent.hover(firstStudentGradingStageIcon);
    const firstStudentGradingStageTooltip = await screen.findByRole('tooltip', { hidden: true });
    expect(firstStudentGradingStageTooltip).toHaveTextContent('Middle School student');
    userEvent.unhover(firstStudentGradingStageIcon);

    const secondStudentGradingStageIcon = within(secondGrading).getAllByTestId('icon')[0];
    userEvent.hover(secondStudentGradingStageIcon);
    const secondStudentGradingStageTooltip = await screen.findByRole('tooltip', { hidden: true });
    expect(secondStudentGradingStageTooltip).toHaveTextContent('High School student');
    userEvent.unhover(secondStudentGradingStageIcon);

    const thirdStudentGradingStageIcon = within(thirdGreading).getAllByTestId('icon')[0];
    userEvent.hover(thirdStudentGradingStageIcon);
    const thirdStudentGradingStageTooltip = await screen.findByRole('tooltip', { hidden: true });
    expect(thirdStudentGradingStageTooltip).toHaveTextContent('High School student');
    userEvent.unhover(thirdStudentGradingStageIcon);
  });

  it('display "needs review" indicator when  student requires course activity review', async () => {
    const { getAllByTestId } = renderUserAppGradingSchoolClass();

    await waitFor(() => {
      const studentItems = getAllByTestId(/grading-student-item-header/);

      expect(within(studentItems[0]).getByTestId(/review-indicator/)).toBeInTheDocument();
      expect(within(studentItems[1]).queryByTestId(/review-indicator/)).not.toBeInTheDocument();
      expect(within(studentItems[2]).queryByTestId(/review-indicator/)).not.toBeInTheDocument();
    });
  });
});
