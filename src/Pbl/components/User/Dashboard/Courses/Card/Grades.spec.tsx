import { renderWithRouter } from '@pbl/utils/test';
import { Grades } from '@pbl/components/User/Dashboard/Courses/Card/Grades';

describe('Grades', () => {
  const mockedGrades = ['2', '3', '4'];

  it('should display grades', () => {
    // @ts-ignore
    const { getByTestId, getByText } = renderWithRouter(<Grades grades={mockedGrades} />);

    expect(getByTestId('grades-summary')).toBeInTheDocument();
    expect(getByText('Grades: 2-4')).toBeInTheDocument();
  });

  it('should renders correctly', () => {
    // @ts-ignore
    const { container } = renderWithRouter(<Grades grades={mockedGrades} />);

    expect(container).toMatchSnapshot();
  });
});
