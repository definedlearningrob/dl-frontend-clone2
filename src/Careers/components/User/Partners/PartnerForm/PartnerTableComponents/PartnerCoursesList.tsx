import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useField } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { CoursesQuery } from '@graphql/dc/users/operations';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { PartnerListBadge } from '@dc/components/User/Partners/PartnerForm/PartnerCourses/PartnerListBadge';
import { PartnerPathwayAndName } from '@dc/components/User/Partners/PartnerForm/PartnerTableComponents/PartnerPathwayAndName';
import styles from '@dc/components/Opportunities/OpportunitiesList/OpportunitiesList.module.sass';
import { ReactComponent as EmptyTableIcon } from '@dc/assets/icons/empty_data_text_with_search.svg';

import SharedImage from '@shared/components/Image/Image';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { TableColumns } from '@shared/components/NewTable/NewTable';
import SharedCard from '@shared/components/Card/Card';
import EmptyState from '@shared/components/EmptyState/EmptyState';

type Props = {
  courses?: CoursesQuery['courses']['nodes'] | null;
};

export const PartnerCoursesList = ({ courses }: Props) => {
  const { t } = useTranslation();
  const [courseIdsField, , courseIdsFieldHelper] = useField<string[]>('courseIds');

  const [rowSelection, setRowSelection] = useState(() =>
    courseIdsField.value.reduce(
      (acc, curr) => ({ ...acc, [curr]: true }),
      {} as Record<string, boolean>
    )
  );
  const cellClassName = 'p-xs xxxl:p-x text-xxs xxxl:text-xs';

  const columns: TableColumns<CoursesQuery['courses']['nodes'][number]> = useMemo(
    () => [
      {
        header: t('user.partners.tableHeader.image'),
        id: 'thumbnailUrl',
        cell: (params) => (
          <SharedImage
            className='w-full h-lg object-cover'
            src={params.row.original.thumbnailUrl || params.row.original.imageUrl}
          />
        ),
      },
      {
        header: t('user.partners.tableHeader.nameAndPathway'),
        classNames: '!w-2/3',
        id: 'name',
        cell: (params) => (
          <PartnerPathwayAndName
            name={params.row.original.name}
            pathways={[params.row.original.pathway?.name].filter(Boolean)}
          />
        ),
      },
      {
        header: t('user.partners.tableHeader.collection'),
        id: 'collection',
        cell: (params) => <PartnerListBadge type={params.row.original.collection?.name} />,
      },
      {
        id: 'select',
        header: t('user.partners.tableHeader.select'),
        cell: (params) => (
          <div className='max-w-[18px] overflow-hidden mx-auto'>
            <SharedCheckbox
              checked={params.row.getIsSelected()}
              className='z-low'
              id={params.row.id}
              labelOnClick={(e) => e.preventDefault()}
              onChange={(e) => e.preventDefault()}
            />
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: courses || [],
    columns,
    getRowId: (row) => row.id,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    courseIdsFieldHelper.setValue(Object.keys(rowSelection));
  }, [rowSelection]);

  if (isEmpty(courses)) {
    return (
      <thead>
        <tr className='flex justify-center'>
          <th>
            <SharedCard className={styles.emptyStateCard}>
              <EmptyState
                heading={t('user.partners.emptyTableState.emptyCoursesListTitle')}
                icon={<EmptyTableIcon />}>
                {t('user.partners.emptyTableState.emptyCoursesListDescription')}
              </EmptyState>
            </SharedCard>
          </th>
        </tr>
      </thead>
    );
  }

  return (
    <>
      <thead className='bg-neutral-200 border border-neutral-300 !rounded-t-xs text-left !px-sm sticky z-highest top-0 !border-t-0'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className='!px-sm w-fit'>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className={cellClassName}>
                <p className='mb-0 font-regular text-neutral-800 leading-lg'>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </p>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={cx(
              {
                'bg-primary-200': row.getIsSelected(),
              },
              'border border-neutral-300'
            )}
            onClick={row.getToggleSelectedHandler()}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={cellClassName}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
};
