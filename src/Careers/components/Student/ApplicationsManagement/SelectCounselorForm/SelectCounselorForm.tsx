import { Form, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import { SelectCounselorList } from '@dc/components/Student/ApplicationsManagement/SelectCounselorList';
import { CounselorSelectOption } from '@dc/components/Student/ApplicationsManagement/types';

import SharedButton from '@shared/components/Button/Button';
import SharedModal from '@shared/components/Modal/Modal';
import { SelectOption } from '@shared/components/Select';
import { useMessaging } from '@shared/hooks/useMessaging';

import styles from './SelectCounselorForm.module.sass';

type Props = {
  allowCounselorSelection: boolean;
  closeModal: () => void;
  counselorsOptions: CounselorSelectOption[];
  hasCounselorInvited: boolean;
};

export const SelectCounselorForm = ({
  allowCounselorSelection,
  closeModal,
  counselorsOptions,
  hasCounselorInvited,
}: Props) => {
  const { t } = useTranslation();
  const { setMessagingState, messagingState } = useMessaging();
  const { dirty, isSubmitting } = useFormikContext<{ counselor: SelectOption }>();
  const isSubmitDisabled = allowCounselorSelection && hasCounselorInvited && !dirty;
  const headingText = allowCounselorSelection
    ? t('student.postSecondary.applicationsSection.selectCounselorTitle')
    : t('student.postSecondary.applicationsSection.modal.submitCounselorHeading');

  const handleContact = () => {
    closeModal();
    setMessagingState({ ...messagingState, show: true });
  };

  return (
    <Form>
      <SharedModal.Header>
        <SharedModal.Heading>{headingText}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className={styles.modalBody}>
        <div className='mb-base'>
          {t('student.postSecondary.applicationsSection.modal.bodyMessage')}
          <SharedButton className='!inline text-sm ml-xxs' variant='link' onClick={handleContact}>
            {t('student.postSecondary.applicationsSection.modal.contact')}
          </SharedButton>
        </div>
        <SelectCounselorList
          allowCounselorSelection={allowCounselorSelection}
          counselorsOptions={counselorsOptions}
        />
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          data-testid='close-button'
          variant='primary-outlined'
          onClick={closeModal}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          data-testid='submit-button'
          disabled={isSubmitDisabled}
          isLoading={isSubmitting}
          type='submit'
          variant='primary'>
          {allowCounselorSelection
            ? t('student.postSecondary.applicationsSection.counselorButton')
            : t('student.postSecondary.applicationsSection.modal.submitCounselor')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </Form>
  );
};
