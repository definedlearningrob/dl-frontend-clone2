import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as PlusIcon } from '@shared/assets/icons/add.svg';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';

type Props = {
  spanToTwoColumns: boolean;
};

const iconClassNames = cx(
  'absolute right-0',
  'h-md w-md xxxl:h-lg xxxl:w-lg transition-colors ms-auto',
  'bg-primary-200 rounded-full text-primary-500',
  'group-hover/card:bg-white group-hover/card:text-primary-500',
  'group-hover/add:bg-white'
);

export const AddNewActivityCard = ({ spanToTwoColumns }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  const cardClassName = cx(
    'w-full h-full p-sm bg-white rounded-sm group/add',
    'hover:bg-primary-200 hover:outline hover:outline-1 hover:outline-primary-500',
    {
      'col-span-2': spanToTwoColumns,
    }
  );

  const iconSize = isFullHD ? 'md' : 'base';

  return (
    <Link className={cardClassName} to='/courses'>
      <div className='relative h-full'>
        <IconContainer
          Icon={PlusIcon}
          className={iconClassNames}
          paddingSize={isFullHD ? 'xs' : 'xxs'}
          size={iconSize}
        />
        <div className='flex flex-col h-full justify-end'>
          <h5 className='text-xs text-font-primary leading-base mb-xxs'>
            {t('student.dashboard.addAnotherCourse')}
          </h5>
          <div className='flex gap-xxs text-xxs text-primary-500 font-medium items-center'>
            {t('student.dashboard.goToCourses')}
            <IconContainer
              Icon={ChevronRightIcon}
              className='relative group-hover/add:translate-x-xxs duration-150 ease-out'
              paddingSize='none'
              size={isFullHD ? 'base' : 'sm'}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
