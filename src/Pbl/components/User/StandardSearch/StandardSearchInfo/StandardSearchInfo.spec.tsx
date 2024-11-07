import { screen } from '@testing-library/react';

import { renderWithI18N } from '@pbl/utils/test';
import { StandardSearchInfo } from '@pbl/components/User/StandardSearch/StandardSearchInfo/StandardSearchInfo';

describe('StandardSearchInfo', () => {
  it('should render correctly', () => {
    const { container } = renderWithI18N(<StandardSearchInfo />);

    expect(
      screen.getByText(
        'If a standard is not shown, there are currently no projects that align to that standard.'
      )
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
