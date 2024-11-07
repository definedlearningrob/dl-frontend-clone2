import { ClearRefinements } from 'react-instantsearch-dom';
import { connectCurrentRefinements, CurrentRefinementsProvided } from 'react-instantsearch-core';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import availableFacetsResourcesQuery from '@pbl/graphql/user/queries/availableFacetsResources';
import RefinementList from '@pbl/components/User/ProjectSearch/RefinementList/RefinementList';
import useUserInfo from '@pbl/hooks/useUserInfo';
import { Roles } from '@pbl/resources/enums';
import type { TAvailableFacetsResourcesData } from '@pbl/graphql/user/queries/availableFacetsResources';
import type { TUserInfo } from '@pbl/graphql/user/queries/userInfo';

import './RefinementsPanel.sass';

function UserAppProjectSearchRefinementsPanel({ items }: CurrentRefinementsProvided) {
  const { t } = useTranslation();
  const {
    userInfo: { role },
  } = useUserInfo<TUserInfo>();
  const skipFiltering = [Roles.SALES_ADMIN, Roles.SYSTEM_ADMIN].includes(role);

  const { data, loading } = useQuery<TAvailableFacetsResourcesData>(availableFacetsResourcesQuery, {
    skip: skipFiltering,
  });

  const availableResources = data?.userInfo.availableResources;
  const availableResourcesLoading = skipFiltering ? false : loading;

  return (
    <div className='refinements-panel'>
      <div className='refinements-panel__header'>
        {t('user.projectSearch.refinementsPanel.header')}
        {items.length > 0 && (
          <ClearRefinements
            translations={{
              reset: t('user.projectSearch.refinementsPanel.clearAll'),
            }}
          />
        )}
      </div>
      <RefinementList
        active={true}
        attribute='catalogs'
        availableResources={availableResources?.catalogs}
        availableResourcesLoading={availableResourcesLoading}
        facetOrdering={false}
        limit={8}
        searchable={true}
        showMore={true}
        skipFiltering={skipFiltering}
        title={t('user.projectSearch.refinementsPanel.subjects')}
      />
      <RefinementList
        attribute='tracks'
        availableResources={availableResources?.tracks}
        availableResourcesLoading={availableResourcesLoading}
        limit={8}
        searchable={true}
        showMore={true}
        showMoreLimit={100}
        skipFiltering={skipFiltering}
        title={t('user.projectSearch.refinementsPanel.courses')}
      />
      <RefinementList
        attribute='units'
        availableResources={availableResources?.units}
        availableResourcesLoading={availableResourcesLoading}
        limit={8}
        searchable={true}
        showMore={true}
        showMoreLimit={100}
        skipFiltering={skipFiltering}
        title={t('user.projectSearch.refinementsPanel.units')}
      />
      <RefinementList
        attribute='grades'
        availableResourcesLoading={availableResourcesLoading}
        showMore={true}
        skipFiltering={true}
        title={t('user.projectSearch.refinementsPanel.grades')}
      />
    </div>
  );
}

export default connectCurrentRefinements(UserAppProjectSearchRefinementsPanel);
