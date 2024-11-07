import { Story } from '@storybook/react';
import { ComponentProps } from 'react';

import { type Tab, Tabs } from '@shared/components/Tabs/Tabs';
import { ReactComponent as DeleteIcon } from '@shared/svg/delete_outlined.svg';
import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';

const tabs = [
  { label: 'first', tabId: 'first' },
  { label: 'second', tabId: 'second' },
  { label: 'third', tabId: 'third' },
];

export default {
  component: Tabs,
  title: 'Tabs',
  args: {
    withPadding: false,
    fullWidth: false,
    tabs: tabs,
  },
  argTypes: {
    withPadding: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

type Args = ComponentProps<typeof Tabs> & {
  fullWidth: boolean;
  withPadding: boolean;
  tabs: Tab[];
};
const Template: Story<Args> = (args) => {
  const { tabs, withPadding, fullWidth } = args;

  return (
    <div style={{ width: '100%' }}>
      <Tabs defaultTabId='first'>
        <Tabs.List fullWidth={fullWidth} tabs={tabs} withPadding={withPadding} />
        <div style={{ marginTop: '48px' }}>
          {tabs.map(({ tabId }) => (
            <Tabs.Content tabId={tabId}>
              <h1>Tab one</h1>
            </Tabs.Content>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export const WithoutPadding = Template.bind({});
WithoutPadding.args = {
  withPadding: false,
  fullWidth: false,
};

export const WithPadding = Template.bind({});
WithPadding.args = {
  fullWidth: false,
  withPadding: true,
};

export const FullWidthWithoutPadding = Template.bind({});
FullWidthWithoutPadding.args = {
  withPadding: false,
  fullWidth: true,
};

export const FullWidthWithPadding = Template.bind({});
FullWidthWithPadding.args = {
  withPadding: true,
  fullWidth: true,
};

export const SingleTab = Template.bind({});
SingleTab.args = {
  withPadding: false,
  fullWidth: false,
  tabs: [{ label: 'Single Tab', tabId: 'single' }],
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  withPadding: true,
  fullWidth: false,
  tabs: [
    {
      label: 'With two icons',
      tabId: 'third',
      rightIcon: <DeleteIcon />,
      leftIcon: <DownloadIcon />,
    },
    { label: 'With right icon', tabId: 'first', rightIcon: <DeleteIcon /> },
    { label: 'With left icon', tabId: 'second', leftIcon: <DownloadIcon /> },
  ],
};
