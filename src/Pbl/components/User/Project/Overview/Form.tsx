import { Form } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedFormTextEditor from '@shared/components/FormTextEditor/FormTextEditor';
import SharedButton from '@shared/components/Button/Button';

import styles from './Overview.module.sass';

type Props = {
  onDismiss: () => void;
};

const UserProjectDescriptionForm = ({ onDismiss }: Props) => {
  const { t } = useTranslation();

  return (
    <Form>
      <SharedFormTextEditor
        data-testid='user-project-student-editor'
        name='description'
        placeholder={t('common.fields.common.description')}
      />
      <div className={styles.buttonsWrapper}>
        <SharedButton className={styles.button} type='button' variant='danger' onClick={onDismiss}>
          {t('common.actions.discard')}
        </SharedButton>
        <SharedButton className={styles.button} type='submit' variant='success'>
          {t('common.actions.save')}
        </SharedButton>
      </div>
    </Form>
  );
};

export default UserProjectDescriptionForm;