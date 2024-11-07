import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import commonApp from '@dc/images/CommonAppLg.svg';
import { RECOMMENDER_TYPE } from '@dc/resources/enums';

import SharedImage from '@shared/components/Image/Image';
import Link from '@shared/components/Link';
import Card from '@shared/components/Card/Card';

import styles from './CommonAppProfileCard.module.sass';

type Props = {
  type: RECOMMENDER_TYPE;
};

export const CommonAppProfileCard = ({ type = RECOMMENDER_TYPE.TEACHER }: Props) => {
  const { t } = useTranslation();
  const isCounselor = type === RECOMMENDER_TYPE.COUNSELOR;
  const formLink = isCounselor ? '/forms/counselorprofile' : '/forms/teacherprofile';

  const headerTranslations = isCounselor
    ? t('user.postSecondary.commonAppRequests.completeCounselorProfile')
    : t('user.postSecondary.commonAppRequests.completeTeacherProfile');

  const textTranslations = isCounselor
    ? t('user.postSecondary.commonAppRequests.completeCounselorText')
    : t('user.postSecondary.commonAppRequests.completeTeacherText');

  const linkTranslations = isCounselor
    ? t('user.postSecondary.commonAppRequests.counselorProfileLinkText')
    : t('user.postSecondary.commonAppRequests.teacherProfileLinkText');

  const contentCard = cx(styles.contentCard, 'm-base');

  return (
    <Card className={contentCard}>
      <div className='flex flex-col'>
        <div className='flex mb-base justify-center'>
          <SharedImage src={commonApp} />
        </div>
        <div className='flex flex-col'>
          <h4 className='text-sm xxxl:text-base self-center mb-xs'>{headerTranslations}</h4>
          <p className='leading-lg text-neutral-700 self-center font-regular text-center text-xs xxxl:text-sm'>
            {textTranslations}
          </p>
          <div className='flex basis-1/2 justify-center'>
            <Link className='font-regular' size='lg' to={formLink} variant='primary'>
              {linkTranslations}
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};
