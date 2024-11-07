import { renderWithI18N } from '@shared/utils/renderWithI18N';

import { PlanGroupProgress } from './PlanGroupProgress';

describe('PlanGroupProgress component', () => {
  it('renders loading state correctly when isLoading is true', () => {
    const progress = {
      progress: {
        COMPLETED: 0,
        IN_PROGRESS: 0,
        NOT_STARTED: 0,
        NOT_MET: 0,
      },
      percentageProgress: {
        COMPLETED: 0,
        IN_PROGRESS: 0,
        NOT_STARTED: 0,
        NOT_MET: 0,
      },
    };

    const { container } = renderWithI18N(
      <PlanGroupProgress isLoading={true} progressData={progress} />,
      'DC'
    );

    expect(container).toMatchSnapshot();
  });

  it('renders progress correctly when isLoading is false', () => {
    const progress = {
      progress: {
        COMPLETED: 3,
        IN_PROGRESS: 2,
        NOT_STARTED: 2,
        NOT_MET: 3,
      },
      percentageProgress: {
        COMPLETED: 30,
        IN_PROGRESS: 20,
        NOT_STARTED: 20,
        NOT_MET: 30,
      },
    };

    const { container } = renderWithI18N(
      <PlanGroupProgress isLoading={false} progressData={progress} />,
      'DC'
    );

    expect(container).toMatchSnapshot();
  });

  it('renders progress when all progress values are zero and isLoading is false', () => {
    const progress = {
      progress: {
        COMPLETED: 0,
        IN_PROGRESS: 0,
        NOT_STARTED: 0,
        NOT_MET: 0,
      },
      percentageProgress: {
        COMPLETED: 0,
        IN_PROGRESS: 0,
        NOT_STARTED: 0,
        NOT_MET: 0,
      },
    };

    const { container } = renderWithI18N(
      <PlanGroupProgress isLoading={false} progressData={progress} />,
      'DC'
    );

    expect(container).toMatchSnapshot();
  });
});
