import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import cx from 'classnames';

import { ReactComponent as GuidanceIcon } from '@shared/svg/send_outlined.svg';
import { ReactComponent as SendIcon } from '@shared/svg/ask_a_question.svg';
import Modal from '@shared/components/Messaging/Modal/Modal';
import { RECEIVER_TYPES } from '@shared/resources/constants';
import SharedIcon from '@shared/components/Icon/Icon';
import SharedButton from '@shared/components/Button/Button';
import { useMessaging } from '@shared/hooks/useMessaging';
import Button from '@shared/components/Button/Button';
import { Tooltip } from '@shared/components/Tooltip';
import { callToast } from '@shared/components/Toaster/Toaster';

import styles from './QuestionBox.module.sass';

type Props = {
  isExpanded?: boolean;
};

export const QuestionBox = ({ isExpanded = true }: Props) => {
  const { t } = useTranslation();
  const { messagingState, setMessagingState } = useMessaging();

  const questionBoxClasses = cx(
    'animate-fadeDropIn w-[152px]',
    'bg-neutral-200 rounded-sm text-center p-xs mt-auto mx-xs mb-sm relative',
    {
      hidden: !isExpanded,
    }
  );

  const questionButtonClasses = cx(styles.questionButton, {
    '!hidden': isExpanded,
  });

  const openGuidance = useCallback(() => {
    setMessagingState({
      ...messagingState,
      show: true,
    });
  }, [messagingState]);

  const closeGuidance = useCallback(() => {
    setMessagingState({
      ...messagingState,
      actionContext: null,
      show: false,
    });
  }, [messagingState]);

  const onMessageSend = () => callToast('success', t('messaging.sentSuccessfully'));
  const messageContext = { ...messagingState.context, ...messagingState.actionContext };

  return (
    <div className='overflow-x-hidden pt-md'>
      <div className={questionBoxClasses}>
        <div className='flex justify-center -left-[10px] absolute -top-[20px] w-full'>
          <SharedIcon className='h-[30px] w-[66px]' icon={<SendIcon />} />
        </div>
        <p className='mb-xxs text-xxs tracking-[-0.24px] font-regular'>
          {t('messaging.askForHelp')}
        </p>
        <SharedButton
          className='!text-xxs mx-auto'
          size='sm'
          variant='primary-outlined'
          onClick={openGuidance}>
          {t('messaging.sendMessage')}
        </SharedButton>
      </div>
      <Tooltip disabled={isExpanded} message={t('messaging.sendMessage')} side='right'>
        <Button className={questionButtonClasses} size='sm' onClick={openGuidance}>
          <SharedIcon icon={<GuidanceIcon />} size='xs' />
        </Button>
      </Tooltip>
      {messagingState.show && (
        <Modal
          context={messageContext}
          initialReceiver={messagingState.receiver}
          receiverType={RECEIVER_TYPES.USER}
          toggleModal={closeGuidance}
          onSuccess={onMessageSend}
        />
      )}
    </div>
  );
};
