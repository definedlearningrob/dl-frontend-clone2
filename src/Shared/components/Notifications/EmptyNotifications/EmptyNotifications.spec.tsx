import { screen } from '@testing-library/react';

import { renderWithI18N } from '@pbl/utils/test';

import { EmptyNotifications } from '@shared/components/Notifications/EmptyNotifications/EmptyNotifications';
import { NOTIFICATION_TYPES } from '@shared/resources/constants';

describe('EmptyNotifications', () => {
  it('should render with no type passed', () => {
    const { container } = renderWithI18N(<EmptyNotifications />);

    screen.getByText('No notifications yet!');
    expect(container).toMatchSnapshot();
  });
  it('should render with announcement type passed', () => {
    const { container } = renderWithI18N(
      <EmptyNotifications type={NOTIFICATION_TYPES.ANNOUNCEMENT} />
    );

    screen.getByText('No announcements yet!');
    expect(container).toMatchSnapshot();
  });
});
