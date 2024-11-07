import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { AcademyCourse } from '@graphql/shared/users/types';

import { AcademyCourseCard } from '@shared/components/AcademyCourseCard/AcademyCourseCard';

type Props = {
  academyCourses?: AcademyCourse[];
  loading: boolean;
};

const ACADEMY_URL = import.meta.env.VITE_ACADEMY_URL;

export const AcademyCourses = ({ academyCourses, loading }: Props) => {
  const { t } = useTranslation();

  const hasCourses = !isEmpty(academyCourses);

  if (loading || !hasCourses || isEmpty(ACADEMY_URL)) return null;

  return (
    <div>
      <h4 className='mb-x'>{t('welcomeMessage.definedAcademyCourses')}</h4>
      <p className='mb-sm'>{t('welcomeMessage.definedAcademyDescription')}</p>
      <div className='grid grid-cols-3 gap-x xxxl:gap-sm'>
        {!loading &&
          hasCourses &&
          academyCourses?.map((course) => <AcademyCourseCard key={course.id} course={course} />)}
      </div>
    </div>
  );
};
