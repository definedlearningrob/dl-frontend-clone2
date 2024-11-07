import { Form } from 'formik';
import { useTranslation } from 'react-i18next';

import CheckInsInfo from '@pbl/components/User/Project/CheckIns/CheckInsInfo/CheckInsInfo';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import { ReactComponent as AcceptIcon } from '@shared/assets/icons/checkmark.svg';
import { ReactComponent as RejectIcon } from '@shared/assets/icons/clear.svg';
import { IconButton } from '@shared/components/IconButton/IconButton';

import styles from './CheckInQuestionForm.module.sass';

type Props = {
  setEditCheckInQuestionMode: (value: boolean) => void;
};

const CheckInQuestionForm = ({ setEditCheckInQuestionMode }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Form className='flex gap-xs mb-xxs'>
        <SharedFormTextInput
          autoFocus={true}
          className={styles.questionInput}
          data-testid='checkin-question-input'
          name='question'
          size='sm'
        />
        <div className='flex gap-xs items-center'>
          <IconButton
            Icon={RejectIcon}
            size='md'
            variant='danger'
            onClick={() => setEditCheckInQuestionMode(false)}
          />
          <IconButton Icon={AcceptIcon} size='md' type='submit' variant='primary' />
        </div>
      </Form>
      <CheckInsInfo infoText={t('project.checkIns.editOwnedCheckInQuestionInfo')} />
    </>
  );
};

export default CheckInQuestionForm;
