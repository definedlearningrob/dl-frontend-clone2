import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';
import { ReactComponent as StudentArchivedIcon } from '@shared/assets/icons/student_archived.svg';

import styles from './ArchivedStudent.module.sass';

type Props = {
  clearLoginError: () => void;
  message?: string;
};

function ArchivedStudent({ clearLoginError, message }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const emailRegex = /([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/;
  const messageWithoutEmail = message && message.replace(emailRegex, '');
  const emailString = message && emailRegex.exec(message);

  const onClickHandler = () => dispatch(clearLoginError());

  return (
    <div className={styles.wrapper}>
      <StudentArchivedIcon className={styles.icon} />
      <h3 className={styles.header}>{t('components.archivedAccount.header')}</h3>
      {message && (
        <p className={styles.message}>
          {messageWithoutEmail}
          {emailString && (
            <a className={styles.link} href={`mailto:${emailString[0]}`}>
              {emailString[0]}
            </a>
          )}
        </p>
      )}
      <SharedButton
        className='clear-login-error'
        data-testid='clear-login-error'
        size='md'
        type='submit'
        value='Back to login'
        variant='primary'
        onClick={onClickHandler}>
        {t('components.archivedAccount.backToLogin')}
      </SharedButton>
    </div>
  );
}

export default ArchivedStudent;
