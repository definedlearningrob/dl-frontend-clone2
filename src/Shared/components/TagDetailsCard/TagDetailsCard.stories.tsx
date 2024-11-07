import { Meta, StoryObj } from '@storybook/react';

import { TagDetailsCard } from '@shared/components/TagDetailsCard/TagDetailsCard';
import { AGGREGATION_PERIOD } from '@shared/resources/enums';
import { mockedTagSummary } from '@shared/screens/UserApp/TagsReport/TagDetails/helpers';

const meta: Meta<typeof TagDetailsCard> = {
  component: TagDetailsCard,
  render: (args) => <TagDetailsCard {...args} />,
  args: {
    aggregationPeriod: AGGREGATION_PERIOD.MONTH,
    tagSummary: mockedTagSummary,
  },
};

export default meta;

export const TagDetailsCardStory: StoryObj<typeof TagDetailsCard> = {};
