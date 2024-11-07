import { screen } from '@testing-library/react';

import { ModuleLinks } from '@dc/screens/StudentApp/Dashboard/ModuleLinks/ModuleLinks';

import { renderWithRouter } from '@shared/utils/test';

describe('ModuleLinks', () => {
  it('should render correctly', () => {
    const { container } = renderWithRouter(
      <ModuleLinks hasOpportunitiesEnabled={true} hasPostSecondaryApplicationsEnabled={true} />
    );
    expect(container).toMatchSnapshot();
  });

  describe('with opportunities disabled', () => {
    it('should render three cards with secondary actions', () => {
      renderWithRouter(
        <ModuleLinks hasOpportunitiesEnabled={false} hasPostSecondaryApplicationsEnabled={true} />
      );

      const cardHeadings = screen.getAllByRole('heading', { level: 6 });

      expect(cardHeadings).toHaveLength(5);
      expect(cardHeadings[0]).toHaveTextContent('Edit');
      expect(cardHeadings[1]).toHaveTextContent('Portfolio');
      expect(cardHeadings[2]).toHaveTextContent('Experience Summary');
      expect(cardHeadings[3]).toHaveTextContent('Applications');
      expect(cardHeadings[4]).toHaveTextContent('Find your Future');
    });
  });

  describe('with applications disabled', () => {
    it('should not render post secondary applications link', () => {
      renderWithRouter(
        <ModuleLinks hasOpportunitiesEnabled={false} hasPostSecondaryApplicationsEnabled={true} />
      );

      expect(screen.queryByRole('link', { name: 'Applications' })).not.toBeInTheDocument();
    });
  });
});
