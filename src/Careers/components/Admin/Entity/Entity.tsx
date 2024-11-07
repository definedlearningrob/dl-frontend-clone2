import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { PlansForm } from '@dc/components/Admin/Entity/Plans/PlansForm';
import StandardSets from '@dc/components/Admin/Entity/StandardSets/StandardSets';
import Settings from '@dc/components/Admin/Entity/Settings/Settings';
import { BrandingForm } from '@dc/components/Admin/Entity/CustomMessageCreator/BrandingForm';
import { TEntityData } from '@dc/graphql/user/queries/entity';
import { Tags } from '@dc/components/Admin/Entity/Tags/Tags';
import { Reports } from '@dc/components/Admin/Entity/Reports/Reports';
import { CatalogsForm } from '@dc/components/Admin/Entity/Catalogs/CatalogsForm';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { useFeatureFlags } from '@shared/components/FeatureProvider';
import { Tabs } from '@shared/components/Tabs/Tabs';

type Props = {
  entity: TEntityData['entity'];
};

export const AdminEntity = ({ entity }: Props) => {
  const { t } = useTranslation();
  const { setBackNavButton } = useNavigation();
  const { ENTITY_BRANDING_ON } = useFeatureFlags();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  const handleTabsChange = () => {
    window.scrollTo(0, 0);
  };

  const tabs = [
    {
      tabId: 'settings',
      label: t('admin.entities.tabs.settings'),
      children: <Settings entity={entity} />,
    },
    {
      tabId: 'catalogs',
      label: t('admin.entities.tabs.catalogs'),
      children: <CatalogsForm entity={entity} />,
    },
    {
      tabId: 'plans',
      label: t('admin.entities.tabs.plans'),
      children: <PlansForm entity={entity} />,
    },
    {
      tabId: 'standardSets',
      label: t('admin.entities.tabs.standardSets'),
      children: <StandardSets entity={entity} />,
    },
    {
      tabId: 'tags',
      label: t('admin.entities.tabs.performanceIndicators'),
      children: <Tags entity={entity} />,
    },
    {
      tabId: 'appearance',
      label: t('admin.entities.tabs.appearance'),
      children: ENTITY_BRANDING_ON && <BrandingForm entity={entity} />,
    },
    {
      tabId: 'reports',
      label: t('admin.entities.tabs.reports'),
      children: <Reports entity={entity} />,
    },
  ];

  return (
    <section className='text-neutral-800'>
      <h1 className='text-2lg' data-testid='entity-name'>
        {entity.name}
      </h1>
      <Tabs defaultTabId={tabs[0].tabId}>
        <div className='sticky top-lg pb-base bg-neutral-200 z-higher'>
          <Tabs.List fullWidth={true} tabs={tabs} onTabsChange={handleTabsChange} />
        </div>
        {tabs.map((tab) => (
          <Tabs.Content key={tab.tabId} tabId={tab.tabId}>
            <div>{tab.children}</div>
          </Tabs.Content>
        ))}
      </Tabs>
    </section>
  );
};
