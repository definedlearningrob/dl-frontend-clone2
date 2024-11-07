import { useTranslation } from 'react-i18next';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { OpportunityTabContent } from '@dc/components/OpportunityDetails';
import { TOpportunity } from '@dc/resources/types';
import { DescriptionSkeleton } from '@dc/components/OpportunityDetails/OpportunityDescription/DescriptionSkeleton';

import Card from '@shared/components/Card/Card';
import { Tabs } from '@shared/components/Tabs/Tabs';

import styles from './OpportunityTabs.module.sass';

type Opportunity = Pick<
  TOpportunity,
  'description' | 'location' | 'salaryInformation' | 'creditsOutcomes' | 'opportunityType'
>;

type TabsType = { tabId: keyof Opportunity; label: string }[];

type Props = {
  opportunity?: Opportunity;
  loading: boolean;
};

export const OpportunityTabs = ({ opportunity, loading }: Props) => {
  const { t } = useTranslation();

  const opportunityTabs: TabsType = [
    { tabId: 'description', label: t('opportunityDetails.tabs.details') },
    { tabId: 'location', label: t('opportunityDetails.tabs.location') },
    {
      tabId: 'salaryInformation',
      label: t('opportunityDetails.tabs.salary'),
    },
    { tabId: 'creditsOutcomes', label: t('opportunityDetails.tabs.credits') },
  ];

  const virtualInternshipTabs: TabsType = [
    { tabId: 'description', label: t('opportunityDetails.tabs.details') },
    { tabId: 'creditsOutcomes', label: t('opportunityDetails.tabs.credits') },
  ];

  const isVirtualInternship = opportunity?.opportunityType === OpportunityTypes.VIRTUAL_INTERNSHIP;
  const tabs = isVirtualInternship ? virtualInternshipTabs : opportunityTabs;

  return (
    <Tabs className={styles.tabsContainer} defaultTabId={tabs[0].tabId}>
      <div className={styles.tabsWrapper}>
        <Tabs.List className={styles.tabs} loading={loading} tabs={tabs} />
        <Card className={styles.opportunityDescription} dataTestId='opportunity-tab-content'>
          {tabs.map(({ tabId, label }) => (
            <Tabs.Content key={tabId} tabId={tabId}>
              <>
                {loading && <DescriptionSkeleton />}
                {!loading && opportunity && (
                  <OpportunityTabContent content={opportunity[tabId]} title={label} />
                )}
              </>
            </Tabs.Content>
          ))}
        </Card>
      </div>
    </Tabs>
  );
};
