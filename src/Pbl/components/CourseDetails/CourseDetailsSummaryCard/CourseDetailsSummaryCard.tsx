import { useCallback } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { t } from 'i18next';

import useUserInfo from '@pbl/hooks/useUserInfo';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';
import { TStudentInfo } from '@pbl/graphql/student/queries/userInfo';
import { ReactComponent as ThumbnailPlaceholder } from '@pbl/images/empty_thumbnail.svg';

import SharedButton from '@shared/components/Button/Button';
import SharedCard from '@shared/components/Card/Card';
import SharedImage from '@shared/components/Image/Image';
import defaultThumbnail from '@shared/assets/images/default-thumbnail.svg';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useSharedSessionLink } from '@shared/components/SharedSession';

import styles from './CourseDetailsSummaryCard.module.sass';

type LocationState = {
  projectPathname?: string;
};

type Props = {
  exploreMoreAvailable?: boolean;
  title?: string;
  imageUrl: string;
  badge: string;
  alternativeNames?: string[];
  description?: string;
  isPublic?: boolean;
};

const CourseDetailsSummaryCard = ({
  exploreMoreAvailable,
  title,
  imageUrl,
  badge,
  alternativeNames,
  description,
}: Props) => {
  const history = useHistory();
  const { courseId } = useParams<{ courseId: string }>();
  const { state } = useLocation<LocationState>();
  const { userInfo } = useUserInfo<TUserInfo | TStudentInfo>();
  const {
    params: { code },
  } = useQueryParams<{ code?: string }>();
  const [redirectToCourseDC, { loading }] = useSharedSessionLink({
    type: 'DC',
    resource: 'course',
    resourceId: courseId,
  });

  const { projectPathname } = state ?? {};

  const isImpersonatingStudent = 'isImpersonated' in userInfo && userInfo.isImpersonated;
  const hasAccess =
    !isImpersonatingStudent && (exploreMoreAvailable || userInfo?.hasAccessToCareers);

  const handleGoBack = useCallback(() => {
    if (projectPathname) {
      return history.replace({
        pathname: projectPathname,
        search: code && `?code=${code}`,
      });
    }
    history.goBack();
  }, []);

  const goToDefinedCareers = async () => {
    await redirectToCourseDC();
  };

  return (
    <SharedCard className='text-font-primary p-base'>
      <SharedCard.Body className='flex !flex-row flex-wrap lg:flex-nowrap gap-base'>
        <div className={styles.imageWrapper}>
          {imageUrl ? (
            <SharedImage
              alt={title}
              className={styles.image}
              fallbackSrc={defaultThumbnail}
              src={imageUrl}
            />
          ) : (
            <ThumbnailPlaceholder className={styles.image} />
          )}
        </div>
        <div className={styles.courseSummaryContent}>
          <div className={styles.codeBadge}>{badge}</div>
          <SharedCard.Title className='text-font-primary mb-xs' size='medium'>
            {title}
          </SharedCard.Title>
          {alternativeNames && (
            <p>
              {t('courseDetails.alsoCalled')}
              <span className='text-font-secondary m-xxs'>{alternativeNames.join(', ')}</span>
            </p>
          )}
          {description && <p className='text-font-secondary'>{description}</p>}
          <div className={styles.buttonsWrapper}>
            <SharedButton
              className={styles.button}
              variant='primary-outlined'
              onClick={handleGoBack}>
              {t('courseDetails.backToProject')}
            </SharedButton>
            {hasAccess && (
              <SharedButton
                className={styles.button}
                disabled={loading}
                variant='primary'
                onClick={goToDefinedCareers}>
                {t('courseDetails.experienceInDefinedCareers')}
              </SharedButton>
            )}
          </div>
        </div>
      </SharedCard.Body>
    </SharedCard>
  );
};

export default CourseDetailsSummaryCard;
