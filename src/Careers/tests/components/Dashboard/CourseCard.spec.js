import { I18nextProvider } from 'react-i18next';
import { render } from '@testing-library/react';

import i18n from '@dc/i18n';
import CourseCard from '@dc/components/Dashboard/CourseCard/CourseCard';

const renderLessonCard = (props) =>
  render(
    <I18nextProvider i18n={i18n}>
      <CourseCard {...props} />
    </I18nextProvider>
  );

describe('DashboardCourseCard', () => {
  it('displays with percentage progress text correctly', () => {
    const { getByTestId } = renderLessonCard({
      title: 'Architect: Autocad Course',
      lessonsNumber: 10,
      lessonsCompleted: 6,
    });

    expect(getByTestId(/course-card-progress-circle/)).toHaveTextContent('60%');
  });
});
