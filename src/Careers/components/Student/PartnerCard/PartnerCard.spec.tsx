import { OpportunityTypes } from '@graphql/dc/users/types';
import { screen } from '@testing-library/react';

import { renderWithRouter } from '@dc/utils/test';
import { PartnerCard } from '@dc/components/Student/PartnerCard/PartnerCard';

describe('PartnerCard', () => {
  it('should render correctly', async () => {
    const args = {
      thumbnailUrl: 'https://test.com/imageThumbnail.jpg',
      imageUrl: 'https://test.com/image.jpg',
      name: 'Santa Rosa Medical Center',
      about:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      opportunities: [
        { id: '1', opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP },
        { id: '2', opportunityType: OpportunityTypes.OTHER },
        { id: '3', opportunityType: OpportunityTypes.INTERNSHIP },
        { id: '4', opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP },
        { id: '4', opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP },
      ],
      courses: [{ id: '1' }, { id: '2' }],
      id: '1',
    };

    const { container } = renderWithRouter(<PartnerCard {...args} />);

    const link = screen.getByRole('link', {
      name: /Santa Rosa Medical Center/i,
    });

    const opportunitiesBadge = screen.getByText('2 Opportunities');
    const virtualInternshipBadge = screen.getByText('3 Virtual Internships');

    expect(link).toHaveAttribute('href', '/partner/1');

    expect(opportunitiesBadge).toBeInTheDocument();
    expect(virtualInternshipBadge).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
