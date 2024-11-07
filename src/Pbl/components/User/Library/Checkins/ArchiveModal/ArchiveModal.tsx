import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import ARCHIVE_CHECKIN_QUESTION, {
  TArchiveCheckInQuestionData,
  TArchiveCheckInQuestionVariables,
} from '@pbl/graphql/user/mutations/archiveCheckInQuestion';

import SharedModal from '@shared/components/Modal/Modal';
import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';
import { callToast } from '@shared/components/Toaster/Toaster';

type CheckinArchiveModalProps = {
  onDismiss: () => void;
  checkins: CheckIn[];
};

type CheckIn = {
  id: string;
  question: string;
};

// Checkins are array type to support future multiple deletion
const CheckinArchiveModal = ({ onDismiss, checkins }: CheckinArchiveModalProps) => {
  const { t } = useTranslation();
  const [mutate, { loading }] = useMutation<
    TArchiveCheckInQuestionData,
    TArchiveCheckInQuestionVariables
  >(ARCHIVE_CHECKIN_QUESTION);

  useClearCacheOnUnmount('checkInQuestions');

  const onSubmit = async () => {
    try {
      const checkInQuestionId = checkins[0].id;

      await mutate({
        variables: { input: { id: checkInQuestionId } },
      });

      callToast('success', t('user.library.checkins.archive.success'));

      onDismiss();
    } catch (e: ApolloError | unknown) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('user.library.checkins.archive.failure'));
      }
    }
  };

  return (
    <SharedModal onDismiss={onDismiss}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('user.library.checkins.archive.header')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p>{t('user.library.checkins.archive.body', { name: checkins[0].question })}</p>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={onDismiss}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button isLoading={loading} variant='danger' onClick={onSubmit}>
          {t('common.actions.archive')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};

export default CheckinArchiveModal;
