import { render, screen } from '@testing-library/react';

import { ProgressBarWithSteps } from '@shared/components/ProgressBarWithSteps/ProgressBarWithSteps';

describe('ProgressBarWithSteps', () => {
  it('should render correctly without minSteps prop', () => {
    const { container } = render(
      <ProgressBarWithSteps className='additional-class-name' currentStep={1} totalSteps={5} />
    );

    const steps = screen.getAllByTestId(/step-/);
    expect(steps).toHaveLength(5);
    expect(steps[0]).toHaveClass('completed');
    expect(steps[0]).not.toHaveClass('required');

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with minSteps prop', () => {
    const { container } = render(
      <ProgressBarWithSteps
        className='additional-class-name'
        currentStep={1}
        minSteps={2}
        totalSteps={5}
      />
    );

    const steps = screen.getAllByTestId(/step-/);
    expect(steps).toHaveLength(5);
    expect(steps[0]).toHaveClass('completed');
    expect(steps[0]).toHaveClass('required');
    expect(steps[1]).toHaveClass('required');

    expect(container).toMatchSnapshot();
  });
});
