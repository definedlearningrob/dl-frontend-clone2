import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { MouseEventHandler, useRef } from 'react';

import { useIsTruncated } from '@shared/hooks/useIsTruncated';
import { useToggle } from '@shared/hooks/useToggle';
import { cleanInjection } from '@shared/utils/cleanInjection';

type Props = {
  text: string;
};

export const TruncatedText = ({ text }: Props) => {
  const [isExpanded, toggleIsExpanded] = useToggle(false);
  const { t } = useTranslation();
  const textRef = useRef<HTMLInputElement>(null);

  const isTextTruncated = useIsTruncated({ ref: textRef });

  const textClassName = cx(
    'mb-xs',
    'text-xxs xxxl:text-xs text-neutral-700 leading-lg',
    '[&_a]:break-all',
    {
      ['line-clamp-2']: !isExpanded,
      ['cursor-pointer']: isTextTruncated,
    }
  );

  const triggerClassName = cx(
    'trigger-name',
    '!text-xxs xxxl:!text-xs',
    'text-primary-500 bg-white',
    'before:w-lg before:block before:absolute before:left-[-48px]',
    'before:bg-gradient-to-l from-white via-40% via-white to-transparent',
    'group-hover/portfolio-project-card:bg-neutral-200 group-hover/portfolio-project-card:from-neutral-200',
    'group-hover/portfolio-project-card:via-neutral-200',
    {
      ['before:h-full absolute right-0 top-[21px]']: !isExpanded,
      ['pb-xs mb-sm']: isExpanded,
    }
  );

  const buttonLabel = isExpanded ? t('common.actions.readLess') : t('common.actions.readMore');

  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isTextTruncated || isExpanded) {
      e.stopPropagation();
      toggleIsExpanded();
    }
  };
  const role = isTextTruncated ? 'button' : undefined;

  return (
    <div className='relative' role={role} onClick={onClickHandler}>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={cleanInjection(text)} ref={textRef} className={textClassName} />
      {(isTextTruncated || isExpanded) && (
        <button className={triggerClassName} type='button'>
          {buttonLabel}
        </button>
      )}
    </div>
  );
};
