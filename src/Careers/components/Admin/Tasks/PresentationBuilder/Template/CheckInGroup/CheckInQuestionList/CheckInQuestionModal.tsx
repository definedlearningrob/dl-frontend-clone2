import { useTranslation } from 'react-i18next';

import { CheckInQuestion } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestion/CheckInQuestion';
import PresentationModal from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationModal/PresentationModal';

import useUserInfo from '@pbl/hooks/useUserInfo';

import { TCheckInQuestion } from '@shared/components/CheckIns/types';
import { CheckInSubmissions } from '@shared/components/CheckIns';
import { TCurrentUserInfo } from '@shared/components/Portfolio/types';

type Props = {
  question: TCheckInQuestion;
  onClose: () => void;
};

export const CheckInQuestionModal = ({ question, onClose }: Props) => {
  const { t } = useTranslation();

  const { userInfo } = useUserInfo<TCurrentUserInfo>();

  const hasTeamSubmission = !!question.teamSubmission;

  return (
    <PresentationModal
      container={document.getElementById('presentation-custom-container')}
      onOpenChange={onClose}>
      <PresentationModal.Header>
        <PresentationModal.Heading>{t('presentation.checkInQuestion')}</PresentationModal.Heading>
      </PresentationModal.Header>
      <PresentationModal.Body>
        <CheckInQuestion checkInQuestion={question} hideAllSubmissionsButton={true} />
        {hasTeamSubmission && (
          <>
            <h6>{t('presentation.teamAnswersHistory')}</h6>
            <CheckInSubmissions submission={question.teamSubmission} userUuid={userInfo?.uuid} />
          </>
        )}
      </PresentationModal.Body>
      <PresentationModal.Footer>
        <PresentationModal.Button variant='primary' onClick={onClose}>
          {t('common.actions.close')}
        </PresentationModal.Button>
      </PresentationModal.Footer>
    </PresentationModal>
  );
};
