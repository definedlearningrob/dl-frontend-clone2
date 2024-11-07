import { AcademyCourse } from '@graphql/dc/shared/types';
import { ReactNode } from 'react';

import { ReactComponent as CloseIcon } from '@shared/svg/close.svg';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

type Props = {
  text: string;
  academyCourses?: AcademyCourse[];
  onClose: () => void;
  additionalContent?: ReactNode;
};

export const WelcomeMessageContent = ({ additionalContent, text, onClose }: Props) => (
  <div className='flex flex-col gap-base justify-between relative border-l-4 border-primary-500 -ml-base pl-base'>
    <div className='flex flex-row gap-xs'>
      <div className='grow w-3/4 transition-all duration-700 ease-in-out relative'>
        <InjectedContent className='grow' content={text} />
      </div>
      <IconButton
        Icon={CloseIcon}
        className='!p-0 text-primary-500 sticky top-0 right-0'
        size='md'
        onClick={onClose}
      />
    </div>
    {additionalContent}
  </div>
);
