import { useRef } from 'react';
import { useUpdateEffect } from 'react-use';

import {
  NewTable,
  NewTableRef,
  OnTableStateChangeParams,
} from '@shared/components/NewTable/NewTable';
import {
  StatementResults,
  TPlanStatementResultsVariables,
} from '@shared/graphql/user/query/planStatementResults';
import { PLAN_GROUP_STATEMENT_RESULT_SORT, SORT_ORDER } from '@shared/resources/enums';

import { useStatementResultsFilters } from './useStatementResultsFilters';
import { useStatementResultsTable } from './useStatementResultsTable';
import { StatementQuestion } from './types';

const sortingColumnsMap = {
  studentName: PLAN_GROUP_STATEMENT_RESULT_SORT.STUDENT_NAME,
  status: PLAN_GROUP_STATEMENT_RESULT_SORT.STATUS,
  evidencesCount: PLAN_GROUP_STATEMENT_RESULT_SORT.EVIDENCES_COUNT,
  lastUpdatedAt: PLAN_GROUP_STATEMENT_RESULT_SORT.LAST_UPDATED_AT,
  studentSisId: PLAN_GROUP_STATEMENT_RESULT_SORT.STUDENT_SIS_ID,
} as const;

const DEFAULT_SORTING_STATE = [{ id: 'lastUpdatedAt', desc: true }];

type Props = {
  question?: StatementQuestion | null;
  statementResults: StatementResults;
  refetch: (variables: Partial<TPlanStatementResultsVariables>) => void;
};

export const PlanStatementResultsTable = ({ question, statementResults, refetch }: Props) => {
  const tableApiRef = useRef<NewTableRef | null>(null);
  const { filters } = useStatementResultsFilters();
  const { columns } = useStatementResultsTable({ question });

  useUpdateEffect(() => {
    if (tableApiRef.current) {
      tableApiRef.current.setPageIndex(0);
      tableApiRef.current.clearSelectedRows();
    }
    refetch({ statementFilter: filters, page: 1 });
  }, [filters]);

  const getSortingValue = ({ id, desc }: { id: string; desc: boolean }) => {
    const column = sortingColumnsMap[id as keyof typeof sortingColumnsMap];
    const order = desc ? SORT_ORDER.DESC : SORT_ORDER.ASC;

    return { column, order };
  };

  const handleTableStateChange = ({ pagination, sorting }: OnTableStateChangeParams) => {
    refetch({
      sort: sorting ? getSortingValue(sorting[0]) : undefined,
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    });
  };

  return (
    <div className='border border-neutral-300 rounded-b-sm h-[512px] xxxl:h-[576px] overflow-auto'>
      <NewTable
        apiRef={tableApiRef}
        columns={columns}
        data={statementResults.nodes}
        defaultSortingState={DEFAULT_SORTING_STATE}
        enableRowSelection={false}
        enableSorting={true}
        enableSortingRemoval={false}
        nodesCount={statementResults.nodesCount}
        pagesCount={statementResults.pagesCount}
        onTableStateChange={handleTableStateChange}
      />
    </div>
  );
};
