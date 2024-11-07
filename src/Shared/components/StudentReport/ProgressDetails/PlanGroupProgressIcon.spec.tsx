import { renderWithI18N } from '@shared/utils/renderWithI18N';
import { TPlanStatusOption } from '@shared/hooks/usePlanStatusOptions';

import { PlanGroupProgressIcon } from './PlanGroupProgressIcon';

const variants = [
  { variant: 'neutral', label: 'Not started', value: 'not_started', testId: 'neutral-icon' },
  { variant: 'secondary', label: 'In progress', value: 'in_progress', testId: 'secondary-icon' },
  { variant: 'success', label: 'Completed', value: 'completed', testId: 'success-icon' },
  { variant: 'danger', label: 'Not met', value: 'not_met', testId: 'danger-icon' },
];

describe('PlanGroupProgressIcon component', () => {
  variants.forEach(({ variant, label, value, testId }) => {
    it(`renders with ${variant} variant correctly`, () => {
      const item = {
        Icon: () => <svg data-testid={testId} />,
        variant: variant as TPlanStatusOption['variant'],
        label,
        value,
      };

      const { container } = renderWithI18N(<PlanGroupProgressIcon item={item} />, 'DC');

      expect(container).toMatchSnapshot();
    });
  });
});
