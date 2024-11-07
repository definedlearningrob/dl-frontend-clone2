import { I18nextProvider } from 'react-i18next';
import { render } from '@testing-library/react';

import CoursesCourseHeaderProgressBar from '@dc/components/Student/Course/StudentCourse/ProgressBar';
import i18n from '@dc/i18n';

const renderLessonCard = (props) =>
  render(
    <I18nextProvider i18n={i18n}>
      <CoursesCourseHeaderProgressBar {...props} />
    </I18nextProvider>
  );
const props = { value: 2, target: 4 };

describe('CoursesCourseHeaderProgressBar', () => {
  it('renders correctly', () => {
    const { container } = renderLessonCard(props);

    expect(container).toBeInTheDocument();
  });

  it('displays progress indicator correctly', () => {
    const { container } = renderLessonCard(props);
    const progressBar = container.getElementsByClassName('course-progress-bar__indicator');
    const style = window.getComputedStyle(progressBar[0]);

    expect(style.width).toBe('50%');
  });
});
