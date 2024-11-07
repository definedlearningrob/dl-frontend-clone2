import { useContext } from 'react';

import SharedTabs from '@shared/components/DeprecatedTabs/DeprecatedTabs';
import { TabsContext } from '@shared/components/DeprecatedTabs/DeprecatedTabs';

export default {
  component: SharedTabs,
  title: 'DeprecatedTabs',
  parameters: {
    componentSubtitle: 'shared tabs component',
  },
};

function TabsConsumer() {
  const { tab } = useContext(TabsContext);

  return (
    <div>
      <SharedTabs.Tabs />
      <h3>I am {tab.label} tab</h3>
    </div>
  );
}

export const Default = () => {
  const tabs = [
    { label: 'first', id: 'first' },
    { label: 'second', id: 'second' },
    { label: 'third', id: 'third' },
  ];

  return (
    <SharedTabs tabs={tabs}>
      <TabsConsumer />
    </SharedTabs>
  );
};
