import { useField, useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';

import styles from './Footer.module.sass';

const ExtensionsEditFooter = () => {
  const { goBack } = useHistory();
  const [, , helpers] = useField('status');
  const { submitForm } = useFormikContext();
  const { t } = useTranslation();

  const handleSaveAsDraft = () => {
    helpers.setValue('DRAFT');
    submitForm();
  };

  return (
    <footer className={styles.footer}>
      <div>
        <SharedButton variant='primary-outlined' onClick={goBack}>
          {t('common.actions.cancel')}
        </SharedButton>
      </div>
      <div className={styles.right}>
        <SharedButton
          className={styles.button}
          variant='primary-outlined'
          onClick={handleSaveAsDraft}>
          {t('user.dashboard.extensionFields.settings.saveDraft')}
        </SharedButton>
        <SharedButton className={styles.button} type='submit' variant='primary'>
          {t('user.dashboard.extensionFields.settings.publishNow')}
        </SharedButton>
      </div>
    </footer>
  );
};

export default ExtensionsEditFooter;
