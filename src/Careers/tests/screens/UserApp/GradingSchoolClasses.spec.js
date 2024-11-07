import { MockedProvider } from '@apollo/client/testing';
import { waitFor, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import courseGradingSchoolClassesQuery from '@dc/graphql/user/queries/courseGradingSchoolClasses';
import GradingSchoolClasses from '@dc/screens/UserApp/GradingSchoolClasses/GradingSchoolClasses';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const schoolClassesGradingNeededMockFragment = [
  {
    name: 'Class 1',
    parentName: 'Harvard University',
    settings: {
      assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
    },
    uuid: '111',
    __typename: 'SchoolClass',
  },
  {
    name: 'Class 2',
    parentName: 'Harvard University',
    settings: {
      assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
    },
    uuid: '222',
    __typename: 'SchoolClass',
  },
];

const schoolClassesWithoutGradingNeededMockFragment = [
  {
    name: 'Class 3',
    parentName: 'Harvard University',
    settings: {
      assessmentType: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
    },
    uuid: '333',
    __typename: 'SchoolClass',
  },
  {
    name: 'Class 4',
    parentName: 'Harvard University',
    settings: {
      assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
    },
    uuid: '444',
    __typename: 'SchoolClass',
  },
];

const mocks = (schoolClassesWithGradingNeededArray, schoolClassesWithoutGradingNeededArray) => [
  {
    request: {
      query: courseGradingSchoolClassesQuery,
      variables: { id: undefined },
    },
    result: () => ({
      data: {
        course: {
          gradingNeededSchoolClasses: {
            nodes: schoolClassesWithGradingNeededArray,
            __typename: 'SchoolClassPage',
          },
          id: '1',
          name: 'Course 1',
          withoutGradingNeededSchoolClasses: {
            nodes: schoolClassesWithoutGradingNeededArray,
            __typename: 'SchoolClassPage',
          },
          __typename: 'Course',
        },
      },
    }),
  },
];

const renderUserAppGradingSchoolClasses = (
  needGradingSchoolClasses = schoolClassesGradingNeededMockFragment,
  allSchoolClasses = schoolClassesWithoutGradingNeededMockFragment
) => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks(needGradingSchoolClasses, allSchoolClasses)}>
      <UserInfoProvider>
        <NavigationContextProvider>
          <GradingSchoolClasses />
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

  return { ...utils };
};

describe('UserAppGradingSchoolClasses', () => {
  it('renders course name in heading and school classes list with names correctly', async () => {
    const { getAllByTestId, container } = renderUserAppGradingSchoolClasses();

    await waitFor(() => {
      const schoolClassItems = getAllByTestId(/grading-schoolclass-item/);

      expect(container).toHaveTextContent('Course 1');
      expect(schoolClassItems).toHaveLength(4);
      expect(schoolClassItems[0]).toHaveTextContent(/Class 1/i);
      expect(schoolClassItems[1]).toHaveTextContent(/Class 2/i);
      expect(schoolClassItems[2]).toHaveTextContent(/Class 3/i);
      expect(schoolClassItems[3]).toHaveTextContent(/Class 4/i);
      expect(within(schoolClassItems[1]).getByTestId(/review-indicator/)).toBeInTheDocument();
    });
  });

  it('display "needs review" indicator when some students in school class requires course activity review', async () => {
    const { getAllByTestId } = renderUserAppGradingSchoolClasses();

    await waitFor(() => {
      const schoolClassItems = getAllByTestId(/grading-schoolclass-item/);

      expect(within(schoolClassItems[0]).getByTestId(/review-indicator/)).toBeInTheDocument();
      expect(within(schoolClassItems[1]).getByTestId(/review-indicator/)).toBeInTheDocument();
      expect(within(schoolClassItems[2]).queryByTestId(/review-indicator/)).not.toBeInTheDocument();
      expect(within(schoolClassItems[3]).queryByTestId(/review-indicator/)).not.toBeInTheDocument();
    });
  });

  it('displays middle school / high school label on school class item', async () => {
    renderUserAppGradingSchoolClasses();

    const [firstSchool, secondSchool, thirdSchool, fourthSchool] = await screen.findAllByTestId(
      /grading-schoolclass-item/
    );

    const firstSchoolClassItemStageIcon = within(firstSchool).getAllByTestId('icon')[1];
    userEvent.hover(firstSchoolClassItemStageIcon);
    const firstSchoolClassItemStageTooltip = await screen.findByRole('tooltip', { hidden: true });
    expect(firstSchoolClassItemStageTooltip).toHaveTextContent('Middle School class');
    userEvent.unhover(firstSchoolClassItemStageIcon);

    const secondSchoolClassItemStageIcon = within(secondSchool).getAllByTestId('icon')[1];
    userEvent.hover(secondSchoolClassItemStageIcon);
    const secondSchoolClassItemStageTooltip = await screen.findByRole('tooltip', { hidden: true });
    expect(secondSchoolClassItemStageTooltip).toHaveTextContent('High School class');
    userEvent.unhover(secondSchoolClassItemStageIcon);

    const thirdSchoolClassItemStageIcon = within(thirdSchool).getAllByTestId('icon')[1];
    userEvent.hover(thirdSchoolClassItemStageIcon);
    const thirdSchoolClassItemStageTooltip = await screen.findByRole('tooltip', { hidden: true });
    expect(thirdSchoolClassItemStageTooltip).toHaveTextContent('Middle School class');
    userEvent.unhover(thirdSchoolClassItemStageIcon);

    const fourthSchoolClassItemStageIcon = within(fourthSchool).getAllByTestId('icon')[1];
    userEvent.hover(fourthSchoolClassItemStageIcon);
    const fourthSchoolClassItemStageTooltip = await screen.findByRole('tooltip', { hidden: true });
    expect(fourthSchoolClassItemStageTooltip).toHaveTextContent('High School class');
    userEvent.unhover(fourthSchoolClassItemStageIcon);
  });

  it(`renders placeholder text when there are no school classes 
  (no teacher\'s students assigned to the course)`, async () => {
    const { getByTestId, container } = renderUserAppGradingSchoolClasses([], []);

    await waitFor(() => {
      const emptyContainerPlaceholder = getByTestId(/empty-placeholder/);

      expect(container).toHaveTextContent('Course 1');
      expect(emptyContainerPlaceholder).toHaveTextContent(
        /There are no students assigned to this course./
      );
    });
  });
});
