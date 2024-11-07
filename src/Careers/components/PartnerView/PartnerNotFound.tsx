import { useTranslation } from 'react-i18next';

import partnerNotFoundImage from '@dc/assets/images/building_with_magnify.svg';

import SharedCard from '@shared/components/Card/Card';
import Link from '@shared/components/Link';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { useRole } from '@shared/hooks/useRole';

export const PartnerNotFound = () => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { isUser } = useRole();

  const buttonSize = isFullHD ? 'md' : 'sm';

  return (
    <div className='h-full flex items-center justify-center'>
      <SharedCard className='w-[368px] xxxl:w-[444px] flex flex-col gap-base relative -translate-y-base'>
        <div className='rounded-sm bg-neutral-200 h-[220px] flex items-center justify-center'>
          <img src={partnerNotFoundImage} />
        </div>
        <div className='text-center'>
          <h6 className='mb-xs text-xs xxxl:text-sm'>{t('partners.partnerNotFound')}</h6>
          <p className='text-xxs xxxl:text-xs leading-lg mb-sm xxxl:mb-base whitespace-pre-line'>
            {t('partners.partnerNotFoundDescription')}
          </p>
          <div className='flex gap-xs xxxl:gap-sm'>
            <Link
              className='w-full'
              linkClassName='flex-1'
              size={buttonSize}
              to='/'
              variant={isUser ? 'primary-outlined' : 'primary'}>
              {t('user.navigation.dashboard')}
            </Link>
            {isUser && (
              <Link
                className='w-full'
                linkClassName='flex-1'
                size={buttonSize}
                to='/opportunities?tabId=partners'
                variant='primary'>
                {t('partners.partners')}
              </Link>
            )}
          </div>
        </div>
      </SharedCard>
    </div>
  );
};
