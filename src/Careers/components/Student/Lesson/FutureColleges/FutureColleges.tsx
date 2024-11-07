import { useTranslation } from 'react-i18next';

import SchoolBuilding from '@dc/images/school_building.svg';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import Card from '@shared/components/Card/Card';
import Image from '@shared/components/Image/Image';
import Link from '@shared/components/Link';

type Props = {
  careerName: string;
  hasInstitutionsInStudentState: boolean;
};

export const FutureColleges = ({ careerName, hasInstitutionsInStudentState }: Props) => {
  const { t } = useTranslation();
  const {
    userInfo: { state },
  } = useUserInfo<TStudentInfo>();
  const linkToInstitutionList = [
    `/post-secondary/search?keyword=${careerName}`,
    hasInstitutionsInStudentState && `location=${state}`,
  ]
    .filter(Boolean)
    .join('&');

  return (
    <Card className='bg-neutral-200 radius-md p-md gap-md'>
      <div className='xxxl:flex gap-md'>
        <div className='width-fit mb-base'>
          <Image data-testid='collages-and-future-image' src={SchoolBuilding} />
        </div>
        <div className='flex-1'>
          <h4>{t('course.collegesFuture.heading')}</h4>
          <p className='text-sm font-regular leading-lg mb-base'>
            {t('course.collegesFuture.text')}
          </p>
          <Link target='_blank' to={linkToInstitutionList} variant='primary-outlined'>
            {t('course.collegesFuture.button')}
          </Link>
        </div>
      </div>
    </Card>
  );
};
