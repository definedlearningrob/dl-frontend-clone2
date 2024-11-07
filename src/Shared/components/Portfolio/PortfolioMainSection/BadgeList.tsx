import { Trans } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { BadgeWithCounter } from '@shared/components/Portfolio/BadgeWithCounter/BadgeWithCounter';
import { BadgeGroupedById } from '@shared/resources/types';
import { cx } from '@shared/utils/cx';
import { PortfolioBadgeTooltip } from '@shared/components/PortfolioBadge/PortfolioBadgeTooltip';
import { Tooltip } from '@shared/components/Tooltip';

type Props = {
  badges: BadgeGroupedById[];
  hideHeader?: boolean;
  className?: string;
};

export const BadgeList = ({ badges, hideHeader, className }: Props) => {
  if (isEmpty(badges)) {
    return null;
  }

  return (
    <div className={cx('mt-xs xxxl:mt-sm', className)}>
      {!hideHeader && (
        <div className='mb-base after:h-[1px] after:bg-neutral-300 after:grow flex items-center gap-sm'>
          <h6 className='mb-0 text-xs xxxl:text-sm'>
            <Trans
              components={{
                neutralText: <span className='text-neutral-600' />,
              }}
              i18nKey='portfolio.public.badges'
              values={{ count: badges.length }}
            />
          </h6>
        </div>
      )}
      <div className='flex flex-wrap'>
        {badges.map((badge) => (
          <Tooltip
            key={badge.id}
            contentClassName='!max-w-[450px] w-[256px] !p-0'
            delayDuration={300}
            directChildren={true}
            message={<PortfolioBadgeTooltip badge={badge} />}
            variant='light'>
            <div
              key={badge.id}
              className='w-[128px] py-x px-xs rounded-sm hover:bg-neutral-200 transition-colors'>
              <div className='flex justify-center mb-xs'>
                <BadgeWithCounter counter={badge.resources.length} imageUrl={badge.imageUrl} />
              </div>
              <div className='text-center text-xxs font-medium leading-lg text-font-secondary line-clamp-2 min-w-0'>
                {badge.name}
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
