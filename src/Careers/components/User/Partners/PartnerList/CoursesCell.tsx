import { ReactComponent as CoursesIcon } from '@dc/assets/icons/book_opened.svg';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  coursesCount: number;
};

const iconWrapperClasses =
  'p-xxs xxxl:p-xs bg-neutral-200 rounded-sm group-hover/row:bg-white items-center text-neutral-700 font-medium text-xxs xxxl:text-xs flex leading-lg gap-xxs xxxl:gap-xs';

export const CoursesCell = ({ coursesCount }: Props) => (
  <div className='flex gap-xxs xxxl:gap-xs'>
    {coursesCount > 0 && (
      <div className={iconWrapperClasses}>
        <IconContainer Icon={CoursesIcon} className='rounded-sm' paddingSize='none' size='sm' />
        {coursesCount}
      </div>
    )}
    {coursesCount === 0 && <div className='px-sm'>-</div>}
  </div>
);
