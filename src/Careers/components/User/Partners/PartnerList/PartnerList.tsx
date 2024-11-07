import {
  useArchivePartnerMutation,
  usePartnersQuery,
  useUpdatePartnerStatusMutation,
} from '@graphql/dc/users/hooks';
import { compact, isEqual } from 'lodash-es';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Partner, PartnerStatuses, VisibilityScope } from '@graphql/dc/users/types';
import { CellContext, SortingState } from '@tanstack/react-table';
import { useHistory } from 'react-router-dom';
import { SortingOrder } from '@graphql/dc/shared/types';

import { usePartnerFilters } from '@dc/components/PartnerView/usePartnerFilters';
import { ReactComponent as GlobalIcon } from '@dc/svg/global.svg';
import { CoursesCell } from '@dc/components/User/Partners/PartnerList/CoursesCell';
import { ContactCell } from '@dc/components/User/Partners/PartnerList/ContactCell';
import { StatusCell } from '@dc/components/User/Partners/PartnerList/StatusCell';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { OpportunityCell } from '@dc/components/User/Partners/PartnerList/OpportunityCell';
import { initialOpportunityFilters } from '@dc/screens/UserApp/Opportunities/OpportunitiesScreen';

import {
  NewTable,
  NewTableRef,
  OnTableSortingChangeParams,
  TableColumns,
} from '@shared/components/NewTable/NewTable';
import SharedImage from '@shared/components/Image/Image';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ROLES } from '@shared/resources/constants';
import { ConfirmationModal } from '@shared/components/ConfirmationModal/ConfirmationModal';
import { removeFromCache } from '@shared/utils/graphql';
import { callToast } from '@shared/components/Toaster/Toaster';
import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';
import { cx } from '@shared/utils/cx';

import { PartnerContextMenu } from './PartnerContextMenu/PartnerContextMenu';

type PartnerColumn = Pick<
  Partner,
  | 'id'
  | 'thumbnailUrl'
  | 'name'
  | 'visibilityScope'
  | 'status'
  | 'opportunitiesCount'
  | 'virtualInternshipsCount'
  | 'coursesCount'
  | 'email'
  | 'url'
  | 'isArchived'
  | 'canEdit'
  | 'imageFitToContainer'
>;

