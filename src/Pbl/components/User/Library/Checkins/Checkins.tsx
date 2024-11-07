import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToggle } from 'react-use';
import { isEmpty } from 'lodash-es';

import { TLibraryCheckin } from '@pbl/graphql/user/queries/checkInQuestions';
import { UserLibraryCheckinsHeader } from '@pbl/components/User/Library/Checkins/Table/Header/Header';
import UserLibraryCheckinsCreateModal from '@pbl/components/User/Library/Checkins/CreateModal/CreateModal';
import { CHECK_IN_QUESTIONS_LIBRARY } from '@pbl/graphql/user/queries/checkInQuestions';

import { DEFAULT_PAGE_SIZE } from '@shared/components/NewTable/NewTable';
import EmptyState from '@shared/components/EmptyState/EmptyState';
import SharedButton from '@shared/components/Button/Button';
import Link from '@shared/components/Link';

import UserLibraryCheckinsDetails from './Details/Details';
import { UserLibraryCheckinsTable } from './Table/CheckinsTable';
import CheckinArchiveModal from './ArchiveModal/ArchiveModal';
import styles from './Checkins.module.sass';

export const UserLibraryCheckins = () => {
  const { t } = useTranslation();
  const [checkinsToArchive, setCheckinsToArchive] = useState<TLibraryCheckin[] | null>(null);
  const [isCreateModalOpen, toggleCreateModalOpen] = useToggle(false);
  const { checkinId } = useParams<{ checkinId?: string }>();
  const history = useHistory();

  const onArchiveModalClose = () => {
    history.push('/library/checkins');
    setCheckinsToArchive(null);
  };
  const { data: checkinData, refetch } = useQuery(CHECK_IN_QUESTIONS_LIBRARY, {
    variables: {
      perPage: DEFAULT_PAGE_SIZE,
    },
  });

  const openArchiveModal = (checkins: TLibraryCheckin[]) => setCheckinsToArchive(checkins);
  const isEmptyData = isEmpty(checkinData?.checkInQuestions.nodes);

  if (isEmptyData || !checkinData) {
    return (
      <div className={styles.libraryWrapper}>
        <EmptyState className='p-md' heading={t('user.library.checkins.emptyLibrary')}>
          <p>{t('user.library.checkins.description')}</p>
          <div className='flex gap-sm'>
            <Link className='!inline-block' to='/my-projects' variant='primary-outlined'>
              {t('user.library.checkins.actions.goBack')}
            </Link>

            <SharedButton variant='primary' onClick={toggleCreateModalOpen}>
              {t('user.library.checkins.actions.createNew')}
            </SharedButton>
          </div>
          {isCreateModalOpen && (
            <UserLibraryCheckinsCreateModal
              isOpen={isCreateModalOpen}
              onClose={toggleCreateModalOpen}
            />
          )}
        </EmptyState>
      </div>
    );
  }

  return (
    <div className={styles.libraryWrapper}>
      <UserLibraryCheckinsHeader />
      <div className='flex grow gap-sm flex-row h-full overflow-hidden'>
        <UserLibraryCheckinsTable
          checkins={checkinData?.checkInQuestions}
          openArchiveModal={openArchiveModal}
          openCreateModal={toggleCreateModalOpen}
          refetchData={refetch}
        />
        {checkinId && <UserLibraryCheckinsDetails openModal={openArchiveModal} />}
        {checkinsToArchive && (
          <CheckinArchiveModal checkins={checkinsToArchive} onDismiss={onArchiveModalClose} />
        )}
      </div>
    </div>
  );
};
