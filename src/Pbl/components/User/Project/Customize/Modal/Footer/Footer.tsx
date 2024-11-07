import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';
import SharedModal from '@shared/components/Modal/Modal';

import styles from '../Modal.module.sass';

type TFooterProps = {
  onDismiss: () => void;
};

const UserProjectCustomizeModalFooter = ({ onDismiss }: TFooterProps) => {
  const { isSubmitting } = useFormikContext();
  const { t } = useTranslation();

  return (
    <SharedModal.Footer>
      <SharedButton type='button' variant='primary-outlined' onClick={onDismiss}>
        {t('common.actions.cancel')}
      </SharedButton>
      <SharedButton
        className={styles.acceptButton}
        isLoading={isSubmitting}
        type='submit'
        variant='primary'>
        {t('user.project.customize.start')}
      </SharedButton>
    </SharedModal.Footer>
  );
};

export default UserProjectCustomizeModalFooter;
