import { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { times } from 'lodash-es';

import { ReactComponent as InProgressIcon } from '@shared/assets/icons/submitted_icon.svg';
import { AGGREGATION_PERIOD } from '@shared/resources/enums';

import { AggregationBarChart } from './AggregationBarChart';

const generateDataSet = (aggregationPeriod: AGGREGATION_PERIOD) => {
  let length: number;

  switch (aggregationPeriod) {
    case AGGREGATION_PERIOD.MONTH:
      length = 12;
      break;
    case AGGREGATION_PERIOD.QUARTER:
      length = 4;
      break;
    case AGGREGATION_PERIOD.SEMESTER:
      length = 2;
      break;
    default:
      throw new Error(`Invalid aggregation period: ${aggregationPeriod}`);
  }

  return times(length, (index) => ({
    value: Math.random() * 4,
    name: 'Sample tooltip',
    colorClassName: 'fill-secondary-500',
    tooltipIcon: InProgressIcon,
    periodStart: dayjs('2021-06-12'),
    periodEnd: dayjs('2021-06-12'),
    period: index,
  }));
};

const meta: Meta<typeof AggregationBarChart> = {
  component: AggregationBarChart,
  render: (args) => (
    <div className='w-[600px] h-[100px]'>
      <AggregationBarChart {...args} />
    </div>
  ),
  args: {},
};

export default meta;

type Story = StoryObj<typeof AggregationBarChart>;

export const Responsive: Story = {
  args: {
    aggregationPeriod: AGGREGATION_PERIOD.MONTH,
    aggregationStartDate: dayjs('2021-06-12'),
    renderTooltipContent: (data) => <div>Value: {data.value}</div>,
  },
  parameters: {
    controls: { matchers: { date: /Date$/ } },
  },
  // eslint-disable-next-line react/prop-types
  render: ({ aggregationPeriod, ...rest }) => {
    const dynamicData = generateDataSet(aggregationPeriod);

    return (
      <div className='w-[450px] h-[150px]'>
        <AggregationBarChart {...rest} aggregationPeriod={aggregationPeriod} data={dynamicData} />
      </div>
    );
  },
};
