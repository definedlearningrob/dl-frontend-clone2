import { useTranslation } from 'react-i18next';
import { useRef, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useToggle } from 'react-use';

import UserLibraryCheckinsCreateModal from '@pbl/components/User/Library/Checkins/CreateModal/CreateModal';
import {
  TLibraryCheckin,
  TLibraryCheckins,
  TLibraryCheckinsVariables,
} from '@pbl/graphql/user/queries/checkInQuestions';

import SharedButton from '@shared/components/Button/Button';
import {
  NewTable,
  NewTableRef,
  OnTableStateChangeParams,
  TableColumns,
} from '@shared/components/NewTable/NewTable';

type Props = {
  checkins: TLibraryCheckins;
  refetchData: (variables: Partial<TLibraryCheckinsVariables>) => void;
  openArchiveModal: (checkins: TLibraryCheckin[]) => void;
  openCreateModal: () => void;
};

export const UserLibraryCheckinsTable = ({ checkins, refetchData }: Props) => {
  const tableRef = useRef<NewTableRef | null>(null);
  const { t } = useTranslation();
  const history = useHistory();
  const [isCreateModalOpen, toggleCreateModalOpen] = useToggle(false);
  const columns: TableColumns<TLibraryCheckin> = useMemo(
    () => [
      {
        accessorKey: 'question',
        header: t('user.library.checkins.question'),
        meta: { ellipsis: true },
      },
      {
        accessorKey: 'actions',
        header: () => (
          <div className='flex justify-end'>
            <SharedButton variant='primary' onClick={toggleCreateModalOpen}>
              {t('user.library.checkins.actions.createNew')}
            </SharedButton>
          </div>
        ),
      },
    ],
    []
  );

  const handleRowClick = useCallback((id: string) => {
    history.push(`/library/checkins/${id}`);
  }, []);

  const handleTableStateChange = useCallback(({ pagination }: OnTableStateChangeParams) => {
    refetchData({
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    });
  }, []);

  return (
    <div className='bg-white flex rounded-xs shrink-0 basis-0 xxxl:grow-[3] grow-[4] min-h-0'>
      <NewTable
        apiRef={tableRef}
        columns={columns}
        data={checkins.nodes}
        enableRowSelection={false}
        enableSorting={false}
        enableSortingRemoval={false}
        nodesCount={checkins.nodesCount}
        pagesCount={checkins.pagesCount}
        onRowClick={handleRowClick}
        onTableStateChange={handleTableStateChange}
      />
      {isCreateModalOpen && (
        <UserLibraryCheckinsCreateModal
          isOpen={isCreateModalOpen}
          onClose={toggleCreateModalOpen}
        />
      )}
    </div>
  );
};
