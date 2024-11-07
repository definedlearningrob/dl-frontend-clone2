import { Story } from '@storybook/react';
import { ComponentProps } from 'react';

import { LessonCard } from './LessonCard';

export default {
  component: LessonCard,
  title: 'Lesson Card',
  args: {
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    imageUrl: 'https://picsum.photos/600/300',
    step: 2,
    disabled: false,
  },
  argTypes: {
    name: { control: 'text' },
    imageUrl: { control: 'text' },
    submitted: { control: 'number', min: 0 },
    total: { control: 'number', min: 0 },
    step: { control: 'number', min: 1 },
    disabled: { control: 'boolean' },
  },
};

type Args = ComponentProps<typeof LessonCard> & { submitted: number; total: number };
const Template: Story<Args> = (args) => {
  const { submitted, total, ...rest } = args;

  return (
    <div style={{ maxWidth: '170px' }}>
      <LessonCard {...rest} progress={{ submitted, total }} />
    </div>
  );
};

export const NotStarted = Template.bind({});
NotStarted.args = {
  submitted: 0,
  total: 5,
};

export const Started = Template.bind({});
Started.args = {
  submitted: 3,
  total: 5,
};

export const Done = Template.bind({});
Done.args = {
  submitted: 5,
  total: 5,
};

export const WithoutNumeration = Template.bind({});
WithoutNumeration.args = {
  submitted: 0,
  total: 5,
  step: undefined,
};
