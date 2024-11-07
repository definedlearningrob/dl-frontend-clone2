import { useHistory } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { compact, isEmpty, isEqual } from 'lodash-es';
import { Partner } from '@graphql/dc/shared/types';

import { TOpportunity } from '@dc/graphql/user/queries/opportunities';
import { useOpportunitiesQuery } from '@dc/graphql/user/hooks/useOpportunitiesQuery';
import { ArchiveOpportunityModal } from '@dc/components/User/Opportunities/OpportunitiesList/ArchiveOpportunityModal';
import { ReactComponent as GlobalIcon } from '@dc/svg/global.svg';
import { useOpportunityFilters } from '@dc/components/Opportunities/OpportunityFilters/useOpportunityFilters';
import { initialOpportunityFilters } from '@dc/screens/UserApp/Opportunities/OpportunitiesScreen';

import { Badge } from '@shared/components/Badge/Badge';
import { Kicker } from '@shared/components/Kicker';
import { NewTable, NewTableRef, TableColumns } from '@shared/components/NewTable/NewTable';
import SharedImage from '@shared/components/Image/Image';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';
import { cx } from '@shared/utils/cx';
import { getIsExpired } from '@shared/utils/date';
import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';

import { OpportunityDatesCell } from './OpportunityDatesCell';
import { OpportunityActions } from './OpportunityActions';

type Opportunity = Pick<
  TOpportunity,
  | 'createdAt'
  | 'deadline'
  | 'hasPendingApplications'
  | 'id'
  | 'name'
  | 'opportunityType'
  | 'periodEnd'
  | 'periodStart'
  | 'visibilityScope'
  | 'thumbnailUrl'
  | 'imageFitToContainer'
> & {
  entities: Pick<TOpportunity['entities'][number], 'uuid'>[];
  pathways: Pick<TOpportunity['pathways'][number], 'name'>[];
  partner: Pick<Partner, 'id' | 'name'> | null;
};

type Props = {
  canManageOpportunities: boolean;
};

