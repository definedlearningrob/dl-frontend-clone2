import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';
import { isEmpty } from 'lodash-es';

import { useTagsQuery } from '@dc/graphql/user/hooks/useTagsQuery';
import { TagActions } from '@dc/components/Admin/TagsManagement/TagActions/TagActions';
import { useTagFilters } from '@dc/components/Admin/TagsManagement/TagsFilters/TagFiltersProvider';
import { TTag } from '@dc/graphql/user/queries/tag';
import { TagTypes } from '@dc/resources/enums';

import {
  NewTable,
  NewTableRef,
  OnTableStateChangeParams,
  TableColumns,
} from '@shared/components/NewTable/NewTable';
import { Badge } from '@shared/components/Badge/Badge';

export const TagsManagementTable = () => {
  const { t } = useTranslation();
  const { filters } = useTagFilters();
  const { data, refetch } = useTagsQuery({ filters });
  const tableRef = useRef<NewTableRef | null>(null);
  useUpdateEffect(() => {
    if (isEmpty(data?.tags.nodes) && tableRef.current) {
      tableRef.current?.setPageIndex(0);
    }
  }, [data, tableRef.current]);

  const columns: TableColumns<TTag> = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: t('admin.performanceIndicators.name'),
      },
      {
        accessorKey: 'type',
        header: t('admin.performanceIndicators.type'),
        cell: (params) => {
          const isEntityTag = params.row.original.type === TagTypes.ENTITY;

          return (
            <Badge
              className='!inline-block'
              size='small'
              type={isEntityTag ? 'primary' : 'secondary'}>
              {isEntityTag
                ? t('admin.performanceIndicators.entity')
                : t('admin.performanceIndicators.system')}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'actions',
        id: 'actions',
        header: () => <div className='text-right'>{t('admin.performanceIndicators.actions')}</div>,
        cell: (params) => <TagActions tag={params.row} />,
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

  if (!data) {
    return null;
  }
  const { tags } = data;

  return (
    <NewTable
      apiRef={tableRef}
      columns={columns}
      data={tags.nodes}
      nodesCount={tags.nodesCount}
      pagesCount={tags.pagesCount}
      onTableStateChange={handleTableStateChange}
    />
  );
};
