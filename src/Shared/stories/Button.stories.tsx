import { Meta, StoryObj } from '@storybook/react';

import SharedButton from '@shared/components/Button/Button';
import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';

const meta: Meta<typeof SharedButton> = {
  component: SharedButton,
  render: (args) => <SharedButton {...args} />,
  args: {
    Icon: DownloadIcon,
    children: 'This is a button',
  },
};

export default meta;
export const Button: StoryObj<typeof SharedButton> = {};
