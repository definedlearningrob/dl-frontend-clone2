import { screen } from '@testing-library/react';

import { renderWithI18N } from '@pbl/utils/test';
import { TeamItem } from '@pbl/components/User/Teams/TeamItem/TeamItem';

const team = {
  id: '1',
  uuid: 'uuid1',
  name: 'team name',
  isArchived: false,
  students: {
    nodes: [
      {
        currentTasksCount: 1,
        firstName: 'Test',
        lastName: 'Student',
        uuid: '1',
      },
      {
        currentTasksCount: 1,
        firstName: 'Test',
        lastName: 'Student 2',
        uuid: '2',
      },
    ],
    nodesCount: 2,
    pagesCount: 1,
  },
  tasks: [{ displayName: 'task', id: '1' }],
};
describe('TeamItem', () => {
  it('should render correctly', () => {
    const { container } = renderWithI18N(<TeamItem handleTeamModalOpen={jest.fn()} team={team} />);

    expect(screen.getByText('team name')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
