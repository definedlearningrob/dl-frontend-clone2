import { Meta, StoryObj } from '@storybook/react';

import { PlanGroupCard } from './PlanGroupCard';

const meta: Meta<typeof PlanGroupCard> = {
  component: PlanGroupCard,
  args: {
    data: { notStarted: 300, inProgress: 400, completed: 500, notMet: 200 },
    title: 'Defined - Social & Emotional Learning',
  },
  render: (args) => (
    <ul className='w-[340px] xxxl:w-[406px]'>
      <PlanGroupCard {...args} />
    </ul>
  ),
};

export default meta;
type Story = StoryObj<typeof PlanGroupCard>;

export const PieChart: Story = {
  args: {
    chartType: 'pie',
  },
};

export const BarChart: Story = {
  args: {
    chartType: 'bar',
  },
};
