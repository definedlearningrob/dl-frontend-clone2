import { useTranslation } from 'react-i18next';

import NoCoursesImage from '@dc/images/onboarding_bypass.png';

import Card from '@shared/components/Card/Card';
import Link from '@shared/components/Link';
import Image from '@shared/components/Image/Image';

export const NoActivities = () => {
  const { t } = useTranslation();

  return (
    <Card className='h-full !py-base !px-2lg xxxl:!p-[80px] flex gap-lg justify-center items-center'>
      <div className='grow max-w-[200px] xxxl:max-w-fit shrink-0'>
        <h1 className='text-2lg xxxl:text-2xl mb-xs xxxl:mb-sm'>
          {t('student.dashboard.startExploring')}
        </h1>
        <p className='text-neutral-700 text-xxs xxxl:text-sm mb-sm xxxl:mb-md'>
          {t('student.dashboard.noActivitiesInfo')}
        </p>
        <Link to='/courses' variant='secondary'>
          {t('student.dashboard.exploreCourses')}
        </Link>
      </div>
      <Image className='h-[240px] xxxl:h-[320px] min-w-0 object-contain' src={NoCoursesImage} />
    </Card>
  );
};
