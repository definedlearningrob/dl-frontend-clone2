import { useRef } from 'react';

import { Tooltip } from '@shared/components/Tooltip';
import { useIsTruncated } from '@shared/hooks/useIsTruncated';
import { TCheckInQuestion } from '@shared/components/CheckIns/types';

type Props = {
  question: TCheckInQuestion;
};

export const CheckInQuestionItem = ({ question }: Props) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const isHeadingTruncated = useIsTruncated({
    ref: headingRef,
    mode: 'multi-line',
  });

  return (
    <Tooltip
      container={document.getElementById('presentation-custom-container')}
      contentClassName='z-higher'
      disabled={!isHeadingTruncated}
      message={question.question}>
      <div className='flex gap-sm'>
        <div className='bg-neutral-200 text-font-primary rounded-xs h-md w-md flex items-center justify-center shrink-0 text-sm font-medium'>
          {question.step}
        </div>
        <h6 ref={headingRef} className='text-left !mb-0 line-clamp-3 !normal-case'>
          {question.question}
        </h6>
      </div>
    </Tooltip>
  );
};
