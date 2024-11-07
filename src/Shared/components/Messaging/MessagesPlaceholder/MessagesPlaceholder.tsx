import { useTranslation } from 'react-i18next';

import messagingImage from '@shared/assets/images/inbox-empty.png';
import SharedButton from '@shared/components/Button/Button';

import styles from './MessagesPlaceholder.module.sass';

type Props = {
  preview: boolean;
  toggleModal: () => void;
};

const MessagesPlaceholder = (props: Props) => {
  const { preview, toggleModal } = props;
  const { t } = useTranslation();

  return (
    <section className={styles.placeholder}>
      <img alt='' className={styles.placeholderImage} src={messagingImage} />
      <div className={styles.noConversations}>
        <h2>{t('messaging.noConversations')}</h2>
        {!preview && (
          <>
            <span className={styles.noConversationsInfo}>{t('messaging.sendFirst')}</span>
            <SharedButton
              className='mx-auto mt-md'
              data-testid='create-conversation'
              variant='primary'
              onClick={toggleModal}>
              {t('messaging.createNew')}
            </SharedButton>
          </>
        )}
      </div>
    </section>
  );
};

export default MessagesPlaceholder;
