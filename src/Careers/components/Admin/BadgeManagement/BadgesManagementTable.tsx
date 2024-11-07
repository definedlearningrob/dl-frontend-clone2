import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';

import { TBadge } from '@dc/graphql/user/mutations/createBadge';
import { useBadgesQuery } from '@dc/graphql/user/hooks/useBadgesQuery';
import { useBadgeFilters } from '@dc/components/Admin/BadgeManagement/BadgeFilters/BadgeFiltersProvider';
import { ListItemActions } from '@dc/shared/ListItemActions/ListItemActions';
import { useArchiveBadge } from '@dc/graphql/user/hooks/useArchiveBadge';

import {
  NewTable,
  OnTableStateChangeParams,
  TableColumns,
} from '@shared/components/NewTable/NewTable';
import SharedImage from '@shared/components/Image/Image';
import { ConfirmationModal } from '@shared/components/ConfirmationModal/ConfirmationModal';
import { callToast } from '@shared/components/Toaster/Toaster';
import { handleError } from '@shared/utils/handleError';

export const BadgesManagementTable = () => {
  const { t } = useTranslation();
  const { filters } = useBadgeFilters();
  const { data, refetch } = useBadgesQuery({ filters });
  const { archiveBadge } = useArchiveBadge();
  const [badgeToArchive, setBadgeToArchive] = useState<TBadge | null>(null);

  useUpdateEffect(() => {
    refetch({ filter: filters });
  }, [filters]);

  const handleArchiveBadge = async () => {
    if (badgeToArchive) {
      try {
        await archiveBadge(badgeToArchive.id);
        callToast('success', t('admin.badges.badgeArchived'));
        setBadgeToArchive(null);
      } catch (error) {
        handleError(error);
      }
    }
  };

  const columns: TableColumns<TBadge> = useMemo(
    () => [
      {
        accessorKey: 'imageUrl',
        maxSize: 100,
        header: t('admin.badges.badgeImage'),
        cell: (params) => (
          <SharedImage
            alt={t('admin.courses.list.item.altImage')}
            className='!h-lg !max-w-full object-cover'
            src={params.row.original.imageUrl}
          />
        ),
      },
      { accessorKey: 'name', header: t('admin.badges.badgeName') },
      {
        accessorKey: 'description',
        meta: { ellipsis: true },
        header: t('common.fields.common.description'),
        size: 450,
      },

      {
        accessorKey: 'actions',
        id: 'actions',
        meta: {
          headerClassName: 'text-right',
        },
        header: () => <div className='ml-auto'>{t('admin.badges.badgeActions')}</div>,
        cell: (params) => (
          <ListItemActions
            editUrl={`/admin/badges/${params.row.id}/edit`}
            onArchiveClick={() => setBadgeToArchive(params.row.original)}
          />
        ),
      },
    ],
    []
  );

  const handleTableStateChange = useCallback(
    ({ pagination }: OnTableStateChangeParams) => {
      refetch({
        filter: filters,
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize,
      });
    },
    [filters]
  );

  if (!data?.badges.nodes) {
    return null;
  }
  const { badges } = data;

  return (
    <>
      <NewTable
        columns={columns}
        data={badges.nodes}
        nodesCount={badges.nodesCount}
        pagesCount={badges.pagesCount}
        onTableStateChange={handleTableStateChange}
      />
      <ConfirmationModal
        isOpen={!!badgeToArchive}
        title={t('admin.shared.list.archiveModalTitle', {
          type: t('admin.shared.list.resources.badge'),
        })}
        onClose={() => setBadgeToArchive(null)}
        onConfirm={handleArchiveBadge}>
        <p>{t('admin.badges.archiveText', { badgeName: badgeToArchive?.name })}</p>
      </ConfirmationModal>
    </>
  );
};
