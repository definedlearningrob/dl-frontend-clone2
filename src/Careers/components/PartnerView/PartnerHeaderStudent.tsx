import { useParams } from 'react-router-dom';
import { usePartnerOverviewQuery as usePartnerOverviewQueryStudent } from '@graphql/dc/students/hooks';
import { useTranslation } from 'react-i18next';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { formatExternalLink } from '@shared/utils/formatExternalLink';
import { ReactComponent as WorldIcon } from '@shared/svg/world_icon.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import Link from '@shared/components/Link';

export const PartnerHeaderStudent = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const { data, loading } = usePartnerOverviewQueryStudent({ variables: { id } });

  const isDataLoaded = !loading && data?.partner;

  return (
    <div className='flex justify-between items-center mb-sm h-md xxxl:h-[40px]'>
      {!isDataLoaded && (
        <div className='w-[300px]'>
          <SkeletonRectangle height='extra-small' size='full-width' />
        </div>
      )}
      {isDataLoaded && (
        <h1 className='text-base xxxl:text-lg mb-0 truncate'>{data?.partner?.name}</h1>
      )}
      {data?.partner?.url && (
        <Link
          Icon={WorldIcon}
          size={isFullHD ? 'md' : 'sm'}
          target='_blank'
          to={{ pathname: formatExternalLink(data.partner.url!) }}
          variant='primary'>
          {t('partners.website')}
        </Link>
      )}
    </div>
  );
};
