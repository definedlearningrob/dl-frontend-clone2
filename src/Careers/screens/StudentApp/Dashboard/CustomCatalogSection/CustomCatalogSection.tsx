import { useTranslation } from 'react-i18next';
import { useCustomCatalogOverviewQuery } from '@graphql/dc/shared/hooks';

import Image from '@shared/components/Image/Image';
import { removeTags } from '@shared/utils/removeTags';
import Link from '@shared/components/Link';

import { CustomCatalogSectionSkeleton } from './CustomCatalogSectionSkeleton';

export const CustomCatalogSection = () => {
  const { data, loading } = useCustomCatalogOverviewQuery();
  const { t } = useTranslation();

  if (loading) {
    return <CustomCatalogSectionSkeleton />;
  }

  if (!data?.careersCatalog) {
    return null;
  }

  return (
    <div className='bg-white p-sm xxxl:p-md h-full rounded-sm flex flex-col'>
      <Image
        alt='custom-catalog'
        className='rounded-sm mb-sm max-h-[116px] xxxl:max-h-[186px] w-full object-cover'
        src={data?.careersCatalog.thumbnailUrl}
      />
      <h5 className='text-xs text-font-primary mb-xs xxxl:mb-sm'>{data?.careersCatalog.name}</h5>
      <p className='text-xxs xxxl:text-sm text-font-secondary leading-lg line-clamp-6 xxxl:line-clamp-[7] mb-sm xxxl:mb-base'>
        {removeTags(data?.careersCatalog.description || '')}
      </p>
      <Link className='w-full' linkClassName='mt-auto' to='/catalog' variant='primary'>
        {t('student.dashboard.viewCatalog')}
      </Link>
    </div>
  );
};
