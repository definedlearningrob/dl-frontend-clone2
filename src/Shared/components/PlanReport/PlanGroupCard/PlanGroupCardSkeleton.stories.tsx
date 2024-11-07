import { Meta, StoryObj } from '@storybook/react';

import { PlanGroupCardSkeleton } from './PlanGroupCardSkeleton';

const meta: Meta<typeof PlanGroupCardSkeleton> = {
  component: PlanGroupCardSkeleton,
  args: { chartType: 'pie' },
  render: (args) => (
    <div className='w-[340px] xxxl:w-[406px]'>
      <PlanGroupCardSkeleton {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof PlanGroupCardSkeleton>;

export const Default: Story = {};
