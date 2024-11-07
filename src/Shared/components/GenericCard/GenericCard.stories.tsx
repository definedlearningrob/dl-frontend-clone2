import { Meta, StoryObj } from '@storybook/react';

import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';
import { GenericCardContent } from '@shared/components/GenericCard/GenericCardContent';

const meta: Meta<typeof GenericCardContent> = {
  component: GenericCardContent,
  render: GenericCardContent,
  args: {
    Icon: DownloadIcon,
    backgroundUrl: 'https://picsum.photos/600/300',
    pathways: [{ name: 'Pathway Name' }, { name: 'Pathway Name 2' }],
    title: 'Title',
    TypeIcon: DownloadIcon,
    typeIconTooltipMessage: 'Tooltip message',
    subTitle: 'Sub title',
  },
};

export default meta;
export const GenericCardStory: StoryObj<typeof GenericCardContent> = {};
