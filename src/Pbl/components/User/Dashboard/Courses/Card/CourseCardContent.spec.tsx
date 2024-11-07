import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from '@pbl/utils/test';
import CourseCardContent from '@pbl/components/User/Dashboard/Courses/Card/CourseCardContent';
import { TDashboardCoursesTrack, TGrade } from '@pbl/graphql/user/queries/dashboardCourses';

type Props = {
  course: TDashboardCoursesTrack;
  grades: TGrade[];
  onClick: () => void;
};

const renderComponent = ({ course, onClick, grades }: Props) =>
  renderWithRouter(<CourseCardContent course={course} grades={grades} onClick={onClick} />);

describe('CourseCardContent', () => {
  const mockedCardContent = {
    course: {
      __typename: 'Track',
      tasksCount: 5,
      description: '<p>This course description</p>',
      displayName: 'Test display name',
      grades: [],
      id: '1',
      imageUrl: 'http://localstack.test.me',
      shortDescription: 'short decs',
      thumbnailUrl: 'http://localstack.test.me',
    },
    onClick: jest.fn(),
    grades: ['K', '1', '2', '3', '4'],
  };

  it('should render grades correctly', () => {
    // @ts-ignore
    const { getByText, getByTestId } = renderComponent(mockedCardContent);

    expect(getByTestId('card-data')).toBeInTheDocument();
    expect(getByText('Grades: K-4')).toBeInTheDocument();
  });

  it('should render number of projects correctly', () => {
    // @ts-ignore
    const { getByText } = renderComponent(mockedCardContent);

    expect(getByText(`Projects: ${mockedCardContent.course.tasksCount}`)).toBeInTheDocument();
  });

  it('should fire click event onClick', () => {
    // @ts-ignore
    const { getByTestId } = renderComponent(mockedCardContent);

    fireEvent.click(getByTestId('description-link'));

    expect(mockedCardContent.onClick).toHaveBeenCalled();
  });

  it('should renders card correctly', () => {
    // @ts-ignore
    const { container } = renderComponent(mockedCardContent);

    expect(container).toMatchSnapshot();
  });
});
