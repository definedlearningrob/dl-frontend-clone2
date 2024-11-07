import { useEffect, useMemo, useState } from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import cx from 'classnames';
import { useField } from 'formik';
import { PartnerOpportunitiesQuery } from '@graphql/dc/users/operations';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { PartnerPathwayAndName } from '@dc/components/User/Partners/PartnerForm/PartnerTableComponents/PartnerPathwayAndName';
import { PartnerListBadge } from '@dc/components/User/Partners/PartnerForm/PartnerCourses/PartnerListBadge';
import { EntitiesCell } from '@dc/components/User/Partners/PartnerForm/PartnerOpportunities/EntitiesCell';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import SharedImage from '@shared/components/Image/Image';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { TableColumns } from '@shared/components/NewTable/NewTable';
import EmptyTable from '@shared/assets/images/empty-table.png';
import EmptyData from '@shared/assets/images/empty_data_text_with_search.png';

type partnerOpportunity = PartnerOpportunitiesQuery['opportunities']['nodes'];

type Props = {
  opportunities?: partnerOpportunity;
};

export const PartnerOpportunitiesList = ({ opportunities = [] }: Props) => {
  const { t } = useTranslation();
  const {
    userInfo: { role },
  } = useUserInfo<TUserInfo>();

  const isSystemAdmin = role === 'SYSTEM_ADMIN';
  const [visibilityScopeField] = useField<string>('visibilityScope');
  const showOpportunities = visibilityScopeField.value === 'ALL' && isSystemAdmin;
  const [entityField] = useField<string[]>('entityUuids');
  const [opportunitiesField, , opportunitiesFieldHelper] =
    useField<partnerOpportunity>('opportunities');

  const [rowSelection, setRowSelection] = useState(() =>
    opportunitiesField.value.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: true }),
      {} as Record<string, boolean>
    )
  );

  const columns: TableColumns<partnerOpportunity[number]> = useMemo(
    () => [
      {
        header: t('user.partners.tableHeader.image'),
        id: 'thumbnailUrl',
        meta: { className: '!w-full' },
        size: 100,
        cell: (params) => (
          <SharedImage
            className='h-md xxxl:h-lg w-full object-cover'
            src={params.row.original.imageUrl || params.row.original.thumbnailUrl}
          />
        ),
      },
      {
        header: t('user.partners.tableHeader.nameAndPathway'),
        id: 'name',
        size: 300,
        cell: (params) => (
          <PartnerPathwayAndName
            name={params.row.original.name}
            pathways={params.row.original.pathways.map((pathway) => pathway.name)}
          />
        ),
      },
      {
        header: t('user.partners.tableHeader.type'),
        id: 'type',
        cell: (params) => (
          <PartnerListBadge
            isOpportunity={true}
            isRowSelected={params.row.getIsSelected()}
            type={params.row.original.opportunityType}
          />
        ),
      },
      {
        header: t('user.partners.tableHeader.entities'),
        id: 'entities',
        meta: { className: 'leading-lg' },
        cell: (params) => (
          <EntitiesCell
            entities={params.row.original.entities}
            isGlobal={params.row.original.visibilityScope === 'ALL'}
          />
        ),
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

  const cellClassName = 'p-xs xxxl:p-x text-xxs xxxl:text-xs';
  const table = useReactTable({
    data: opportunities,
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
    const selectedOpportunities = opportunities?.filter(
      (opportunity) => rowSelection[opportunity.id]
    );
    opportunitiesFieldHelper.setValue(selectedOpportunities);
  }, [rowSelection]);

  if (isEmpty(entityField.value) && !showOpportunities) {
    return (
      <div className='flex justify-center items-center h-[500px]'>
        <div className='flex flex-col items-center gap-xs xxxl:gap-sm text-center text-neutral-800  w-[320px] xxxl:w-[380px]'>
          <SharedImage className='mx-auto' src={EmptyTable} />
          <h6 className='text-xs xxxl:text-sm mb-0'>{t('user.partners.emptyTableState.title')}</h6>
          <p className='text-xxs xxxl:text-xs font-regular leading-lg text-neutral-700'>
            {t('user.partners.emptyTableState.description')}
          </p>
        </div>
      </div>
    );
  }

  if (isEmpty(opportunities)) {
    return (
      <div className='flex justify-center items-center h-[500px]'>
        <div className='flex flex-col items-center gap-xs xxxl:gap-sm text-center text-neutral-800  w-[320px] xxxl:w-[380px]'>
          <SharedImage className='mx-auto' src={EmptyData} />
          <h6 className='text-xs xxxl:text-sm mb-0'>
            {t('user.partners.emptyTableState.emptyListTitle')}
          </h6>
          <p className='text-xxs xxxl:text-xs font-regular leading-lg text-neutral-700'>
            {t('user.partners.emptyTableState.emptyListDescription')}
          </p>
        </div>
      </div>
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
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
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
              <td
                key={cell.id}
                className={cx(cellClassName, cell.column.columnDef.meta?.className)}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
};
