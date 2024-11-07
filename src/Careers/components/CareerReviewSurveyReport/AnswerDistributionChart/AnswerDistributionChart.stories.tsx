import { Meta, StoryObj } from '@storybook/react';

import { AnswerDistributionChart } from './AnswerDistributionChart';

const meta: Meta<typeof AnswerDistributionChart> = {
  component: AnswerDistributionChart,
  args: {
    data: [
      {
        answer: 'I have no idea what career I want to pursue',
        baseline: 5,
        mostRecent: 8,
      },
      { answer: 'I know what a person does in the career(s)', baseline: 2, mostRecent: 12 },
      { answer: 'I know what courses I need to take in high school', baseline: 16, mostRecent: 3 },
      { answer: 'Other', baseline: 3, mostRecent: 18 },
    ],
    total: 23,
  },
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnswerDistributionChart>;

export const Default: Story = {};
