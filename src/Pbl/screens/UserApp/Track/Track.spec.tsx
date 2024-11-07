import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { screen, within } from '@testing-library/react';
import { DlTrackQuery } from '@graphql/dl/users/operations';
import { DlTrackDocument } from '@graphql/dl/users/hooks';
import userEvent from '@testing-library/user-event';

import { Track } from '@pbl/screens/UserApp/Track/Track';
import { renderWithRouter } from '@pbl/utils/test';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

const trackMock: MockedResponse<DlTrackQuery> = {
  request: {
    query: DlTrackDocument,
    variables: { id: undefined },
  },
  result: {
    data: {
      track: {
        description: 'Track 1 description',
        thumbnailUrl: 'some-course-thumbnail-url',
        id: '1',
        imageUrl: 'http://localstack.lvh.me',
        name: 'Track 1',
        displayName: 'Track 1',
        tasksCount: 11,
        grades: ['9', '10', '11', '12'],
        units: [
          {
            description: 'Unit 1 description',
            id: '1',
            imageUrl: 'http://localstack.lvh.me',
            displayName: 'Unit 1',
            thumbnailUrl: 'some-lesson-thumbnail-url',
            tasks: [
              {
                description: 'Task 1 description',
                id: '1',
                imageUrl: 'http://localstack.lvh.me',
                displayName: 'Task 1',
                thumbnailUrl: 'some-project-thumbnail-url',
              },
              {
                description: 'Task 5 description',
                id: '5',
                imageUrl: 'http://localstack.lvh.me',
                displayName: 'Task 5',
                thumbnailUrl: 'some-project-thumbnail-url',
              },
              {
                description: 'Task 4 description',
                id: '4',
                imageUrl: 'http://localstack.lvh.me',
                displayName: 'Task 4',
                thumbnailUrl: 'some-project-thumbnail-url',
              },
            ],
          },
          {
            description: 'Unit 4 description',
            id: '4',
            imageUrl: 'http://localstack.lvh.me',
            displayName: 'Unit 4',
            thumbnailUrl: 'some-lesson-thumbnail-url',
            tasks: [
              {
                description: 'Task 2 description',
                id: '2',
                imageUrl: 'http://localstack.lvh.me',
                displayName: 'Task 2',
                thumbnailUrl: 'some-project-thumbnail-url',
              },
              {
                description: 'Task 7 description',
                id: '7',
                imageUrl: 'http://localstack.lvh.me',
                displayName: 'Task 7',
                thumbnailUrl: 'some-project-thumbnail-url',
              },
              {
                description: 'Task 6 description',
                id: '6',
                imageUrl: 'http://localstack.lvh.me',
                displayName: 'Task 6',
                thumbnailUrl: 'some-project-thumbnail-url',
              },
            ],
          },
          {
            description: 'Unit 5 description',
            id: '5',
            imageUrl: 'http://localstack.lvh.me',
            displayName: 'Unit 5',
            thumbnailUrl: 'some-lesson-thumbnail-url',
            tasks: [
              {
                description: 'Task 5 description',
                id: '5',
                imageUrl: 'http://localstack.lvh.me',
                displayName: 'Task 5',
                thumbnailUrl: 'some-project-thumbnail-url',
              },
              {
                description: 'Task 7 description',
                id: '7',
                imageUrl: 'http://localstack.lvh.me',
                displayName: 'Task 7',
                thumbnailUrl: 'some-project-thumbnail-url',
              },
              {
                description: 'Task 6 description',
                id: '6',
                imageUrl: 'http://localstack.lvh.me',
                displayName: 'Task 6',
                thumbnailUrl: 'some-project-thumbnail-url',
              },
            ],
          },
          {
            description: 'Unit 3 description',
            id: '3',
            imageUrl: 'http://localstack.lvh.me',
            displayName: 'Unit 3',
            thumbnailUrl: 'some-lesson-thumbnail-url',
            tasks: [
              {
                description: 'Task 3 description',
                id: '3',
                imageUrl: 'http://localstack.lvh.me',
                displayName: 'Task 3',
                thumbnailUrl: 'some-project-thumbnail-url',
              },
              {
                description: 'Task 7 description',
                id: '7',
                imageUrl: 'http://localstack.lvh.me',
                displayName: 'Task 7',
                thumbnailUrl: 'some-project-thumbnail-url',
              },
            ],
          },
        ],
      },
    },
  },
};

const renderUserCourse = () => {
  const utils = renderWithRouter(
    <MockedProvider mocks={[trackMock]}>
      <NavigationContextProvider>
        <Track />
      </NavigationContextProvider>
    </MockedProvider>
  );

  return { ...utils };
};

describe('Track', () => {
  describe('List', () => {
    it('renders skeleton before response is resolved', async () => {
      renderUserCourse();

      expect(screen.getByTestId('track-skeleton')).toBeInTheDocument();
    });

    it('renders track header with track name and description', async () => {
      renderUserCourse();

      const courseSummaryCard = await screen.findByTestId('track-summary-card');
      const courseName = within(courseSummaryCard).getByRole('heading');

      expect(courseName).toHaveTextContent(/Track 1/i);
      expect(courseSummaryCard).toHaveTextContent(/Track 1 description/i);
    });

    it('renders unit list with name and description correctly', async () => {
      renderUserCourse();

      const unitList = await screen.findByRole('list', { name: 'Unit list' });
      const units = within(unitList).getAllByRole('listitem', { name: /Unit/i });

      expect(units).toHaveLength(4);

      const unitNames = ['Unit 1', 'Unit 4', 'Unit 5', 'Unit 3'];

      units.forEach((unit, index) => {
        const unitName = unitNames[index];
        expect(within(unit).getByRole('heading', { name: unitName })).toBeInTheDocument();
        expect(unit).toHaveTextContent(`${unitName} description`);
      });
    });

    it('renders projects list within a unit', async () => {
      renderUserCourse();

      const unit = await screen.findByRole('listitem', { name: 'Unit 5' });
      const unitProjects = within(unit).getAllByRole('listitem');

      expect(unitProjects).toHaveLength(3);

      const projectNames = ['Task 5', 'Task 7', 'Task 6'];

      expect(within(unitProjects[0]).getByRole('heading')).toHaveTextContent(projectNames[0]);

      unitProjects.forEach((project, index) => {
        const projectName = projectNames[index];
        expect(within(project).getByRole('heading')).toHaveTextContent(projectName);
        expect(project).toHaveTextContent(`${projectName} description`);
      });
    });
  });

  describe('navigation', () => {
    it('renders units and projects in navigation', async () => {
      const { history } = renderUserCourse();
      history.push = jest.fn();

      const trackNavigation = await screen.findByTestId('table-of-content');
      const units = within(trackNavigation).getAllByRole('button');

      expect(units).toHaveLength(4);

      const projectLists = within(trackNavigation).getAllByRole('list');
      expect(projectLists).toHaveLength(4);

      expect(within(projectLists[0]).getAllByRole('listitem')).toHaveLength(3);
      expect(within(projectLists[1]).getAllByRole('listitem')).toHaveLength(3);
      expect(within(projectLists[2]).getAllByRole('listitem')).toHaveLength(3);
      expect(within(projectLists[3]).getAllByRole('listitem')).toHaveLength(2);

      const firstProjectItem = within(trackNavigation).getByRole('link', { name: 'Task 1' });
      userEvent.click(firstProjectItem);

      expect(history.push).toHaveBeenCalledWith('/lessons/1/projects/1');
    });
  });
});
