import { Meta, StoryObj } from '@storybook/react';
import { useToggle } from 'react-use';

import { EvidenceListItem } from '@shared/components/PortfolioPlans/Evidence/EvidenceListItem';

const meta: Meta<typeof EvidenceListItem> = {
  component: EvidenceListItem,
  render: (args) => {
    const [value, toggle] = useToggle(false);

    return <EvidenceListItem {...args} selected={value} onSelect={toggle} />;
  },

  args: {
    imageUrl: 'https://picsum.photos/600/300',
    title: 'Title Examiners, Abstractors, and Searchers',
    subTitle: 'Interview Questions Assignment',
    description:
      'You will now be creating a 3-dimensional model of your proposed Geodesic Dome design. This model will be used to show the company’s Board of Directors what the new aviary...',
  },
};

export default meta;
export const Default: StoryObj<typeof EvidenceListItem> = {};
