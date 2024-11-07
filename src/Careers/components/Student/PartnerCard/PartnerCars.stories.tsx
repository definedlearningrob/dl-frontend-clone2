import { Meta, StoryObj } from '@storybook/react';
import { OpportunityTypes } from '@graphql/dc/users/types';

import { PartnerCard } from './PartnerCard';

const meta: Meta<typeof PartnerCard> = {
  component: PartnerCard,
  render: PartnerCard,
  args: {
    thumbnailUrl: 'https://picsum.photos/600/300',
    imageUrl: 'https://picsum.photos/600/300',
    name: 'Santa Rosa Medical Center',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    opportunities: [
      { id: '1', opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP },
      { id: '2', opportunityType: OpportunityTypes.OTHER },
      { id: '3', opportunityType: OpportunityTypes.INTERNSHIP },
      { id: '4', opportunityType: OpportunityTypes.VIRTUAL_INTERNSHIP },
    ],
    id: '1',
  },
};

export default meta;
export const GenericCardStory: StoryObj<typeof PartnerCard> = {};
