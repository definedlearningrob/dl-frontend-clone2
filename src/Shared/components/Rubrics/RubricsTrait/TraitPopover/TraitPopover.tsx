import { FormEvent, KeyboardEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { ReactComponent as ClearIcon } from '@shared/svg/clear.svg';
import SharedAvatar from '@shared/components/Avatar/Avatar';
import SharedTextarea from '@shared/components/Textarea/Textarea';
import SharedButton from '@shared/components/Button/Button';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { useRubric } from '../../RubricProvider/RubricProvider';

type Props = {
  initialTrait?: string;
  onClose: () => void;
  onSubmit?: (trait: string) => void;
};

export const TraitPopover = ({ initialTrait, onClose, onSubmit }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    grading: { grader },
  } = useRubric();

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const { t } = useTranslation();
  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      const formData = new FormData(event.target as HTMLFormElement);
      const traitNote = formData.get('trait')?.toString().trim();

      if (!traitNote) return;

      onSubmit(traitNote);
      onClose();
    }
  };

  const handleEnterToSubmit = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const buttonLabel = isEmpty(initialTrait)
    ? t('components.rubric.addComment')
    : t('components.rubric.updateComment');

  return (
    <div className='bg-white rounded-sm border border-neutral-300 min-w-[400px] p-sm xxxl:p-base shadow-400'>
      <div className='flex justify-between mb-sm'>
        <div className='flex gap-xs items-center'>
          <SharedAvatar
            size={isFullHD ? '32' : '24'}
            theme='base'
            user={{ firstName: grader?.firstName, lastName: grader?.lastName }}
          />
          <span className='mb-0 text-neutral-700 font-medium text-xxs xxxl:text-xs leading-lg'>{`${grader?.firstName} ${grader?.lastName}`}</span>
        </div>
        <IconButton
          Icon={ClearIcon}
          size={isFullHD ? 'md' : 'sm'}
          variant='white'
          onClick={onClose}
        />
      </div>
      <form ref={formRef} onSubmit={handleSave}>
        <SharedTextarea
          defaultValue={initialTrait}
          disabled={!onSubmit}
          name='trait'
          textareaClassName='!p-xs text-font-secondary'
          onKeyDown={handleEnterToSubmit}
        />
        {onSubmit && (
          <SharedButton
            className='ms-auto'
            size={isFullHD ? 'md' : 'sm'}
            type='submit'
            variant='primary'>
            {buttonLabel}
          </SharedButton>
        )}
      </form>
    </div>
  );
};
