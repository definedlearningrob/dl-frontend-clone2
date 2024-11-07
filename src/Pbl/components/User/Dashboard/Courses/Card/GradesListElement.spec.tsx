import { renderWithRouter } from '@pbl/utils/test';
import { GradesListElement } from '@pbl/components/User/Dashboard/Courses/Card/GradesListElement';

describe('GradesListElement', () => {
  const mockedRange = {
    start: 'K',
    end: '5',
  };

  it('should display grades', () => {
    const { getByTestId, getByText } = renderWithRouter(<GradesListElement range={mockedRange} />);

    expect(getByTestId('grade-list-element')).toBeInTheDocument();
    expect(getByTestId('grade-text')).toBeInTheDocument();
    expect(getByText('Grades: K-5')).toBeInTheDocument();
  });

  it('should renders correctly', () => {
    // @ts-ignore
    const { container } = renderWithRouter(<GradesListElement range={mockedRange} />);

    expect(container).toMatchSnapshot();
  });
});
