import { renderWithRouter } from '@pbl/utils/test';
import { HitGrades } from '@pbl/components/User/ProjectSearch/Hits/HitGrades';

describe('HitGrades', () => {
  const mockedGrades = ['K', '1', '2', '3', '4', '5'];

  it('should display grades', () => {
    // @ts-ignore
    const { getByTestId, getByText } = renderWithRouter(<HitGrades grades={mockedGrades} />);

    expect(getByTestId('grades-summary')).toBeInTheDocument();
    expect(getByText('Grades: K-5')).toBeInTheDocument();
  });

  it('should render correctly', () => {
    // @ts-ignore
    const { container } = renderWithRouter(<HitGrades grades={mockedGrades} />);

    expect(container).toMatchSnapshot();
  });
});
