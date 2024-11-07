import { Meta, StoryObj } from '@storybook/react';
import { isEmpty } from 'lodash-es';

import { StackedVerticalBarChart } from './StackedVerticalBarChart';

const meta: Meta<typeof StackedVerticalBarChart> = {
  component: StackedVerticalBarChart,
  args: {
    data: [
      {
        index: 1,
        name: 'Story',
        value: 105,
        colorClassName: 'bg-blue-500',
        stackedValues: [
          { id: 'pathways', value: 10 },
          { id: 'chart', value: 20 },
          { id: 'example', value: 30 },
          { id: 'test', value: 45 },
        ],
      },
      {
        index: 2,
        name: 'Chart',
        colorClassName: 'bg-blue-500',
        value: 400,
        stackedValues: [
          { id: 'xx', value: 10 },
          { id: 'xxx', value: 20 },
          { id: 'zzz', value: 30 },
        ],
      },
      {
        index: 3,
        name: 'Test',
        colorClassName: 'bg-blue-500',
        value: 400,
        stackedValues: [
          { id: 'eee', value: 35 },
          { id: 'www', value: 40 },
        ],
      },
      {
        index: 4,
        colorClassName: 'bg-blue-500',
        name: 'Group D',
        value: 300,
        stackedValues: [],
      },
    ]
      .filter((item) => !isEmpty(item.stackedValues))
      .sort((a, b) => a.name.localeCompare(b.name)),

    renderTooltipContent: (data) => (
      <div>
        {data.name}, {data.value}
      </div>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof StackedVerticalBarChart>;

export const Default: Story = {
  args: {
    renderTooltipContent: (data) => {
      const { stackedValues } = data;

      if (isEmpty(stackedValues)) return null;

      return Object.keys(stackedValues).map((value, index) => {
        const prefix = String.fromCharCode(97 + index).toUpperCase();

        // @ts-ignore
        return <div>{`${prefix}: ${value}: ${stackedValues[value]}`}</div>;
      });
    },
  },
};

export const Responsive: Story = {
  args: {},
  render: (args) => (
    <div className='w-full h-[300px]'>
      <StackedVerticalBarChart {...args} />
    </div>
  ),
};
