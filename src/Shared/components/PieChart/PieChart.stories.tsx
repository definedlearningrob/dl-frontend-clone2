import { Meta, StoryObj } from '@storybook/react';

import { ReactComponent as NotStartedIcon } from '@shared/svg/not_started.svg';
import { ReactComponent as InProgressIcon } from '@shared/svg/in_progress.svg';
import { ReactComponent as CompletedIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import { ReactComponent as RejectedIcon } from '@shared/svg/clear_circle_outlined.svg';

import { PieChart } from './PieChart';

const meta: Meta<typeof PieChart> = {
  component: PieChart,
  args: {
    data: [
      {
        name: 'Group A',
        value: 200,
        colorClassName: 'fill-neutral-500',
        tooltipIcon: NotStartedIcon,
      },
      {
        name: 'Group B',
        value: 400,
        colorClassName: 'fill-secondary-500',
        tooltipIcon: InProgressIcon,
      },
      {
        name: 'Group C',
        value: 300,
        colorClassName: 'fill-success-500',
        tooltipIcon: CompletedIcon,
      },
      { name: 'Group D', value: 300, colorClassName: 'fill-danger-500', tooltipIcon: RejectedIcon },
    ],
    strokeColor: '#F0F2F7',
  },
};

export default meta;
type Story = StoryObj<typeof PieChart>;

export const Default: Story = {
  args: {
    width: 300,
    height: 300,
    renderTooltipContent: (data) => (
      <div>
        {data.name}, {data.value}
      </div>
    ),
  },
};

export const Responsive: Story = {
  args: {
    isResponsive: true,
  },
  render: (args) => (
    <div className='w-full h-[300px]'>
      <PieChart {...args} />
    </div>
  ),
};
