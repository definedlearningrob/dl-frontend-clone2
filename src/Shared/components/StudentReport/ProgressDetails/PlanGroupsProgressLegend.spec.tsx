import { PlanGroupsProgressLegend } from '@shared/components/StudentReport/ProgressDetails/PlanGroupsProgressLegend';
import { renderWithI18N } from '@shared/utils/renderWithI18N';

describe('PlanGroupsProgressLegend component', () => {
  it('should render correctly', () => {
    const { container } = renderWithI18N(<PlanGroupsProgressLegend />, 'DC');

    expect(container).toMatchSnapshot();
  });
});
