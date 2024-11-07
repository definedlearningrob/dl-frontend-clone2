import { Trans } from 'react-i18next';

import { formatExternalLink } from '@shared/utils/formatExternalLink';
import Link from '@shared/components/Link';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as InfoIcon } from '@shared/assets/icons/info_outlined.svg';

export const PerformanceIndicatorsScoreInfo = () => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  return (
    <div className='p-xs xxxl:p-sm border border-neutral-300 rounded-sm flex gap-x items-center text-xxs xxxl:text-xs text-font-primary'>
      <IconContainer
        Icon={InfoIcon}
        className='bg-info-100 rounded-sm text-info-500'
        paddingSize='xs'
        size={isFullHD ? 'base' : 'sm'}
      />
      <p className='mb-0 font-medium'>
        <Trans i18nKey='goals.performanceIndicatorsScore'>
          Scores are normalized to 0-4 point scale.{' '}
          <Link
            className='text-xxs xxxl:text-xs !inline'
            target='_blank'
            to={{
              pathname: formatExternalLink(
                'https://support.definedlearning.com/article/228-defined-learning-updated-knowledge-base'
              ),
            }}
            variant='link'>
            Read more
          </Link>{' '}
          about scoring in performance indicators.
        </Trans>
      </p>
    </div>
  );
};
