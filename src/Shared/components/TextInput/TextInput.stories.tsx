import { Meta, StoryObj } from '@storybook/react';

import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';
import { TextInput } from '@shared/components/TextInput/TextInput';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  render: (args) => <TextInput {...args} />,
  args: {
    size: 'sm',
    placeholder: 'Search for courses...',
    label: 'Input label',
    Icon: DownloadIcon,
    disabled: false,
    isRequired: false,
  },
};

export default meta;
export const Default: StoryObj<typeof TextInput> = {};
