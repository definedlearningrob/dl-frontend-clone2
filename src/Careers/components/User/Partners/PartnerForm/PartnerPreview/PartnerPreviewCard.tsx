import { Partner } from '@graphql/dc/shared/types';
import { Trans, useTranslation } from 'react-i18next';
import cx from 'classnames';

import { ReactComponent as OpportunityIcon } from '@dc/svg/match.svg';

import { ReactComponent as VirtualInternshipIcon } from '@shared/svg/laptop.svg';
import Image from '@shared/components/Image/Image';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Badge } from '@shared/components/Badge/Badge';

type Props = Pick<Partner, 'thumbnailUrl' | 'name' | 'about'> & {
  opportunitiesCount: number;
  virtualInternshipsCount: number;
};

const cardClassName = cx('py-xs xxl:py-x bg-white flex gap-x xxxl:gap-sm rounded-sm');

const imageWrapperClassName = cx(
  'basis-[120px] xxxl:basis-[180px] shrink-0 grow-0 overflow-hidden flex flex-col flex-1 max-h-[98px] xxxl:max-h-[115px] relative rounded-sm'
);

export const PartnerPreviewCard = ({
  thumbnailUrl,
  name,
  about,
  opportunitiesCount,
  virtualInternshipsCount,
}: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  const nameToDisplay = name.length === 0 ? t('user.partners.previewCard.title') : name;

  return (
    <div className={cardClassName}>
      <div className={imageWrapperClassName}>
        <Image className=' object-cover rounded-sm h-full w-full' src={thumbnailUrl} />
      </div>
      <div className='grow'>
        <div className='flex items-center justify-between w-full'>
          <h3 className='mb-0 mr-base line-clamp-2 text-xs'>{nameToDisplay}</h3>
        </div>
        <p className='line-clamp-2 text-xxs xxxl:text-xs text-font-secondary font-regular pr-xs tracking-normal leading-lg mb-xs xxxl:mb-x'>
          {about.length === 0 ? (
            <Trans
              components={{ neutralText: <span className='font-medium' /> }}
              i18nKey='user.partners.previewCard.description'
              values={{ about: t('user.partners.previewCard.aboutText') }}
            />
          ) : (
            about
          )}
        </p>

        <div className='flex gap-xxs xxxl:gap-xs'>
          {opportunitiesCount && (
            <Badge Icon={OpportunityIcon} size={isFullHD ? 'base' : 'small'} type='primary'>
              <Trans
                i18nKey='partners.card.opportunitiesCount'
                values={{ count: opportunitiesCount }}
              />
            </Badge>
          )}
          {virtualInternshipsCount && (
            <Badge Icon={VirtualInternshipIcon} size={isFullHD ? 'base' : 'small'} type='primary'>
              <Trans
                i18nKey='partners.card.virtualInternshipsCount'
                values={{ count: virtualInternshipsCount }}
              />
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
