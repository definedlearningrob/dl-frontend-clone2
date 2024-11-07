import { Meta, StoryObj } from '@storybook/react';

import { Select } from '@shared/components/Select/Select';

const options = [
  { value: 'jaco', label: 'Jaco with longer label' },
  { value: 'chick', label: 'Chick' },
  { value: 'hiromi', label: 'Hiromi' },
  { value: 'christian', label: 'Christian' },
];

const meta: Meta<typeof Select> = {
  component: Select,
  args: {
    size: 'lg',
    options,
    isDisabled: false,
    label: 'Select a name',
    isRequired: false,
    isMulti: true,
    errorMessage: 'This is an error message',
    menuIsOpen: true,
  },
};

export default meta;
export const Default: StoryObj<typeof Select> = {};
