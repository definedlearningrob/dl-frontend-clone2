import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { UnitQuery } from '@graphql/dc/users/operations';
import { Get } from 'type-fest';
import { UnitResourceTypes } from '@graphql/dc/users/types';
import { OpportunityTypes } from '@graphql/dc/shared/types';

import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { ReactComponent as OpportunitiesIcon } from '@dc/assets/icons/opportunities_icon.svg';
import { TOpportunitiesData } from '@dc/graphql/user/queries/opportunities';

import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import SharedPaginatedLoader, {
  TPaginatedLoaderParams,
} from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

type SearchBarProps = { className?: string; field: string; placeholder: string };

type Props = {
  pagingProps: TPaginatedLoaderParams<TOpportunitiesData>;
  SearchBar: FC<SearchBarProps>;
};

type UnitResource = Get<UnitQuery, 'unit.resources.0'> & { id: string };

export const AdminOpportunity = ({ pagingProps, SearchBar }: Props) => {
  const { t } = useTranslation();

  const getKicker = (resource: UnitResource) => {
    const translationKey = resource.isVirtualInternship ? 'virtualInternship' : 'opportunity';
    const kickerText = t(`admin.units.label.${translationKey}`);

    return { text: kickerText, variant: 'default' as const };
  };

  const handleEditClick = (resource: UnitResource) => {
    const url =
      resource.resourceType === UnitResourceTypes.OPPORTUNITY
        ? `/admin/virtual-internships/${resource.resourceId}/edit`
        : `/opportunities/${resource.resourceId}/edit`;
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <ListWrapper
      actions={
        <SearchBar
          field='name'
          placeholder={t('common.placeholders.searchBy', {
            field: t('common.fields.common.opportunity').toLowerCase(),
          })}
        />
      }
      title={t('admin.units.label.allOpportunities')}>
      <div className='min-h-0 flex-1'>
        <SharedPaginatedLoader.Content
          SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
          {...pagingProps}>
          {({ opportunities }) => {
            const normalizedOpportunities = opportunities.nodes.map((opportunity, index) => {
              const isVirtualInternship =
                opportunity.opportunityType === OpportunityTypes.VIRTUAL_INTERNSHIP;

              return {
                name: opportunity.name,
                resourceId: opportunity.id,
                resourceType: UnitResourceTypes.OPPORTUNITY,
                isVirtualInternship,
                __typename: 'UnitResource',
                id: opportunity.id,
                step: index + 1,
                thumbnailUrl: opportunity.thumbnailUrl || 'fallback',
              };
            });

            return (
              <SortableAvailableList
                ListItemIcon={OpportunitiesIcon}
                field='unitResources'
                getKicker={getKicker}
                items={normalizedOpportunities}
                narrowedTypename='UnitResource'
                onEditClick={handleEditClick}
              />
            );
          }}
        </SharedPaginatedLoader.Content>
      </div>
      <PaginationBar pagingProps={pagingProps} />
    </ListWrapper>
  );
};
