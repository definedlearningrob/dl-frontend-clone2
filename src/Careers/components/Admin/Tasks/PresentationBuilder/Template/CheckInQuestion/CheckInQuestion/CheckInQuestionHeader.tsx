import { useRef } from 'react';

import { TCheckInQuestion } from '@shared/components/CheckIns/types';
import { useIsTruncated } from '@shared/hooks/useIsTruncated';
import { Tooltip } from '@shared/components/Tooltip';

type Props = {
  checkInQuestion: TCheckInQuestion;
};

export const CheckInQuestionHeader = ({ checkInQuestion }: Props) => {
  const { question } = checkInQuestion;

  const headingRef = useRef<HTMLHeadingElement>(null);

  const isHeadingTruncated = useIsTruncated({
    ref: headingRef,
    mode: 'multi-line',
  });

  return (
    <Tooltip
      container={document.getElementById('presentation-custom-container')}
      contentClassName='z-highest'
      disabled={!isHeadingTruncated}
      message={question}>
      <div className='flex gap-sm items-center'>
        <div className='bg-neutral-200 text-font-primary rounded-xs h-md w-md flex items-center justify-center shrink-0 text-sm font-medium'>
          {checkInQuestion.step}
        </div>
        <h6
          ref={headingRef}
          className='text-left !text-sm xxxl:!text-base font-bold !normal-case !mb-0 line-clamp-2'>
          {question}
        </h6>
      </div>
    </Tooltip>
  );
};
