/* eslint-disable react/no-danger */
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { TDashboardCoursesTrack, TGrade } from '@pbl/graphql/user/queries/dashboardCourses';

import SharedImage from '@shared/components/Image/Image';
import { cleanInjection } from '@shared/utils/cleanInjection';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ChevronRight } from '@shared/svg/chevron_right.svg';

import { Grades } from './Grades';
import '@pbl/components/User/Dashboard/Courses/Card/Card.sass';

type Props = {
  course: TDashboardCoursesTrack;
  grades: TGrade[];
  onClick: () => void;
};

const CourseCardContent = ({ course, onClick, grades }: Props) => {
  const { displayName, imageUrl, thumbnailUrl, tasksCount, shortDescription } = course;
  const { t } = useTranslation();

  return (
    <div className='dashboard-course-card'>
      <div className='dashboard-course-card__image-wrapper'>
        <SharedImage
          alt={displayName}
          className='dashboard-course-card__image'
          fallbackSrc={imageUrl}
          src={thumbnailUrl}
        />
      </div>
      <div className='card-data' data-testid='card-data'>
        {!isEmpty(grades) && <Grades grades={grades} />}
        <div className='dashboard-course-card__project-summary'>
          <p className='dashboard-course-card__grades-text'>
            {t('user.dashboard.projectsCount', { tasksCount })}
          </p>
        </div>
      </div>
      <div className='dashboard-course-card__content'>
        <h6 className='dashboard-course-card__name' data-testid='dashboard-course-item-name'>
          {displayName}
        </h6>
        <p className='dashboard-course-card__description'>
          <span
            className='dashboard-course-card__short-description-inject'
            dangerouslySetInnerHTML={cleanInjection(shortDescription)}
          />
        </p>
      </div>
      <SharedButton
        className='dashboard-course-card__description-link'
        data-testid='description-link'
        variant='link'
        onClick={onClick}>
        {t('user.dashboard.view')}
        <SharedIcon
          className='dashboard-course-card__description-link-icon'
          icon={<ChevronRight />}
          size='xs'
        />
      </SharedButton>
    </div>
  );
};

export default CourseCardContent;
