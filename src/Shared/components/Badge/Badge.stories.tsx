import { Meta, StoryObj } from '@storybook/react';

import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';
import { Badge } from '@shared/components/Badge/Badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  // eslint-disable-next-line react/prop-types
  render: ({ children, ...rest }) => <Badge {...rest}>{children}</Badge>,
  args: {
    children: 'This is a badge',
    Icon: DownloadIcon,
  },
};

export default meta;
export const BadgeStory: StoryObj<typeof Badge> = {};
