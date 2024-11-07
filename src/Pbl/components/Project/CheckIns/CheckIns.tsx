import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import CreateCheckInQuestionModal from '@pbl/components/User/Project/CheckIns/CreateCheckInQuestionModal/CreateCheckInQuestionModal';
import StudentCheckIns from '@pbl/components/Student/Project/CheckIns/StudentCheckIns';
import UserCheckIns from '@pbl/components/User/Project/CheckIns/UserCheckIns';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import { PROJECT_USER_TYPES } from '@pbl/resources/enums';
import { useCheckIns } from '@pbl/components/Project/helpers/CheckInContext';

import EmptyState from '@shared/components/EmptyState/EmptyState';
import SharedButton from '@shared/components/Button/Button';

import styles from './CheckIns.module.sass';

type Props = {
  type: PROJECT_USER_TYPES;
};

const CheckInsWrapper = ({ type }: Props) => {
  const { t } = useTranslation();
  const { projectId, targetRole } = useParams<{ projectId: string; targetRole?: string }>();
  const isStudent =
    type === PROJECT_USER_TYPES.STUDENT ||
    (type === PROJECT_USER_TYPES.PUBLIC && targetRole !== 'user');
  const { isOwner, editMode } = useCustomizeProject();
  const { allVisibleQuestions } = useCheckIns();
  const [createQuestionModalIsOpen, setCreateQuestionModalIsOpen] = useState(false);
  const history = useHistory();
  const showActions = !isStudent && isOwner;

  const redirectToLibrary = () => history.push(`/projects/${projectId}/checkins`);

  const toggleCreateQuestionModalIsOpen = () =>
    setCreateQuestionModalIsOpen((prevState) => !prevState);

  if (!editMode && isEmpty(allVisibleQuestions)) {
    return (
      <EmptyState className='p-base xxxl:p-md' heading={t('project.emptyState.noCheckInQuestions')}>
        {isOwner && <p>{t('project.emptyState.addCheckInQuestion')}</p>}
        {showActions && (
          <div className={styles.actionsWrapper}>
            <SharedButton
              className={styles.button}
              variant='primary-outlined'
              onClick={redirectToLibrary}>
              {t('project.checkIns.createNewCheckInQuestion.fromLibrary')}
            </SharedButton>
            <SharedButton
              className={styles.button}
              variant='primary'
              onClick={toggleCreateQuestionModalIsOpen}>
              {t('project.checkIns.createNewCheckInQuestion.createNew')}
            </SharedButton>
          </div>
        )}
        <CreateCheckInQuestionModal
          isOpen={createQuestionModalIsOpen}
          onDismiss={toggleCreateQuestionModalIsOpen}
        />
      </EmptyState>
    );
  }

  return (
    <>
      {isStudent ? (
        <StudentCheckIns />
      ) : (
        <UserCheckIns toggleCreateQuestionModalIsOpen={toggleCreateQuestionModalIsOpen} />
      )}
      <CreateCheckInQuestionModal
        isOpen={createQuestionModalIsOpen}
        onDismiss={toggleCreateQuestionModalIsOpen}
      />
    </>
  );
};

export default CheckInsWrapper;
