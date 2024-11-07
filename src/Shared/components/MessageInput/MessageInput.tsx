import { KeyboardEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as SendIcon } from '@shared/svg/send_outlined.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

import styles from './MessageInput.module.sass';

type Props = {
  label?: string;
  loading?: boolean;
  onSend: (msg: string) => Promise<void>;
};

const MessageInput = ({ label, loading, onSend }: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation();

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    handleSendMessage();
  };

  const handleSendMessage = async () => {
    const msg = inputRef.current?.value.trim();
    if (!msg) return;

    await onSend(msg);
    inputRef.current!.value = '';
  };

  return (
    <div>
      {label && (
        <label className={styles.label} htmlFor='message-input'>
          {label}
        </label>
      )}
      <div className={styles.container} onClick={handleFocus}>
        <textarea
          ref={inputRef}
          className={styles.input}
          data-testid='messages-text-area'
          id='message-input'
          placeholder={t('messaging.startConversation')}
          onKeyDown={handleEnterPress}
        />
        <DeprecatedIconButton
          aria-label={t('messaging.sendButtonAriaLabel')}
          className={styles.button}
          data-testid='send-button'
          disabled={loading}
          icon={<SendIcon />}
          size='sm'
          square={true}
          variant='primary'
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default MessageInput;
