import { Form } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedFormTextEditor from '@shared/components/FormTextEditor/FormTextEditor';
import SharedButton from '@shared/components/Button/Button';

import styles from '../../EditProjectForm.module.sass';

type Props = {
  onDismiss: () => void;
};

const UserProjectTeachingResourcesForm = ({ onDismiss }: Props) => {
  const { t } = useTranslation();

  return (
    <Form>
      <SharedFormTextEditor
        data-testid='user-project-teaching-editor'
        name='teachingResources'
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

export default UserProjectTeachingResourcesForm;
