import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import TextareaAutosize from 'react-textarea-autosize';
import { ApolloError } from '@apollo/client';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import Button from '@shared/components/Button/Button';
import { cx } from '@shared/utils/cx';
import { callToast } from '@shared/components/Toaster/Toaster';

type Props = {
  currentUser: {
    firstName: string;
    lastName: string;
  };
  onSubmit: (comment: string) => void;
  isDisabled?: boolean;
};

export const StatementCommentInput = ({ currentUser, onSubmit, isDisabled }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [comment, setComment] = useState('');

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(comment);
      setComment('');
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error);
      } else {
        callToast('error', t('common.notifications.error.unknown'));
      }
    }
  };

  const inputWrapperClasses = cx(
    'flex items-start flex-1 gap-xs xxxl:gap-sm p-xs xxxl:p-sm',
    'transition-colors border border-neutral-300 rounded-sm hover:border-neutral-400 focus-within:!border-primary-500'
  );

  return (
    <div className='pt-x xxxl:pt-sm cursor-default'>
      <div className='flex gap-sm items-start pt-xs'>
        <SharedAvatar
          className='rounded-full border border-solid border-neutral-300'
          size={isFullHD ? '40' : '32'}
          user={currentUser}
        />
        <div className={inputWrapperClasses}>
          <TextareaAutosize
            className='flex-1 outline-none resize-none placeholder:text-neutral-40 text-xs xxxl:text-sm bg-transparent'
            placeholder={t('components.planGroup.addCommentToEvaluation')}
            value={comment}
            onChange={handleCommentChange}
          />
          <Button
            disabled={isDisabled || isEmpty(comment)}
            size={isFullHD ? 'md' : 'sm'}
            variant='primary'
            onClick={handleSubmit}>
            {t('common.actions.send')}
          </Button>
        </div>
      </div>
    </div>
  );
};
