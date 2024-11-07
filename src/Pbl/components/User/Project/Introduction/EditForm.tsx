import { Form, useField } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedFormImageTextEditor from '@pbl/components/User/FormImageTextEditor/FormImageTextEditor';

import SharedButton from '@shared/components/Button/Button';
import useImageUpdate from '@shared/hooks/useImageUpdate';

import styles from '../EditProjectForm.module.sass';

type Props = {
  onDismiss: () => void;
  setAllImageUuidsPresentatedInIntroduction: (images: string[]) => void;
  allImagesUsed: string[];
};

const UserProjectIntroductionForm = ({
  allImagesUsed,
  onDismiss,
  setAllImageUuidsPresentatedInIntroduction,
}: Props) => {
  const { t } = useTranslation();
  const [introduction] = useField('introduction');

  /* We are adding all new images that appeared during editing of intruducion in order to remove those ones
     that are not presented in the final saving payload/input.
   */
  useImageUpdate({
    observable: introduction.value,
    oldValues: allImagesUsed,
    updateStateFn: setAllImageUuidsPresentatedInIntroduction,
  });

  return (
    <Form>
      <SharedFormImageTextEditor
        data-testid='user-project-introduction-editor'
        name='introduction'
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

export default UserProjectIntroductionForm;
