import cx from 'classnames';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as DLIcon } from '@shared/assets/icons/DLIcon.svg';
import { ReactComponent as DCIcon } from '@shared/assets/icons/DCIcon.svg';
import { ReactComponent as FlagIcon } from '@shared/assets/icons/flag_outlined.svg';
import { ReactComponent as ChevronLeftIcon } from '@shared/assets/icons/chevron_left.svg';
import { Badge } from '@shared/components/Badge/Badge';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { TTagResult } from '@shared/graphql/user/query/tagsFullData';

type Props = {
  tagSource: TTagResult;
};

export const TagsSource = ({ tagSource }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const badgeSize = isFullHD ? 'base' : 'small';
  const paddingSize = isFullHD ? 'xxs' : 'xxxs';
  const iconSize = isFullHD ? 'base' : 'sm';
  const isCareers = tagSource.platform === 'CAREERS';

  const sourceIcon = isCareers ? DCIcon : DLIcon;
  const iconClassName = cx(
    'text-danger-500 bg-danger-100 rounded-xs self-center h-[22px] w-[22px] xxxl:!h-[30px] xxxl:!w-[30px] relative top-[1px]',
    {
      'text-primary-500 bg-primary-200': !isCareers,
    }
  );

  return (
    <>
      <div className='flex gap-xxs xxxl:gap-xs'>
        <IconContainer
          Icon={sourceIcon}
          className={iconClassName}
          paddingSize={paddingSize}
          size={iconSize}
        />
        <Badge
          Icon={FlagIcon}
          className='py-xxxs xxxl:py-xxs truncate'
          size={badgeSize}
          type='success'>
          <span className='truncate'>{tagSource.contextName}</span>
        </Badge>
      </div>
      <div className='flex gap-xxs xxxl:gap-xs'>
        <IconContainer
          Icon={ChevronLeftIcon}
          className='-rotate-45 self-baseline h-[22px] w-[22px] xxxl:!h-[30px] xxxl:!w-[30px] text-primary-500'
          paddingSize={paddingSize}
          size={iconSize}
        />
        <p className='mb-0 relative top-[4px] xxxl:top-[6px]'>{tagSource.sourceName}</p>
      </div>
    </>
  );
};
