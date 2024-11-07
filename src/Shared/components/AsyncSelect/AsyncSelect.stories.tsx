import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { AsyncSelect } from '@shared/components/AsyncSelect';

const options = [
  { value: '1', label: 'Chihuahua' },
  { value: '2', label: 'French Bulldog' },
  { value: '3', label: 'Dachshund' },
  { value: '4', label: 'Japanese Akita' },
  { value: '5', label: 'Alaskan Malamute' },
  { value: '6', label: 'Beagle' },
  { value: '7', label: 'Border Collie' },
  { value: '8', label: 'Boston Terrier' },
  { value: '9', label: 'Dalmatian' },
  { value: '10', label: 'Dobermann' },
  { value: '11', label: 'Golden Retriever' },
  { value: '12', label: 'Greyhound' },
  { value: '13', label: 'Newfoundland' },
  { value: '14', label: 'Pekingese' },
  { value: '15', label: 'Pomeranian' },
];

const meta: Meta<typeof AsyncSelect> = {
  component: AsyncSelect,
  argTypes: {
    isMulti: { control: 'boolean' },
    showAllOption: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AsyncSelect>;

const AsyncSelectWithOptions = (props: ComponentProps<typeof AsyncSelect>) => {
  const filterOptions = (inputValue: string) =>
    options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));

  const loadOptions = (inputValue: string) =>
    new Promise<{ label: string; value: string }[]>((resolve) => {
      setTimeout(() => {
        resolve(filterOptions(inputValue));
      }, 1000);
    });

  return <AsyncSelect className='w-[300px]' {...props} loadOptions={loadOptions} />;
};

export const Default: Story = {
  render: (args) => <AsyncSelectWithOptions {...args} />,
  args: {
    isMulti: true,
    showAllOption: true,
  },
};
