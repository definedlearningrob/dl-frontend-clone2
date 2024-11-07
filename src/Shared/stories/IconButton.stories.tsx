import { Meta, StoryObj } from '@storybook/react';

import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';
import { IconButton } from '@shared/components/IconButton/IconButton';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  render: (args) => <IconButton {...args} />,
  args: {
    Icon: DownloadIcon,
  },
};

export default meta;
export const IconButtonStory: StoryObj<typeof IconButton> = {};
