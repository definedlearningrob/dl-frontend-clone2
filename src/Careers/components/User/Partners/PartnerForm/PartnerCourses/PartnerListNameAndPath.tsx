import { CoursesQuery } from '@graphql/dc/users/operations';

import { ReactComponent as PathwayIcon } from '@dc/assets/icons/pathway.svg';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  course: CoursesQuery['courses']['nodes'][0];
};

export const PartnerListNameAndPath = ({ course }: Props) => {
  if (!course) {
    return null;
  }

  return (
    <div className='flex gap-xxs flex-col'>
      <div className='text-neutral-700 flex items-start gap-xxs leading-lg'>
        <IconContainer Icon={PathwayIcon} className='self-start' paddingSize='none' size='sm' />
        {course?.pathway && (
          <span className='text-xxs xxxl:text-xs italic'>{course.pathway.name}</span>
        )}
      </div>
      <h6 className='mb-0 text-neutral-800 font-bold text-xs xxxl:text-sm'>{course.name}</h6>
    </div>
  );
};
