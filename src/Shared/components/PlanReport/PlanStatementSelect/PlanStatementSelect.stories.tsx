import { Meta, StoryObj } from '@storybook/react';

import { PlanStatementSelect } from './PlanStatementSelect';

const meta: Meta<typeof PlanStatementSelect> = {
  component: PlanStatementSelect,
  args: {
    options: [
      {
        label: 'Colors',
        options: [
          { value: 'blue', label: 'Blue', isRequired: true, question: null },
          { value: 'purple', label: 'Purple', isRequired: true, question: null },
          { value: 'red', label: 'Red', question: null },
          { value: 'orange', label: 'Orange', question: null },
          { value: 'yellow', label: 'Yellow', question: null },
          { value: 'green', label: 'Green', question: null },
          { value: 'silver', label: 'Silver', question: null },
        ],
      },
      {
        label: 'Flavors',
        options: [
          { value: 'vanilla', label: 'Vanilla', isRequired: true, question: null },
          { value: 'chocolate', label: 'Chocolate', isRequired: true, question: null },
          { value: 'strawberry', label: 'Strawberry', isRequired: true, question: null },
          { value: 'salted-caramel', label: 'Salted Caramel', isRequired: true, question: null },
        ],
      },
    ],
    placeholder: 'Select item...',
    size: 'md',
  },
  render: (args) => (
    <div className='w-[440px]'>
      <PlanStatementSelect {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof PlanStatementSelect>;

export const Default: Story = {};
