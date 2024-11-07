import { Form, Formik } from 'formik';
import { ApolloError } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { useUpdateCheckInQuestion } from '@pbl/graphql/user/hooks/useUpdateCheckInQuestion';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import SharedFormTextarea from '@shared/components/FormTextarea/FormTextarea';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { callToast } from '@shared/components/Toaster/Toaster';

import styles from './EditMode.module.sass';

type FormikValues = {
  question: string;
};

type QuestionEditModeProps = {
  id: string;
  question: string;
  onDismiss: () => void;
};

const QuestionEditMode = ({ id, question, onDismiss }: QuestionEditModeProps) => {
  const { t } = useTranslation();
  const [updateCheckInQuestion, { loading }] = useUpdateCheckInQuestion();

  const handleEditSubmit = async (values: FormikValues) => {
    try {
      await updateCheckInQuestion({ id, question: values.question.trim() });
    } catch (e) {
      if (e instanceof ApolloError) {
        callToast('error', e.message);
      } else {
        callToast('error', t('user.library.checkins.details.questionError'));
      }
    }
    onDismiss();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ question: question }}
      onSubmit={handleEditSubmit}>
      <Form className={styles.form}>
        <SharedFormTextarea className={styles.textarea} id={id} label='' name='question' />
        <div className={styles.formActions}>
          <div className={styles.formInfo}>
            <SharedIcon className={styles.formInfoIcon} icon={<InfoIcon />} size='xs' />{' '}
            <span className={styles.formText}>
              {t('user.library.checkins.details.questionInfo')}
            </span>
          </div>
          <div className={styles.formButtons}>
            <DeprecatedIconButton.Cancel disabled={loading} onClick={onDismiss} />
            <DeprecatedIconButton.Submit disabled={loading} type='submit' />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default QuestionEditMode;