export function OpportunitiesList({ canManageOpportunities }: Props) {
  const history = useHistory();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();
  const { filterVariables } = useOpportunityFilters();
  const { fetchMore, data, refetch, loading } = useOpportunitiesQuery({ filter: filterVariables });
  const [opportunityToArchive, setOpportunityToArchive] = useState<Opportunity | null>(null);
  const tableApiRef = useRef<NewTableRef>(null);
  useClearCacheOnUnmount('opportunities');

  useEffect(() => {
    refetch({ filter: filterVariables, page: 1 });
    tableApiRef.current?.setPageIndex(0);
  }, [filterVariables, refetch]);

  const handleRowClick = (opportunityId: string) => {
    history.push(`/opportunities/${opportunityId}`);
  };

  const getOpportunityIndicatorInfo = (
    opportunity: Pick<TOpportunity, 'periodEnd' | 'hasPendingApplications'>
  ) => {
    const { periodEnd, hasPendingApplications } = opportunity;

    const isExpired = getIsExpired(periodEnd);
    const canManageApplications = canManageOpportunities && hasPendingApplications;

    return {
      isExpired,
      canManageApplications,
      hasIndicator: canManageApplications || isExpired,
    };
  };

  const columnsConfig: TableColumns<Opportunity> = useMemo(
    () =>
      compact([
        {
          accessorKey: 'thumbnailUrl',
          header: t('user.opportunities.image'),
          cell: (params) => {
            const { isExpired, canManageApplications, hasIndicator } = getOpportunityIndicatorInfo(
              params.row.original
            );

            const imageFitToContainer = params.row.original.imageFitToContainer;

            const imageClassName = cx('rounded-xs', {
              'max-h-[54px] xxxl:max-h-[86px] mx-auto h-full object-contain': !imageFitToContainer,
              'w-full': imageFitToContainer,
            });

            return (
              <>
                {hasIndicator && (
                  <div
                    className={cx('absolute top-0 left-0 bottom-0 w-xxxs', {
                      'bg-secondary-500': canManageApplications,
                      'bg-neutral-600': isExpired,
                    })}
                  />
                )}
                <div className='max-h-[56px] max-w-[54px] xxxl:max-w-[86px] overflow-hidden flex items-center rounded-xs'>
                  <SharedImage className={imageClassName} src={params.getValue() as string} />
                </div>
              </>
            );
          },
          maxSize: isFullHD ? 100 : 86,
          meta: { className: 'relative' },
        },
        {
          accessorKey: 'name',
          header: t('user.opportunities.opportunityName'),
          cell: (params) => {
            const { isExpired, hasIndicator } = getOpportunityIndicatorInfo(params.row.original);

            return (
              <div>
                {hasIndicator && (
                  <Kicker
                    className='!mb-xxs'
                    size='sm'
                    variant={isExpired ? 'default' : 'secondary'}>
                    {isExpired
                      ? t('opportunities.status.expired')
                      : t('user.opportunities.pendingApplications')}
                  </Kicker>
                )}
                <div className='text-primary-500 font-bold text-xxs xxxl:text-xs truncate'>
                  {params.getValue()}
                </div>
              </div>
            );
          },
          meta: { ellipsis: true },
          size: isFullHD ? 380 : 264,
        },
        {
          id: 'isGlobal',
          cell: (params) =>
            isEmpty(params.row.original.entities) ? (
              <Tooltip
                className='block w-fit'
                delayDuration={300}
                message={t('user.opportunities.global')}>
                <IconContainer
                  Icon={GlobalIcon}
                  className='rounded-full bg-neutral-200 group-hover/row:bg-white transition-colors'
                  paddingSize='xxs'
                  size={isFullHD ? 'base' : 'sm'}
                />
              </Tooltip>
            ) : null,
          maxSize: isFullHD ? 56 : 40,
        },
        {
          accessorKey: 'opportunityType',
          header: t('user.opportunities.type'),
          cell: (params) => (
            <Badge
              className='!text-xxs xxxl:!text-xs w-fit group-hover/row:!bg-white'
              type='primary'>
              {t(`opportunities.types.${params.getValue()}`)}
            </Badge>
          ),
          size: 130,
        },
        {
          id: 'partner',
          header: t('user.opportunities.partner'),
          cell: (params) => params.row.original.partner?.name ?? '-',
          size: 120,
        },
        {
          id: 'pathways',
          header: t('user.opportunities.pathways'),
          accessorFn: (opportunity) =>
            opportunity.pathways.map((pathway) => pathway.name).join(', '),
          cell: (params) => (
            <Tooltip className='line-clamp-2' delayDuration={300} message={params.getValue()}>
              {params.getValue()}
            </Tooltip>
          ),
          size: 120,
        },
        {
          id: 'dates',
          header: t('user.opportunities.dates'),
          cell: (params) => <OpportunityDatesCell opportunity={params.row.original} />,
          size: 200,
        },
        {
          id: 'actions',
          cell: (params) => (
            <OpportunityActions
              canManageOpportunities={canManageOpportunities}
              opportunity={params.row.original}
              onArchive={() => setOpportunityToArchive(params.row.original)}
            />
          ),
          maxSize: isFullHD ? 68 : 56,
        },
      ]),
    [canManageOpportunities]
  );

  const handleFetchMore = async (nextPage: number) => {
    await fetchMore({ variables: { page: nextPage + 1, infiniteScroll: true } });
  };

  const emptyMessageKey = isEqual(filterVariables, initialOpportunityFilters)
    ? 'user.opportunities.empty'
    : 'user.opportunities.emptyFiltered';

  return (
    <>
      <NewTable
        apiRef={tableApiRef}
        columns={columnsConfig}
        data={data?.opportunities.nodes || []}
        emptyMessage={loading ? t('partners.loading') : t(emptyMessageKey)}
        fetchMore={handleFetchMore}
        pagesCount={data?.opportunities.pagesCount || 0}
        onRowClick={handleRowClick}
      />
      {opportunityToArchive && (
        <ArchiveOpportunityModal
          handleClose={() => setOpportunityToArchive(null)}
          opportunityId={opportunityToArchive.id}
          opportunityName={opportunityToArchive.name}
        />
      )}
    </>
  );
}
