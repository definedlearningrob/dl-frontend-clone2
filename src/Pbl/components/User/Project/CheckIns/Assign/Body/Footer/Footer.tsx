import { isEmpty } from 'lodash-es';
import { useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useCheckInQuestionsLibraryQuery } from '@pbl/graphql/user/hooks/useCheckInQuestionsLibraryQuery';

import EmptyState from '@shared/components/EmptyState/EmptyState';
import SharedButton from '@shared/components/Button/Button';

type Props = {
  loading: boolean;
  perPage: number;
  toggleCreateQuestionModalIsOpen: () => void;
};

const CheckInsAssignFooter = ({ loading, perPage, toggleCreateQuestionModalIsOpen }: Props) => {
  const history = useHistory();
  const { values } = useFormikContext<{ questionIds: string[] }>();
  const { t } = useTranslation();
  const { data } = useCheckInQuestionsLibraryQuery({
    perPage,
  });
  const checkInsQuestionsExist = data && data.checkInQuestions.nodesCount > 0;

  const handleCancel = () => {
    history.goBack();
  };

  if (!checkInsQuestionsExist) {
    return (
      <footer className='flex gap-sm justify-center mt-sm'>
        <EmptyState heading={t('project.emptyState.noCheckInQuestions')}>
          <p>{t('project.emptyState.createCheckInQuestion')}</p>
          <div className='flex gap-sm justify-center'>
            <SharedButton disabled={loading} variant='primary-outlined' onClick={handleCancel}>
              {t('common.actions.cancel')}
            </SharedButton>
            <SharedButton
              isLoading={loading}
              variant='primary'
              onClick={toggleCreateQuestionModalIsOpen}>
              {t('project.checkIns.createNewCheckInQuestion.createNew')}
            </SharedButton>
          </div>
        </EmptyState>
      </footer>
    );
  }

  return (
    <footer className='flex gap-sm justify-center mt-sm'>
      <SharedButton disabled={loading} variant='primary-outlined' onClick={handleCancel}>
        {t('common.actions.cancel')}
      </SharedButton>
      <SharedButton
        disabled={isEmpty(values.questionIds)}
        isLoading={loading}
        type='submit'
        variant='primary'>
        {t('user.project.checkins.assignCheckin.submitButton')}
      </SharedButton>
    </footer>
  );
};

export default CheckInsAssignFooter;