export const PartnerList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [partnerToArchive, setPartnerToArchive] = useState<PartnerColumn | null>(null);

  const DEFAULT_SORTING_STATE = [{ id: 'name', desc: false }];

  useClearCacheOnUnmount('partners');

  const { filterVariables } = usePartnerFilters();

  const {
    userInfo: {
      role,
      permissions: { wblAdmin },
    },
  } = useUserInfo<TUserInfo>();

  const isSystemAdmin = role === ROLES.SYSTEM_ADMIN;
  const showStatusColumn = isSystemAdmin || wblAdmin;

  const tableApiRef = useRef<NewTableRef>(null);

  const [updatePartnerStatus] = useUpdatePartnerStatusMutation();

  const { data, refetch, fetchMore, loading } = usePartnersQuery({
    variables: {
      filter: filterVariables,
      page: 1,
      perPage: 25,
      nameSortOrder: SortingOrder.ASC,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch({ filter: filterVariables, page: 1, nameSortOrder: SortingOrder.ASC });
    tableApiRef.current?.setPageIndex(0);
  }, [filterVariables, refetch]);

  const [archivePartner] = useArchivePartnerMutation();

  const handleRowClick = (partnerId: string) => {
    history.push(`/partner/${partnerId}`);
  };

  const columnsConfig: TableColumns<PartnerColumn> = useMemo(
    () =>
      compact([
        {
          accessorKey: 'thumbnailUrl',
          header: t('user.partners.table.image'),
          cell: (params) => {
            const imageFitToContainer = params.row.original.imageFitToContainer;

            const imageClassName = cx('rounded-xs', {
              'max-h-[54px] xxxl:max-h-[86px] mx-auto h-full object-contain': !imageFitToContainer,
              'w-full': imageFitToContainer,
            });

            return (
              <div className='max-h-[56px] max-w-[54px] xxxl:max-w-[86px] overflow-hidden flex items-center rounded-xs'>
                <SharedImage className={imageClassName} src={params.getValue() as string} />
              </div>
            );
          },
          maxSize: isFullHD ? 100 : 86,
          meta: { className: 'relative' },
          enableSorting: false,
        },
        {
          accessorKey: 'name',
          header: t('user.partners.table.name'),
          cell: (params) => (
            <div className='text-primary-500 font-bold text-xxs xxxl:text-xs truncate flex shrink'>
              <Tooltip className='flex truncate shrink' message={params.getValue()}>
                <span className='truncate'>{params.getValue()}</span>
              </Tooltip>
            </div>
          ),
        },
        {
          id: 'isGlobal',
          cell: (params) =>
            params.row.original.visibilityScope === VisibilityScope.ALL ? (
              <div className='flex justify-center'>
                <Tooltip delayDuration={300} message={t('user.opportunities.global')}>
                  <IconContainer
                    Icon={GlobalIcon}
                    className='rounded-full bg-neutral-200 group-hover/row:bg-white transition-colors'
                    paddingSize='xxs'
                    size={isFullHD ? 'base' : 'sm'}
                  />
                </Tooltip>
              </div>
            ) : null,
          size: isFullHD ? 56 : 40,
          enableSorting: false,
        },
        ...(showStatusColumn
          ? [
              {
                id: 'status',
                header: t('user.partners.table.status'),
                cell: (params: CellContext<PartnerColumn, unknown>) => (
                  <StatusCell cellParams={params.row.original} />
                ),
                size: isFullHD ? 180 : 51,
              },
            ]
          : []),
        {
          id: 'opportunities',
          header: t('user.partners.table.opportunity'),
          cell: (params: CellContext<PartnerColumn, unknown>) => (
            <OpportunityCell
              opportunitiesCount={params.row.original.opportunitiesCount}
              virtualInternshipsCount={params.row.original.virtualInternshipsCount}
            />
          ),
          maxSize: isFullHD ? 100 : 40,
          enableSorting: false,
        },
        {
          id: 'courses',
          header: t('user.partners.table.courses'),
          cell: (params: CellContext<PartnerColumn, unknown>) => (
            <CoursesCell coursesCount={params.row.original.coursesCount} />
          ),
          maxSize: isFullHD ? 100 : 40,
          enableSorting: false,
        },
        {
          id: 'contact',
          header: t('user.partners.table.contact'),
          cell: (params: CellContext<PartnerColumn, unknown>) => (
            <ContactCell email={params.row.original.email} url={params.row.original.url} />
          ),
          size: 100,
          enableSorting: false,
        },
        {
          id: 'actions',
          cell: (params: CellContext<PartnerColumn, unknown>) => {
            const onStatusToggle = async () => {
              if (params.row.original) {
                await updatePartnerStatus({
                  variables: {
                    input: {
                      id: params.row.original.id,
                      status:
                        params.row.original.status === PartnerStatuses.PUBLISHED
                          ? PartnerStatuses.DRAFT
                          : PartnerStatuses.PUBLISHED,
                    },
                  },
                });
              } else {
                callToast('error', t('common.error.unknown'));
              }
            };

            return (
              <PartnerContextMenu
                partner={params.row.original}
                onArchive={() => setPartnerToArchive(params.row.original)}
                onStatusToggle={onStatusToggle}
              />
            );
          },
          maxSize: isFullHD ? 56 : 40,
          enableSorting: false,
        },
      ]),
    [showStatusColumn]
  );

  const handleArchivePartner = async (id: string) => {
    try {
      await archivePartner({
        variables: { input: { id } },
        update: removeFromCache({ id, __typename: 'Partner' }),
      });
      callToast('success', t('user.partners.form.archiveSuccess'));
    } catch (error) {
      callToast('error', t('user.partners.form.archiveFailed'));
    }
    setPartnerToArchive(null);
  };

  const handleFetchMore = async (nextPage: number) => {
    await fetchMore({ variables: { page: nextPage + 1, infiniteScroll: true } });
  };

  const getNameSortingOrder = (sorting: SortingState | undefined) => {
    const nameSorting = sorting?.find((val) => val.id === 'name');

    if (nameSorting) {
      return nameSorting.desc ? SortingOrder.DESC : SortingOrder.ASC;
    }

    return SortingOrder.ASC;
  };

  const handleTableSortingChange = useCallback(
    ({ sorting }: OnTableSortingChangeParams) => {
      const nameSortOrder = getNameSortingOrder(sorting);

      tableApiRef.current?.setPageIndex(0);
      tableApiRef.current?.scrollTableTop();

      refetch({
        page: 1,
        nameSortOrder: nameSortOrder,
      });
    },
    [tableApiRef?.current]
  );

  const emptyMessageKey = isEqual(filterVariables, initialOpportunityFilters)
    ? 'partners.emptyResults'
    : 'partners.emptyFilteredResults';

  return (
    <>
      <NewTable
        apiRef={tableApiRef}
        columns={columnsConfig}
        data={data?.partners.nodes || []}
        defaultSortingState={DEFAULT_SORTING_STATE}
        emptyMessage={loading ? t('partners.loading') : t(emptyMessageKey)}
        enableSorting={true}
        enableSortingRemoval={false}
        fetchMore={handleFetchMore}
        pagesCount={data?.partners.pagesCount || 0}
        onRowClick={handleRowClick}
        onTableSortingChange={handleTableSortingChange}
      />

      <ConfirmationModal
        actionLabel='archive'
        isOpen={!!partnerToArchive}
        title={t('partners.archivePartner')}
        onClose={() => setPartnerToArchive(null)}
        onConfirm={() => handleArchivePartner(partnerToArchive?.id as string)}>
        <Trans
          components={{ mediumText: <span className='font-medium' /> }}
          i18nKey='partners.archivePartnerDetails'
          values={{
            partnerName: partnerToArchive?.name,
          }}
        />
      </ConfirmationModal>
    </>
  );
};
