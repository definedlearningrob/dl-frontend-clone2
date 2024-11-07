import { useUpdateEffect } from 'react-use';
import { useTranslation } from 'react-i18next';
import { RefObject, useCallback, useMemo } from 'react';
import { SortingState } from '@tanstack/react-table';
import { useHistory } from 'react-router-dom';

import {
  Student,
  StudentPage,
  TStudentManagementVariables,
} from '@dc/graphql/user/queries/studentManagement';
import { useStudentFilters } from '@dc/components/StudentManagement/StudentFilters';

import { SORT_ORDER } from '@shared/resources/enums';
import {
  NewTable,
  NewTableRef,
  OnTableStateChangeParams,
  TableColumns,
} from '@shared/components/NewTable/NewTable';

import { CounselorLabel } from './CounselorLabel';
import { StudentActions } from './StudentActions';

const DEFAULT_SORTING_STATE = [{ id: 'fullName', desc: false }];

type Props = {
  updateSelectedRows: (selectedRows: string[]) => void;
  students: StudentPage;
  tableApiRef: RefObject<NewTableRef>;
  refetchData: (variables: Partial<TStudentManagementVariables>) => void;
};

export const StudentManagementTable = ({
  updateSelectedRows,
  students,
  refetchData,
  tableApiRef,
}: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { filters } = useStudentFilters();

  const columns: TableColumns<Student> = useMemo(
    () => [
      {
        id: 'fullName',
        accessorFn: (student) => `${student.lastName}, ${student.firstName}`,
        header: t('user.postSecondary.name'),
        meta: { className: 'font-bold text-primary-500 text-xs' },
      },
      {
        accessorKey: 'email',
        header: t('user.postSecondary.email'),
        enableSorting: false,
        meta: { ellipsis: true },
      },
      { accessorKey: 'sisId', size: 100, header: t('user.postSecondary.id'), enableSorting: false },
      {
        accessorKey: 'gradYear',
        size: 80,
        header: t('user.postSecondary.gradYear'),
        enableSorting: false,
      },
      {
        accessorKey: 'entity.name',
        header: t('user.postSecondary.entity'),
        meta: { ellipsis: true },
        enableSorting: false,
      },
      {
        accessorKey: 'counselor.fullName',
        header: t('user.postSecondary.counselor'),
        enableSorting: false,
        cell: (params) => (
          <CounselorLabel
            counselorName={params.getValue<string>()}
            counselorUuid={params.row.original.counselor?.uuid}
          />
        ),
        meta: { ellipsis: true },
      },
      {
        id: 'actions',
        header: t('user.postSecondary.actions'),
        size: 90,
        cell: (params) => <StudentActions student={params.row.original} />,
      },
    ],
    []
  );

  useUpdateEffect(() => {
    if (tableApiRef.current) {
      tableApiRef.current.setPageIndex(0);
      tableApiRef.current.clearSelectedRows();
    }
    refetchData({ filter: filters, page: 1 });
  }, [filters]);

  const getNameSortingOrder = (sorting: SortingState | undefined) => {
    const nameSorting = sorting?.find((val) => val.id === 'fullName');

    if (nameSorting) {
      return nameSorting.desc ? SORT_ORDER.DESC : SORT_ORDER.ASC;
    }

    return SORT_ORDER.ASC;
  };

  const handleTableStateChange = useCallback(
    ({ pagination, sorting }: OnTableStateChangeParams) => {
      const fullNameSortOrder = getNameSortingOrder(sorting);

      refetchData({
        filter: filters,
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize,
        fullNameSortOrder,
      });
    },
    [filters]
  );

  const handleRowClick = useCallback((studentUuid: string) => {
    history.push(`/students/${studentUuid}`);
  }, []);

  return (
    <NewTable
      apiRef={tableApiRef}
      columns={columns}
      data={students.nodes}
      defaultSortingState={DEFAULT_SORTING_STATE}
      enableRowSelection={true}
      enableSorting={true}
      enableSortingRemoval={false}
      keyField='uuid'
      nodesCount={students.nodesCount}
      pagesCount={students.pagesCount}
      onRowClick={handleRowClick}
      onSelectRow={updateSelectedRows}
      onTableStateChange={handleTableStateChange}
    />
  );
};
