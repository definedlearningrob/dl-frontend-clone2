import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { isEmpty } from 'lodash-es';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { OpportunitiesList } from '@dc/components/User/Opportunities/OpportunitiesList/OpportunitiesList';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { Roles } from '@dc/resources/enums';
import { OpportunityFilters } from '@dc/components/Opportunities/OpportunityFilters/OpportunityFilters';
import { PartnerList } from '@dc/components/User/Partners/PartnerList/PartnerList';
import { PartnerFilters } from '@dc/components/PartnerView/PartnerFilters/PartnerFilters';
import { ENTITIES_WITH_CHILDREN } from '@dc/graphql/user/queries/entitiesWithChildrens';

import { FilterProvider } from '@shared/components/FilterProvider/FilterProvider';
import SharedCard from '@shared/components/Card/Card';
import { Tabs } from '@shared/components/Tabs/Tabs';

import { AddResourceButton } from './AddResourceButton';

export const initialOpportunityFilters = {
  includeGlobal: true,
  nameCont: '',
  pathwaysIdIn: [],
  typeIn: [],
  partnersIdIn: [],
  tagsContain: [],
  entitiesUuidIn: [],
};

export const initialPartnerFilters = {
  includeGlobal: true,
  nameCont: '',
  statusIn: [],
};

export const OpportunitiesScreen = () => {
  const { userInfo } = useUserInfo<TUserInfo>();
  const { t } = useTranslation();
  const canManageOpportunities =
    userInfo.permissions.wblAdmin || userInfo.role === Roles.SYSTEM_ADMIN;

  const { data: entitiesWithChildrenData } = useQuery(ENTITIES_WITH_CHILDREN, {
    variables: { page: 1, perPage: 10, filter: { nameCont: '' } },
  });

  const includeEntitiesFilter =
    entitiesWithChildrenData &&
    (entitiesWithChildrenData.entities.nodes.length > 1 ||
      entitiesWithChildrenData.entities.nodes.some((entity) => !isEmpty(entity.children.nodes)));

  const tabs = [
    {
      children: (
        <SharedCard className='h-full flex flex-col' withoutPadding={true}>
          <FilterProvider initialFilters={initialOpportunityFilters}>
            <OpportunityFilters
              className='px-base py-sm rounded-t-sm'
              includeEntitiesFilter={includeEntitiesFilter}
              includeGlobalFilter={true}
            />
            <OpportunitiesList canManageOpportunities={canManageOpportunities} />
          </FilterProvider>
        </SharedCard>
      ),
      label: t('user.opportunities.opportunities'),
      tabId: 'opportunities',
    },
    {
      children: (
        <SharedCard className='h-full flex flex-col' withoutPadding={true}>
          <FilterProvider initialFilters={initialPartnerFilters}>
            <PartnerFilters includeEntitiesFilter={includeEntitiesFilter} />
            <PartnerList />
          </FilterProvider>
        </SharedCard>
      ),
      tabId: 'partners',
      label: t('user.opportunities.partners'),
      withQueryParams: true,
    },
  ];

  return (
    <SharedMainContent className='h-[theme(layout.containerHeight)] !pt-xs flex flex-col gap-sm'>
      <div className='flex items-center justify-between'>
        <h4 className='text-base xxxl:text-lg mb-0'>{t('user.opportunities.wblOpportunities')}</h4>
        {canManageOpportunities && <AddResourceButton />}
      </div>
      <Tabs className='h-full min-h-0 flex flex-col' defaultTabId='opportunities'>
        <Tabs.List className='!mb-sm' tabs={tabs} />
        {tabs.map((tab) => (
          <Tabs.Content key={tab.tabId} tabId={tab.tabId}>
            {tab.children}
          </Tabs.Content>
        ))}
      </Tabs>
    </SharedMainContent>
  );
};
